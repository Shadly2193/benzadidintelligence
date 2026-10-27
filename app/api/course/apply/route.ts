import { createHash, randomUUID } from "node:crypto";
import { createServiceClient } from "@/lib/supabase/server";
import { mergeCourse } from "@/lib/course/defaults";

const SLUG = "digital-residency-program";
const MAX_IMG = 5 * 1024 * 1024;
const IMG_EXT: Record<string, string> = { "image/jpeg": "jpg", "image/png": "png", "image/webp": "webp" };
const PER_HOUR = 3;

const fail = (status: number, error: string) => Response.json({ ok: false, error }, { status });

function text(f: FormData, key: string, min: number, max: number) {
  const v = String(f.get(key) ?? "").trim();
  return v.length >= min && v.length <= max ? v : null;
}

/** Saves a course application (and the optional private ID image). The browser opens WhatsApp afterwards. */
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
  const facebook_name = text(f, "fb", 2, 80);
  const medical_college = text(f, "college", 2, 120);
  const session = text(f, "session", 2, 20);
  const has_bmdc = f.get("hasbmdc") === "yes";
  const bmdc_number = has_bmdc ? text(f, "bmdc", 1, 20) : null;
  const student_year = has_bmdc ? null : text(f, "year", 1, 20);
  if (!full_name || !facebook_name || !medical_college || !session || f.get("agree") !== "on")
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

  const { error } = await supabase.from("course_applications").insert({
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
    fee: phase === "early" ? c.schedule.earlyBirdAmount : c.price.amount,
    source: (req.headers.get("referer") ?? "").slice(0, 200) || null,
    ip_hash,
  });
  if (error) {
    if (id_image_path) await supabase.storage.from("course-ids").remove([id_image_path]);
    return fail(500, "Could not save your request. Please message me on WhatsApp.");
  }
  return Response.json({ ok: true });
}
