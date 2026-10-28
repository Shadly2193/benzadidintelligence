"use client";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { mergeCourse, type CourseContent } from "@/lib/course/defaults";

const SLUG = "digital-residency-program";
const FUNNEL = [
  ["view", "Visited the page"],
  ["cta_join", "Clicked Join"],
  ["form_start", "Started the form"],
  ["form_submit", "Sent the form"],
] as const;
const RANGES = [
  [7, "Last 7 days"],
  [30, "Last 30 days"],
  [0, "All time"],
] as const;

interface App {
  id: string;
  created_at: string;
  status: string;
  fee: number | null;
  price_phase: string | null;
}
interface Pay {
  application_id: string;
  amount: number;
  paid_on: string;
}

const fmt = (n: number) => n.toLocaleString("en-US");
const dayKey = (d: Date) => d.toISOString().slice(0, 10);

export default function CourseDashboard() {
  const [apps, setApps] = useState<App[]>([]);
  const [pays, setPays] = useState<Pay[]>([]);
  const [content, setContent] = useState<CourseContent | null>(null);
  const [range, setRange] = useState<number>(30);
  const [funnel, setFunnel] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    (async () => {
      const supabase = createClient();
      const [a, p, c] = await Promise.all([
        supabase.from("course_applications").select("id, created_at, status, fee, price_phase"),
        supabase.from("course_payments").select("application_id, amount, paid_on"),
        supabase.from("course_pages").select("published").eq("slug", SLUG).maybeSingle(),
      ]);
      if (a.error || p.error) setErr((a.error ?? p.error)!.message);
      setApps((a.data as App[]) ?? []);
      setPays((p.data as Pay[]) ?? []);
      setContent(mergeCourse(c.data?.published));
      setLoading(false);
    })();
  }, []);

  // funnel counts for the chosen range (each event is sent once per visit)
  useEffect(() => {
    (async () => {
      const supabase = createClient();
      const since = range ? new Date(Date.now() - range * 86400000).toISOString() : null;
      const counts = await Promise.all(
        FUNNEL.map(async ([ev]) => {
          let q = supabase.from("course_events").select("id", { count: "exact", head: true }).eq("event", ev);
          if (since) q = q.gte("created_at", since);
          const { count } = await q;
          return [ev, count ?? 0] as const;
        })
      );
      setFunnel(Object.fromEntries(counts));
    })();
  }, [range]);

  const stats = useMemo(() => {
    const live = apps.filter((a) => a.status !== "rejected" && a.status !== "refunded");
    const paidBy: Record<string, number> = {};
    for (const p of pays) paidBy[p.application_id] = (paidBy[p.application_id] ?? 0) + p.amount;
    const collected = pays.reduce((s, p) => s + p.amount, 0);
    const expected = live.reduce((s, a) => s + (a.fee ?? 0), 0);
    const full = live.filter((a) => (paidBy[a.id] ?? 0) >= (a.fee ?? 0) && (a.fee ?? 0) > 0).length;
    const part = live.filter((a) => (paidBy[a.id] ?? 0) > 0 && (paidBy[a.id] ?? 0) < (a.fee ?? 0)).length;
    const unpaid = live.filter((a) => !paidBy[a.id]).length;
    const inGroup = apps.filter((a) => a.status === "approved").length;
    const early = apps.filter((a) => a.price_phase === "early").length;
    return { live, collected, due: Math.max(0, expected - collected), full, part, unpaid, inGroup, early, paying: full + part };
  }, [apps, pays]);

  // last 14 days: applications and money per day
  const days = useMemo(() => {
    const out: { key: string; label: string; apps: number; money: number }[] = [];
    for (let i = 13; i >= 0; i--) {
      const d = new Date(Date.now() - i * 86400000);
      out.push({ key: dayKey(d), label: d.toLocaleDateString("en-GB", { day: "numeric", month: "short" }), apps: 0, money: 0 });
    }
    const idx = Object.fromEntries(out.map((d, i) => [d.key, i]));
    for (const a of apps) {
      const i = idx[dayKey(new Date(a.created_at))];
      if (i !== undefined) out[i].apps++;
    }
    for (const p of pays) {
      const i = idx[p.paid_on];
      if (i !== undefined) out[i].money += p.amount;
    }
    return out;
  }, [apps, pays]);

  const countdown = useMemo(() => {
    if (!content) return [];
    const left = (iso: string) => Math.ceil((Date.parse(iso) - Date.now()) / 86400000);
    return [
      ["Early bird ends", content.schedule.earlyBirdEndLabel, left(content.schedule.earlyBirdEnd)],
      ["Registration closes", content.schedule.regEndLabel, left(content.schedule.regEnd)],
      ["Classes start", content.schedule.classStartLabel, left(content.schedule.classStart)],
    ] as const;
  }, [content]);

  if (loading) return <div className="max-w-4xl mx-auto text-sm text-brand-gray-text">Loading…</div>;

  const maxApps = Math.max(1, ...days.map((d) => d.apps));
  const maxMoney = Math.max(1, ...days.map((d) => d.money));
  const top = Math.max(1, funnel.view ?? 0);

  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-6 pb-24">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-black text-white">Course dashboard</h1>
          <p className="text-sm text-brand-gray-text mt-1">Digital Residency Program, at a glance.</p>
        </div>
        <Link href="/admin/courses/applications" className="rounded-lg bg-brand-orange text-white text-xs font-bold px-4 py-2.5 hover:bg-brand-orange-light">
          Open student list
        </Link>
      </div>

      {err && <p className="rounded-lg border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm text-red-300">{err}</p>}

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Stat label="Collected (BDT)" value={fmt(stats.collected)} accent />
        <Stat label="Still due (BDT)" value={fmt(stats.due)} />
        <Stat label="Applications" value={String(apps.length)} sub={`${stats.early} at early bird price`} />
        <Stat label="Paying students" value={String(stats.paying)} sub={`${stats.full} full · ${stats.part} part`} />
        <Stat label="Not paid yet" value={String(stats.unpaid)} />
        <Stat label="In the group" value={String(stats.inGroup)} />
        <Stat
          label="Apply → pay"
          value={apps.length ? `${Math.round((stats.paying / apps.length) * 100)}%` : "–"}
          sub="of applicants paid something"
        />
        <Stat
          label="Visit → form sent"
          value={funnel.view ? `${(((funnel.form_submit ?? 0) / funnel.view) * 100).toFixed(1)}%` : "–"}
          sub="in the funnel range below"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {countdown.map(([k, label, n]) => (
          <div key={k} className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
            <p className="text-[11px] uppercase tracking-wide text-brand-gray-text">{k}</p>
            <p className="text-xl font-black text-white mt-1">{n > 0 ? `${n} day${n === 1 ? "" : "s"}` : "Passed"}</p>
            <p className="text-xs text-brand-gray-text">{label}</p>
          </div>
        ))}
      </div>

      <Card title="Funnel" right={
        <select value={range} onChange={(e) => setRange(Number(e.target.value))} className="rounded-lg bg-black/30 border border-white/10 px-2 py-1 text-xs text-white">
          {RANGES.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
        </select>
      }>
        <div className="flex flex-col gap-2">
          {FUNNEL.map(([ev, label], i) => {
            const n = funnel[ev] ?? 0;
            const prev = i ? funnel[FUNNEL[i - 1][0]] ?? 0 : 0;
            return (
              <div key={ev}>
                <div className="flex justify-between text-xs text-brand-gray-text mb-1">
                  <span>{label}</span>
                  <span>
                    <b className="text-white">{fmt(n)}</b>
                    {i > 0 && prev > 0 && ` · ${Math.round((n / prev) * 100)}% of previous step`}
                  </span>
                </div>
                <div className="h-3 rounded-full bg-white/5 overflow-hidden">
                  <div className="h-full rounded-full bg-gradient-to-r from-[#C83205] to-brand-orange" style={{ width: `${(n / top) * 100}%` }} />
                </div>
              </div>
            );
          })}
          <p className="text-[11px] text-brand-gray-text mt-1">Counted once per visit. No names or personal data are stored.</p>
        </div>
      </Card>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Card title="Applications per day (14 days)">
          <Bars days={days} pick={(d) => d.apps} max={maxApps} show={(n) => String(n)} />
        </Card>
        <Card title="Money in per day (14 days)">
          <Bars days={days} pick={(d) => d.money} max={maxMoney} show={(n) => fmt(n)} />
        </Card>
      </div>
    </div>
  );
}

function Bars<T extends { key: string; label: string }>({ days, pick, max, show }: { days: T[]; pick: (d: T) => number; max: number; show: (n: number) => string }) {
  return (
    <div className="flex items-end gap-1 h-36">
      {days.map((d) => {
        const n = pick(d);
        return (
          <div key={d.key} className="flex-1 flex flex-col items-center justify-end h-full" title={`${d.label}: ${show(n)}`}>
            {n > 0 && <span className="text-[9px] text-white mb-0.5">{show(n)}</span>}
            <div className="w-full rounded-t bg-brand-orange/80" style={{ height: `${(n / max) * 100}%`, minHeight: n ? 3 : 0 }} />
            <span className="text-[8px] text-brand-gray-text mt-1 whitespace-nowrap">{d.label.split(" ")[0]}</span>
          </div>
        );
      })}
    </div>
  );
}

function Card({ title, right, children }: { title: string; right?: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm font-bold text-white">{title}</p>
        {right}
      </div>
      {children}
    </div>
  );
}

function Stat({ label, value, sub, accent }: { label: string; value: string; sub?: string; accent?: boolean }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
      <p className="text-[11px] uppercase tracking-wide text-brand-gray-text">{label}</p>
      <p className={`text-xl font-black mt-1 ${accent ? "text-brand-orange" : "text-white"}`}>{value}</p>
      {sub && <p className="text-[11px] text-brand-gray-text mt-0.5">{sub}</p>}
    </div>
  );
}
