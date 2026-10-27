"use client";
import { useEffect, useMemo, useState } from "react";
import { ChevronDown, Download, IdCard, Plus, Search, Trash2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

const STATUSES = ["new", "contacted", "paid_half", "paid_full", "approved", "refunded", "rejected"] as const;
const STATUS_LABEL: Record<string, string> = {
  new: "New", contacted: "Contacted", paid_half: "Paid part", paid_full: "Paid in full",
  approved: "In the group", refunded: "Refunded", rejected: "Rejected",
};
const METHODS = ["bkash", "nagad", "rocket", "bank", "cash", "other"] as const;

interface Payment {
  id: string;
  application_id: string;
  amount: number;
  paid_on: string;
  method: string;
  trx_id: string | null;
  note: string | null;
}

interface Application {
  id: string;
  created_at: string;
  full_name: string;
  facebook_name: string;
  medical_college: string;
  session: string;
  has_bmdc: boolean;
  bmdc_number: string | null;
  student_year: string | null;
  id_image_path: string | null;
  price_phase: string | null;
  fee: number | null;
  status: string;
  notes: string | null;
}

const inputCls =
  "w-full rounded-lg bg-black/30 border border-white/10 px-3 py-2 text-sm text-white outline-none focus:border-brand-orange/60";
const labelCls = "block text-[11px] font-semibold uppercase tracking-wide text-brand-gray-text mb-1";
const fmt = (n: number) => n.toLocaleString("en-US");
const day = (s: string) => new Date(s).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });

export default function ApplicationsManager() {
  const [apps, setApps] = useState<Application[]>([]);
  const [pays, setPays] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("all");
  const [open, setOpen] = useState<string | null>(null);

  async function load() {
    const supabase = createClient();
    const [a, p] = await Promise.all([
      supabase.from("course_applications").select("*").order("created_at", { ascending: false }),
      supabase.from("course_payments").select("*").order("paid_on"),
    ]);
    if (a.error || p.error) setErr((a.error ?? p.error)!.message);
    setApps((a.data as Application[]) ?? []);
    setPays((p.data as Payment[]) ?? []);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  const paidBy = useMemo(() => {
    const m: Record<string, number> = {};
    for (const p of pays) m[p.application_id] = (m[p.application_id] ?? 0) + p.amount;
    return m;
  }, [pays]);

  const live = apps.filter((a) => a.status !== "rejected" && a.status !== "refunded");
  const collected = pays.reduce((s, p) => s + p.amount, 0);
  const due = live.reduce((s, a) => s + Math.max(0, (a.fee ?? 0) - (paidBy[a.id] ?? 0)), 0);
  const counts = Object.fromEntries(STATUSES.map((s) => [s, apps.filter((a) => a.status === s).length]));

  const shown = apps.filter((a) => {
    if (status === "due") {
      if (!live.includes(a) || (paidBy[a.id] ?? 0) >= (a.fee ?? 0)) return false;
    } else if (status !== "all" && a.status !== status) return false;
    const s = q.trim().toLowerCase();
    return !s || [a.full_name, a.facebook_name, a.medical_college, a.bmdc_number ?? ""].some((x) => x.toLowerCase().includes(s));
  });

  async function patch(id: string, fields: Partial<Application>) {
    setApps((xs) => xs.map((a) => (a.id === id ? { ...a, ...fields } : a)));
    const { error } = await createClient().from("course_applications").update(fields).eq("id", id);
    if (error) setErr(error.message);
  }

  /** Payments move the status forward (never backwards past "approved"). */
  function autoStatus(a: Application, paid: number) {
    if (["approved", "refunded", "rejected"].includes(a.status)) return;
    const next = paid <= 0 ? (a.status.startsWith("paid") ? "contacted" : a.status) : paid >= (a.fee ?? 0) ? "paid_full" : "paid_half";
    if (next !== a.status) patch(a.id, { status: next });
  }

  async function addPayment(a: Application, p: Omit<Payment, "id" | "application_id">) {
    const supabase = createClient();
    const { data: user } = await supabase.auth.getUser();
    const { data, error } = await supabase
      .from("course_payments")
      .insert({ ...p, application_id: a.id, created_by: user.user?.id ?? null })
      .select()
      .single();
    if (error) {
      setErr(error.code === "23505" ? "This transaction ID is already recorded." : error.message);
      return false;
    }
    setPays((xs) => [...xs, data as Payment]);
    autoStatus(a, (paidBy[a.id] ?? 0) + p.amount);
    return true;
  }

  async function removePayment(a: Application, p: Payment) {
    if (!confirm(`Delete the ${fmt(p.amount)} BDT payment?`)) return;
    const { error } = await createClient().from("course_payments").delete().eq("id", p.id);
    if (error) return setErr(error.message);
    setPays((xs) => xs.filter((x) => x.id !== p.id));
    autoStatus(a, (paidBy[a.id] ?? 0) - p.amount);
  }

  async function viewId(path: string) {
    const { data, error } = await createClient().storage.from("course-ids").createSignedUrl(path, 60);
    if (error || !data) return setErr(error?.message ?? "Could not open the image.");
    window.open(data.signedUrl, "_blank", "noopener");
  }

  async function remove(a: Application) {
    if (!confirm(`Delete ${a.full_name}'s application, payments and ID image for good?`)) return;
    const supabase = createClient();
    if (a.id_image_path) await supabase.storage.from("course-ids").remove([a.id_image_path]);
    const { error } = await supabase.from("course_applications").delete().eq("id", a.id);
    if (error) return setErr(error.message);
    setApps((xs) => xs.filter((x) => x.id !== a.id));
    setPays((xs) => xs.filter((x) => x.application_id !== a.id));
  }

  function exportCsv() {
    const head = ["Date", "Name", "Facebook", "College", "Session", "BMDC", "Year", "Price", "Fee", "Paid", "Due", "Status", "Notes"];
    const rows = apps.map((a) => {
      const paid = paidBy[a.id] ?? 0;
      return [day(a.created_at), a.full_name, a.facebook_name, a.medical_college, a.session, a.bmdc_number ?? "", a.student_year ?? "",
        a.price_phase ?? "", a.fee ?? 0, paid, Math.max(0, (a.fee ?? 0) - paid), STATUS_LABEL[a.status], a.notes ?? ""];
    });
    const csv = [head, ...rows].map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
    const url = URL.createObjectURL(new Blob(["﻿" + csv], { type: "text/csv" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = `course-applications-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  }

  if (loading) return <div className="max-w-4xl mx-auto text-sm text-brand-gray-text">Loading…</div>;

  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-5 pb-24">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-black text-white">Course applications</h1>
          <p className="text-sm text-brand-gray-text mt-1">Only you can see this page. Add each payment as it comes in.</p>
        </div>
        <button onClick={exportCsv} className="inline-flex items-center gap-1.5 rounded-lg border border-white/15 text-white text-xs font-bold px-3 py-2">
          <Download size={14} /> Excel (CSV)
        </button>
      </div>

      {err && <p className="rounded-lg border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm text-red-300">{err}</p>}

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Stat label="Applications" value={String(apps.length)} />
        <Stat label="Paid in full / part" value={`${counts.paid_full + counts.approved} / ${counts.paid_half}`} />
        <Stat label="Collected (BDT)" value={fmt(collected)} accent />
        <Stat label="Still due (BDT)" value={fmt(due)} />
      </div>

      <div className="flex flex-wrap gap-2">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-gray-text" />
          <input className={`${inputCls} pl-8`} placeholder="Search name, college, BMDC" value={q} onChange={(e) => setQ(e.target.value)} />
        </div>
        <select className={`${inputCls} w-auto`} value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="all">All ({apps.length})</option>
          <option value="due">Money still due</option>
          {STATUSES.map((s) => (
            <option key={s} value={s}>{STATUS_LABEL[s]} ({counts[s]})</option>
          ))}
        </select>
      </div>

      {shown.length === 0 && <p className="text-sm text-brand-gray-text">No applications here yet.</p>}

      {shown.map((a) => {
        const paid = paidBy[a.id] ?? 0;
        const left = Math.max(0, (a.fee ?? 0) - paid);
        const isOpen = open === a.id;
        return (
          <div key={a.id} className="rounded-2xl border border-white/10 bg-white/[0.02]">
            <button type="button" onClick={() => setOpen(isOpen ? null : a.id)} className="w-full flex flex-wrap items-center gap-x-4 gap-y-1 px-5 py-4 text-left">
              <span className="flex-1 min-w-[160px]">
                <span className="block text-sm font-bold text-white">{a.full_name}</span>
                <span className="block text-xs text-brand-gray-text">
                  {a.medical_college} · {a.has_bmdc ? `BMDC ${a.bmdc_number}` : a.student_year} · {day(a.created_at)}
                </span>
              </span>
              <span className="text-xs text-brand-gray-text">
                {fmt(paid)} / {fmt(a.fee ?? 0)}
                {left > 0 && <b className="text-brand-orange"> · {fmt(left)} due</b>}
              </span>
              <span className="rounded-full border border-white/15 px-2.5 py-0.5 text-[11px] text-white">{STATUS_LABEL[a.status]}</span>
              <ChevronDown size={16} className={`text-brand-gray-text transition-transform ${isOpen ? "rotate-180" : ""}`} />
            </button>

            {isOpen && (
              <div className="px-5 pb-5 flex flex-col gap-4 border-t border-white/10 pt-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1 text-sm">
                  <Info k="Facebook name" v={a.facebook_name} />
                  <Info k="Session" v={a.session} />
                  <Info k={a.has_bmdc ? "BMDC number" : "Student year"} v={(a.has_bmdc ? a.bmdc_number : a.student_year) ?? ""} />
                  <Info k="Applied at" v={a.price_phase === "early" ? "Early bird price" : "Regular price"} />
                </div>

                <div className="flex flex-wrap gap-2">
                  {a.id_image_path ? (
                    <button onClick={() => viewId(a.id_image_path!)} className="inline-flex items-center gap-1.5 rounded-lg border border-white/15 text-white text-xs font-bold px-3 py-2">
                      <IdCard size={14} /> View ID image
                    </button>
                  ) : (
                    <span className="text-xs text-brand-gray-text self-center">No ID image uploaded (check WhatsApp).</span>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <span className={labelCls}>Status</span>
                    <select className={inputCls} value={a.status} onChange={(e) => patch(a.id, { status: e.target.value })}>
                      {STATUSES.map((s) => (
                        <option key={s} value={s}>{STATUS_LABEL[s]}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <span className={labelCls}>Fee for this student (BDT)</span>
                    <input type="number" className={inputCls} defaultValue={a.fee ?? 0} onBlur={(e) => patch(a.id, { fee: Number(e.target.value) || 0 })} />
                  </div>
                  <div className="sm:col-span-3">
                    <span className={labelCls}>Notes</span>
                    <textarea className={inputCls} rows={2} defaultValue={a.notes ?? ""} onBlur={(e) => patch(a.id, { notes: e.target.value || null })} />
                  </div>
                </div>

                <div>
                  <span className={labelCls}>Payments</span>
                  <div className="flex flex-col gap-1.5">
                    {pays.filter((p) => p.application_id === a.id).map((p) => (
                      <div key={p.id} className="flex flex-wrap items-center gap-x-3 gap-y-1 rounded-lg bg-black/30 border border-white/10 px-3 py-2 text-xs text-brand-gray-text">
                        <b className="text-white">{fmt(p.amount)} BDT</b>
                        <span>{day(p.paid_on)}</span>
                        <span className="uppercase">{p.method}</span>
                        {p.trx_id && <span>TrxID {p.trx_id}</span>}
                        {p.note && <span>{p.note}</span>}
                        <span className="flex-1" />
                        <button onClick={() => removePayment(a, p)} aria-label="Delete payment" className="hover:text-white"><Trash2 size={13} /></button>
                      </div>
                    ))}
                    <AddPayment suggest={left} onAdd={(p) => addPayment(a, p)} />
                  </div>
                </div>

                <button onClick={() => remove(a)} className="self-start inline-flex items-center gap-1.5 text-xs text-red-300 hover:text-red-200">
                  <Trash2 size={13} /> Delete application
                </button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function AddPayment({ suggest, onAdd }: { suggest: number; onAdd: (p: Omit<Payment, "id" | "application_id">) => Promise<boolean> }) {
  const [amount, setAmount] = useState(String(suggest || ""));
  const [paidOn, setPaidOn] = useState(new Date().toISOString().slice(0, 10));
  const [method, setMethod] = useState("bkash");
  const [trx, setTrx] = useState("");
  const [note, setNote] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit() {
    const n = Number(amount);
    if (!n || n <= 0) return;
    setBusy(true);
    const ok = await onAdd({ amount: n, paid_on: paidOn, method, trx_id: trx.trim() || null, note: note.trim() || null });
    setBusy(false);
    if (ok) {
      setAmount("");
      setTrx("");
      setNote("");
    }
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-6 gap-2 items-end">
      <input type="number" className={inputCls} placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
      <input type="date" className={inputCls} value={paidOn} onChange={(e) => setPaidOn(e.target.value)} />
      <select className={inputCls} value={method} onChange={(e) => setMethod(e.target.value)}>
        {METHODS.map((m) => (
          <option key={m} value={m}>{m[0].toUpperCase() + m.slice(1)}</option>
        ))}
      </select>
      <input className={inputCls} placeholder="TrxID" value={trx} onChange={(e) => setTrx(e.target.value)} />
      <input className={inputCls} placeholder="Note" value={note} onChange={(e) => setNote(e.target.value)} />
      <button onClick={submit} disabled={busy} className="inline-flex items-center justify-center gap-1 rounded-lg bg-brand-orange text-white text-xs font-bold px-3 py-2.5 disabled:opacity-50">
        <Plus size={13} /> {busy ? "Adding…" : "Add payment"}
      </button>
    </div>
  );
}

function Stat({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
      <p className="text-[11px] uppercase tracking-wide text-brand-gray-text">{label}</p>
      <p className={`text-xl font-black mt-1 ${accent ? "text-brand-orange" : "text-white"}`}>{value}</p>
    </div>
  );
}

function Info({ k, v }: { k: string; v: string }) {
  return (
    <p>
      <span className="text-brand-gray-text">{k}: </span>
      <span className="text-white">{v}</span>
    </p>
  );
}
