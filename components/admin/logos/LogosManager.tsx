"use client";
import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import LogoForm, { LogoRow } from "./LogoForm";

export default function LogosManager() {
  const [logos, setLogos] = useState<LogoRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<LogoRow | undefined>(undefined);

  async function load() {
    setLoading(true);
    const supabase = createClient();
    const { data } = await supabase.from("client_logos").select("*").order("sort_order");
    setLogos(data ?? []);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function handleDelete(id: string) {
    const supabase = createClient();
    await supabase.from("client_logos").delete().eq("id", id);
    load();
  }

  const groups: { key: "worked_with" | "trusted_by"; label: string }[] = [
    { key: "worked_with", label: "Worked With" },
    { key: "trusted_by", label: "Trusted By" },
  ];

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black text-white">Client Logos</h1>
          <p className="text-sm text-brand-gray-text mt-1">Logo marquees shown on the homepage.</p>
        </div>
        <button
          onClick={() => { setEditing(undefined); setFormOpen(true); }}
          className="inline-flex items-center gap-1.5 rounded-full bg-brand-orange text-white text-sm font-bold px-4 py-2.5 hover:bg-brand-orange-light transition-colors"
        >
          <Plus size={15} />
          Add Logo
        </button>
      </div>

      {loading ? (
        <p className="text-sm text-brand-gray-text">Loading…</p>
      ) : (
        groups.map((g) => (
          <div key={g.key} className="mb-8">
            <h2 className="text-xs font-bold uppercase tracking-wide text-brand-gray-text mb-3">{g.label}</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {logos.filter((l) => l.group_name === g.key).map((logo) => (
                <div key={logo.id} className="rounded-xl border border-white/10 bg-white/[0.02] p-3 flex flex-col items-center gap-2">
                  <img src={logo.logo_url} alt={logo.name} className="h-10 object-contain" />
                  <p className="text-[11px] text-white text-center truncate w-full">{logo.name}</p>
                  <div className="flex gap-1 w-full">
                    <button onClick={() => { setEditing(logo); setFormOpen(true); }} className="flex-1 rounded border border-white/10 text-[10px] text-white py-1 hover:border-brand-orange/40">
                      <Pencil size={10} className="inline" />
                    </button>
                    <button onClick={() => handleDelete(logo.id)} className="flex-1 rounded border border-red-500/20 text-[10px] text-red-400 py-1 hover:bg-red-500/10">
                      <Trash2 size={10} className="inline" />
                    </button>
                  </div>
                </div>
              ))}
              {logos.filter((l) => l.group_name === g.key).length === 0 && (
                <p className="text-xs text-brand-gray-text col-span-full">No logos yet.</p>
              )}
            </div>
          </div>
        ))
      )}

      {formOpen && (
        <LogoForm
          initial={editing}
          onClose={() => setFormOpen(false)}
          onSaved={() => { setFormOpen(false); load(); }}
        />
      )}
    </div>
  );
}
