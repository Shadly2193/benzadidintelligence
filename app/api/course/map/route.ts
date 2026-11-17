import { createServiceClient } from "@/lib/supabase/server";
import { learnerType, matchCollege } from "@/lib/course/colleges";

export const dynamic = "force-dynamic";

/**
 * Public, read-only: how many learners come from each medical college. No names, phone numbers or
 * ids ever leave this route, only counts per college. Rejected applications are left out.
 */
export async function GET() {
  const { data, error } = await createServiceClient()
    .from("course_applications")
    .select("medical_college, has_bmdc, student_year, status")
    .neq("status", "rejected");
  if (error) return Response.json({ colleges: [], total: 0 }, { status: 500 });

  const by = new Map<string, { name: string; city: string; ll: [number, number]; n: number; Doctor: number; Intern: number; Student: number }>();
  let total = 0;
  for (const a of data ?? []) {
    const c = matchCollege(a.medical_college);
    if (!c) continue;
    total++;
    const row = by.get(c.key) ?? { name: c.name, city: c.city, ll: c.ll, n: 0, Doctor: 0, Intern: 0, Student: 0 };
    row.n++;
    row[learnerType(a)]++;
    by.set(c.key, row);
  }
  const colleges = [...by.values()].sort((x, y) => y.n - x.n);
  return Response.json(
    { colleges, total },
    { headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300" } },
  );
}
