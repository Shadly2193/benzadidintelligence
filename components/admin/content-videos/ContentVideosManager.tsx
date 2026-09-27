"use client";
import { useEffect, useState } from "react";
import { Pencil, Trash2, Plus } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import ContentVideoForm, { ContentVideoRow } from "./ContentVideoForm";

export default function ContentVideosManager() {
  const [rows, setRows] = useState<ContentVideoRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<ContentVideoRow | null>(null);

  async function load() {
    setLoading(true);
    const supabase = createClient();
    const { data } = await supabase.from("content_videos").select("*").order("sort_order");
    setRows(data ?? []);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function handleDelete(id: string) {
    const supabase = createClient();
    await supabase.from("content_videos").delete().eq("id", id);
    setRows((prev) => prev.filter((r) => r.id !== id));
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black text-white">Content Videos</h1>
          <p className="text-sm text-brand-gray-text mt-1">
            AI-generated ads and storytelling videos — shown on the Content service page and Work page.
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="inline-flex items-center gap-1.5 rounded-full bg-brand-orange text-white text-sm font-bold px-4 py-2.5 hover:bg-brand-orange-light transition-colors"
        >
          <Plus size={15} />
          Add Content Video
        </button>
      </div>

      {loading ? (
        <p className="text-sm text-brand-gray-text">Loading…</p>
      ) : rows.length === 0 ? (
        <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-10 text-center">
          <p className="text-sm text-brand-gray-text">No content videos yet.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {rows.map((r) => (
            <div key={r.id} className="rounded-xl border border-white/10 bg-white/[0.02] p-4 flex items-center justify-between gap-4">
              <div className="min-w-0">
                <p className="text-sm font-bold text-white truncate">{r.title}</p>
                <p className="text-xs text-brand-gray-text mt-0.5 capitalize">
                  {r.category} · {r.platform} {r.published ? "" : "· Unpublished"}
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button onClick={() => setEditing(r)} className="inline-flex items-center gap-1.5 rounded-lg bg-brand-orange/10 border border-brand-orange/30 text-xs text-brand-orange px-3 py-2 hover:bg-brand-orange/20">
                  <Pencil size={12} />
                  Edit
                </button>
                <button onClick={() => handleDelete(r.id)} className="inline-flex items-center gap-1.5 rounded-lg border border-red-500/20 text-xs text-red-400 px-3 py-2 hover:bg-red-500/10">
                  <Trash2 size={12} />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {(showForm || editing) && (
        <ContentVideoForm
          initial={editing ?? undefined}
          onClose={() => { setShowForm(false); setEditing(null); }}
          onSaved={() => { setShowForm(false); setEditing(null); load(); }}
        />
      )}
    </div>
  );
}
