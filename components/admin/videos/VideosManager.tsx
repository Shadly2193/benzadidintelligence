"use client";
import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, PlayCircle, Film } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import VideoForm, { PortfolioVideoRow } from "./VideoForm";

const TIER_LABEL: Record<string, string> = {
  essential: "Essential · $550",
  premium: "Premium · $800",
};

export default function VideosManager() {
  const [videos, setVideos] = useState<PortfolioVideoRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<PortfolioVideoRow | undefined>(undefined);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  async function loadVideos() {
    setLoading(true);
    const supabase = createClient();
    const { data } = await supabase
      .from("portfolio_videos")
      .select("*")
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false });
    setVideos(data ?? []);
    setLoading(false);
  }

  useEffect(() => {
    loadVideos();
  }, []);

  function openAdd() {
    setEditing(undefined);
    setFormOpen(true);
  }

  function openEdit(video: PortfolioVideoRow) {
    setEditing(video);
    setFormOpen(true);
  }

  async function handleDelete(id: string) {
    setDeletingId(id);
    const supabase = createClient();
    await supabase.from("portfolio_videos").delete().eq("id", id);
    setDeletingId(null);
    loadVideos();
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black text-white">Portfolio Videos</h1>
          <p className="text-sm text-brand-gray-text mt-1">
            One place for every demo video — tag where it shows and which pricing tier it belongs to.
          </p>
        </div>
        <button
          onClick={openAdd}
          className="inline-flex items-center gap-1.5 rounded-full bg-brand-orange text-white text-sm font-bold px-4 py-2.5 hover:bg-brand-orange-light transition-colors"
        >
          <Plus size={15} />
          Add Video
        </button>
      </div>

      {loading ? (
        <p className="text-sm text-brand-gray-text">Loading…</p>
      ) : videos.length === 0 ? (
        <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-10 text-center">
          <p className="text-sm text-brand-gray-text">
            No videos yet. Click "Add Video" to upload your first one.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {videos.map((video) => (
            <div
              key={video.id}
              className="rounded-2xl border border-white/10 bg-white/[0.02] p-4 flex flex-col gap-3"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-brand-gray-text">
                  {video.youtube_id ? <PlayCircle size={14} /> : <Film size={14} />}
                  <span className="text-[11px] uppercase tracking-wide">
                    {video.tag ?? "Untagged"}
                  </span>
                </div>
                <span
                  className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                    video.published
                      ? "bg-green-500/15 text-green-400"
                      : "bg-white/10 text-brand-gray-text"
                  }`}
                >
                  {video.published ? "Published" : "Draft"}
                </span>
              </div>

              <h3 className="text-sm font-bold text-white leading-snug">{video.title}</h3>

              {video.tier && (
                <span className="text-[11px] font-semibold text-brand-orange">
                  {TIER_LABEL[video.tier]}
                </span>
              )}

              <div className="flex flex-wrap gap-1">
                {video.placement.map((p) => (
                  <span
                    key={p}
                    className="text-[10px] px-2 py-0.5 rounded-full bg-black/30 text-brand-gray-text border border-white/10"
                  >
                    {p.replace("_", " ")}
                  </span>
                ))}
              </div>

              <div className="flex gap-2 mt-1 pt-3 border-t border-white/5">
                <button
                  onClick={() => openEdit(video)}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-lg border border-white/10 text-xs text-white py-2 hover:border-brand-orange/40"
                >
                  <Pencil size={12} />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(video.id)}
                  disabled={deletingId === video.id}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-lg border border-red-500/20 text-xs text-red-400 py-2 hover:bg-red-500/10 disabled:opacity-50"
                >
                  <Trash2 size={12} />
                  {deletingId === video.id ? "Deleting…" : "Delete"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {formOpen && (
        <VideoForm
          initial={editing}
          onClose={() => setFormOpen(false)}
          onSaved={() => {
            setFormOpen(false);
            loadVideos();
          }}
        />
      )}
    </div>
  );
}
