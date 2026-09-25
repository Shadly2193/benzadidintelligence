import { createClient } from "@/lib/supabase/server";
import { Film, Inbox, Quote, Briefcase, Plus, ArrowRight } from "lucide-react";
import Link from "next/link";

async function getCounts() {
  const supabase = await createClient();

  const [videos, leadsThisMonth, testimonials, services] = await Promise.all([
    supabase.from("portfolio_videos").select("*", { count: "exact", head: true }),
    supabase
      .from("leads")
      .select("*", { count: "exact", head: true })
      .gte("created_at", new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString()),
    supabase.from("testimonials").select("*", { count: "exact", head: true }),
    supabase.from("services").select("*", { count: "exact", head: true }),
  ]);

  return {
    videos: videos.count ?? 0,
    leadsThisMonth: leadsThisMonth.count ?? 0,
    testimonials: testimonials.count ?? 0,
    services: services.count ?? 0,
  };
}

async function getRecentLeads() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("leads")
    .select("id, name, interested_service, status, created_at")
    .order("created_at", { ascending: false })
    .limit(5);
  return data ?? [];
}

export default async function AdminDashboardPage() {
  const counts = await getCounts();
  const recentLeads = await getRecentLeads();

  const stats = [
    { label: "Portfolio Videos", value: counts.videos, icon: Film, highlight: true },
    { label: "Leads This Month", value: counts.leadsThisMonth, icon: Inbox, highlight: false },
    { label: "Testimonials", value: counts.testimonials, icon: Quote, highlight: false },
    { label: "Active Services", value: counts.services, icon: Briefcase, highlight: false },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-black text-white">Overview</h1>
        <p className="text-sm text-brand-gray-text mt-1">Here's what's happening on your website.</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((s) => (
          <div
            key={s.label}
            className={`rounded-2xl p-5 border ${
              s.highlight
                ? "bg-gradient-to-br from-brand-orange to-orange-700 border-brand-orange/40"
                : "bg-white/[0.02] border-white/10"
            }`}
          >
            <div
              className={`w-9 h-9 rounded-lg flex items-center justify-center mb-4 ${
                s.highlight ? "bg-white/15" : "bg-brand-orange/10"
              }`}
            >
              <s.icon size={16} className={s.highlight ? "text-white" : "text-brand-orange"} />
            </div>
            <p className={`text-3xl font-black ${s.highlight ? "text-white" : "text-white"}`}>
              {s.value}
            </p>
            <p className={`text-xs mt-1 ${s.highlight ? "text-white/80" : "text-brand-gray-text"}`}>
              {s.label}
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Quick actions */}
        <div className="rounded-2xl p-5 border border-white/10 bg-white/[0.02]">
          <h2 className="text-sm font-bold text-white mb-4">Quick Actions</h2>
          <div className="flex flex-col gap-2">
            {[
              { label: "Add Portfolio Video", href: "/admin/videos" },
              { label: "Add Testimonial", href: "/admin/testimonials" },
              { label: "Edit Pricing", href: "/admin/services" },
            ].map((action) => (
              <Link
                key={action.href}
                href={action.href}
                className="flex items-center justify-between px-3.5 py-2.5 rounded-lg bg-black/20 border border-white/5 text-sm text-white hover:border-brand-orange/40 transition-colors"
              >
                <span className="flex items-center gap-2">
                  <Plus size={14} className="text-brand-orange" />
                  {action.label}
                </span>
                <ArrowRight size={14} className="text-brand-gray-text" />
              </Link>
            ))}
          </div>
        </div>

        {/* Recent leads */}
        <div className="lg:col-span-2 rounded-2xl p-5 border border-white/10 bg-white/[0.02]">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-white">Recent Leads</h2>
            <Link href="/admin/leads" className="text-xs text-brand-orange hover:underline">
              View all →
            </Link>
          </div>

          {recentLeads.length === 0 ? (
            <p className="text-sm text-brand-gray-text py-8 text-center">
              No leads yet — they'll show up here once someone submits the contact form.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-xs text-brand-gray-text border-b border-white/10">
                    <th className="pb-2 font-medium">Name</th>
                    <th className="pb-2 font-medium">Interested In</th>
                    <th className="pb-2 font-medium">Date</th>
                    <th className="pb-2 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentLeads.map((lead) => (
                    <tr key={lead.id} className="border-b border-white/5 last:border-0">
                      <td className="py-2.5 text-white">{lead.name}</td>
                      <td className="py-2.5 text-brand-gray-text">{lead.interested_service ?? "—"}</td>
                      <td className="py-2.5 text-brand-gray-text">
                        {new Date(lead.created_at).toLocaleDateString()}
                      </td>
                      <td className="py-2.5">
                        <span
                          className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                            lead.status === "new"
                              ? "bg-brand-orange/15 text-brand-orange"
                              : "bg-white/10 text-brand-gray-text"
                          }`}
                        >
                          {lead.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
