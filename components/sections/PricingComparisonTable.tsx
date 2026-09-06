"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { Check, X } from "lucide-react";

interface Row {
  feature: string;
  essential: string | boolean;
  premium: string | boolean;
  premiumOnly?: boolean;
}

const ROWS: Row[] = [
  { feature: "Bilingual site (English + Bangla)", essential: true, premium: true },
  { feature: "Fully custom admin panel", essential: true, premium: true },
  { feature: "Google Business Profile setup", essential: true, premium: true },
  { feature: "Booking & lead capture system", essential: true, premium: true },
  { feature: "Mobile-first, fast, SEO-ready", essential: true, premium: true },
  { feature: "Personally built by me, 30–40 days", essential: true, premium: true },
  { feature: "Pay in 3 installments", essential: true, premium: true },
  { feature: "SEO blog articles", essential: "5 articles", premium: "10 articles", premiumOnly: true },
  { feature: "Design style", essential: "Modern & beautiful", premium: "3D & scroll-animated", premiumOnly: true },
  { feature: "Hero section", essential: "Clean, professional", premium: "Eye-catching, animated", premiumOnly: true },
  { feature: "Video / 3D video animation", essential: false, premium: true, premiumOnly: true },
  { feature: "Visual finish", essential: "Modern", premium: "Agency-level, premium", premiumOnly: true },
  { feature: "Personal guidance (marketing & social growth)", essential: false, premium: "FREE 5–6 sessions", premiumOnly: true },
];

function Cell({ value, highlight }: { value: string | boolean; highlight?: boolean }) {
  if (typeof value === "boolean") {
    return value ? (
      <Check className={`w-4 h-4 ${highlight ? "text-brand-orange" : "text-white/70"}`} />
    ) : (
      <X className="w-4 h-4 text-white/20" />
    );
  }
  return <span className={`text-xs sm:text-sm ${highlight ? "text-brand-orange font-semibold" : "text-white/70"}`}>{value}</span>;
}

export default function PricingComparisonTable() {
  return (
    <section className="py-20 px-6 bg-transparent">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl overflow-hidden border border-brand-orange/15"
          style={{
            background: "rgba(255,255,255,0.02)",
            backdropFilter: "blur(12px)",
          }}
        >
          <div className="p-6 sm:p-8 border-b border-white/8">
            <p className="section-label mb-2">COMPARE PLANS</p>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              Essential vs. Premium — side by side.
            </h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/8">
                  <th className="text-left text-xs font-bold uppercase tracking-wide text-brand-gray-text py-4 px-4 sm:px-6">
                    Feature
                  </th>
                  <th className="text-center text-xs font-bold uppercase tracking-wide text-white/70 py-4 px-3">
                    Essential
                  </th>
                  <th className="text-center text-xs font-bold uppercase tracking-wide text-brand-orange py-4 px-3">
                    Premium ⭐
                  </th>
                </tr>
              </thead>
              <tbody>
                {ROWS.map((row, i) => (
                  <tr
                    key={i}
                    className={`border-b border-white/6 last:border-b-0 ${
                      row.premiumOnly ? "bg-brand-orange/[0.04]" : ""
                    }`}
                  >
                    <td className="text-xs sm:text-sm text-white py-3.5 px-4 sm:px-6 font-medium">
                      {row.feature}
                    </td>
                    <td className="text-center py-3.5 px-3">
                      <div className="flex justify-center">
                        <Cell value={row.essential} />
                      </div>
                    </td>
                    <td className="text-center py-3.5 px-3">
                      <div className="flex justify-center">
                        <Cell value={row.premium} highlight={row.premiumOnly} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-6 sm:p-8 text-center border-t border-white/8">
            <p className="text-sm text-brand-gray-text mb-4">
              Still confused? Let's talk it through — no pressure, no obligation.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center px-8 py-3.5 rounded-full text-sm font-bold btn-red"
            >
              Still Confused? Get a Free Booking Call →
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
