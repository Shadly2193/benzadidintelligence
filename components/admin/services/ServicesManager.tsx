"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Pencil, ArrowRight } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import ServiceForm, { ServiceRow } from "./ServiceForm";

export default function ServicesManager() {
  const [services, setServices] = useState<ServiceRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<ServiceRow | null>(null);

  async function loadServices() {
    setLoading(true);
    const supabase = createClient();
    const { data } = await supabase.from("services").select("*").order("sort_order", { ascending: true });
    setServices(data ?? []);
    setLoading(false);
  }

  useEffect(() => {
    loadServices();
  }, []);

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-black text-white">Services</h1>
        <p className="text-sm text-brand-gray-text mt-1">
          Edit copy, features, and pricing for each of your 5 services.
        </p>
      </div>

      {loading ? (
        <p className="text-sm text-brand-gray-text">Loading…</p>
      ) : services.length === 0 ? (
        <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-10 text-center">
          <p className="text-sm text-brand-gray-text">No services found.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {services.map((s) => (
            <div
              key={s.id}
              className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 flex items-center justify-between gap-4"
            >
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-brand-orange">{s.number}</span>
                  <h3 className="text-sm font-bold text-white truncate">{s.title}</h3>
                </div>
                <p className="text-xs text-brand-gray-text mt-1 truncate">{s.pricing}</p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {s.slug === "website" && (
                  <Link
                    href="/admin/services/website-pricing"
                    className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 text-xs text-brand-gray-text px-3 py-2 hover:border-brand-orange/40 hover:text-white"
                  >
                    Tier Pricing
                    <ArrowRight size={12} />
                  </Link>
                )}
                <button
                  onClick={() => setEditing(s)}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-brand-orange/10 border border-brand-orange/30 text-xs text-brand-orange px-3 py-2 hover:bg-brand-orange/20"
                >
                  <Pencil size={12} />
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {editing && (
        <ServiceForm
          service={editing}
          onClose={() => setEditing(null)}
          onSaved={() => {
            setEditing(null);
            loadServices();
          }}
        />
      )}
    </div>
  );
}
