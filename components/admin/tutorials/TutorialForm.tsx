"use client";
import { useState } from "react";
import { X } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export interface TutorialRow {
  id: string;
  title: string;
  tag: string | null;
  youtube_id: string;
  sort_order: number;
  published: boolean;
}

interface Props {
  initial?: TutorialRow;
  onClose: () => void;
  onSaved: () => void;
}

function extractYoutubeId(input: string) {
  const match = input.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([\w-]{11})/);
  return match ? match[1] : input.trim();
}

export default function TutorialForm({ initial, onClose, onSaved }: Props) {
  const [title, setTitle] = useState(initial?.title ?? "");
  const [tag, setTag] = useState(initial?.tag ?? "");
  const [youtubeId, setYoutubeId] = useState(initial?.youtube_id ?? "");
  const [published, setPublished] = useState(initial?.published ?? true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const id = extractYoutubeId(youtubeId);
    if (!id) {
      setError("Please paste a YouTube link or video ID.");
      return;
    }
    setSaving(true);
    setError(null);
    const supabase = createClient();
    const payload = { title, tag: tag || null, youtube_id: id, published };
    const { error: saveError } = initial
      ? await supabase.from("tutorials").update(payload).eq("id", initial.id)
      : await supabase.from("tutorials").insert(payload);
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
      <form onSubmit={handleSubmit} className="relative w-full max-w-lg rounded-2xl border border-white/10 bg-brand-black p-6 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-white">{initial ? "Edit Tutorial" : "Add Tutorial"}</h2>
          <button type="button" onClick={onClose} className="text-brand-gray-text hover:text-white">
            <X size={18} />
          </button>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wide text-brand-gray-text mb-1.5">Title</label>
          <input required value={title} onChange={(e) => setTitle(e.target.value)} className="w-full rounded-lg bg-black/30 border border-white/10 px-3.5 py-2.5 text-sm text-white outline-none focus:border-brand-orange/60" placeholder="e.g. What Is an AI Agent? Super Simple Explanation" />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wide text-brand-gray-text mb-1.5">Tag</label>
          <input value={tag} onChange={(e) => setTag(e.target.value)} className="w-full rounded-lg bg-black/30 border border-white/10 px-3.5 py-2.5 text-sm text-white outline-none focus:border-brand-orange/60" placeholder="e.g. AI Agents" />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wide text-brand-gray-text mb-1.5">YouTube Link</label>
          <input required value={youtubeId} onChange={(e) => setYoutubeId(e.target.value)} className="w-full rounded-lg bg-black/30 border border-white/10 px-3.5 py-2.5 text-sm text-white outline-none focus:border-brand-orange/60" placeholder="Paste YouTube link or video ID" />
        </div>

        <label className="flex items-center gap-2 text-sm text-white cursor-pointer">
          <input type="checkbox" checked={published} onChange={(e) => setPublished(e.target.checked)} className="accent-brand-orange" />
          Published (visible on the live site)
        </label>

        {error && <p className="text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">{error}</p>}

        <div className="flex gap-2 mt-2">
          <button type="button" onClick={onClose} className="flex-1 rounded-lg border border-white/10 text-sm text-brand-gray-text py-2.5 hover:text-white">Cancel</button>
          <button type="submit" disabled={saving} className="flex-1 rounded-lg bg-brand-orange text-white text-sm font-bold py-2.5 hover:bg-brand-orange-light transition-colors disabled:opacity-50">
            {saving ? "Saving…" : initial ? "Save Changes" : "Add Tutorial"}
          </button>
        </div>
      </form>
    </div>
  );
}
