"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

export type Tier = "essential" | "premium";

interface TierCardData {
  tier: Tier;
  name: string;
  price: string;
  recommended?: boolean;
  bestFor: string;
  features: { label: string; sub: string }[];
}

const CARDS: TierCardData[] = [
  {
    tier: "essential",
    name: "Essential",
    price: "Starting from $400",
    bestFor: "Professionals who want a clean, modern presence — fast and beautiful.",
    features: [
      { label: "Bilingual site (English + Bangla)", sub: "Speak to every patient, in the language they trust" },
      { label: "Fully custom admin panel", sub: "Update your own bio, services, and photos — anytime" },
      { label: "5 SEO blog articles", sub: "Start showing up when patients Google your specialty" },
      { label: "Google Business Profile setup", sub: "Get found on Google Maps and local search from day one" },
      { label: "Unique, modern, beautiful design", sub: "A website that finally matches the trust you've earned" },
      { label: "Booking & lead capture system", sub: "Turn visitors into booked appointments, automatically" },
      { label: "Mobile-first, fast, SEO-ready", sub: "Built for how patients actually search, on their phone" },
      { label: "Personally built by me, 30–40 days", sub: "No agency hand-offs, no outsourcing" },
      { label: "Pay in 3 installments", sub: "Spread the cost across the build, zero pressure upfront" },
    ],
  },
  {
    tier: "premium",
    name: "Premium",
    price: "Starting from $600",
    recommended: true,
    bestFor: "Doctors who want to look like the #1 choice in their field — not just \"a good option.\"",
    features: [
      { label: "Bilingual site (English + Bangla)", sub: "Speak to every patient, in the language they trust" },
      { label: "Fully custom admin panel", sub: "Update your own bio, services, and photos — anytime" },
      { label: "10 SEO blog articles", sub: "Double the content, double the ways patients discover you" },
      { label: "Google Business Profile setup", sub: "Get found on Google Maps and local search from day one" },
      { label: "3D & scroll-triggered animations", sub: "A site that moves and reacts as patients scroll" },
      { label: "Eye-catching, animated hero section", sub: "The first 3 seconds that make a patient stay" },
      { label: "High-end, agency-level visual design", sub: "The kind of website patients screenshot to friends" },
      { label: "Booking & lead capture system", sub: "Turn visitors into booked appointments, automatically" },
      { label: "Mobile-first, fast, SEO-ready", sub: "Built for how patients actually search, on their phone" },
      { label: "FREE 5–6 session personal guidance", sub: "I coach you on social media & digital growth, alongside the build" },
      { label: "Personally built by me, 30–40 days", sub: "No agency hand-offs, no outsourcing" },
      { label: "Pay in 3 installments", sub: "Spread the cost across the build, zero pressure upfront" },
    ],
  },
];

interface Props {
  activeTier: Tier | null;
  onSelectTier: (tier: Tier) => void;
  onViewAll: () => void;
}

export default function WebsitePricingTiers({ activeTier, onSelectTier, onViewAll }: Props) {
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

              <div className="space-y-3 mb-8 flex-1">
                {card.features.map((f, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <CheckCircle className="w-4 h-4 text-brand-orange flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm text-white font-medium leading-snug">{f.label}</p>
                      <p className="text-xs text-brand-gray-text leading-snug">{f.sub}</p>
                    </div>
                  </div>
                ))}
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
