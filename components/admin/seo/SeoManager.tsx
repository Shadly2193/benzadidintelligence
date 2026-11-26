"use client";
import { useEffect, useState } from "react";
import { Save, ChevronDown, Plus, Trash2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import {
  SEO_PAGES,
  DEFAULT_PROFILE,
  DEFAULT_ABOUT_MORE,
  DEFAULT_WEBSITE_FAQ,
  type AboutMore,
  type Faq,
  type Profile,
} from "@/lib/seo-defaults";

const inp = "w-full rounded-lg bg-white/[0.04] border border-white/10 px-3 py-2 text-sm text-white focus:border-brand-orange outline-none";
const lbl = "text-[11px] font-bold uppercase tracking-wider text-brand-gray-text mb-1 block";

const lines = (s: string) => s.split("\n").map((x) => x.trim()).filter(Boolean);

function Field({ label, value, onChange, area, rows = 3, hint }: { label: string; value: string; onChange: (v: string) => void; area?: boolean; rows?: number; hint?: string }) {
  return (
    <label className="block">
      <span className={lbl}>
        {label} {hint && <span className="normal-case font-normal text-white/40">· {hint}</span>}
      </span>
      {area ? (
        <textarea className={inp} rows={rows} value={value} onChange={(e) => onChange(e.target.value)} />
      ) : (
        <input className={inp} value={value} onChange={(e) => onChange(e.target.value)} />
      )}
    </label>
  );
}

function Card({ title, sub, children, onSave }: { title: string; sub: string; children: React.ReactNode; onSave: () => Promise<void> }) {
  const [open, setOpen] = useState(false);
  const [state, setState] = useState<"" | "saving" | "saved" | "error">("");
  async function save() {
    setState("saving");
    try {
      await onSave();
      setState("saved");
      setTimeout(() => setState(""), 2000);
    } catch {
      setState("error");
    }
  }
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden">
      <button onClick={() => setOpen((o) => !o)} className="w-full flex items-center justify-between px-5 py-4 text-left">
        <div>
          <h2 className="text-sm font-bold text-white">{title}</h2>
          <p className="text-xs text-brand-gray-text mt-0.5">{sub}</p>
        </div>
        <ChevronDown size={16} className={`text-brand-gray-text transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="px-5 pb-5 pt-4 border-t border-white/5 flex flex-col gap-4">
          {children}
          <button onClick={save} disabled={state === "saving"} className="self-start inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold btn-red disabled:opacity-60">
            <Save size={14} /> {state === "saving" ? "Saving…" : state === "saved" ? "Saved ✓" : state === "error" ? "Failed, try again" : "Save"}
          </button>
        </div>
      )}
    </div>
  );
}

function FaqEditor({ items, onChange }: { items: Faq[]; onChange: (v: Faq[]) => void }) {
  return (
    <div className="flex flex-col gap-3">
      {items.map((f, i) => (
        <div key={i} className="rounded-xl border border-white/10 p-3 flex flex-col gap-2">
          <div className="flex gap-2">
            <input className={inp} placeholder="Question" value={f.q} onChange={(e) => onChange(items.map((x, j) => (j === i ? { ...x, q: e.target.value } : x)))} />
            <button onClick={() => onChange(items.filter((_, j) => j !== i))} className="text-white/40 hover:text-red-400 px-2" aria-label="Remove question">
              <Trash2 size={15} />
            </button>
          </div>
          <textarea className={inp} rows={2} placeholder="Answer" value={f.a} onChange={(e) => onChange(items.map((x, j) => (j === i ? { ...x, a: e.target.value } : x)))} />
        </div>
      ))}
      <button onClick={() => onChange([...items, { q: "", a: "" }])} className="self-start inline-flex items-center gap-1.5 text-xs font-bold text-brand-orange">
        <Plus size={14} /> Add question
      </button>
    </div>
  );
}

export default function SeoManager() {
  const [loading, setLoading] = useState(true);
  const [pages, setPages] = useState<Record<string, { title: string; description: string }>>({});
  const [profile, setProfile] = useState<Profile>(DEFAULT_PROFILE);
  const [about, setAbout] = useState<AboutMore>(DEFAULT_ABOUT_MORE);
  const [webFaq, setWebFaq] = useState<Faq[]>(DEFAULT_WEBSITE_FAQ);
  const [aboutPhoto, setAboutPhoto] = useState("");

  useEffect(() => {
    (async () => {
      const supabase = createClient();
      const { data } = await supabase.from("page_content").select("section, content").eq("page", "seo");
      const rows = Object.fromEntries((data ?? []).map((r: any) => [r.section, r.content]));
      const p: Record<string, { title: string; description: string }> = {};
      for (const [k, v] of Object.entries(SEO_PAGES)) p[k] = { ...v.seo, ...(rows[`page_${k}`] ?? {}) };
      setPages(p);
      if (rows.profile) setProfile({ ...DEFAULT_PROFILE, ...rows.profile });
      if (rows.about_more) setAbout({ ...DEFAULT_ABOUT_MORE, ...rows.about_more });
      if (rows.website_faq?.items?.length) setWebFaq(rows.website_faq.items);
      if (rows.about_photo?.url) setAboutPhoto(rows.about_photo.url);
      setLoading(false);
    })();
  }, []);

  async function save(section: string, content: unknown) {
    const supabase = createClient();
    const { error } = await supabase
      .from("page_content")
      .upsert({ page: "seo", section, content, updated_at: new Date().toISOString() }, { onConflict: "page,section" });
    if (error) throw error;
  }

  const setA = <K extends keyof AboutMore>(k: K, v: AboutMore[K]) => setAbout((a) => ({ ...a, [k]: v }));

  if (loading) return <p className="text-sm text-brand-gray-text">Loading…</p>;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-black text-white">SEO & Profile</h1>
        <p className="text-sm text-brand-gray-text mt-1">
          Google titles and descriptions for every page, your profile for Google and AI search, the extra About page sections and the Website page FAQ. Changes show on the live site within a minute.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <Card title="Page titles & descriptions" sub="What Google shows for each page. Title about 50–65 characters, description about 140–160." onSave={async () => {
          for (const [k, v] of Object.entries(pages)) await save(`page_${k}`, v);
        }}>
          {Object.entries(SEO_PAGES).map(([k, meta]) => (
            <div key={k} className="rounded-xl border border-white/10 p-3 flex flex-col gap-2">
              <p className="text-xs font-bold text-brand-orange">{meta.label} <span className="text-white/40 font-normal">{meta.path}</span></p>
              <Field label="Title" hint={`${pages[k]?.title.length ?? 0} chars`} value={pages[k]?.title ?? ""} onChange={(v) => setPages((p) => ({ ...p, [k]: { ...p[k], title: v } }))} />
              <Field label="Description" hint={`${pages[k]?.description.length ?? 0} chars`} area rows={2} value={pages[k]?.description ?? ""} onChange={(v) => setPages((p) => ({ ...p, [k]: { ...p[k], description: v } }))} />
            </div>
          ))}
        </Card>

        <Card title="Profile (for Google & AI)" sub="Hidden on the page. Tells search engines who you are and which profiles are yours." onSave={() => save("profile", profile)}>
          <Field label="Name" value={profile.name} onChange={(v) => setProfile({ ...profile, name: v })} />
          <Field label="Other spellings of your name" hint="one per line" area value={profile.alternateNames.join("\n")} onChange={(v) => setProfile({ ...profile, alternateNames: lines(v) })} />
          <Field label="Titles / roles" hint="one per line" area rows={4} value={profile.jobTitles.join("\n")} onChange={(v) => setProfile({ ...profile, jobTitles: lines(v) })} />
          <Field label="Topics you are known for" hint="one per line" area rows={6} value={profile.knowsAbout.join("\n")} onChange={(v) => setProfile({ ...profile, knowsAbout: lines(v) })} />
          <Field label="Your profile links" hint="one per line, full https link" area value={profile.sameAs.join("\n")} onChange={(v) => setProfile({ ...profile, sameAs: lines(v) })} />
        </Card>

        <Card title="About page: extra sections" sub="Who is, journey, what I do now, numbers and FAQ, shown above “Ready to work together?”." onSave={async () => { await save("about_more", about); await save("about_photo", { url: aboutPhoto.trim() }); }}>
          <Field label="Portrait photo URL" hint="leave empty to use the course page instructor photo" value={aboutPhoto} onChange={setAboutPhoto} />
          <Field label="Who is: heading" value={about.whoTitle} onChange={(v) => setA("whoTitle", v)} />
          <Field label="Who is: main paragraph" area rows={4} value={about.whoText} onChange={(v) => setA("whoText", v)} />
          <Field label="Who is: second paragraph" area rows={3} value={about.whoSub} onChange={(v) => setA("whoSub", v)} />
          <Field
            label="Fact boxes"
            hint="one per line as Label | Value"
            area
            rows={5}
            value={about.facts.map((f) => `${f.label} | ${f.value}`).join("\n")}
            onChange={(v) => setA("facts", lines(v).map((l) => { const [label, ...rest] = l.split("|"); return { label: label.trim(), value: rest.join("|").trim() }; }))}
          />
          <Field label="Journey: heading" value={about.journeyTitle} onChange={(v) => setA("journeyTitle", v)} />
          {about.journey.map((s, i) => (
            <div key={i} className="rounded-xl border border-white/10 p-3 flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <p className="text-xs font-bold text-brand-orange">Journey step {i + 1}</p>
                <button onClick={() => setA("journey", about.journey.filter((_, j) => j !== i))} className="text-white/40 hover:text-red-400" aria-label="Remove step"><Trash2 size={15} /></button>
              </div>
              <div className="grid sm:grid-cols-2 gap-2">
                <Field label="Period" value={s.period} onChange={(v) => setA("journey", about.journey.map((x, j) => (j === i ? { ...x, period: v } : x)))} />
                <Field label="Title" value={s.title} onChange={(v) => setA("journey", about.journey.map((x, j) => (j === i ? { ...x, title: v } : x)))} />
              </div>
              <Field label="Points" hint="one per line" area rows={4} value={s.points.join("\n")} onChange={(v) => setA("journey", about.journey.map((x, j) => (j === i ? { ...x, points: lines(v) } : x)))} />
              <Field label="Image path (optional)" hint="from Media Library, leave empty for none" value={s.image ?? ""} onChange={(v) => setA("journey", about.journey.map((x, j) => (j === i ? { ...x, image: v.trim() || undefined } : x)))} />
            </div>
          ))}
          <button onClick={() => setA("journey", [...about.journey, { period: "", title: "", points: [] }])} className="self-start inline-flex items-center gap-1.5 text-xs font-bold text-brand-orange"><Plus size={14} /> Add journey step</button>
          <Field label="What I do now: heading" value={about.nowTitle} onChange={(v) => setA("nowTitle", v)} />
          {about.cards.map((c, i) => (
            <div key={i} className="rounded-xl border border-white/10 p-3 grid sm:grid-cols-2 gap-2">
              <Field label={`Card ${i + 1} title`} value={c.title} onChange={(v) => setA("cards", about.cards.map((x, j) => (j === i ? { ...x, title: v } : x)))} />
              <Field label="Link" value={c.link} onChange={(v) => setA("cards", about.cards.map((x, j) => (j === i ? { ...x, link: v } : x)))} />
              <Field label="Text" area rows={2} value={c.text} onChange={(v) => setA("cards", about.cards.map((x, j) => (j === i ? { ...x, text: v } : x)))} />
              <Field label="Link text" value={c.linkText} onChange={(v) => setA("cards", about.cards.map((x, j) => (j === i ? { ...x, linkText: v } : x)))} />
            </div>
          ))}
          <Field
            label="Numbers"
            hint="one per line as Value | Label"
            area
            rows={4}
            value={about.numbers.map((n) => `${n.value} | ${n.label}`).join("\n")}
            onChange={(v) => setA("numbers", lines(v).map((l) => { const [value, ...rest] = l.split("|"); return { value: value.trim(), label: rest.join("|").trim() }; }))}
          />
          <p className={lbl}>About FAQ</p>
          <FaqEditor items={about.faq} onChange={(v) => setA("faq", v)} />
        </Card>

        <Card title="Website page FAQ" sub="Shown inside the Compare plans box, above “Still confused?”." onSave={() => save("website_faq", { items: webFaq.filter((f) => f.q.trim() && f.a.trim()) })}>
          <FaqEditor items={webFaq} onChange={setWebFaq} />
        </Card>
      </div>
    </div>
  );
}
