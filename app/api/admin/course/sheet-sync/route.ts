import { createClient } from "@/lib/supabase/server";
import { buildStudent, currentMonth, type SheetApplication, type SheetPayment } from "@/lib/course/sheetRows";

const TIMEOUT = 25000;
const COLS = "id, full_name, whatsapp, email, has_bmdc, bmdc_number, medical_college, session, student_year, price_phase, fee, status";

const reply = (status: number, body: Record<string, unknown>) => Response.json(body, { status });

/**
 * Admin only (reads go through the logged-in user's RLS). Copies paying students to the current
 * month's tab of the private Google Sheet. It only reads the database; a failure never touches it.
 * Body: { id } for one student, { all: true }, or { removeId } after an application is deleted.
 */
export async function POST(req: Request) {
  const url = process.env.GOOGLE_SHEET_WEBHOOK_URL;
  const secret = process.env.GOOGLE_SHEET_WEBHOOK_SECRET;
  if (!url || !secret) return reply(200, { ok: false, skipped: true });

  const supabase = await createClient();
  const { data: auth } = await supabase.auth.getUser();
  if (!auth.user) return reply(401, { ok: false, error: "Not logged in." });

  const body = await req.json().catch(() => ({}));
  const one = typeof body.id === "string" ? body.id : null;
  const gone = typeof body.removeId === "string" ? body.removeId : null;
  if (!one && !gone && body.all !== true) return reply(400, { ok: false, error: "Bad request." });
  if (gone) return send(url, secret, currentMonth().tab, [{ id: gone, remove: true }]);

  let apps = supabase.from("course_applications").select(COLS);
  let pays = supabase.from("course_payments").select("application_id, amount, paid_on, method");
  if (one) {
    apps = apps.eq("id", one);
    pays = pays.eq("application_id", one);
  }
  const [a, p] = await Promise.all([apps, pays]);
  if (a.error || p.error) return reply(500, { ok: false, error: (a.error ?? p.error)!.message });

  const month = currentMonth();
  const payments = (p.data ?? []) as SheetPayment[];
  const students = ((a.data ?? []) as unknown as SheetApplication[])
    .map((x) => buildStudent(x, payments, month.key))
    .filter((s) => one || s.add || s.remove || s.refund > 0);
  if (!students.length) return reply(200, { ok: true, updated: 0, added: 0, removed: 0 });
  return send(url, secret, month.tab, students);
}

async function send(url: string, secret: string, tab: string, students: unknown[]) {
  try {
    const r = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({ secret, tab, students }),
      redirect: "follow",
      signal: AbortSignal.timeout(TIMEOUT),
    });
    const j = await r.json().catch(() => null);
    if (!r.ok || !j?.ok) return reply(502, { ok: false, error: j?.error ?? `Sheet error ${r.status}` });
    return reply(200, j);
  } catch (e) {
    console.error("google sheet sync failed", e);
    return reply(502, { ok: false, error: "Could not reach the Google Sheet." });
  }
}
