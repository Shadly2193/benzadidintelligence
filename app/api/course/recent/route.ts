import { createServiceClient } from "@/lib/supabase/server";
import { learnerType, matchCollege } from "@/lib/course/colleges";

export const dynamic = "force-dynamic";

const SKIP = new Set(["dr", "md", "mst", "mohammad", "muhammad", "mohammed", "mohd", "sk", "sheikh", "syed"]);

/** First real name word, skipping titles and initials: "Dr. Md. Anamul Hossain" -> "Anamul", "Dr. S M Nasrullah" -> "Nasrullah". */
function firstName(full: string) {
  const parts = full.replace(/[.,]/g, " ").split(/\s+/).filter(Boolean);
  const w = parts.find((p) => p.length > 1 && !SKIP.has(p.toLowerCase())) ?? parts.find((p) => p.length > 1) ?? parts[0] ?? "";
  return w.toLowerCase().replace(/(^|-)(\w)/g, (_, a, b) => a + b.toUpperCase());
}

/**
 * Public, read-only: activity from the last 30 days. Each learner gives a "registered" event, and a paid
 * learner also a "joined" event (first payment). Only a first name, learner type, college and time leave
 * this route. No phone, email, ids, amounts or full names.
 */
export async function GET() {
  const db = createServiceClient();
  const since = new Date(Date.now() - 30 * 864e5).toISOString();
  const [a, p] = await Promise.all([
    db.from("course_applications")
      .select("id, full_name, medical_college, has_bmdc, student_year, status, created_at")
      .neq("status", "rejected")
      .order("created_at", { ascending: false })
      .limit(200),
    db.from("course_payments").select("application_id, created_at").order("created_at"),
  ]);
  if (a.error || p.error) return Response.json({ people: [] }, { status: 500 });

  const paidAt = new Map<string, string>();
  for (const x of p.data ?? []) if (!paidAt.has(x.application_id)) paidAt.set(x.application_id, x.created_at);

  const people: { id: number; name: string; type: string; college: string; at: string; kind: "registered" | "joined" }[] = [];
  let n = 0;
  for (const r of a.data ?? []) {
    const c = matchCollege(r.medical_college);
    const name = firstName(r.full_name ?? "");
    if (!c || !name) continue;
    const type = learnerType(r);
    const base = { id: n++, name: type === "Student" ? name : `Dr. ${name}`, type, college: c.name };
    if (r.created_at >= since) people.push({ ...base, at: r.created_at, kind: "registered" });
    const j = paidAt.get(r.id);
    if (j && j >= since) people.push({ ...base, at: j, kind: "joined" });
  }
  return Response.json(
    { people: people.slice(0, 40) },
    { headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300" } },
  );
}
