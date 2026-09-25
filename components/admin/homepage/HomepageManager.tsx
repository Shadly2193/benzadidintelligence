"use client";
import { useEffect, useState } from "react";
import { Save, ChevronDown } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface Section {
  section: string;
  content: any;
}

const SECTION_TITLES: Record<string, string> = {
  hero: "Hero",
  trust_stats: "Trust Stats",
  pain_hook: "Pain Hook",
  what_i_do: "What I Do",
  about_snippet: "About Snippet",
  tools: "Tools Strip",
  final_cta: "Final CTA",
};

const SECTION_ORDER = ["hero", "trust_stats", "pain_hook", "what_i_do", "about_snippet", "tools", "final_cta"];

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

function SectionCard({
  section,
  content,
  onSave,
}: {
  section: string;
  content: any;
  onSave: (section: string, content: any) => Promise<void>;
}) {
  const [open, setOpen] = useState(false);
  const [local, setLocal] = useState(content);
  const [saving, setSaving] = useState(false);

  async function handleSave() {
    setSaving(true);
    await onSave(section, local);
    setSaving(false);
  }

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

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-5 py-4 text-left"
      >
        <h2 className="text-sm font-bold text-white">{SECTION_TITLES[section] ?? section}</h2>
        <ChevronDown size={16} className={`text-brand-gray-text transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="px-5 pb-5 flex flex-col gap-3 border-t border-white/5 pt-4">
          {section === "hero" && (
            <>
              <Field label="Label" value={local.label} onChange={(v) => set("label", v)} />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Field label="Headline Line 1" value={local.headline[0]} onChange={(v) => set("headline.0", v)} />
                <Field label="Headline Line 2" value={local.headline[1]} onChange={(v) => set("headline.1", v)} />
              </div>
              <Field label="Glitch Word" value={local.glitchWord} onChange={(v) => set("glitchWord", v)} />
              <Field label="Subtext" value={local.subtext} onChange={(v) => set("subtext", v)} />
              <Field label="Sub-subtext" value={local.subsubtext} onChange={(v) => set("subsubtext", v)} textarea />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Field label="CTA 1 Label" value={local.cta1.label} onChange={(v) => set("cta1.label", v)} />
                <Field label="CTA 1 Link" value={local.cta1.href} onChange={(v) => set("cta1.href", v)} />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Field label="CTA 2 Label" value={local.cta2.label} onChange={(v) => set("cta2.label", v)} />
                <Field label="CTA 2 Link" value={local.cta2.href} onChange={(v) => set("cta2.href", v)} />
              </div>
              <Field label="Microtag" value={local.microtag} onChange={(v) => set("microtag", v)} />
            </>
          )}

          {section === "trust_stats" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {local.items.map((item: any, i: number) => (
                <div key={i} className="rounded-lg border border-white/5 bg-black/20 p-3 flex flex-col gap-2">
                  <div className="grid grid-cols-3 gap-2">
                    <input
                      value={item.prefix}
                      onChange={(e) => set(`items.${i}.prefix`, e.target.value)}
                      placeholder="Prefix"
                      className="rounded bg-black/30 border border-white/10 px-2 py-1.5 text-xs text-white outline-none"
                    />
                    <input
                      type="number"
                      value={item.number}
                      onChange={(e) => set(`items.${i}.number`, Number(e.target.value))}
                      placeholder="Number"
                      className="rounded bg-black/30 border border-white/10 px-2 py-1.5 text-xs text-white outline-none"
                    />
                    <input
                      value={item.suffix}
                      onChange={(e) => set(`items.${i}.suffix`, e.target.value)}
                      placeholder="Suffix"
                      className="rounded bg-black/30 border border-white/10 px-2 py-1.5 text-xs text-white outline-none"
                    />
                  </div>
                  <input
                    value={item.label}
                    onChange={(e) => set(`items.${i}.label`, e.target.value)}
                    placeholder="Label"
                    className="rounded bg-black/30 border border-white/10 px-2 py-1.5 text-xs text-white outline-none"
                  />
                </div>
              ))}
            </div>
          )}

          {section === "pain_hook" && (
            <>
              {local.lines.map((line: string, i: number) => (
                <Field key={i} label={`Line ${i + 1}`} value={line} onChange={(v) => set(`lines.${i}`, v)} />
              ))}
              <Field label="Subtext" value={local.subtext} onChange={(v) => set("subtext", v)} textarea />
            </>
          )}

          {section === "what_i_do" && (
            <>
              <Field label="Label" value={local.label} onChange={(v) => set("label", v)} />
              {local.pairs.map((pair: any, i: number) => (
                <div key={i} className="rounded-lg border border-white/5 bg-black/20 p-3 flex flex-col gap-2">
                  <input
                    value={pair.problem}
                    onChange={(e) => set(`pairs.${i}.problem`, e.target.value)}
                    placeholder="Problem"
                    className="rounded bg-black/30 border border-white/10 px-2.5 py-2 text-xs text-white outline-none"
                  />
                  <input
                    value={pair.solution}
                    onChange={(e) => set(`pairs.${i}.solution`, e.target.value)}
                    placeholder="Solution"
                    className="rounded bg-black/30 border border-white/10 px-2.5 py-2 text-xs text-brand-orange outline-none"
                  />
                </div>
              ))}
              <Field label="Tags (comma separated)" value={local.tags.join(", ")} onChange={(v) => set("tags", v.split(",").map((s: string) => s.trim()))} />
              <Field label="Subtext" value={local.subtext} onChange={(v) => set("subtext", v)} />
            </>
          )}

          {section === "about_snippet" && (
            <>
              <Field label="Label" value={local.label} onChange={(v) => set("label", v)} />
              {local.lines.map((line: string, i: number) => (
                <Field key={i} label={`Line ${i + 1}`} value={line} onChange={(v) => set(`lines.${i}`, v)} />
              ))}
              <Field label="Body" value={local.body} onChange={(v) => set("body", v)} textarea />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Field label="CTA Label" value={local.cta.label} onChange={(v) => set("cta.label", v)} />
                <Field label="CTA Link" value={local.cta.href} onChange={(v) => set("cta.href", v)} />
              </div>
            </>
          )}

          {section === "tools" && (
            <Field
              label="Tools (comma separated)"
              value={local.items.join(", ")}
              onChange={(v) => set("items", v.split(",").map((s: string) => s.trim()))}
              textarea
            />
          )}

          {section === "final_cta" && (
            <>
              {local.bigText.map((line: string, i: number) => (
                <Field key={i} label={`Big Text Line ${i + 1}`} value={line} onChange={(v) => set(`bigText.${i}`, v)} />
              ))}
              <Field label="Subtext" value={local.subtext} onChange={(v) => set("subtext", v)} />
              {local.options.map((opt: any, i: number) => (
                <div key={i} className="rounded-lg border border-white/5 bg-black/20 p-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <input
                    value={opt.title}
                    onChange={(e) => set(`options.${i}.title`, e.target.value)}
                    placeholder="Title"
                    className="rounded bg-black/30 border border-white/10 px-2.5 py-2 text-xs text-white outline-none"
                  />
                  <input
                    value={opt.description}
                    onChange={(e) => set(`options.${i}.description`, e.target.value)}
                    placeholder="Description"
                    className="rounded bg-black/30 border border-white/10 px-2.5 py-2 text-xs text-white outline-none"
                  />
                  <input
                    value={opt.href}
                    onChange={(e) => set(`options.${i}.href`, e.target.value)}
                    placeholder="Link"
                    className="rounded bg-black/30 border border-white/10 px-2.5 py-2 text-xs text-brand-gray-text outline-none"
                  />
                  <input
                    value={opt.cta}
                    onChange={(e) => set(`options.${i}.cta`, e.target.value)}
                    placeholder="CTA text"
                    className="rounded bg-black/30 border border-white/10 px-2.5 py-2 text-xs text-brand-orange outline-none"
                  />
                </div>
              ))}
            </>
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

export default function HomepageManager() {
  const [sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    const supabase = createClient();
    const { data } = await supabase.from("page_content").select("section, content").eq("page", "home");
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
      .eq("page", "home")
      .eq("section", section);
  }

  const ordered = SECTION_ORDER.map((key) => sections.find((s) => s.section === key)).filter(Boolean) as Section[];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-black text-white">Homepage</h1>
        <p className="text-sm text-brand-gray-text mt-1">
          Edit every section of the homepage — click a section to expand it.
        </p>
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
