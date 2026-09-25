"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle, Gift, Plus } from "lucide-react";
import type { PricingConfig } from "@/lib/pricingConfig";

export type Tier = "essential" | "premium";

interface TierCardData {
  tier: Tier;
  name: string;
  price: string;
  recommended?: boolean;
  bestFor: string;
  basePrice: number;
  features: { label: string; sub: string; bonus: boolean }[];
}

export interface DbTier {
  key: Tier;
  name: string;
  price: number;
  best_for: string | null;
  recommended: boolean;
  pricing_tier_features: { id: string; label: string; sub: string | null; sort_order: number }[];
}

interface Props {
  tiers: DbTier[];
  config: PricingConfig;
  activeTier: Tier | null;
  onSelectTier: (tier: Tier) => void;
  onViewAll: () => void;
}

export default function WebsitePricingTiers({ tiers, config, activeTier, onSelectTier, onViewAll }: Props) {
  const CARDS: TierCardData[] = tiers.map((t) => ({
    tier: t.key,
    name: t.name,
    price: `Starting from $${t.price}`,
    basePrice: t.price,
    recommended: t.recommended,
    bestFor: t.best_for ?? "",
    features: [...t.pricing_tier_features]
      .sort((a, b) => a.sort_order - b.sort_order)
      .map((f) => ({ label: f.label, sub: f.sub ?? "", bonus: config.bonusFeatureIds.includes(f.id) })),
  }));

  return (
    <section className="py-24 bg-transparent px-6">
      <div className="max-w-5xl mx-auto">
        <p className="section-label mb-6 text-center">PRICING</p>
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl sm:text-3xl md:text-5xl font-black text-white mb-14 text-center"
        >
          Two ways to work together.
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {/* Premium first on mobile via order utility */}
          {CARDS.map((card) => (
            <motion.div
              key={card.tier}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`relative rounded-2xl p-6 sm:p-8 flex flex-col ${
                card.recommended ? "order-first md:order-none" : ""
              }`}
              style={{
                background: card.recommended
                  ? "linear-gradient(180deg, rgba(255,106,0,0.08), rgba(255,255,255,0.02))"
                  : "rgba(255,255,255,0.02)",
                border: card.recommended
                  ? "1px solid rgba(255,106,0,0.5)"
                  : "1px solid rgba(255,255,255,0.08)",
                boxShadow: card.recommended ? "0 0 40px rgba(255,106,0,0.15)" : "none",
              }}
            >
              {card.recommended && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-[11px] font-bold tracking-wide uppercase bg-brand-orange text-black">
                  Recommended
                </span>
              )}

              <h3 className="text-lg font-black text-white mb-1">{card.name}</h3>
              <p className="text-2xl sm:text-3xl font-black text-white mb-3">{card.price}</p>
              <p className="text-xs text-brand-gray-text leading-relaxed mb-6">{card.bestFor}</p>

              <div className="space-y-3 mb-6">
                {card.features.filter((f) => !f.bonus).map((f, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <CheckCircle className="w-4 h-4 text-brand-orange flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm text-white font-medium leading-snug">{f.label}</p>
                      <p className="text-xs text-brand-gray-text leading-snug">{f.sub}</p>
                    </div>
                  </div>
                ))}
              </div>

              {card.features.some((f) => f.bonus) && (
                <div
                  className="rounded-xl p-4 mb-6"
                  style={{ background: "rgba(255,106,0,0.07)", border: "1px solid rgba(255,106,0,0.3)" }}
                >
                  <p className="flex items-center gap-1.5 text-[11px] font-bold tracking-widest uppercase text-brand-orange mb-3">
                    <Gift className="w-3.5 h-3.5" />
                    Bonus — included free
                  </p>
                  <div className="space-y-3">
                    {card.features.filter((f) => f.bonus).map((f, i) => (
                      <div key={i} className="flex items-start gap-2.5">
                        <Gift className="w-4 h-4 text-brand-orange flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm text-white font-medium leading-snug">{f.label}</p>
                          <p className="text-xs text-brand-gray-text leading-snug">{f.sub}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex-1 flex flex-col justify-end mb-8">
                {config.addon.enabled && (
                  <div
                    className="rounded-xl p-4"
                    style={{ border: "1px dashed rgba(255,106,0,0.4)", background: "rgba(255,255,255,0.02)" }}
                  >
                    <p className="flex items-center gap-1.5 text-[11px] font-bold tracking-widest uppercase text-brand-orange mb-2">
                      <Plus className="w-3.5 h-3.5" />
                      Optional add-on · +${config.addon.price}
                    </p>
                    <p className="text-sm text-white font-medium leading-snug">{config.addon.label}</p>
                    <p className="text-xs text-brand-gray-text leading-snug mt-1">{config.addon.sub}</p>
                    <p className="text-xs text-white/80 font-semibold mt-3">
                      With add-on: ${card.basePrice + config.addon.price}
                    </p>
                  </div>
                )}
              </div>

              <div className="space-y-2.5 mt-auto">
                <Link
                  href="/contact"
                  className={`inline-flex w-full justify-center items-center px-6 py-3.5 rounded-full text-sm font-bold ${
                    card.recommended ? "btn-red" : "btn-outline"
                  }`}
                >
                  Book Discovery Call →
                </Link>
                <button
                  onClick={() =>
                    activeTier === card.tier ? onViewAll() : onSelectTier(card.tier)
                  }
                  className="inline-flex w-full justify-center items-center px-6 py-2.5 rounded-full text-xs font-semibold text-brand-orange hover:text-white transition-colors"
                >
                  {activeTier === card.tier
                    ? "Showing " + card.name + " examples — View All ↓"
                    : `See ${card.name} Examples ↓`}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
