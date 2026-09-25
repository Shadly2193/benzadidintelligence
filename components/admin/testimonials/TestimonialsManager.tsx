"use client";
import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import TestimonialForm, { TestimonialRow } from "./TestimonialForm";

export default function TestimonialsManager() {
  const [items, setItems] = useState<TestimonialRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<TestimonialRow | undefined>(undefined);

  async function load() {
    setLoading(true);
    const supabase = createClient();
    const { data } = await supabase.from("testimonials").select("*").order("sort_order");
    setItems(data ?? []);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function handleDelete(id: string) {
    const supabase = createClient();
    await supabase.from("testimonials").delete().eq("id", id);
    load();
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black text-white">Testimonials</h1>
          <p className="text-sm text-brand-gray-text mt-1">Client quotes shown on the homepage.</p>
        </div>
        <button
          onClick={() => { setEditing(undefined); setFormOpen(true); }}
          className="inline-flex items-center gap-1.5 rounded-full bg-brand-orange text-white text-sm font-bold px-4 py-2.5 hover:bg-brand-orange-light transition-colors"
        >
          <Plus size={15} />
          Add Testimonial
        </button>
      </div>

      {loading ? (
        <p className="text-sm text-brand-gray-text">Loading…</p>
      ) : items.length === 0 ? (
        <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-10 text-center">
          <p className="text-sm text-brand-gray-text">No testimonials yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {items.map((t) => (
            <div key={t.id} className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 flex flex-col gap-3">
              <p className="text-xs text-white/80 leading-relaxed line-clamp-4">"{t.quote}"</p>
              <div className="flex items-center gap-2 mt-auto">
                {t.avatar_url && <img src={t.avatar_url} className="w-8 h-8 rounded-full object-cover" alt={t.author} />}
                <div>
                  <p className="text-xs font-bold text-white">{t.author}</p>
                  <p className="text-[11px] text-brand-gray-text">{t.role}</p>
                </div>
              </div>
              <div className="flex gap-2 pt-2 border-t border-white/5">
                <button onClick={() => { setEditing(t); setFormOpen(true); }} className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-lg border border-white/10 text-xs text-white py-2 hover:border-brand-orange/40">
                  <Pencil size={12} /> Edit
                </button>
                <button onClick={() => handleDelete(t.id)} className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-lg border border-red-500/20 text-xs text-red-400 py-2 hover:bg-red-500/10">
                  <Trash2 size={12} /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {formOpen && (
        <TestimonialForm
          initial={editing}
          onClose={() => setFormOpen(false)}
          onSaved={() => { setFormOpen(false); load(); }}
        />
      )}
    </div>
  );
}
