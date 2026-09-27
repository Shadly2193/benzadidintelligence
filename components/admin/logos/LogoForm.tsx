"use client";
import { useState } from "react";
import { X, Upload } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export interface LogoRow {
  id: string;
  name: string;
  logo_url: string;
  group_name: "worked_with" | "trusted_by";
  no_invert: boolean;
  published: boolean;
}

interface Props {
  initial?: LogoRow;
  onClose: () => void;
  onSaved: () => void;
}

export default function LogoForm({ initial, onClose, onSaved }: Props) {
  const [name, setName] = useState(initial?.name ?? "");
  const [logoUrl, setLogoUrl] = useState(initial?.logo_url ?? "");
  const [groupName, setGroupName] = useState<"worked_with" | "trusted_by">(initial?.group_name ?? "worked_with");
  const [noInvert, setNoInvert] = useState(initial?.no_invert ?? false);
  const [published, setPublished] = useState(initial?.published ?? true);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError(null);
    const supabase = createClient();
    const ext = file.name.split(".").pop();
    const path = `client-logos/${crypto.randomUUID()}.${ext}`;
    const { error: uploadError } = await supabase.storage.from("media").upload(path, file);
    if (uploadError) {
      setError(uploadError.message);
      setUploading(false);
      return;
    }
    const { data } = supabase.storage.from("media").getPublicUrl(path);
    setLogoUrl(data.publicUrl);
    setUploading(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!logoUrl.trim()) {
      setError("Please choose a logo image before saving.");
      return;
    }
    setSaving(true);
    setError(null);
    const supabase = createClient();
    const payload = { name, logo_url: logoUrl, group_name: groupName, no_invert: noInvert, published };

    const { error: saveError } = initial
      ? await supabase.from("client_logos").update(payload).eq("id", initial.id)
      : await supabase.from("client_logos").insert(payload);

    if (saveError) {
      setError(saveError.message);
      setSaving(false);
      return;
    }
    setSaving(false);
    onSaved();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70" onClick={onClose} />
      <form onSubmit={handleSubmit} className="relative w-full max-w-md rounded-2xl border border-white/10 bg-brand-black p-6 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-white">{initial ? "Edit Logo" : "Add Client Logo"}</h2>
          <button type="button" onClick={onClose} className="text-brand-gray-text hover:text-white">
            <X size={18} />
          </button>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wide text-brand-gray-text mb-1.5">Name</label>
          <input required value={name} onChange={(e) => setName(e.target.value)} className="w-full rounded-lg bg-black/30 border border-white/10 px-3.5 py-2.5 text-sm text-white outline-none focus:border-brand-orange/60" placeholder="e.g. Purplebot LLC" />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wide text-brand-gray-text mb-1.5">Logo</label>
          <label className="flex items-center justify-center gap-2 rounded-lg border border-dashed border-white/15 py-3 text-xs text-brand-gray-text cursor-pointer hover:border-brand-orange/40">
            <Upload size={14} />
            {uploading ? "Uploading…" : logoUrl ? "Replace image" : "Choose image file"}
            <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
          </label>
          {logoUrl && <p className="text-[11px] text-brand-gray-text mt-1.5 truncate">{logoUrl}</p>}
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wide text-brand-gray-text mb-1.5">Group</label>
          <div className="flex gap-2">
            {(["worked_with", "trusted_by"] as const).map((g) => (
              <button
                key={g}
                type="button"
                onClick={() => setGroupName(g)}
                className={`flex-1 rounded-lg text-xs font-semibold py-2 border transition-colors ${groupName === g ? "bg-brand-orange/15 border-brand-orange/50 text-brand-orange" : "border-white/10 text-brand-gray-text"}`}
              >
                {g === "worked_with" ? "Worked With" : "Trusted By"}
              </button>
            ))}
          </div>
        </div>

        <label className="flex items-center gap-2 text-sm text-white cursor-pointer">
          <input type="checkbox" checked={noInvert} onChange={(e) => setNoInvert(e.target.checked)} className="accent-brand-orange" />
          Don't invert color on dark background
        </label>

        <label className="flex items-center gap-2 text-sm text-white cursor-pointer">
          <input type="checkbox" checked={published} onChange={(e) => setPublished(e.target.checked)} className="accent-brand-orange" />
          Published
        </label>

        {error && <p className="text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">{error}</p>}

        <div className="flex gap-2 mt-2">
          <button type="button" onClick={onClose} className="flex-1 rounded-lg border border-white/10 text-sm text-brand-gray-text py-2.5 hover:text-white">Cancel</button>
          <button type="submit" disabled={saving || uploading} className="flex-1 rounded-lg bg-brand-orange text-white text-sm font-bold py-2.5 hover:bg-brand-orange-light transition-colors disabled:opacity-50">
            {saving ? "Saving…" : initial ? "Save Changes" : "Add Logo"}
          </button>
        </div>
      </form>
    </div>
  );
}
