"use client";
import { useEffect, useState } from "react";
import { ArrowDown, ArrowUp, ChevronDown, Eye, History, Plus, RotateCcw, Save, Send, Trash2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { courseDefaults, mergeCourse, type CourseContent } from "@/lib/course/defaults";

const SLUG = "digital-residency-program";
const PAGE_URL = `/courses/${SLUG}`;

type Json = string | number | boolean | null | Json[] | { [k: string]: Json };

/** Friendly names for the top-level groups, in page order. */
const GROUPS: [keyof CourseContent, string, string][] = [
  ["schedule", "Dates, early bird and countdown", "Dates use the format 2026-11-20T23:59:59+06:00 (Bangladesh time)."],
  ["hero", "Hero (top of page)", ""],
  ["problem", "The problem (flip cards)", ""],
  ["future", "Your future (before / after)", "Each row: [before, after]."],
  ["demo", "See it happen (demo tabs)", "The animations inside the demo stay as they are; tab names and text are editable."],
  ["proof", "Real work (videos)", "Video path or full URL in 'src'."],
  ["roadmap", "The 16 weeks (rotations)", ""],
  ["how", "How it works", ""],
  ["who", "Who it is for", ""],
  ["fit", "Is this for you?", "Each row: [not for you, for you]."],
  ["instructor", "Your instructor", ""],
  ["price", "Price", "The early bird amount is under 'Dates, early bird and countdown'."],
  ["riskFree", "Risk-free start (refund)", ""],
  ["walkaway", "What you get (value)", "'v' is the counted value in BDT. The total is added up by itself."],
  ["join", "How to join (form)", ""],
  ["faq", "Questions (FAQ)", "Each item: [question, answer]."],
  ["final", "Final call to action", ""],
  ["whatsapp", "WhatsApp number", "Country code first, no + or spaces. Example: 8801680066637"],
];

const LABELS: Record<string, string> = {
  h: "Heading", t: "Text", m: "Market price line", v: "Counted value (BDT)", q: "Question / front", a: "Answer / back",
  n: "Name", w: "Weeks", k: "Stage", src: "Video", sub: "Subtitle", wide: "Wide (landscape)",
};

const human = (k: string) =>
  LABELS[k] ?? k.replace(/([A-Z])/g, " $1").replace(/^./, (c) => c.toUpperCase());

/** A blank item shaped like an example item, for "Add". */
function blankLike(x: Json): Json {
  if (typeof x === "string") return "";
  if (typeof x === "number") return 0;
  if (typeof x === "boolean") return false;
  if (Array.isArray(x)) return x.map(blankLike);
  if (x && typeof x === "object") return Object.fromEntries(Object.entries(x).map(([k, v]) => [k, blankLike(v)]));
  return "";
}

const inputCls =
  "w-full rounded-lg bg-black/30 border border-white/10 px-3 py-2 text-sm text-white outline-none focus:border-brand-orange/60";
const labelCls = "block text-[11px] font-semibold uppercase tracking-wide text-brand-gray-text mb-1";
const iconBtn = "p-1.5 rounded-md text-brand-gray-text hover:text-white hover:bg-white/10 disabled:opacity-30";

function Field({ name, value, example, onChange }: { name: string; value: Json; example?: Json; onChange: (v: Json) => void }) {
  if (typeof value === "boolean") {
    return (
      <label className="flex items-center gap-2 text-sm text-white">
        <input type="checkbox" checked={value} onChange={(e) => onChange(e.target.checked)} /> {name}
      </label>
    );
  }
  if (typeof value === "number") {
    return (
      <div>
        {name && <span className={labelCls}>{name}</span>}
        <input type="number" className={inputCls} value={value} onChange={(e) => onChange(Number(e.target.value) || 0)} />
      </div>
    );
  }
  if (typeof value === "string" || value === null) {
    const v = value ?? "";
    if (/url$/i.test(name.replace(/\s/g, ""))) return <ImageField name={name} value={v} onChange={onChange} />;
    return (
      <div>
        {name && <span className={labelCls}>{name}</span>}
        {v.length > 70 ? (
          <textarea className={inputCls} rows={Math.min(6, Math.ceil(v.length / 70) + 1)} value={v} onChange={(e) => onChange(e.target.value)} />
        ) : (
          <input className={inputCls} value={v} onChange={(e) => onChange(e.target.value)} />
        )}
      </div>
    );
  }
  if (Array.isArray(value)) {
    const sample = value[0] ?? (Array.isArray(example) ? example[0] : "") ?? "";
    const set = (i: number, v: Json) => onChange(value.map((x, j) => (j === i ? v : x)));
    const move = (i: number, d: number) => {
      const next = [...value];
      [next[i], next[i + d]] = [next[i + d], next[i]];
      onChange(next);
    };
    const flat = value.every((x) => typeof x !== "object" || x === null);
    return (
      <div>
        {name && <span className={labelCls}>{name}</span>}
        <div className="flex flex-col gap-2">
          {value.map((item, i) => (
            <div key={i} className={flat ? "flex items-start gap-1" : "rounded-xl border border-white/10 bg-white/[0.02] p-3"}>
              {!flat && (
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-brand-orange">#{i + 1}</span>
                  <span className="flex">
                    <button type="button" className={iconBtn} disabled={i === 0} onClick={() => move(i, -1)} aria-label="Move up"><ArrowUp size={14} /></button>
                    <button type="button" className={iconBtn} disabled={i === value.length - 1} onClick={() => move(i, 1)} aria-label="Move down"><ArrowDown size={14} /></button>
                    <button type="button" className={iconBtn} onClick={() => onChange(value.filter((_, j) => j !== i))} aria-label="Remove"><Trash2 size={14} /></button>
                  </span>
                </div>
              )}
              <div className={flat ? "flex-1" : ""}>
                <Field name="" value={item} onChange={(v) => set(i, v)} />
              </div>
              {flat && (
                <span className="flex shrink-0 pt-1">
                  <button type="button" className={iconBtn} disabled={i === 0} onClick={() => move(i, -1)} aria-label="Move up"><ArrowUp size={14} /></button>
                  <button type="button" className={iconBtn} disabled={i === value.length - 1} onClick={() => move(i, 1)} aria-label="Move down"><ArrowDown size={14} /></button>
                  <button type="button" className={iconBtn} onClick={() => onChange(value.filter((_, j) => j !== i))} aria-label="Remove"><Trash2 size={14} /></button>
                </span>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={() => onChange([...value, blankLike(sample)])}
            className="self-start inline-flex items-center gap-1 rounded-lg border border-dashed border-white/15 px-3 py-1.5 text-xs text-brand-gray-text hover:border-brand-orange/40 hover:text-white"
          >
            <Plus size={13} /> Add
          </button>
        </div>
      </div>
    );
  }
  const obj = value as { [k: string]: Json };
  return (
    <div className="flex flex-col gap-3">
      {name && <span className="text-xs font-bold text-white">{name}</span>}
      {Object.keys(obj).map((k) => (
        <Field key={k} name={human(k)} value={obj[k]} onChange={(v) => onChange({ ...obj, [k]: v })} />
      ))}
    </div>
  );
}

interface Version {
  id: number;
  created_at: string;
  note: string | null;
  content: Json;
}

export default function CourseEditor() {
  const [doc, setDoc] = useState<CourseContent | null>(null);
  const [published, setPublished] = useState<CourseContent | null>(null);
  const [open, setOpen] = useState<string | null>(null);
  const [dirty, setDirty] = useState(false);
  const [busy, setBusy] = useState<"" | "save" | "publish">("");
  const [msg, setMsg] = useState("");
  const [versions, setVersions] = useState<Version[] | null>(null);

  async function load() {
    const supabase = createClient();
    const { data, error } = await supabase.from("course_pages").select("draft, published").eq("slug", SLUG).maybeSingle();
    if (error || !data) {
      setMsg("Could not load. Are you logged in with the admin email?");
      return;
    }
    setDoc(mergeCourse(data.draft));
    setPublished(mergeCourse(data.published));
  }

  useEffect(() => {
    load();
  }, []);

  // warn before leaving with unsaved edits
  useEffect(() => {
    if (!dirty) return;
    const h = (e: BeforeUnloadEvent) => e.preventDefault();
    window.addEventListener("beforeunload", h);
    return () => window.removeEventListener("beforeunload", h);
  }, [dirty]);

  function update(next: CourseContent) {
    setDoc(next);
    setDirty(true);
    setMsg("");
  }

  async function saveDraft() {
    if (!doc) return false;
    setBusy("save");
    const supabase = createClient();
    const { error } = await supabase
      .from("course_pages")
      .update({ draft: doc, draft_updated_at: new Date().toISOString() })
      .eq("slug", SLUG);
    setBusy("");
    if (error) {
      setMsg(`Save failed: ${error.message}`);
      return false;
    }
    setDirty(false);
    setMsg("Draft saved. Visitors still see the published page.");
    return true;
  }

  async function preview() {
    if (dirty && !(await saveDraft())) return;
    window.open(`${PAGE_URL}?preview=1`, "_blank", "noopener");
  }

  function check(c: CourseContent) {
    const e = Date.parse(c.schedule.earlyBirdEnd);
    const r = Date.parse(c.schedule.regEnd);
    const s = Date.parse(c.schedule.classStart);
    if ([e, r, s].some(Number.isNaN)) return "One of the dates is not valid. Use the format 2026-11-20T23:59:59+06:00.";
    if (!(e <= r && r <= s)) return "Dates are out of order: early bird end ≤ registration end ≤ class start.";
    if (!/^\d{8,15}$/.test(c.whatsapp)) return "WhatsApp number must be digits only, with country code.";
    if (c.price.amount <= 0) return "Price must be more than 0.";
    return "";
  }

  async function publish() {
    if (!doc) return;
    const problem = check(doc);
    if (problem) {
      setMsg(problem);
      return;
    }
    if (!confirm("Publish these changes? Visitors will see them right away.")) return;
    setBusy("publish");
    const supabase = createClient();
    const now = new Date().toISOString();
    const { data: user } = await supabase.auth.getUser();
    const { error } = await supabase
      .from("course_pages")
      .update({ draft: doc, published: doc, draft_updated_at: now, published_at: now })
      .eq("slug", SLUG);
    if (!error) {
      await supabase.from("course_page_versions").insert({ slug: SLUG, content: doc, published_by: user.user?.id ?? null });
    }
    setBusy("");
    if (error) {
      setMsg(`Publish failed: ${error.message}`);
      return;
    }
    setPublished(doc);
    setDirty(false);
    setVersions(null);
    setMsg("Published. The live page now shows these changes.");
  }

  async function loadVersions() {
    const supabase = createClient();
    const { data } = await supabase
      .from("course_page_versions")
      .select("id, created_at, note, content")
      .eq("slug", SLUG)
      .order("created_at", { ascending: false })
      .limit(30);
    setVersions((data as Version[]) ?? []);
  }

  function discard() {
    if (!published || !confirm("Throw away the draft and go back to what is live now?")) return;
    update(published);
  }

  if (!doc) {
    return <div className="max-w-3xl mx-auto text-sm text-brand-gray-text">{msg || "Loading…"}</div>;
  }

  const hidden = new Set(doc.hidden);
  const changedFromLive = JSON.stringify(doc) !== JSON.stringify(published);

  return (
    <div className="max-w-3xl mx-auto flex flex-col gap-5 pb-24">
      <div>
        <h1 className="text-2xl font-black text-white">Digital Residency Program</h1>
        <p className="text-sm text-brand-gray-text mt-1">
          Edit any text, price or date. <b>Save draft</b> keeps it private, <b>Preview</b> shows it to you only, <b>Publish</b> puts it live.
        </p>
      </div>

      {/* sticky action bar */}
      <div className="sticky top-0 z-10 -mx-2 px-2 py-3 bg-[#0a0603]/95 backdrop-blur flex flex-wrap items-center gap-2 border-b border-white/10">
        <button onClick={saveDraft} disabled={!!busy || !dirty} className="inline-flex items-center gap-1.5 rounded-lg border border-white/15 text-white text-xs font-bold px-3 py-2 disabled:opacity-40">
          <Save size={14} /> {busy === "save" ? "Saving…" : "Save draft"}
        </button>
        <button onClick={preview} disabled={!!busy} className="inline-flex items-center gap-1.5 rounded-lg border border-white/15 text-white text-xs font-bold px-3 py-2 disabled:opacity-40">
          <Eye size={14} /> Preview
        </button>
        <button onClick={publish} disabled={!!busy || (!changedFromLive && !dirty)} className="inline-flex items-center gap-1.5 rounded-lg bg-brand-orange text-white text-xs font-bold px-4 py-2 hover:bg-brand-orange-light disabled:opacity-40">
          <Send size={14} /> {busy === "publish" ? "Publishing…" : "Publish"}
        </button>
        <span className="flex-1" />
        <button onClick={discard} disabled={!changedFromLive} className="inline-flex items-center gap-1.5 text-xs text-brand-gray-text hover:text-white disabled:opacity-30">
          <RotateCcw size={13} /> Discard draft
        </button>
        <button onClick={() => (versions ? setVersions(null) : loadVersions())} className="inline-flex items-center gap-1.5 text-xs text-brand-gray-text hover:text-white">
          <History size={13} /> History
        </button>
        <span className="w-full text-[11px] text-brand-gray-text">
          {msg || (dirty ? "Unsaved changes." : changedFromLive ? "Draft differs from the live page. Publish to put it live." : "Everything is live.")}
        </span>
      </div>

      {versions && (
        <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4 flex flex-col gap-2">
          <p className="text-sm font-bold text-white">Published versions</p>
          {versions.length === 0 && <p className="text-xs text-brand-gray-text">Nothing published from admin yet.</p>}
          {versions.map((v) => (
            <div key={v.id} className="flex items-center justify-between text-xs text-brand-gray-text">
              <span>{new Date(v.created_at).toLocaleString("en-GB")}</span>
              <button
                className="text-brand-orange hover:underline"
                onClick={() => {
                  update(mergeCourse(v.content));
                  setMsg("Old version loaded into the draft. Check it, then Publish.");
                }}
              >
                Restore to draft
              </button>
            </div>
          ))}
        </div>
      )}

      {/* sections: order + show/hide */}
      <Panel title="Sections: order and show / hide" hint="Move sections up or down, or hide one. The page follows this order." open={open === "sections"} onToggle={() => setOpen(open === "sections" ? null : "sections")}>
        <div className="flex flex-col gap-1.5">
          {doc.sections.map((s, i) => (
            <div key={s.id} className="flex items-center gap-2 rounded-lg bg-black/30 border border-white/10 px-3 py-2">
              <input
                type="checkbox"
                checked={!hidden.has(s.id)}
                onChange={(e) =>
                  update({ ...doc, hidden: e.target.checked ? doc.hidden.filter((h) => h !== s.id) : [...doc.hidden, s.id] })
                }
                aria-label={`Show ${s.name}`}
              />
              <input
                className="flex-1 bg-transparent text-sm text-white outline-none"
                value={s.name}
                onChange={(e) => update({ ...doc, sections: doc.sections.map((x, j) => (j === i ? { ...x, name: e.target.value } : x)) })}
              />
              <button type="button" className={iconBtn} disabled={i === 0} onClick={() => {
                const n = [...doc.sections]; [n[i], n[i - 1]] = [n[i - 1], n[i]]; update({ ...doc, sections: n });
              }} aria-label="Move up"><ArrowUp size={14} /></button>
              <button type="button" className={iconBtn} disabled={i === doc.sections.length - 1} onClick={() => {
                const n = [...doc.sections]; [n[i], n[i + 1]] = [n[i + 1], n[i]]; update({ ...doc, sections: n });
              }} aria-label="Move down"><ArrowDown size={14} /></button>
            </div>
          ))}
        </div>
      </Panel>

      {GROUPS.map(([key, title, hint]) => (
        <Panel key={key} title={title} hint={hint} open={open === key} onToggle={() => setOpen(open === key ? null : key)}>
          <Field
            name=""
            value={doc[key] as unknown as Json}
            example={courseDefaults[key] as unknown as Json}
            onChange={(v) => update({ ...doc, [key]: v } as CourseContent)}
          />
        </Panel>
      ))}
    </div>
  );
}

function Panel({ title, hint, open, onToggle, children }: { title: string; hint?: string; open: boolean; onToggle: () => void; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.02]">
      <button type="button" onClick={onToggle} className="w-full flex items-center justify-between px-5 py-4 text-left">
        <span className="text-sm font-bold text-white">{title}</span>
        <ChevronDown size={16} className={`text-brand-gray-text transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="px-5 pb-5 flex flex-col gap-3">
          {hint && <p className="text-xs text-brand-gray-text">{hint}</p>}
          {children}
        </div>
      )}
    </div>
  );
}

/** URL field with an Upload button (public `media` bucket) and a small preview. */
function ImageField({ name, value, onChange }: { name: string; value: string; onChange: (v: Json) => void }) {
  const [busy, setBusy] = useState(false);
  async function upload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setBusy(true);
    const supabase = createClient();
    const path = `course/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.]/g, "_")}`;
    const { error } = await supabase.storage.from("media").upload(path, file);
    if (!error) onChange(supabase.storage.from("media").getPublicUrl(path).data.publicUrl);
    else alert(`Upload failed: ${error.message}`);
    setBusy(false);
  }
  return (
    <div>
      <span className={labelCls}>{name}</span>
      <div className="flex items-center gap-3">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {value && <img src={value} alt="" className="w-14 h-14 rounded-lg object-cover bg-black/30" />}
        <input className={inputCls} value={value} onChange={(e) => onChange(e.target.value)} placeholder="Upload or paste a link" />
        <label className="shrink-0 cursor-pointer rounded-lg border border-dashed border-white/15 px-3 py-2 text-xs text-brand-gray-text hover:border-brand-orange/40 hover:text-white">
          {busy ? "Uploading…" : "Upload"}
          <input type="file" accept="image/*" className="hidden" onChange={upload} disabled={busy} />
        </label>
      </div>
    </div>
  );
}
