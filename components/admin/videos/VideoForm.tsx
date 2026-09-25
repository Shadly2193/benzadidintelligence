"use client";
import { useState } from "react";
import { X, Upload } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export interface PortfolioVideoRow {
  id: string;
  title: string;
  tag: string | null;
  video_url: string | null;
  youtube_id: string | null;
  live_link: string | null;
  tier: "essential" | "premium" | null;
  placement: string[];
  sort_order: number;
  published: boolean;
}

const PLACEMENT_OPTIONS = [
  { value: "homepage", label: "Homepage" },
  { value: "work_page", label: "Work Page" },
  { value: "service_website", label: "Website Service Page" },
];

interface VideoFormProps {
  initial?: PortfolioVideoRow;
  onClose: () => void;
  onSaved: () => void;
}

export default function VideoForm({ initial, onClose, onSaved }: VideoFormProps) {
  const [title, setTitle] = useState(initial?.title ?? "");
  const [tag, setTag] = useState(initial?.tag ?? "");
  const [sourceType, setSourceType] = useState<"upload" | "youtube">(
    initial?.youtube_id ? "youtube" : "upload"
  );
  const [videoUrl, setVideoUrl] = useState(initial?.video_url ?? "");
  const [youtubeId, setYoutubeId] = useState(initial?.youtube_id ?? "");
  const [liveLink, setLiveLink] = useState(initial?.live_link ?? "");
  const [tier, setTier] = useState<"essential" | "premium" | "">(initial?.tier ?? "");
  const [placement, setPlacement] = useState<string[]>(initial?.placement ?? []);
  const [published, setPublished] = useState(initial?.published ?? true);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function togglePlacement(value: string) {
    setPlacement((prev) =>
      prev.includes(value) ? prev.filter((p) => p !== value) : [...prev, value]
    );
  }

  function extractYoutubeId(input: string) {
    const match = input.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([\w-]{11})/);
    return match ? match[1] : input.trim();
  }

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError(null);

    const supabase = createClient();
    const ext = file.name.split(".").pop();
    const path = `portfolio-videos/${crypto.randomUUID()}.${ext}`;

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
    setSaving(true);
    setError(null);

    const supabase = createClient();
    const payload = {
      title,
      tag: tag || null,
      video_url: sourceType === "upload" ? videoUrl || null : null,
      youtube_id: sourceType === "youtube" ? extractYoutubeId(youtubeId) || null : null,
      live_link: liveLink || null,
      tier: tier || null,
      placement,
      published,
      updated_at: new Date().toISOString(),
    };

    const { error: saveError } = initial
      ? await supabase.from("portfolio_videos").update(payload).eq("id", initial.id)
      : await supabase.from("portfolio_videos").insert(payload);

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
          <h2 className="text-base font-bold text-white">
            {initial ? "Edit Video" : "Add Portfolio Video"}
          </h2>
          <button type="button" onClick={onClose} className="text-brand-gray-text hover:text-white">
            <X size={18} />
          </button>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wide text-brand-gray-text mb-1.5">
            Title
          </label>
          <input
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-lg bg-black/30 border border-white/10 px-3.5 py-2.5 text-sm text-white outline-none focus:border-brand-orange/60"
            placeholder="e.g. Sikder Dental Point"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wide text-brand-gray-text mb-1.5">
            Tag
          </label>
          <input
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            className="w-full rounded-lg bg-black/30 border border-white/10 px-3.5 py-2.5 text-sm text-white outline-none focus:border-brand-orange/60"
            placeholder="e.g. Healthcare"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wide text-brand-gray-text mb-1.5">
            Video Source
          </label>
          <div className="flex gap-2 mb-2">
            <button
              type="button"
              onClick={() => setSourceType("upload")}
              className={`flex-1 rounded-lg text-xs font-semibold py-2 border transition-colors ${
                sourceType === "upload"
                  ? "bg-brand-orange/15 border-brand-orange/50 text-brand-orange"
                  : "border-white/10 text-brand-gray-text"
              }`}
            >
              Upload File
            </button>
            <button
              type="button"
              onClick={() => setSourceType("youtube")}
              className={`flex-1 rounded-lg text-xs font-semibold py-2 border transition-colors ${
                sourceType === "youtube"
                  ? "bg-brand-orange/15 border-brand-orange/50 text-brand-orange"
                  : "border-white/10 text-brand-gray-text"
              }`}
            >
              YouTube Link
            </button>
          </div>

          {sourceType === "upload" ? (
            <div>
              <label className="flex items-center justify-center gap-2 rounded-lg border border-dashed border-white/15 py-3 text-xs text-brand-gray-text cursor-pointer hover:border-brand-orange/40">
                <Upload size={14} />
                {uploading ? "Uploading…" : videoUrl ? "Replace video" : "Choose video file"}
                <input type="file" accept="video/*" onChange={handleFileUpload} className="hidden" />
              </label>
              {videoUrl && (
                <p className="text-[11px] text-brand-gray-text mt-1.5 truncate">{videoUrl}</p>
              )}
            </div>
          ) : (
            <input
              value={youtubeId}
              onChange={(e) => setYoutubeId(e.target.value)}
              className="w-full rounded-lg bg-black/30 border border-white/10 px-3.5 py-2.5 text-sm text-white outline-none focus:border-brand-orange/60"
              placeholder="Paste YouTube link or video ID"
            />
          )}
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wide text-brand-gray-text mb-1.5">
            Live Website Link (optional)
          </label>
          <input
            value={liveLink}
            onChange={(e) => setLiveLink(e.target.value)}
            className="w-full rounded-lg bg-black/30 border border-white/10 px-3.5 py-2.5 text-sm text-white outline-none focus:border-brand-orange/60"
            placeholder="https://..."
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wide text-brand-gray-text mb-1.5">
            Pricing Tier
          </label>
          <div className="flex gap-2">
            {[
              { value: "", label: "General (no tier)" },
              { value: "essential", label: "Essential ($550)" },
              { value: "premium", label: "Premium ($800)" },
            ].map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setTier(opt.value as typeof tier)}
                className={`flex-1 rounded-lg text-[11px] font-semibold py-2 px-1 border transition-colors ${
                  tier === opt.value
                    ? "bg-brand-orange/15 border-brand-orange/50 text-brand-orange"
                    : "border-white/10 text-brand-gray-text"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wide text-brand-gray-text mb-1.5">
            Show On
          </label>
          <div className="flex flex-col gap-1.5">
            {PLACEMENT_OPTIONS.map((opt) => (
              <label key={opt.value} className="flex items-center gap-2 text-sm text-white cursor-pointer">
                <input
                  type="checkbox"
                  checked={placement.includes(opt.value)}
                  onChange={() => togglePlacement(opt.value)}
                  className="accent-brand-orange"
                />
                {opt.label}
              </label>
            ))}
          </div>
        </div>

        <label className="flex items-center gap-2 text-sm text-white cursor-pointer">
          <input
            type="checkbox"
            checked={published}
            onChange={(e) => setPublished(e.target.checked)}
            className="accent-brand-orange"
          />
          Published (visible on the live site)
        </label>

        {error && (
          <p className="text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
            {error}
          </p>
        )}

        <div className="flex gap-2 mt-2">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-lg border border-white/10 text-sm text-brand-gray-text py-2.5 hover:text-white"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving || uploading}
            className="flex-1 rounded-lg bg-brand-orange text-white text-sm font-bold py-2.5 hover:bg-brand-orange-light transition-colors disabled:opacity-50"
          >
            {saving ? "Saving…" : initial ? "Save Changes" : "Add Video"}
          </button>
        </div>
      </form>
    </div>
  );
}
