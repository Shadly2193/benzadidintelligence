import fs from "fs";
import { createClient } from "@supabase/supabase-js";

const env = Object.fromEntries(
  fs.readFileSync(".env.local", "utf8").split(/\r?\n/).filter((l) => l.includes("=")).map((l) => {
    const i = l.indexOf("=");
    return [l.slice(0, i), l.slice(i + 1)];
  })
);
const s = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false } });
const must = (r, what) => { if (r.error) { console.error("FAIL", what, r.error.message); process.exit(1); } return r.data; };

const tiers = must(await s.from("pricing_tiers").select("*").eq("service_slug", "website"), "tiers");
const ess = tiers.find((t) => t.key === "essential");
const pre = tiers.find((t) => t.key === "premium");

must(await s.from("pricing_tiers").update({ price: 550 }).eq("id", ess.id), "ess price");
must(await s.from("pricing_tiers").update({ price: 800 }).eq("id", pre.id), "pre price");

const feats = must(await s.from("pricing_tier_features").select("*").in("tier_id", [ess.id, pre.id]), "features");
for (const f of feats) {
  const patch = {};
  if (f.label.includes("30–40 days")) patch.label = f.label.replace("30–40 days", "75–90 days");
  if (f.label === "Booking & lead capture system") {
    patch.label = "Appointment booking & lead capture";
    patch.sub = "One-tap call to your clinic hotline, plus every enquiry captured for you";
  }
  if (Object.keys(patch).length) must(await s.from("pricing_tier_features").update(patch).eq("id", f.id), "feat " + f.label);
}

let premFeats = feats.filter((f) => f.tier_id === pre.id);
let videoFeat = premFeats.find((f) => f.label === "Video / 3D video animation");
if (!videoFeat) {
  const design = premFeats.find((f) => f.label.startsWith("3D & scroll"));
  const at = (design?.sort_order ?? 4) + 1;
  for (const f of premFeats.filter((f) => f.sort_order >= at)) {
    must(await s.from("pricing_tier_features").update({ sort_order: f.sort_order + 1 }).eq("id", f.id), "shift");
  }
  videoFeat = must(
    await s.from("pricing_tier_features").insert({
      tier_id: pre.id, label: "Video / 3D video animation",
      sub: "Cinematic animated sequences that make your site unforgettable", sort_order: at,
    }).select().single(),
    "video feat"
  );
}
const designFeat = premFeats.find((f) => f.label.startsWith("3D & scroll"));
const guidFeat = premFeats.find((f) => f.label.startsWith("FREE 5"));

const rows = must(await s.from("comparison_rows").select("*").eq("service_slug", "website").order("sort_order"), "rows");
for (const r of rows) {
  if (r.feature.includes("30–40 days")) must(await s.from("comparison_rows").update({ feature: r.feature.replace("30–40 days", "75–90 days") }).eq("id", r.id), "row days");
  if (r.feature === "Booking & lead capture system") must(await s.from("comparison_rows").update({ feature: "Appointment booking & lead capture" }).eq("id", r.id), "row booking");
}
let addonRow = rows.find((r) => r.feature === "Custom detailed appointment booking system");
if (!addonRow) {
  addonRow = must(
    await s.from("comparison_rows").insert({
      service_slug: "website", feature: "Custom detailed appointment booking system",
      essential_value: "+$200 add-on", premium_value: "+$200 add-on", premium_only: false, sort_order: rows.length,
    }).select().single(),
    "addon row"
  );
}
const bonusRowIds = rows.filter((r) => ["Design style", "Video / 3D video animation", "Personal guidance (marketing & social growth)"].includes(r.feature)).map((r) => r.id);

const config = {
  addon: {
    enabled: true,
    label: "Custom detailed appointment booking system",
    sub: "A fully customised booking system for your practice, controlled from your own admin panel.",
    price: 200,
  },
  bonusFeatureIds: [designFeat?.id, videoFeat?.id, guidFeat?.id].filter(Boolean),
  bonusRowIds,
  custom: { startingFrom: 3000, delivery: "90–150 days" },
};
must(await s.from("page_content").upsert({ page: "website_pricing", section: "config", content: config }, { onConflict: "page,section" }), "config");

must(await s.from("services").update({ pricing: "Starting from $550" }).eq("slug", "website"), "service pricing");

console.log("DONE. bonus features:", config.bonusFeatureIds.length, "bonus rows:", bonusRowIds.length);
const { data: svc } = await s.from("services").select("slug,pricing").order("sort_order");
console.log(svc);
