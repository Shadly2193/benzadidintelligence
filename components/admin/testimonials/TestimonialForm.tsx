"use client";
import { useState } from "react";
import { X, Upload } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export interface TestimonialRow {
  id: string;
  quote: string;
  author: string;
  role: string | null;
  avatar_url: string | null;
  published: boolean;
}

interface Props {
  initial?: TestimonialRow;
  onClose: () => void;
  onSaved: () => void;
}

export default function TestimonialForm({ initial, onClose, onSaved }: Props) {
  const [quote, setQuote] = useState(initial?.quote ?? "");
  const [author, setAuthor] = useState(initial?.author ?? "");
  const [role, setRole] = useState(initial?.role ?? "");
  const [avatarUrl, setAvatarUrl] = useState(initial?.avatar_url ?? "");
  const [published, setPublished] = useState(initial?.published ?? true);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const supabase = createClient();
    const ext = file.name.split(".").pop();
    const path = `testimonial-avatars/${crypto.randomUUID()}.${ext}`;
    const { error: uploadError } = await supabase.storage.from("media").upload(path, file);
    if (uploadError) { setError(uploadError.message); setUploading(false); return; }
    const { data } = supabase.storage.from("media").getPublicUrl(path);
    setAvatarUrl(data.publicUrl);
    setUploading(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    const supabase = createClient();
    const payload = { quote, author, role: role || null, avatar_url: avatarUrl || null, published };
    const { error: saveError } = initial
      ? await supabase.from("testimonials").update(payload).eq("id", initial.id)
      : await supabase.from("testimonials").insert(payload);
    if (saveError) { setError(saveError.message); setSaving(false); return; }
    setSaving(false);
    onSaved();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70" onClick={onClose} />
      <form onSubmit={handleSubmit} className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl border border-white/10 bg-brand-black p-6 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-white">{initial ? "Edit Testimonial" : "Add Testimonial"}</h2>
          <button type="button" onClick={onClose} className="text-brand-gray-text hover:text-white"><X size={18} /></button>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wide text-brand-gray-text mb-1.5">Quote</label>
          <textarea required rows={5} value={quote} onChange={(e) => setQuote(e.target.value)} className="w-full rounded-lg bg-black/30 border border-white/10 px-3.5 py-2.5 text-sm text-white outline-none focus:border-brand-orange/60 resize-y" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wide text-brand-gray-text mb-1.5">Author</label>
            <input required value={author} onChange={(e) => setAuthor(e.target.value)} className="w-full rounded-lg bg-black/30 border border-white/10 px-3.5 py-2.5 text-sm text-white outline-none focus:border-brand-orange/60" />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wide text-brand-gray-text mb-1.5">Role</label>
            <input value={role} onChange={(e) => setRole(e.target.value)} className="w-full rounded-lg bg-black/30 border border-white/10 px-3.5 py-2.5 text-sm text-white outline-none focus:border-brand-orange/60" />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wide text-brand-gray-text mb-1.5">Avatar</label>
          <label className="flex items-center justify-center gap-2 rounded-lg border border-dashed border-white/15 py-3 text-xs text-brand-gray-text cursor-pointer hover:border-brand-orange/40">
            <Upload size={14} />
            {uploading ? "Uploading…" : avatarUrl ? "Replace image" : "Choose image file"}
            <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
          </label>
        </div>

        <label className="flex items-center gap-2 text-sm text-white cursor-pointer">
          <input type="checkbox" checked={published} onChange={(e) => setPublished(e.target.checked)} className="accent-brand-orange" />
          Published
        </label>

        {error && <p className="text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">{error}</p>}

        <div className="flex gap-2 mt-2">
          <button type="button" onClick={onClose} className="flex-1 rounded-lg border border-white/10 text-sm text-brand-gray-text py-2.5 hover:text-white">Cancel</button>
          <button type="submit" disabled={saving || uploading} className="flex-1 rounded-lg bg-brand-orange text-white text-sm font-bold py-2.5 hover:bg-brand-orange-light transition-colors disabled:opacity-50">
            {saving ? "Saving…" : initial ? "Save Changes" : "Add Testimonial"}
          </button>
        </div>
      </form>
    </div>
  );
}
