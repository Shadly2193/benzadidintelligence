"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

const WHO = [
  "Doctor / Clinic",
  "Hospital",
  "Pharma / Medical company",
  "NGO / Non-profit",
  "Engineering / Architecture firm",
  "Other business",
  "Individual professional",
];
const WHERE = ["Bangladesh", "International", "Both"];
const WHAT = [
  "Custom website",
  "Management software",
  "Web app / portal",
  "Payment / booking system",
  "AI / automation",
  "Mobile app",
  "Not sure yet",
];
const USERS = ["Just me", "2–10 people", "10–50 people", "50+ people"];
const EXISTING = ["No — starting fresh", "Yes — upgrade it", "Yes — replace it"];

const FEATURES_BY_WHAT: Record<string, string[]> = {
  "Custom website": ["Bilingual (Bangla + English)", "Admin panel to edit content", "Blog / news section", "Booking / contact system"],
  "Management software": ["Patient / customer database", "User logins & roles", "Reports & analytics", "Inventory / stock", "Multi-branch / multi-department"],
  "Web app / portal": ["User logins & roles", "Admin dashboard", "Third-party integrations", "Reports & analytics"],
  "Payment / booking system": ["Payment gateway", "Appointment scheduling", "Invoicing & receipts", "SMS / email reminders"],
  "AI / automation": ["AI assistant / chatbot", "Workflow automation", "Voice AI receptionist", "Third-party integrations"],
  "Mobile app": ["iOS + Android", "Push notifications", "User logins & roles", "Payment gateway"],
  "Not sure yet": ["Payment gateway", "User logins & roles", "Admin dashboard", "Reports & analytics"],
};
const EXTRA_BY_WHO: Record<string, string[]> = {
  "NGO / Non-profit": ["Donor management", "Volunteer tracking", "Project reporting"],
  "Hospital": ["Multi-department workflow", "Patient records"],
  "Doctor / Clinic": ["Patient records", "Prescription / visit history"],
  "Pharma / Medical company": ["Product catalogue", "Distributor / rep management"],
  "Engineering / Architecture firm": ["Project tracking", "Client portal"],
};

const cardBase = "px-3.5 py-2.5 rounded-xl text-xs sm:text-sm text-left transition-colors border";

function Chip({ selected, onClick, children }: { selected: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cardBase}
      style={{
        background: selected ? "rgba(255,106,0,0.16)" : "rgba(10,6,3,0.6)",
        borderColor: selected ? "rgba(255,106,0,0.7)" : "rgba(255,106,0,0.18)",
        color: selected ? "#FFF0E0" : "rgba(255,240,224,0.7)",
        fontWeight: selected ? 600 : 400,
      }}
    >
      {children}
    </button>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return <p className="text-xs font-bold text-brand-gray-text uppercase tracking-widest mb-2.5">{children}</p>;
}

const inputStyle = { background: "rgba(10,6,3,0.7)", border: "1px solid rgba(255,106,0,0.2)" };
const inputClass = "w-full px-4 py-3 rounded-xl text-sm text-white placeholder:text-white/25 focus:outline-none";

interface Props {
  startingFrom: number;
  delivery: string;
}

export default function CustomInquiryForm({ startingFrom, delivery }: Props) {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [who, setWho] = useState("");
  const [where, setWhere] = useState("");
  const [what, setWhat] = useState<string[]>([]);
  const [problem, setProblem] = useState("");
  const [features, setFeatures] = useState<string[]>([]);
  const [users, setUsers] = useState("");
  const [existing, setExisting] = useState("");
  const [existingLink, setExistingLink] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [org, setOrg] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const price = `$${startingFrom.toLocaleString("en-US")}`;
  const featureOptions = Array.from(
    new Set([...what.flatMap((w) => FEATURES_BY_WHAT[w] ?? []), ...(EXTRA_BY_WHO[who] ?? [])])
  );

  const toggle = (list: string[], setList: (v: string[]) => void, v: string) =>
    setList(list.includes(v) ? list.filter((x) => x !== v) : [...list, v]);

  const step1Ok = !!who && !!where;
  const step2Ok = what.length > 0 && problem.trim().length >= 10 && !!users && !!existing;
  const emailOk = /^\S+@\S+\.\S+$/.test(email.trim());
  const step3Ok = name.trim().length > 1 && emailOk && agreed;

  async function submit() {
    if (!step3Ok || submitting) return;
    setSubmitting(true);
    setError("");
    const message = [
      "CUSTOM PROJECT INQUIRY",
      `Who: ${who}`,
      `Users located in: ${where}`,
      `Wants built: ${what.join(", ")}`,
      `Problem: ${problem.trim()}`,
      `Must-have features: ${features.length ? features.join(", ") : "—"}`,
      `Number of users: ${users}`,
      `Existing system: ${existing}${existingLink.trim() ? " (" + existingLink.trim() + ")" : ""}`,
      `Organization: ${org.trim() || "—"}`,
      `WhatsApp: ${whatsapp.trim() || "—"}`,
      `Acknowledged: starting from ${price}, delivery ${delivery}`,
    ].join("\n");

    const supabase = createClient();
    const { error: insertError } = await supabase.from("leads").insert({
      name: name.trim(),
      email: email.trim(),
      interested_service: "custom",
      message,
    });
    if (insertError) {
      setSubmitting(false);
      setError("Something went wrong saving your details. Please try again.");
      return;
    }
    const q = new URLSearchParams({ from: "custom", name: name.trim(), email: email.trim(), service: "website" });
    router.push(`/contact?${q.toString()}`);
  }

  return (
    <div
      className="rounded-2xl p-5 sm:p-8"
      style={{ background: "rgba(255,106,0,0.04)", border: "1px solid rgba(255,106,0,0.2)" }}
    >
      <div
        className="rounded-xl px-4 py-3 mb-6 text-xs sm:text-sm text-white/85"
        style={{ background: "rgba(255,106,0,0.08)", border: "1px solid rgba(255,106,0,0.25)" }}
      >
        Custom projects start from <span className="font-bold text-brand-orange">{price}</span> · delivery{" "}
        <span className="font-bold text-brand-orange">{delivery}</span>
      </div>

      <div className="flex items-center gap-3 mb-6">
        <p className="text-[11px] font-bold tracking-widest uppercase text-brand-orange whitespace-nowrap">
          Step {step} of 3
        </p>
        <div className="flex-1 h-1 rounded-full bg-white/10 overflow-hidden">
          <div
            className="h-full rounded-full bg-brand-orange transition-all duration-300"
            style={{ width: `${(step / 3) * 100}%` }}
          />
        </div>
      </div>

      {step === 1 && (
        <div className="space-y-7">
          <div>
            <Label>Who is this for?</Label>
            <div className="flex flex-wrap gap-2">
              {WHO.map((o) => (
                <Chip key={o} selected={who === o} onClick={() => setWho(o)}>{o}</Chip>
              ))}
            </div>
          </div>
          <div>
            <Label>Where will your users / customers be?</Label>
            <div className="flex flex-wrap gap-2">
              {WHERE.map((o) => (
                <Chip key={o} selected={where === o} onClick={() => setWhere(o)}>{o}</Chip>
              ))}
            </div>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-7">
          <div>
            <Label>What do you want built? (pick all that apply)</Label>
            <div className="flex flex-wrap gap-2">
              {WHAT.map((o) => (
                <Chip key={o} selected={what.includes(o)} onClick={() => toggle(what, setWhat, o)}>{o}</Chip>
              ))}
            </div>
          </div>
          <div>
            <Label>Describe the problem in one or two sentences</Label>
            <textarea
              rows={3}
              value={problem}
              onChange={(e) => setProblem(e.target.value)}
              placeholder="e.g. We manage 200 patients a day on paper and lose track of follow-ups."
              className={inputClass + " resize-y"}
              style={inputStyle}
            />
          </div>
          {featureOptions.length > 0 && (
            <div>
              <Label>Must-have features (optional)</Label>
              <div className="flex flex-wrap gap-2">
                {featureOptions.map((o) => (
                  <Chip key={o} selected={features.includes(o)} onClick={() => toggle(features, setFeatures, o)}>{o}</Chip>
                ))}
              </div>
            </div>
          )}
          <div>
            <Label>How many people will use it?</Label>
            <div className="flex flex-wrap gap-2">
              {USERS.map((o) => (
                <Chip key={o} selected={users === o} onClick={() => setUsers(o)}>{o}</Chip>
              ))}
            </div>
          </div>
          <div>
            <Label>Do you already have a website or software?</Label>
            <div className="flex flex-wrap gap-2">
              {EXISTING.map((o) => (
                <Chip key={o} selected={existing === o} onClick={() => setExisting(o)}>{o}</Chip>
              ))}
            </div>
            {existing.startsWith("Yes") && (
              <input
                type="text"
                value={existingLink}
                onChange={(e) => setExistingLink(e.target.value)}
                placeholder="Link (optional)"
                className={inputClass + " mt-3"}
                style={inputStyle}
              />
            )}
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label>Your name</Label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Dr. Rahman" className={inputClass} style={inputStyle} />
            </div>
            <div>
              <Label>Email</Label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className={inputClass} style={inputStyle} />
            </div>
            <div>
              <Label>WhatsApp (optional)</Label>
              <input type="text" value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} placeholder="+880…" className={inputClass} style={inputStyle} />
            </div>
            <div>
              <Label>Organization (optional)</Label>
              <input type="text" value={org} onChange={(e) => setOrg(e.target.value)} placeholder="Clinic / company name" className={inputClass} style={inputStyle} />
            </div>
          </div>

          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mt-1 accent-brand-orange w-4 h-4 flex-shrink-0"
            />
            <span className="text-sm text-white/80 leading-snug">
              I understand custom projects start from <strong className="text-white">{price}</strong> and take{" "}
              <strong className="text-white">{delivery}</strong> to deliver.
            </span>
          </label>

          {error && <p className="text-xs text-red-400">{error}</p>}
        </div>
      )}

      <div className="flex items-center justify-between mt-8">
        {step > 1 ? (
          <button type="button" onClick={() => setStep(step - 1)} className="text-sm text-brand-gray-text hover:text-white">
            ← Back
          </button>
        ) : (
          <span />
        )}
        {step < 3 ? (
          <button
            type="button"
            disabled={step === 1 ? !step1Ok : !step2Ok}
            onClick={() => setStep(step + 1)}
            className="inline-flex items-center px-7 py-3 rounded-full text-sm font-bold btn-red disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Next →
          </button>
        ) : (
          <button
            type="button"
            disabled={!step3Ok || submitting}
            onClick={submit}
            className="inline-flex items-center px-7 py-3 rounded-full text-sm font-bold btn-red disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {submitting ? "Saving…" : "Book My Free Call →"}
          </button>
        )}
      </div>
    </div>
  );
}
