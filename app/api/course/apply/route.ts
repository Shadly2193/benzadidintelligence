import { createHash, randomUUID } from "node:crypto";
import { createServiceClient } from "@/lib/supabase/server";
import { mergeCourse } from "@/lib/course/defaults";

const SLUG = "digital-residency-program";
const MAX_IMG = 5 * 1024 * 1024;
const IMG_EXT: Record<string, string> = { "image/jpeg": "jpg", "image/png": "png", "image/webp": "webp" };
const PER_HOUR = 3;

const SHEET_TIMEOUT = 5000;

const fail = (status: number, error: string) => Response.json({ ok: false, error }, { status });

function text(f: FormData, key: string, min: number, max: number) {
  const v = String(f.get(key) ?? "").trim();
  return v.length >= min && v.length <= max ? v : null;
}

/** Copies one saved application to the private Google Sheet. Never throws: the form must work even if the Sheet is down. */
async function logToSheet(row: Record<string, string>) {
  const url = process.env.GOOGLE_SHEET_WEBHOOK_URL;
  const secret = process.env.GOOGLE_SHEET_WEBHOOK_SECRET;
  if (!url || !secret) return;
  try {
    const r = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({ secret, row }),
      redirect: "follow",
      signal: AbortSignal.timeout(SHEET_TIMEOUT),
    });
    const j = await r.json().catch(() => null);
    if (!r.ok || !j?.ok) console.error("google sheet log failed", r.status, j?.error ?? "");
  } catch (e) {
    console.error("google sheet log failed", e);
  }
}

/** Saves a course application (and the optional private ID image). The thank-you view then offers WhatsApp. */
export async function POST(req: Request) {
  let f: FormData;
  try {
    f = await req.formData();
  } catch {
    return fail(400, "Bad form.");
  }

  // honeypot: real people never see this field
  if (String(f.get("website") ?? "")) return Response.json({ ok: true });

  const full_name = text(f, "name", 2, 80);
  const whatsapp = text(f, "whatsapp", 10, 20);
  const email = text(f, "email", 3, 120);
  const facebook_name = text(f, "fb", 2, 80);
  const medical_college = text(f, "college", 2, 120);
  const session = text(f, "session", 2, 20);
  const has_bmdc = f.get("hasbmdc") === "yes";
  const bmdc_number = has_bmdc ? text(f, "bmdc", 1, 20) : null;
  const student_year = has_bmdc ? null : text(f, "year", 1, 20);
  if (!full_name || !whatsapp || !facebook_name || !medical_college || !session || f.get("agree") !== "on")
    return fail(400, "Please fill in every field.");
  if (has_bmdc ? !bmdc_number : !student_year) return fail(400, "Please add your BMDC number or your year.");

  const supabase = createServiceClient();

  // registration window and fee come from the published page content
  const { data: page } = await supabase.from("course_pages").select("published").eq("slug", SLUG).maybeSingle();
  const c = mergeCourse(page?.published);
  const now = Date.now();
  const phase = now <= Date.parse(c.schedule.earlyBirdEnd) ? "early" : now <= Date.parse(c.schedule.regEnd) ? "regular" : null;
  if (!phase) return fail(403, c.join.closedNote);

  // rate limit per hashed IP
  const ip = (req.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || "unknown";
  const ip_hash = createHash("sha256").update(`${ip}:${process.env.SUPABASE_SERVICE_ROLE_KEY}`).digest("hex").slice(0, 32);
  const since = new Date(now - 3600_000).toISOString();
  const { count } = await supabase
    .from("course_applications")
    .select("id", { count: "exact", head: true })
    .eq("ip_hash", ip_hash)
    .gte("created_at", since);
  if ((count ?? 0) >= PER_HOUR) return fail(429, "Too many requests. Please message me on WhatsApp instead.");

  const id = randomUUID();
  let id_image_path: string | null = null;
  const img = f.get("idimg");
  if (img instanceof File && img.size > 0) {
    const ext = IMG_EXT[img.type];
    if (!ext || img.size > MAX_IMG) return fail(400, "ID image must be JPG, PNG or WEBP, up to 5 MB.");
    id_image_path = `${id}.${ext}`;
    const { error } = await supabase.storage.from("course-ids").upload(id_image_path, img, { contentType: img.type });
    if (error) return fail(500, "Could not save the image. Please send it on WhatsApp.");
  }

  const fee = phase === "early" ? c.schedule.earlyBirdAmount : c.price.amount;
  const row = {
    id,
    course_slug: SLUG,
    full_name,
    facebook_name,
    medical_college,
    session,
    has_bmdc,
    bmdc_number,
    student_year,
    id_image_path,
    agreed_at: new Date().toISOString(),
    price_phase: phase,
    fee,
    source: (req.headers.get("referer") ?? "").slice(0, 200) || null,
    ip_hash,
  };
  const extra = { whatsapp, email };
  let { error } = await supabase.from("course_applications").insert({ ...row, ...extra });
  // the new columns may not exist yet (SQL not run): save the rest so the form keeps working
  if (error && /whatsapp|email/.test(error.message)) {
    console.error("course_applications is missing the new columns; run supabase/course_applications_contact.sql");
    ({ error } = await supabase.from("course_applications").insert(row));
  }
  if (error) {
    if (id_image_path) await supabase.storage.from("course-ids").remove([id_image_path]);
    return fail(500, "Could not save your request. Please message me on WhatsApp.");
  }

  await logToSheet({
    timestamp: new Date().toLocaleString("en-GB", { timeZone: "Asia/Dhaka" }),
    name: full_name,
    whatsapp,
    email: email ?? "",
    who: has_bmdc ? "Doctor" : "Student",
    bmdc_or_college: has_bmdc ? `BMDC ${bmdc_number}` : `${medical_college}, session ${session}, ${student_year}`,
    // the image stays in the private bucket; this link opens it in the admin panel (login needed)
    id_photo: id_image_path ? `${new URL(req.url).origin}/admin/courses/applications` : "",
  });
  return Response.json({ ok: true });
}
