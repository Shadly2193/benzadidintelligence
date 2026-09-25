"use client";
import { Fragment, useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface Lead {
  id: string;
  name: string;
  email: string;
  interested_service: string | null;
  message: string | null;
  status: "new" | "contacted" | "closed";
  created_at: string;
}

const STATUS_STYLES: Record<string, string> = {
  new: "bg-brand-orange/15 text-brand-orange",
  contacted: "bg-blue-500/15 text-blue-400",
  closed: "bg-white/10 text-brand-gray-text",
};

export default function LeadsManager() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [openId, setOpenId] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    const supabase = createClient();
    const { data } = await supabase.from("leads").select("*").order("created_at", { ascending: false });
    setLeads(data ?? []);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function updateStatus(id: string, status: Lead["status"]) {
    const supabase = createClient();
    await supabase.from("leads").update({ status }).eq("id", id);
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status } : l)));
  }

  async function handleDelete(id: string) {
    const supabase = createClient();
    await supabase.from("leads").delete().eq("id", id);
    setLeads((prev) => prev.filter((l) => l.id !== id));
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-black text-white">Leads</h1>
        <p className="text-sm text-brand-gray-text mt-1">Everyone who submitted the contact form.</p>
      </div>

      {loading ? (
        <p className="text-sm text-brand-gray-text">Loading…</p>
      ) : leads.length === 0 ? (
        <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-10 text-center">
          <p className="text-sm text-brand-gray-text">No leads yet — they'll show up here once someone submits the contact form.</p>
        </div>
      ) : (
        <div className="rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-brand-gray-text border-b border-white/10">
                  <th className="p-4 font-medium">Name</th>
                  <th className="p-4 font-medium">Email</th>
                  <th className="p-4 font-medium">Interested In</th>
                  <th className="p-4 font-medium">Date</th>
                  <th className="p-4 font-medium">Status</th>
                  <th className="p-4"></th>
                </tr>
              </thead>
              <tbody>
                {leads.map((lead) => (
                  <Fragment key={lead.id}>
                  <tr className="border-b border-white/5 last:border-0">
                    <td className="p-4 text-white font-medium">
                      {lead.name}
                      {lead.message && (
                        <button
                          onClick={() => setOpenId(openId === lead.id ? null : lead.id)}
                          className="ml-2 text-[10px] font-semibold text-brand-orange hover:underline"
                        >
                          {openId === lead.id ? "Hide details" : "View details"}
                        </button>
                      )}
                    </td>
                    <td className="p-4 text-brand-gray-text">{lead.email}</td>
                    <td className="p-4 text-brand-gray-text">{lead.interested_service ?? "—"}</td>
                    <td className="p-4 text-brand-gray-text">{new Date(lead.created_at).toLocaleDateString()}</td>
                    <td className="p-4">
                      <select
                        value={lead.status}
                        onChange={(e) => updateStatus(lead.id, e.target.value as Lead["status"])}
                        className={`text-[11px] font-semibold px-2 py-1 rounded-full border-0 outline-none cursor-pointer ${STATUS_STYLES[lead.status]}`}
                      >
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="closed">Closed</option>
                      </select>
                    </td>
                    <td className="p-4">
                      <button onClick={() => handleDelete(lead.id)} className="text-red-400/70 hover:text-red-400">
                        <Trash2 size={14} />
                      </button>
                    </td>
                  </tr>
                  {openId === lead.id && lead.message && (
                    <tr className="border-b border-white/5 bg-white/[0.02]">
                      <td colSpan={6} className="p-4 text-xs text-brand-gray-text whitespace-pre-line leading-relaxed">
                        {lead.message}
                      </td>
                    </tr>
                  )}
                  </Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
