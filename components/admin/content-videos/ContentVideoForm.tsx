"use client";
import { useState } from "react";
import { X, Upload } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export interface ContentVideoRow {
  id: string;
  title: string;
  category: "ad" | "storytelling";
  platform: string | null;
  video_url: string | null;
  youtube_id: string | null;
  href: string | null;
  sort_order: number;
  published: boolean;
}

const PLATFORMS = ["youtube", "linkedin", "instagram"];

interface Props {
  initial?: ContentVideoRow;
  onClose: () => void;
  onSaved: () => void;
}

function extractYoutubeId(input: string) {
  const match = input.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([\w-]{11})/);
  return match ? match[1] : input.trim();
}

export default function ContentVideoForm({ initial, onClose, onSaved }: Props) {
  const [title, setTitle] = useState(initial?.title ?? "");
  const [category, setCategory] = useState<"ad" | "storytelling">(initial?.category ?? "ad");
  const [platform, setPlatform] = useState(initial?.platform ?? "youtube");
  const [sourceType, setSourceType] = useState<"upload" | "youtube">(initial?.video_url ? "upload" : "youtube");
  const [videoUrl, setVideoUrl] = useState(initial?.video_url ?? "");
  const [youtubeId, setYoutubeId] = useState(initial?.youtube_id ?? "");
  const [href, setHref] = useState(initial?.href ?? "");
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
    const path = `content-videos/${crypto.randomUUID()}.${ext}`;
    const { error: uploadError } = await supabase.storage.from("media").upload(path, file);
    if (uploadError) {
      setError(uploadError.message);
      setUploading(false);
      return;
    }
    const { data } = supabase.storage.from("media").getPublicUrl(path);
    setVideoUrl(data.publicUrl);
    setUploading(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (platform !== "youtube" && sourceType !== "upload" && !href.trim()) {
      setError("Please add the external link for non-YouTube platforms.");
      return;
    }
    setSaving(true);
    setError(null);
    const supabase = createClient();
    const payload = {
      title,
      category,
      platform,
      video_url: sourceType === "upload" ? videoUrl || null : null,
      youtube_id: sourceType === "youtube" ? extractYoutubeId(youtubeId) || null : null,
      href: href || null,
      published,
    };
    const { error: saveError } = initial
      ? await supabase.from("content_videos").update(payload).eq("id", initial.id)
      : await supabase.from("content_videos").insert(payload);
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
      <form
        onSubmit={handleSubmit}
        className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl border border-white/10 bg-brand-black p-6 flex flex-col gap-4"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-white">{initial ? "Edit Content Video" : "Add Content Video"}</h2>
          <button type="button" onClick={onClose} className="text-brand-gray-text hover:text-white">
            <X size={18} />
          </button>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wide text-brand-gray-text mb-1.5">Title</label>
          <input required value={title} onChange={(e) => setTitle(e.target.value)} className="w-full rounded-lg bg-black/30 border border-white/10 px-3.5 py-2.5 text-sm text-white outline-none focus:border-brand-orange/60" placeholder="e.g. KitKat AI Commercial" />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wide text-brand-gray-text mb-1.5">Category</label>
          <div className="flex gap-2">
            {(["ad", "storytelling"] as const).map((c) => (
              <button key={c} type="button" onClick={() => setCategory(c)} className={`flex-1 rounded-lg text-xs font-semibold py-2 border transition-colors ${category === c ? "bg-brand-orange/15 border-brand-orange/50 text-brand-orange" : "border-white/10 text-brand-gray-text"}`}>
                {c === "ad" ? "Commercial Ad" : "AI Storytelling"}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wide text-brand-gray-text mb-1.5">Platform</label>
          <div className="flex gap-2">
            {PLATFORMS.map((pf) => (
              <button key={pf} type="button" onClick={() => setPlatform(pf)} className={`flex-1 rounded-lg text-xs font-semibold py-2 border capitalize transition-colors ${platform === pf ? "bg-brand-orange/15 border-brand-orange/50 text-brand-orange" : "border-white/10 text-brand-gray-text"}`}>
                {pf}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wide text-brand-gray-text mb-1.5">Video Source</label>
          <div className="flex gap-2 mb-2">
            <button type="button" onClick={() => setSourceType("upload")} className={`flex-1 rounded-lg text-xs font-semibold py-2 border transition-colors ${sourceType === "upload" ? "bg-brand-orange/15 border-brand-orange/50 text-brand-orange" : "border-white/10 text-brand-gray-text"}`}>Upload File</button>
            <button type="button" onClick={() => setSourceType("youtube")} className={`flex-1 rounded-lg text-xs font-semibold py-2 border transition-colors ${sourceType === "youtube" ? "bg-brand-orange/15 border-brand-orange/50 text-brand-orange" : "border-white/10 text-brand-gray-text"}`}>YouTube Link</button>
          </div>
          {sourceType === "upload" ? (
            <div>
              <label className="flex items-center justify-center gap-2 rounded-lg border border-dashed border-white/15 py-3 text-xs text-brand-gray-text cursor-pointer hover:border-brand-orange/40">
                <Upload size={14} />
                {uploading ? "Uploading…" : videoUrl ? "Replace video" : "Choose video file"}
                <input type="file" accept="video/*" onChange={handleFileUpload} className="hidden" />
              </label>
              {videoUrl && <p className="text-[11px] text-brand-gray-text mt-1.5 truncate">{videoUrl}</p>}
            </div>
          ) : (
            <input value={youtubeId} onChange={(e) => setYoutubeId(e.target.value)} className="w-full rounded-lg bg-black/30 border border-white/10 px-3.5 py-2.5 text-sm text-white outline-none focus:border-brand-orange/60" placeholder="Paste YouTube link or video ID" />
          )}
          <p className="text-[11px] text-brand-gray-text mt-1.5">
            {platform === "youtube" ? "YouTube videos embed and autoplay on hover on the site." : "Non-YouTube platforms (LinkedIn/Instagram) show as a click-through card, not an embed — paste the post link below."}
          </p>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wide text-brand-gray-text mb-1.5">External Link (LinkedIn/Instagram post, or YouTube watch page)</label>
          <input value={href} onChange={(e) => setHref(e.target.value)} className="w-full rounded-lg bg-black/30 border border-white/10 px-3.5 py-2.5 text-sm text-white outline-none focus:border-brand-orange/60" placeholder="https://..." />
        </div>

        <label className="flex items-center gap-2 text-sm text-white cursor-pointer">
          <input type="checkbox" checked={published} onChange={(e) => setPublished(e.target.checked)} className="accent-brand-orange" />
          Published (visible on the live site)
        </label>

        {error && <p className="text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">{error}</p>}

        <div className="flex gap-2 mt-2">
          <button type="button" onClick={onClose} className="flex-1 rounded-lg border border-white/10 text-sm text-brand-gray-text py-2.5 hover:text-white">Cancel</button>
          <button type="submit" disabled={saving || uploading} className="flex-1 rounded-lg bg-brand-orange text-white text-sm font-bold py-2.5 hover:bg-brand-orange-light transition-colors disabled:opacity-50">
            {saving ? "Saving…" : initial ? "Save Changes" : "Add Content Video"}
          </button>
        </div>
      </form>
    </div>
  );
}
