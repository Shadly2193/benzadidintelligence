export interface SheetApplication {
  id: string;
  full_name: string;
  whatsapp: string | null;
  email: string | null;
  has_bmdc: boolean;
  bmdc_number: string | null;
  medical_college: string;
  session: string;
  student_year: string | null;
  price_phase: string | null;
  fee: number | null;
  status: string;
}

export interface SheetPayment {
  application_id: string;
  amount: number;
  paid_on: string; // YYYY-MM-DD
  method: string;
}

export interface SheetStudent {
  id: string;
  add: boolean; // may take a new line; otherwise only an existing line is updated
  remove: boolean; // no money on record (or rejected): an existing line is emptied
  name: string;
  whatsapp: string;
  email: string;
  who: string;
  bmdc: string;
  plan: string;
  fee: number;
  previous: number;
  received: number;
  refund: number;
  secondDate: string;
  method: string;
}

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const METHOD: Record<string, string> = { bkash: "bKash", nagad: "Nagad", rocket: "Rocket", bank: "Bank", cash: "Cash", other: "Other" };

/** The current month in Bangladesh: its Sheet tab name and YYYY-MM key. */
export function currentMonth(now = new Date()) {
  const d = new Date(now.getTime() + 6 * 3600_000);
  const y = d.getUTCFullYear();
  const m = d.getUTCMonth();
  return { tab: `${MONTHS[m]} ${y}`, key: `${y}-${String(m + 1).padStart(2, "0")}` };
}

function oneMonthLater(day: string) {
  const [y, m, d] = day.split("-").map(Number);
  const last = new Date(Date.UTC(y, m + 1, 0)).getUTCDate();
  const n = new Date(Date.UTC(y, m, Math.min(d, last)));
  return `${n.getUTCDate()} ${MONTHS[n.getUTCMonth()].slice(0, 3)} ${n.getUTCFullYear()}`;
}

/** One Sheet line per paying student, worked out from the admin panel's payments. */
export function buildStudent(a: SheetApplication, payments: SheetPayment[], monthKey: string): SheetStudent {
  const list = payments.filter((p) => p.application_id === a.id).sort((x, y) => x.paid_on.localeCompare(y.paid_on));
  const fee = a.fee ?? 0;
  const paid = list.reduce((s, p) => s + p.amount, 0);
  const previous = list.filter((p) => p.paid_on.slice(0, 7) < monthKey).reduce((s, p) => s + p.amount, 0);
  const refunded = a.status === "refunded";
  const installment = paid < fee || list.length > 1;
  const remove = paid === 0 || a.status === "rejected";
  return {
    id: a.id,
    add: !remove && !refunded,
    remove,
    name: a.full_name,
    whatsapp: a.whatsapp ?? "",
    email: a.email ?? "",
    who: a.has_bmdc ? "Doctor" : "Student",
    bmdc: a.has_bmdc ? (a.bmdc_number ?? "") : [a.medical_college, a.session, a.student_year].filter(Boolean).join(", "),
    plan: a.price_phase === "early" ? "Early bird" : installment ? "Installment" : "Full",
    fee,
    previous,
    received: paid - previous,
    refund: refunded ? paid : 0,
    secondDate: list.length && paid < fee && !refunded ? oneMonthLater(list[0].paid_on) : "",
    method: list.length ? (METHOD[list[list.length - 1].method] ?? "") : "",
  };
}
