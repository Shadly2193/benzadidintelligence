"use client";
import { useState } from "react";
import { X } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export interface ServiceRow {
  id: string;
  slug: string;
  number: string | null;
  title: string;
  big_headline: string[];
  pain: string;
  description: string;
  cta_label: string | null;
  cta_href: string | null;
  features: string[];
  pricing: string | null;
  best_for: string | null;
}

interface Props {
  service: ServiceRow;
  onClose: () => void;
  onSaved: () => void;
}

export default function ServiceForm({ service, onClose, onSaved }: Props) {
  const [title, setTitle] = useState(service.title);
  const [headline1, setHeadline1] = useState(service.big_headline[0] ?? "");
  const [headline2, setHeadline2] = useState(service.big_headline[1] ?? "");
  const [pain, setPain] = useState(service.pain);
  const [description, setDescription] = useState(service.description);
  const [features, setFeatures] = useState(service.features.join("\n"));
  const [pricing, setPricing] = useState(service.pricing ?? "");
  const [bestFor, setBestFor] = useState(service.best_for ?? "");
  const [ctaLabel, setCtaLabel] = useState(service.cta_label ?? "");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const supabase = createClient();
    const { error: saveError } = await supabase
      .from("services")
      .update({
        title,
        big_headline: [headline1, headline2].filter(Boolean),
        pain,
        description,
        features: features.split("\n").map((f) => f.trim()).filter(Boolean),
        pricing: pricing || null,
        best_for: bestFor || null,
        cta_label: ctaLabel || null,
        updated_at: new Date().toISOString(),
      })
      .eq("id", service.id);

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
        className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-2xl border border-white/10 bg-brand-black p-6 flex flex-col gap-4"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-white">Edit — {service.title}</h2>
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
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wide text-brand-gray-text mb-1.5">
              Headline — Line 1
            </label>
            <input
              value={headline1}
              onChange={(e) => setHeadline1(e.target.value)}
              className="w-full rounded-lg bg-black/30 border border-white/10 px-3.5 py-2.5 text-sm text-white outline-none focus:border-brand-orange/60"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wide text-brand-gray-text mb-1.5">
              Headline — Line 2
            </label>
            <input
              value={headline2}
              onChange={(e) => setHeadline2(e.target.value)}
              className="w-full rounded-lg bg-black/30 border border-white/10 px-3.5 py-2.5 text-sm text-white outline-none focus:border-brand-orange/60"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wide text-brand-gray-text mb-1.5">
            Pain Hook (one line per sentence)
          </label>
          <textarea
            rows={4}
            value={pain}
            onChange={(e) => setPain(e.target.value)}
            className="w-full rounded-lg bg-black/30 border border-white/10 px-3.5 py-2.5 text-sm text-white outline-none focus:border-brand-orange/60 resize-y"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wide text-brand-gray-text mb-1.5">
            Description
          </label>
          <textarea
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full rounded-lg bg-black/30 border border-white/10 px-3.5 py-2.5 text-sm text-white outline-none focus:border-brand-orange/60 resize-y"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wide text-brand-gray-text mb-1.5">
            Features (one per line)
          </label>
          <textarea
            rows={6}
            value={features}
            onChange={(e) => setFeatures(e.target.value)}
            className="w-full rounded-lg bg-black/30 border border-white/10 px-3.5 py-2.5 text-sm text-white outline-none focus:border-brand-orange/60 resize-y"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wide text-brand-gray-text mb-1.5">
              Pricing (display text)
            </label>
            <input
              value={pricing}
              onChange={(e) => setPricing(e.target.value)}
              placeholder="e.g. Starting from $550"
              className="w-full rounded-lg bg-black/30 border border-white/10 px-3.5 py-2.5 text-sm text-white outline-none focus:border-brand-orange/60"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wide text-brand-gray-text mb-1.5">
              CTA Label
            </label>
            <input
              value={ctaLabel}
              onChange={(e) => setCtaLabel(e.target.value)}
              className="w-full rounded-lg bg-black/30 border border-white/10 px-3.5 py-2.5 text-sm text-white outline-none focus:border-brand-orange/60"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wide text-brand-gray-text mb-1.5">
            Best For
          </label>
          <input
            value={bestFor}
            onChange={(e) => setBestFor(e.target.value)}
            className="w-full rounded-lg bg-black/30 border border-white/10 px-3.5 py-2.5 text-sm text-white outline-none focus:border-brand-orange/60"
          />
        </div>

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
            disabled={saving}
            className="flex-1 rounded-lg bg-brand-orange text-white text-sm font-bold py-2.5 hover:bg-brand-orange-light transition-colors disabled:opacity-50"
          >
            {saving ? "Saving…" : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
