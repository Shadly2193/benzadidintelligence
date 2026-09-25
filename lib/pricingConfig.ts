export interface PricingConfig {
  addon: { enabled: boolean; label: string; sub: string; price: number };
  bonusFeatureIds: string[];
  bonusRowIds: string[];
  custom: { startingFrom: number; delivery: string };
}

export const DEFAULT_PRICING_CONFIG: PricingConfig = {
  addon: {
    enabled: true,
    label: "Custom detailed appointment booking system",
    sub: "A fully customised booking system for your practice, controlled from your own admin panel.",
    price: 200,
  },
  bonusFeatureIds: [],
  bonusRowIds: [],
  custom: { startingFrom: 3000, delivery: "90–150 days" },
};

export function mergePricingConfig(raw: unknown): PricingConfig {
  const r = (raw ?? {}) as Partial<PricingConfig>;
  return {
    addon: { ...DEFAULT_PRICING_CONFIG.addon, ...(r.addon ?? {}) },
    bonusFeatureIds: r.bonusFeatureIds ?? [],
    bonusRowIds: r.bonusRowIds ?? [],
    custom: { ...DEFAULT_PRICING_CONFIG.custom, ...(r.custom ?? {}) },
  };
}
