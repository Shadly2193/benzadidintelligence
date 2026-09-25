"use client";
import { useEffect, useState } from "react";
import { Save, Plus, Trash2, Upload } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface General {
  site_name: string;
  tagline: string;
  contact_email: string;
  logo_url: string;
  favicon_url: string;
}

interface SocialItem {
  label: string;
  href: string;
  icon: string;
}

export default function SettingsManager() {
  const [general, setGeneral] = useState<General | null>(null);
  const [socials, setSocials] = useState<SocialItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingGeneral, setSavingGeneral] = useState(false);
  const [savingSocials, setSavingSocials] = useState(false);
  const [uploadingLogo, setUploadingLogo] = useState(false);

  async function load() {
    setLoading(true);
    const supabase = createClient();
    const { data } = await supabase.from("site_settings").select("key, value");
    const g = data?.find((d) => d.key === "general")?.value as General | undefined;
    const s = data?.find((d) => d.key === "socials")?.value as { items: SocialItem[] } | undefined;
    if (g) setGeneral(g);
    if (s) setSocials(s.items);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function saveGeneral() {
    if (!general) return;
    setSavingGeneral(true);
    const supabase = createClient();
    await supabase.from("site_settings").update({ value: general, updated_at: new Date().toISOString() }).eq("key", "general");
    setSavingGeneral(false);
  }

  async function saveSocials() {
    setSavingSocials(true);
    const supabase = createClient();
    await supabase.from("site_settings").update({ value: { items: socials }, updated_at: new Date().toISOString() }).eq("key", "socials");
    setSavingSocials(false);
  }

  async function handleLogoUpload(e: React.ChangeEvent<HTMLInputElement>, field: "logo_url" | "favicon_url") {
    const file = e.target.files?.[0];
    if (!file || !general) return;
    setUploadingLogo(true);
    const supabase = createClient();
    const ext = file.name.split(".").pop();
    const path = `branding/${field}-${crypto.randomUUID()}.${ext}`;
    const { error } = await supabase.storage.from("media").upload(path, file);
    if (!error) {
      const { data } = supabase.storage.from("media").getPublicUrl(path);
      setGeneral({ ...general, [field]: data.publicUrl });
    }
    setUploadingLogo(false);
  }

  function updateSocial(i: number, patch: Partial<SocialItem>) {
    setSocials((prev) => prev.map((s, idx) => (idx === i ? { ...s, ...patch } : s)));
  }

  function addSocial() {
    setSocials((prev) => [...prev, { label: "New Platform", href: "", icon: "link" }]);
  }

  function removeSocial(i: number) {
    setSocials((prev) => prev.filter((_, idx) => idx !== i));
  }

  if (loading || !general) {
    return <p className="text-sm text-brand-gray-text max-w-3xl mx-auto">Loading…</p>;
  }

  return (
    <div className="max-w-3xl mx-auto flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-black text-white">Site Settings</h1>
        <p className="text-sm text-brand-gray-text mt-1">Global branding and contact details.</p>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 flex flex-col gap-3">
        <h2 className="text-sm font-bold text-white mb-1">General</h2>

        <div>
          <label className="block text-[11px] font-semibold uppercase tracking-wide text-brand-gray-text mb-1">Site Name</label>
          <input value={general.site_name} onChange={(e) => setGeneral({ ...general, site_name: e.target.value })} className="w-full rounded-lg bg-black/30 border border-white/10 px-3 py-2 text-sm text-white outline-none focus:border-brand-orange/60" />
        </div>

        <div>
          <label className="block text-[11px] font-semibold uppercase tracking-wide text-brand-gray-text mb-1">Tagline</label>
          <input value={general.tagline} onChange={(e) => setGeneral({ ...general, tagline: e.target.value })} className="w-full rounded-lg bg-black/30 border border-white/10 px-3 py-2 text-sm text-white outline-none focus:border-brand-orange/60" />
        </div>

        <div>
          <label className="block text-[11px] font-semibold uppercase tracking-wide text-brand-gray-text mb-1">Contact Email</label>
          <input value={general.contact_email} onChange={(e) => setGeneral({ ...general, contact_email: e.target.value })} className="w-full rounded-lg bg-black/30 border border-white/10 px-3 py-2 text-sm text-white outline-none focus:border-brand-orange/60" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-wide text-brand-gray-text mb-1">Logo</label>
            <div className="flex items-center gap-2">
              <img src={general.logo_url} alt="logo" className="w-9 h-9 rounded bg-black/30 object-contain p-1" />
              <label className="flex-1 flex items-center justify-center gap-1.5 rounded-lg border border-dashed border-white/15 py-2 text-[11px] text-brand-gray-text cursor-pointer hover:border-brand-orange/40">
                <Upload size={12} />
                {uploadingLogo ? "Uploading…" : "Replace"}
                <input type="file" accept="image/*" className="hidden" onChange={(e) => handleLogoUpload(e, "logo_url")} />
              </label>
            </div>
          </div>
          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-wide text-brand-gray-text mb-1">Favicon</label>
            <div className="flex items-center gap-2">
              <img src={general.favicon_url} alt="favicon" className="w-9 h-9 rounded bg-black/30 object-contain p-1" />
              <label className="flex-1 flex items-center justify-center gap-1.5 rounded-lg border border-dashed border-white/15 py-2 text-[11px] text-brand-gray-text cursor-pointer hover:border-brand-orange/40">
                <Upload size={12} />
                {uploadingLogo ? "Uploading…" : "Replace"}
                <input type="file" accept="image/*" className="hidden" onChange={(e) => handleLogoUpload(e, "favicon_url")} />
              </label>
            </div>
          </div>
        </div>

        <button onClick={saveGeneral} disabled={savingGeneral} className="self-start mt-1 inline-flex items-center gap-1.5 rounded-lg bg-brand-orange text-white text-xs font-bold px-4 py-2.5 hover:bg-brand-orange-light disabled:opacity-50">
          <Save size={13} />
          {savingGeneral ? "Saving…" : "Save General"}
        </button>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 flex flex-col gap-3">
        <div className="flex items-center justify-between mb-1">
          <h2 className="text-sm font-bold text-white">Social Links</h2>
          <button onClick={addSocial} className="inline-flex items-center gap-1.5 rounded-lg bg-brand-orange/10 border border-brand-orange/30 text-[11px] text-brand-orange px-2.5 py-1.5 hover:bg-brand-orange/20">
            <Plus size={11} />
            Add
          </button>
        </div>

        {socials.map((s, i) => (
          <div key={i} className="grid grid-cols-1 sm:grid-cols-[1fr_2fr_auto] gap-2 items-center">
            <input value={s.label} onChange={(e) => updateSocial(i, { label: e.target.value })} placeholder="Label" className="rounded-lg bg-black/30 border border-white/10 px-3 py-2 text-xs text-white outline-none" />
            <input value={s.href} onChange={(e) => updateSocial(i, { href: e.target.value })} placeholder="URL" className="rounded-lg bg-black/30 border border-white/10 px-3 py-2 text-xs text-brand-gray-text outline-none" />
            <button onClick={() => removeSocial(i)} className="text-red-400/70 hover:text-red-400 justify-self-start sm:justify-self-center">
              <Trash2 size={14} />
            </button>
          </div>
        ))}

        <button onClick={saveSocials} disabled={savingSocials} className="self-start mt-1 inline-flex items-center gap-1.5 rounded-lg bg-brand-orange text-white text-xs font-bold px-4 py-2.5 hover:bg-brand-orange-light disabled:opacity-50">
          <Save size={13} />
          {savingSocials ? "Saving…" : "Save Social Links"}
        </button>
      </div>
    </div>
  );
}
