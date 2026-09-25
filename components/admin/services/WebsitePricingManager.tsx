"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Plus, Trash2, Save, Gift } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { DEFAULT_PRICING_CONFIG, mergePricingConfig, type PricingConfig } from "@/lib/pricingConfig";

interface Tier {
  id: string;
  key: "essential" | "premium";
  name: string;
  price: number;
  best_for: string | null;
  recommended: boolean;
}

interface TierFeature {
  id: string;
  tier_id: string;
  label: string;
  sub: string | null;
  sort_order: number;
}

interface ComparisonRow {
  id: string;
  feature: string;
  essential_value: string | null;
  premium_value: string | null;
  premium_only: boolean;
  sort_order: number;
}

interface CustomPoint {
  id: string;
  point: string;
  sort_order: number;
}

export default function WebsitePricingManager() {
  const [tiers, setTiers] = useState<Tier[]>([]);
  const [features, setFeatures] = useState<TierFeature[]>([]);
  const [rows, setRows] = useState<ComparisonRow[]>([]);
  const [points, setPoints] = useState<CustomPoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingTier, setSavingTier] = useState<string | null>(null);
  const [config, setConfig] = useState<PricingConfig>(DEFAULT_PRICING_CONFIG);
  const [configSaved, setConfigSaved] = useState(false);

  async function loadAll() {
    setLoading(true);
    const supabase = createClient();
    const [tiersRes, featuresRes, rowsRes, pointsRes, configRes] = await Promise.all([
      supabase.from("pricing_tiers").select("*").eq("service_slug", "website").order("sort_order"),
      supabase.from("pricing_tier_features").select("*").order("sort_order"),
      supabase.from("comparison_rows").select("*").eq("service_slug", "website").order("sort_order"),
      supabase.from("custom_plan_points").select("*").eq("service_slug", "website").order("sort_order"),
      supabase.from("page_content").select("content").eq("page", "website_pricing").eq("section", "config").maybeSingle(),
    ]);
    setConfig(mergePricingConfig(configRes.data?.content));
    setTiers(tiersRes.data ?? []);
    setFeatures(featuresRes.data ?? []);
    setRows(rowsRes.data ?? []);
    setPoints(pointsRes.data ?? []);
    setLoading(false);
  }

  useEffect(() => {
    loadAll();
  }, []);

  async function persistConfig(next: PricingConfig) {
    const supabase = createClient();
    await supabase
      .from("page_content")
      .upsert({ page: "website_pricing", section: "config", content: next, updated_at: new Date().toISOString() }, { onConflict: "page,section" });
    setConfigSaved(true);
    setTimeout(() => setConfigSaved(false), 1800);
  }

  function toggleBonus(kind: "bonusFeatureIds" | "bonusRowIds", id: string) {
    const list = config[kind];
    const next = { ...config, [kind]: list.includes(id) ? list.filter((x) => x !== id) : [...list, id] };
    setConfig(next);
    persistConfig(next);
  }

  async function saveTier(tier: Tier) {
    setSavingTier(tier.id);
    const supabase = createClient();
    await supabase
      .from("pricing_tiers")
      .update({ price: tier.price, best_for: tier.best_for, name: tier.name })
      .eq("id", tier.id);
    setSavingTier(null);
  }

  function updateTierLocal(id: string, patch: Partial<Tier>) {
    setTiers((prev) => prev.map((t) => (t.id === id ? { ...t, ...patch } : t)));
  }

  async function addFeature(tierId: string) {
    const supabase = createClient();
    const existing = features.filter((f) => f.tier_id === tierId);
    const { data } = await supabase
      .from("pricing_tier_features")
      .insert({ tier_id: tierId, label: "New feature", sub: "", sort_order: existing.length })
      .select()
      .single();
    if (data) setFeatures((prev) => [...prev, data]);
  }

  async function saveFeature(feature: TierFeature) {
    const supabase = createClient();
    await supabase
      .from("pricing_tier_features")
      .update({ label: feature.label, sub: feature.sub })
      .eq("id", feature.id);
  }

  function updateFeatureLocal(id: string, patch: Partial<TierFeature>) {
    setFeatures((prev) => prev.map((f) => (f.id === id ? { ...f, ...patch } : f)));
  }

  async function deleteFeature(id: string) {
    const supabase = createClient();
    await supabase.from("pricing_tier_features").delete().eq("id", id);
    setFeatures((prev) => prev.filter((f) => f.id !== id));
  }

  async function addRow() {
    const supabase = createClient();
    const { data } = await supabase
      .from("comparison_rows")
      .insert({ service_slug: "website", feature: "New feature", essential_value: "true", premium_value: "true", premium_only: false, sort_order: rows.length })
      .select()
      .single();
    if (data) setRows((prev) => [...prev, data]);
  }

  async function saveRow(row: ComparisonRow) {
    const supabase = createClient();
    await supabase
      .from("comparison_rows")
      .update({ feature: row.feature, essential_value: row.essential_value, premium_value: row.premium_value, premium_only: row.premium_only })
      .eq("id", row.id);
  }

  function updateRowLocal(id: string, patch: Partial<ComparisonRow>) {
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, ...patch } : r)));
  }

  async function deleteRow(id: string) {
    const supabase = createClient();
    await supabase.from("comparison_rows").delete().eq("id", id);
    setRows((prev) => prev.filter((r) => r.id !== id));
  }

  async function addPoint() {
    const supabase = createClient();
    const { data } = await supabase
      .from("custom_plan_points")
      .insert({ service_slug: "website", point: "New point", sort_order: points.length })
      .select()
      .single();
    if (data) setPoints((prev) => [...prev, data]);
  }

  async function savePoint(point: CustomPoint) {
    const supabase = createClient();
    await supabase.from("custom_plan_points").update({ point: point.point }).eq("id", point.id);
  }

  function updatePointLocal(id: string, value: string) {
    setPoints((prev) => prev.map((p) => (p.id === id ? { ...p, point: value } : p)));
  }

  async function deletePoint(id: string) {
    const supabase = createClient();
    await supabase.from("custom_plan_points").delete().eq("id", id);
    setPoints((prev) => prev.filter((p) => p.id !== id));
  }

  if (loading) {
    return <p className="text-sm text-brand-gray-text max-w-5xl mx-auto">Loading…</p>;
  }

  return (
    <div className="max-w-5xl mx-auto flex flex-col gap-8">
      <div>
        <Link
          href="/admin/services"
          className="inline-flex items-center gap-1.5 text-xs text-brand-gray-text hover:text-white mb-4"
        >
          <ArrowLeft size={13} />
          Back to Services
        </Link>
        <h1 className="text-2xl font-black text-white">Website Pricing Tiers</h1>
        <p className="text-sm text-brand-gray-text mt-1">
          Manage the Essential / Premium cards, the feature comparison table, and the custom-plan banner.
        </p>
      </div>

      {/* Add-on + Custom pricing */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-white">Optional Add-on (shown on both cards)</h2>
            <button
              onClick={() => persistConfig(config)}
              className="inline-flex items-center gap-1.5 rounded-lg bg-brand-orange/10 border border-brand-orange/30 text-[11px] text-brand-orange px-2.5 py-1.5 hover:bg-brand-orange/20"
            >
              <Save size={11} />
              {configSaved ? "Saved ✓" : "Save"}
            </button>
          </div>
          <label className="flex items-center gap-2 text-xs text-white mb-3 cursor-pointer">
            <input
              type="checkbox"
              checked={config.addon.enabled}
              onChange={(e) => setConfig({ ...config, addon: { ...config.addon, enabled: e.target.checked } })}
              className="accent-brand-orange"
            />
            Show the add-on on the pricing cards
          </label>
          <label className="block text-[11px] font-semibold uppercase tracking-wide text-brand-gray-text mb-1">Add-on price (USD)</label>
          <input
            type="number"
            value={config.addon.price}
            onChange={(e) => setConfig({ ...config, addon: { ...config.addon, price: Number(e.target.value) } })}
            className="w-full mb-3 rounded-lg bg-black/30 border border-white/10 px-3 py-2 text-sm text-white outline-none focus:border-brand-orange/60"
          />
          <label className="block text-[11px] font-semibold uppercase tracking-wide text-brand-gray-text mb-1">Title</label>
          <input
            value={config.addon.label}
            onChange={(e) => setConfig({ ...config, addon: { ...config.addon, label: e.target.value } })}
            className="w-full mb-3 rounded-lg bg-black/30 border border-white/10 px-3 py-2 text-sm text-white outline-none focus:border-brand-orange/60"
          />
          <label className="block text-[11px] font-semibold uppercase tracking-wide text-brand-gray-text mb-1">Description</label>
          <textarea
            rows={2}
            value={config.addon.sub}
            onChange={(e) => setConfig({ ...config, addon: { ...config.addon, sub: e.target.value } })}
            className="w-full rounded-lg bg-black/30 border border-white/10 px-3 py-2 text-sm text-white outline-none focus:border-brand-orange/60 resize-y"
          />
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-white">Custom Development ("Need Something Custom?")</h2>
            <button
              onClick={() => persistConfig(config)}
              className="inline-flex items-center gap-1.5 rounded-lg bg-brand-orange/10 border border-brand-orange/30 text-[11px] text-brand-orange px-2.5 py-1.5 hover:bg-brand-orange/20"
            >
              <Save size={11} />
              {configSaved ? "Saved ✓" : "Save"}
            </button>
          </div>
          <label className="block text-[11px] font-semibold uppercase tracking-wide text-brand-gray-text mb-1">Starting from (USD)</label>
          <input
            type="number"
            value={config.custom.startingFrom}
            onChange={(e) => setConfig({ ...config, custom: { ...config.custom, startingFrom: Number(e.target.value) } })}
            className="w-full mb-3 rounded-lg bg-black/30 border border-white/10 px-3 py-2 text-sm text-white outline-none focus:border-brand-orange/60"
          />
          <label className="block text-[11px] font-semibold uppercase tracking-wide text-brand-gray-text mb-1">Delivery time</label>
          <input
            value={config.custom.delivery}
            onChange={(e) => setConfig({ ...config, custom: { ...config.custom, delivery: e.target.value } })}
            className="w-full rounded-lg bg-black/30 border border-white/10 px-3 py-2 text-sm text-white outline-none focus:border-brand-orange/60"
          />
          <p className="text-[11px] text-brand-gray-text mt-3">
            The inquiry form's price/time confirmation checkbox uses these same values.
          </p>
        </div>
      </div>

      {/* Tier cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {tiers.map((tier) => (
          <div key={tier.id} className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-bold text-white">
                {tier.name} {tier.recommended && <span className="text-brand-orange text-[10px] ml-1">RECOMMENDED</span>}
              </h2>
              <button
                onClick={() => saveTier(tier)}
                disabled={savingTier === tier.id}
                className="inline-flex items-center gap-1.5 rounded-lg bg-brand-orange/10 border border-brand-orange/30 text-[11px] text-brand-orange px-2.5 py-1.5 hover:bg-brand-orange/20 disabled:opacity-50"
              >
                <Save size={11} />
                {savingTier === tier.id ? "Saving…" : "Save"}
              </button>
            </div>

            <label className="block text-[11px] font-semibold uppercase tracking-wide text-brand-gray-text mb-1">
              Price (USD)
            </label>
            <input
              type="number"
              value={tier.price}
              onChange={(e) => updateTierLocal(tier.id, { price: Number(e.target.value) })}
              className="w-full mb-3 rounded-lg bg-black/30 border border-white/10 px-3 py-2 text-sm text-white outline-none focus:border-brand-orange/60"
            />

            <label className="block text-[11px] font-semibold uppercase tracking-wide text-brand-gray-text mb-1">
              Best For
            </label>
            <textarea
              rows={2}
              value={tier.best_for ?? ""}
              onChange={(e) => updateTierLocal(tier.id, { best_for: e.target.value })}
              className="w-full mb-4 rounded-lg bg-black/30 border border-white/10 px-3 py-2 text-sm text-white outline-none focus:border-brand-orange/60 resize-y"
            />

            <p className="text-[11px] font-semibold uppercase tracking-wide text-brand-gray-text mb-2">
              Features
            </p>
            <div className="flex flex-col gap-2 mb-3">
              {features
                .filter((f) => f.tier_id === tier.id)
                .map((f) => (
                  <div key={f.id} className="rounded-lg border border-white/5 bg-black/20 p-2.5">
                    <div className="flex items-start gap-2">
                      <div className="flex-1 flex flex-col gap-1.5">
                        <input
                          value={f.label}
                          onChange={(e) => updateFeatureLocal(f.id, { label: e.target.value })}
                          onBlur={() => saveFeature({ ...f })}
                          className="w-full rounded bg-transparent border-b border-white/10 text-xs text-white outline-none focus:border-brand-orange/60 pb-1"
                        />
                        <input
                          value={f.sub ?? ""}
                          onChange={(e) => updateFeatureLocal(f.id, { sub: e.target.value })}
                          onBlur={() => saveFeature({ ...f })}
                          className="w-full rounded bg-transparent text-[11px] text-brand-gray-text outline-none focus:border-brand-orange/60 border-b border-transparent focus:border-white/10 pb-1"
                        />
                      </div>
                      <label className="flex items-center gap-1 text-[10px] text-brand-orange shrink-0 mt-1 cursor-pointer" title="Show under the Bonus box on the card">
                        <input
                          type="checkbox"
                          checked={config.bonusFeatureIds.includes(f.id)}
                          onChange={() => toggleBonus("bonusFeatureIds", f.id)}
                          className="accent-brand-orange"
                        />
                        <Gift size={11} />
                        Bonus
                      </label>
                      <button
                        onClick={() => deleteFeature(f.id)}
                        className="text-red-400/70 hover:text-red-400 shrink-0 mt-1"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>
                ))}
            </div>
            <button
              onClick={() => addFeature(tier.id)}
              className="inline-flex items-center gap-1.5 text-xs text-brand-orange hover:underline"
            >
              <Plus size={12} />
              Add Feature
            </button>
          </div>
        ))}
      </div>

      {/* Comparison table */}
      <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-bold text-white">Comparison Table Rows</h2>
          <button
            onClick={addRow}
            className="inline-flex items-center gap-1.5 rounded-lg bg-brand-orange/10 border border-brand-orange/30 text-[11px] text-brand-orange px-2.5 py-1.5 hover:bg-brand-orange/20"
          >
            <Plus size={11} />
            Add Row
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-[11px] text-brand-gray-text border-b border-white/10">
                <th className="pb-2 font-medium pr-2">Feature</th>
                <th className="pb-2 font-medium pr-2">Essential</th>
                <th className="pb-2 font-medium pr-2">Premium</th>
                <th className="pb-2 font-medium pr-2">Premium Only</th>
                <th className="pb-2 font-medium pr-2">Bonus</th>
                <th className="pb-2"></th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id} className="border-b border-white/5">
                  <td className="py-2 pr-2">
                    <input
                      value={row.feature}
                      onChange={(e) => updateRowLocal(row.id, { feature: e.target.value })}
                      onBlur={() => saveRow({ ...row })}
                      className="w-full min-w-[160px] bg-transparent text-white text-xs outline-none"
                    />
                  </td>
                  <td className="py-2 pr-2">
                    <input
                      value={row.essential_value ?? ""}
                      onChange={(e) => updateRowLocal(row.id, { essential_value: e.target.value })}
                      onBlur={() => saveRow({ ...row })}
                      className="w-24 bg-transparent text-white/70 text-xs outline-none"
                    />
                  </td>
                  <td className="py-2 pr-2">
                    <input
                      value={row.premium_value ?? ""}
                      onChange={(e) => updateRowLocal(row.id, { premium_value: e.target.value })}
                      onBlur={() => saveRow({ ...row })}
                      className="w-24 bg-transparent text-white/70 text-xs outline-none"
                    />
                  </td>
                  <td className="py-2 pr-2">
                    <input
                      type="checkbox"
                      checked={row.premium_only}
                      onChange={(e) => {
                        updateRowLocal(row.id, { premium_only: e.target.checked });
                        saveRow({ ...row, premium_only: e.target.checked });
                      }}
                      className="accent-brand-orange"
                    />
                  </td>
                  <td className="py-2 pr-2">
                    <input
                      type="checkbox"
                      checked={config.bonusRowIds.includes(row.id)}
                      onChange={() => toggleBonus("bonusRowIds", row.id)}
                      className="accent-brand-orange"
                    />
                  </td>
                  <td className="py-2">
                    <button onClick={() => deleteRow(row.id)} className="text-red-400/70 hover:text-red-400">
                      <Trash2 size={13} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Custom plan points */}
      <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-bold text-white">"Need Something Custom?" Banner Points</h2>
          <button
            onClick={addPoint}
            className="inline-flex items-center gap-1.5 rounded-lg bg-brand-orange/10 border border-brand-orange/30 text-[11px] text-brand-orange px-2.5 py-1.5 hover:bg-brand-orange/20"
          >
            <Plus size={11} />
            Add Point
          </button>
        </div>
        <div className="flex flex-col gap-2">
          {points.map((p) => (
            <div key={p.id} className="flex items-center gap-2">
              <input
                value={p.point}
                onChange={(e) => updatePointLocal(p.id, e.target.value)}
                onBlur={() => savePoint({ ...p })}
                className="flex-1 rounded-lg bg-black/30 border border-white/10 px-3 py-2 text-xs text-white outline-none focus:border-brand-orange/60"
              />
              <button onClick={() => deletePoint(p.id)} className="text-red-400/70 hover:text-red-400 shrink-0">
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
