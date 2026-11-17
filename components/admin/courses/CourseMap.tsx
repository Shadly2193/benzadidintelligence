"use client";
import { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { createClient } from "@/lib/supabase/client";
import { learnerType, matchCollege, type LearnerType } from "@/lib/course/colleges";
import type { MapPin } from "@/components/course/CollegeMap";

const CollegeMap = dynamic(() => import("@/components/course/CollegeMap"), { ssr: false });

interface App {
  id: string;
  full_name: string;
  medical_college: string;
  has_bmdc: boolean;
  student_year: string | null;
  status: string;
}
interface Person { id: string; name: string; type: LearnerType; paid: boolean }
interface Group { key: string; name: string; city: string; ll: [number, number]; people: Person[] }

const TYPES: LearnerType[] = ["Doctor", "Intern", "Student"];
const REFRESH = 20000;
type Filter = "all" | "paid" | "reg";

const summary = (ps: Person[]) =>
  TYPES.map((t) => [t, ps.filter((p) => p.type === t).length] as const)
    .filter(([, n]) => n)
    .map(([t, n]) => `${n} ${t}`)
    .join(" · ");

/** Admin: every registered learner on the map by medical college. Refreshes by itself. */
export default function CourseMap() {
  const [apps, setApps] = useState<App[] | null>(null);
  const [paidIds, setPaidIds] = useState<Set<string>>(new Set());
  const [err, setErr] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const [focus, setFocus] = useState<string | null>(null);
  const [open, setOpen] = useState<string | null>(null);

  useEffect(() => {
    let live = true;
    const load = async () => {
      const supabase = createClient();
      const [a, p] = await Promise.all([
        supabase.from("course_applications").select("id, full_name, medical_college, has_bmdc, student_year, status").neq("status", "rejected"),
        supabase.from("course_payments").select("application_id"),
      ]);
      if (!live) return;
      if (a.error || p.error) return setErr((a.error ?? p.error)!.message);
      setErr("");
      setApps((a.data ?? []) as App[]);
      setPaidIds(new Set((p.data ?? []).map((x) => x.application_id as string)));
    };
    load();
    const id = setInterval(load, REFRESH);
    return () => {
      live = false;
      clearInterval(id);
    };
  }, []);

  const { groups, unmatched, people } = useMemo(() => {
    const by = new Map<string, Group>();
    const unmatched: { name: string; college: string }[] = [];
    const people: Person[] = [];
    for (const a of apps ?? []) {
      const person = { id: a.id, name: a.full_name, type: learnerType(a), paid: paidIds.has(a.id) };
      people.push(person);
      if (filter === "paid" && !person.paid) continue;
      if (filter === "reg" && person.paid) continue;
      const c = matchCollege(a.medical_college);
      if (!c) {
        unmatched.push({ name: a.full_name, college: a.medical_college });
        continue;
      }
      const g = by.get(c.key) ?? { key: c.key, name: c.name, city: c.city, ll: c.ll, people: [] };
      g.people.push(person);
      by.set(c.key, g);
    }
    return { groups: [...by.values()].sort((x, y) => y.people.length - x.people.length), unmatched, people };
  }, [apps, paidIds, filter]);

  const pins: MapPin[] = groups.map((g) => ({
    key: g.key,
    ll: g.ll,
    n: g.people.length,
    popup: [g.name, summary(g.people), ...g.people.map((p) => `• ${p.name}${p.paid ? " (paid)" : ""}`)].join("\n"),
  }));

  if (!apps && !err) return <div className="max-w-6xl mx-auto text-sm text-brand-gray-text">Loading…</div>;

  const stats = [
    ["Registered", people.length],
    ["Paid", people.filter((p) => p.paid).length],
    ["Colleges", new Set((apps ?? []).map((a) => matchCollege(a.medical_college)?.key).filter(Boolean)).size],
    ...TYPES.map((t) => [`${t}s`, people.filter((p) => p.type === t).length] as const).filter(([, n]) => n),
  ] as const;

  return (
    <div className="max-w-6xl mx-auto flex flex-col gap-5 pb-24">
      <div>
        <h1 className="text-2xl font-black text-white">Course map</h1>
        <p className="text-sm text-brand-gray-text mt-1">Every learner, pinned to their medical college. Updates by itself every 20 seconds.</p>
      </div>

      {err && <p className="rounded-lg border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm text-red-300">{err}</p>}

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {stats.map(([k, v]) => (
          <div key={k} className="rounded-xl border border-white/10 bg-black/30 p-4">
            <div className="text-2xl font-black text-brand-orange tabular-nums">{v}</div>
            <div className="text-xs text-brand-gray-text">{k}</div>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        {([["all", "All"], ["paid", "Paid"], ["reg", "Registered only"]] as const).map(([f, l]) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-full px-4 py-1.5 text-xs font-bold border ${filter === f ? "bg-brand-orange border-brand-orange text-white" : "border-white/15 text-brand-gray-text hover:text-white"}`}
          >
            {l}
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-[1.6fr_1fr] gap-4">
        <div className="h-[460px] sm:h-[560px] rounded-2xl border border-white/10 overflow-hidden">
          <CollegeMap pins={pins} focus={focus} />
        </div>
        <div className="rounded-2xl border border-white/10 bg-black/30 divide-y divide-white/10 max-h-[560px] overflow-auto">
          {!groups.length && <p className="p-4 text-sm text-brand-gray-text">No learners here yet.</p>}
          {groups.map((g) => (
            <div key={g.key}>
              <button
                onClick={() => {
                  setFocus(g.key);
                  setOpen(open === g.key ? null : g.key);
                }}
                className="w-full text-left p-3 flex items-center justify-between gap-3 hover:bg-white/5"
              >
                <span className="min-w-0">
                  <span className="block text-sm text-white truncate">{g.name}</span>
                  <span className="block text-xs text-brand-gray-text">{g.city} · {summary(g.people)}</span>
                </span>
                <span className="shrink-0 rounded-full border border-brand-orange text-brand-orange text-xs font-bold px-2 tabular-nums">{g.people.length}</span>
              </button>
              {open === g.key && (
                <ul className="px-3 pb-3 text-xs text-brand-gray-text flex flex-col gap-1">
                  {g.people.map((p) => (
                    <li key={p.id} className="flex justify-between gap-2">
                      <span className="text-white/90">{p.name}</span>
                      <span>{p.type}{p.paid ? " · paid" : ""}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>

      {unmatched.length > 0 && (
        <div className="rounded-2xl border border-yellow-500/30 bg-yellow-500/5 p-4">
          <p className="text-sm font-bold text-white">Not on the map ({unmatched.length})</p>
          <p className="text-xs text-brand-gray-text mb-2">These college names were not recognised. Send them to the developer to add to the college list.</p>
          <ul className="text-xs text-brand-gray-text flex flex-col gap-1">
            {unmatched.map((u, i) => (
              <li key={i}><span className="text-white/90">{u.name}</span>: {u.college}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
