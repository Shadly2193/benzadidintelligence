"use client";
import { useEffect, useState } from "react";
import { Save, ChevronDown } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface Section {
  section: string;
  content: any;
}

const TITLES: Record<string, string> = {
  intro: "Intro",
  timeline: "Timeline",
  philosophy: "Philosophy",
  quick_facts: "Quick Facts",
};

const ORDER = ["intro", "timeline", "philosophy", "quick_facts"];

function Field({ label, value, onChange, textarea }: { label: string; value: string; onChange: (v: string) => void; textarea?: boolean }) {
  return (
    <div>
      <label className="block text-[11px] font-semibold uppercase tracking-wide text-brand-gray-text mb-1">
        {label}
      </label>
      {textarea ? (
        <textarea
          rows={3}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-lg bg-black/30 border border-white/10 px-3 py-2 text-sm text-white outline-none focus:border-brand-orange/60 resize-y"
        />
      ) : (
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-lg bg-black/30 border border-white/10 px-3 py-2 text-sm text-white outline-none focus:border-brand-orange/60"
        />
      )}
    </div>
  );
}

function SectionCard({ section, content, onSave }: { section: string; content: any; onSave: (s: string, c: any) => Promise<void> }) {
  const [open, setOpen] = useState(false);
  const [local, setLocal] = useState(content);
  const [saving, setSaving] = useState(false);

  function set(path: string, value: any) {
    setLocal((prev: any) => {
      const next = structuredClone(prev);
      const keys = path.split(".");
      let obj = next;
      for (let i = 0; i < keys.length - 1; i++) obj = obj[keys[i]];
      obj[keys[keys.length - 1]] = value;
      return next;
    });
  }

  async function handleSave() {
    setSaving(true);
    await onSave(section, local);
    setSaving(false);
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden">
      <button onClick={() => setOpen((o) => !o)} className="w-full flex items-center justify-between px-5 py-4 text-left">
        <h2 className="text-sm font-bold text-white">{TITLES[section] ?? section}</h2>
        <ChevronDown size={16} className={`text-brand-gray-text transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="px-5 pb-5 flex flex-col gap-3 border-t border-white/5 pt-4">
          {section === "intro" && (
            <>
              <Field label="Subtext" value={local.subtext} onChange={(v) => set("subtext", v)} />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Field label="Mobile Headline Line 1" value={local.mobileHeadline[0]} onChange={(v) => set("mobileHeadline.0", v)} />
                <Field label="Mobile Headline Line 2" value={local.mobileHeadline[1]} onChange={(v) => set("mobileHeadline.1", v)} />
              </div>
              <p className="text-[11px] font-semibold uppercase tracking-wide text-brand-gray-text mt-2">
                Hero Sentences (scroll-reveal, desktop)
              </p>
              {local.heroSentences.map((s: any, i: number) => (
                <div key={i} className="flex items-center gap-2">
                  <input
                    value={s.text}
                    onChange={(e) => set(`heroSentences.${i}.text`, e.target.value)}
                    className="flex-1 rounded-lg bg-black/30 border border-white/10 px-3 py-2 text-xs text-white outline-none focus:border-brand-orange/60"
                  />
                  <label className="flex items-center gap-1.5 text-[10px] text-brand-gray-text shrink-0">
                    <input
                      type="checkbox"
                      checked={s.accent}
                      onChange={(e) => set(`heroSentences.${i}.accent`, e.target.checked)}
                      className="accent-brand-orange"
                    />
                    Accent
                  </label>
                </div>
              ))}
            </>
          )}

          {section === "timeline" && (
            <div className="flex flex-col gap-3">
              {local.items.map((item: any, i: number) => (
                <div key={i} className="rounded-lg border border-white/5 bg-black/20 p-3 flex flex-col gap-2">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <input
                      value={item.period}
                      onChange={(e) => set(`items.${i}.period`, e.target.value)}
                      placeholder="Period"
                      className="rounded bg-black/30 border border-white/10 px-2.5 py-2 text-xs text-white outline-none"
                    />
                    <input
                      value={item.role}
                      onChange={(e) => set(`items.${i}.role`, e.target.value)}
                      placeholder="Role"
                      className="rounded bg-black/30 border border-white/10 px-2.5 py-2 text-xs text-brand-orange outline-none"
                    />
                  </div>
                  <textarea
                    rows={2}
                    value={item.body}
                    onChange={(e) => set(`items.${i}.body`, e.target.value)}
                    placeholder="Body"
                    className="rounded bg-black/30 border border-white/10 px-2.5 py-2 text-xs text-white outline-none resize-y"
                  />
                  <input
                    value={item.image}
                    onChange={(e) => set(`items.${i}.image`, e.target.value)}
                    placeholder="Image path"
                    className="rounded bg-black/30 border border-white/10 px-2.5 py-2 text-xs text-brand-gray-text outline-none"
                  />
                </div>
              ))}
            </div>
          )}

          {section === "philosophy" && (
            <>
              {local.big.map((line: string, i: number) => (
                <Field key={i} label={`Big Line ${i + 1}`} value={line} onChange={(v) => set(`big.${i}`, v)} />
              ))}
              <Field label="Sub" value={local.sub} onChange={(v) => set("sub", v)} textarea />
            </>
          )}

          {section === "quick_facts" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {local.items.map((item: any, i: number) => (
                <div key={i} className="rounded-lg border border-white/5 bg-black/20 p-3 flex flex-col gap-2">
                  <input
                    value={item.label}
                    onChange={(e) => set(`items.${i}.label`, e.target.value)}
                    placeholder="Label"
                    className="rounded bg-black/30 border border-white/10 px-2.5 py-2 text-xs text-brand-gray-text outline-none"
                  />
                  <input
                    value={item.value}
                    onChange={(e) => set(`items.${i}.value`, e.target.value)}
                    placeholder="Value"
                    className="rounded bg-black/30 border border-white/10 px-2.5 py-2 text-xs text-white outline-none"
                  />
                </div>
              ))}
            </div>
          )}

          <button
            onClick={handleSave}
            disabled={saving}
            className="self-start mt-1 inline-flex items-center gap-1.5 rounded-lg bg-brand-orange text-white text-xs font-bold px-4 py-2.5 hover:bg-brand-orange-light disabled:opacity-50"
          >
            <Save size={13} />
            {saving ? "Saving…" : "Save Section"}
          </button>
        </div>
      )}
    </div>
  );
}

export default function AboutManager() {
  const [sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    const supabase = createClient();
    const { data } = await supabase.from("page_content").select("section, content").eq("page", "about");
    setSections(data ?? []);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function handleSave(section: string, content: any) {
    const supabase = createClient();
    await supabase
      .from("page_content")
      .update({ content, updated_at: new Date().toISOString() })
      .eq("page", "about")
      .eq("section", section);
  }

  const ordered = ORDER.map((key) => sections.find((s) => s.section === key)).filter(Boolean) as Section[];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-black text-white">About Page</h1>
        <p className="text-sm text-brand-gray-text mt-1">Edit the intro, career timeline, philosophy, and quick facts.</p>
      </div>

      {loading ? (
        <p className="text-sm text-brand-gray-text">Loading…</p>
      ) : (
        <div className="flex flex-col gap-3">
          {ordered.map((s) => (
            <SectionCard key={s.section} section={s.section} content={s.content} onSave={handleSave} />
          ))}
        </div>
      )}
    </div>
  );
}
