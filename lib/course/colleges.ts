/**
 * Medical and dental colleges of Bangladesh with an approximate map position (city level is enough).
 * `a` = words or short names people type on the form. Matching is word-based and the list is checked
 * top to bottom, so put a more specific college before a general one (e.g. "Dhaka National" before "Dhaka").
 * A college that never matches shows in Admin → Course Map under "Not on the map": add it here.
 */
export interface College {
  key: string;
  name: string;
  city: string;
  ll: [number, number];
  a: string[];
}

export const COLLEGES: College[] = [
  // Private and specific names first
  { key: "cbmc", name: "Community Based Medical College", city: "Mymensingh", ll: [24.768, 90.418], a: ["community based", "cbmc", "cbmcb"] },
  { key: "dnmc", name: "Dhaka National Medical College", city: "Dhaka", ll: [23.711, 90.412], a: ["dhaka national", "dnmc"] },
  { key: "ddc", name: "Dhaka Dental College", city: "Dhaka", ll: [23.781, 90.353], a: ["dhaka dental", "ddc"] },
  { key: "sapporo", name: "Sapporo Dental College", city: "Dhaka", ll: [23.874, 90.39], a: ["sapporo"] },
  { key: "pioneer", name: "Pioneer Dental College", city: "Dhaka", ll: [23.8, 90.41], a: ["pioneer"] },
  { key: "bdc", name: "Bangladesh Dental College", city: "Dhaka", ll: [23.745, 90.373], a: ["bangladesh dental"] },
  { key: "udc", name: "University Dental College", city: "Dhaka", ll: [23.747, 90.38], a: ["university dental"] },
  { key: "update", name: "Update Dental College", city: "Dhaka", ll: [23.87, 90.395], a: ["update dental"] },
  { key: "citydental", name: "City Dental College", city: "Dhaka", ll: [23.75, 90.39], a: ["city dental"] },
  { key: "mandy", name: "Mandy Dental College", city: "Dhaka", ll: [23.74, 90.38], a: ["mandy"] },
  { key: "rdc", name: "Rajshahi Dental College", city: "Rajshahi", ll: [24.37, 88.6], a: ["rajshahi dental"] },
  { key: "bsmmu", name: "Bangabandhu Sheikh Mujib Medical University", city: "Dhaka", ll: [23.7385, 90.395], a: ["bsmmu", "bangabandhu sheikh mujib", "pg hospital", "bmu"] },
  { key: "hfrc", name: "Holy Family Red Crescent Medical College", city: "Dhaka", ll: [23.748, 90.401], a: ["holy family", "hfrcmc"] },
  { key: "bmc", name: "Bangladesh Medical College", city: "Dhaka", ll: [23.746, 90.374], a: ["bangladesh medical"] },
  { key: "ibnsina", name: "Ibn Sina Medical College", city: "Dhaka", ll: [23.751, 90.368], a: ["ibn sina", "ibne sina", "isimc"] },
  { key: "enam", name: "Enam Medical College", city: "Savar", ll: [23.845, 90.257], a: ["enam"] },
  { key: "akmmc", name: "Anwer Khan Modern Medical College", city: "Dhaka", ll: [23.747, 90.38], a: ["anwer khan", "anwar khan", "akmmc"] },
  { key: "delta", name: "Delta Medical College", city: "Dhaka", ll: [23.786, 90.354], a: ["delta"] },
  { key: "uamc", name: "Uttara Adhunik Medical College", city: "Dhaka", ll: [23.877, 90.388], a: ["uttara adhunik", "uamc"] },
  { key: "mcwh", name: "Medical College for Women & Hospital", city: "Dhaka", ll: [23.865, 90.395], a: ["medical college for women", "mcwh"] },
  { key: "popular", name: "Popular Medical College", city: "Dhaka", ll: [23.739, 90.382], a: ["popular"] },
  { key: "eastwest", name: "East West Medical College", city: "Dhaka", ll: [23.884, 90.4], a: ["east west"] },
  { key: "greenlife", name: "Green Life Medical College", city: "Dhaka", ll: [23.747, 90.383], a: ["green life", "greenlife"] },
  { key: "adin", name: "Ad-din Women's Medical College", city: "Dhaka", ll: [23.748, 90.405], a: ["ad din women", "addin women"] },
  { key: "sakina", name: "Ad-din Sakina Medical College", city: "Jashore", ll: [23.17, 89.21], a: ["sakina"] },
  { key: "shahabuddin", name: "Shahabuddin Medical College", city: "Dhaka", ll: [23.795, 90.415], a: ["shahabuddin"] },
  { key: "universal", name: "Universal Medical College", city: "Dhaka", ll: [23.78, 90.41], a: ["universal medical"] },
  { key: "zhsikder", name: "Z H Sikder Women's Medical College", city: "Dhaka", ll: [23.755, 90.365], a: ["sikder"] },
  { key: "aichi", name: "Aichi Medical College", city: "Dhaka", ll: [23.873, 90.4], a: ["aichi"] },
  { key: "usbangla", name: "US-Bangla Medical College", city: "Narayanganj", ll: [23.845, 90.505], a: ["us bangla"] },
  { key: "ashiyan", name: "Ashiyan Medical College", city: "Dhaka", ll: [23.83, 90.42], a: ["ashiyan"] },
  { key: "northern", name: "Northern International Medical College", city: "Dhaka", ll: [23.75, 90.38], a: ["northern international"] },
  { key: "afmc", name: "Armed Forces Medical College", city: "Dhaka", ll: [23.815, 90.405], a: ["armed forces", "afmc"] },
  { key: "imc", name: "International Medical College", city: "Gazipur", ll: [23.99, 90.38], a: ["international medical college"] },
  { key: "tairunnessa", name: "Tairunnessa Memorial Medical College", city: "Gazipur", ll: [23.99, 90.42], a: ["tairunnessa", "tairunnesa"] },
  { key: "monno", name: "Monno Medical College", city: "Manikganj", ll: [23.88, 90.03], a: ["monno"] },
  { key: "kumudini", name: "Kumudini Women's Medical College", city: "Tangail", ll: [24.105, 90.1], a: ["kumudini"] },
  { key: "jimc", name: "Jahurul Islam Medical College", city: "Kishoreganj", ll: [24.21, 90.95], a: ["jahurul", "zahurul"] },
  { key: "emc", name: "Eastern Medical College", city: "Cumilla", ll: [23.403, 91.156], a: ["eastern medical"] },
  { key: "central", name: "Central Medical College", city: "Cumilla", ll: [23.46, 91.18], a: ["central medical"] },
  { key: "nbmc", name: "North Bengal Medical College", city: "Sirajganj", ll: [24.46, 89.7], a: ["north bengal"] },
  { key: "kyamc", name: "Khwaja Yunus Ali Medical College", city: "Sirajganj", ll: [24.37, 89.63], a: ["khwaja yunus", "khaja yunus", "kyamc"] },
  { key: "prime", name: "Prime Medical College", city: "Rangpur", ll: [25.73, 89.26], a: ["prime medical"] },
  { key: "rcmc", name: "Rangpur Community Medical College", city: "Rangpur", ll: [25.75, 89.25], a: ["rangpur community"] },
  { key: "tmss", name: "TMSS Medical College", city: "Bogura", ll: [24.83, 89.36], a: ["tmss"] },
  { key: "ibmc", name: "Islami Bank Medical College", city: "Rajshahi", ll: [24.37, 88.6], a: ["islami bank"] },
  { key: "barind", name: "Barind Medical College", city: "Rajshahi", ll: [24.38, 88.61], a: ["barind"] },
  { key: "southern", name: "Southern Medical College", city: "Chattogram", ll: [22.36, 91.83], a: ["southern medical"] },
  { key: "cmosh", name: "Chattagram Maa-O-Shishu Hospital Medical College", city: "Chattogram", ll: [22.33, 91.81], a: ["maa o shishu", "ma o shishu", "cmosh"] },
  { key: "bgc", name: "BGC Trust Medical College", city: "Chattogram", ll: [22.25, 92.04], a: ["bgc"] },
  { key: "marine", name: "Marine City Medical College", city: "Chattogram", ll: [22.34, 91.83], a: ["marine city"] },
  { key: "jrrmc", name: "Jalalabad Ragib-Rabeya Medical College", city: "Sylhet", ll: [24.9, 91.85], a: ["ragib", "jalalabad"] },
  { key: "nemc", name: "North East Medical College", city: "Sylhet", ll: [24.89, 91.87], a: ["north east medical", "nemc"] },
  { key: "swmc", name: "Sylhet Women's Medical College", city: "Sylhet", ll: [24.895, 91.865], a: ["sylhet women"] },
  { key: "parkview", name: "Park View Medical College", city: "Sylhet", ll: [24.9, 91.86], a: ["park view"] },
  { key: "gazi", name: "Gazi Medical College", city: "Khulna", ll: [22.82, 89.55], a: ["gazi medical"] },
  { key: "diabetic", name: "Diabetic Association Medical College", city: "Faridpur", ll: [23.61, 89.84], a: ["diabetic association"] },
  // Government
  { key: "dmc", name: "Dhaka Medical College", city: "Dhaka", ll: [23.7258, 90.3976], a: ["dhaka medical", "dmc"] },
  { key: "ssmc", name: "Sir Salimullah Medical College", city: "Dhaka", ll: [23.7106, 90.4006], a: ["salimullah", "ssmc", "mitford"] },
  { key: "shsmc", name: "Shaheed Suhrawardy Medical College", city: "Dhaka", ll: [23.7699, 90.3712], a: ["suhrawardy", "shsmc"] },
  { key: "mugda", name: "Mugda Medical College", city: "Dhaka", ll: [23.7319, 90.429], a: ["mugda"] },
  { key: "stamc", name: "Shaheed Tajuddin Ahmad Medical College", city: "Gazipur", ll: [23.9999, 90.4203], a: ["tajuddin", "stamc"] },
  { key: "cmc", name: "Chittagong Medical College", city: "Chattogram", ll: [22.3593, 91.8304], a: ["chittagong medical", "chattogram medical", "chattagram medical", "cmc"] },
  { key: "rmc", name: "Rajshahi Medical College", city: "Rajshahi", ll: [24.3725, 88.5873], a: ["rajshahi medical", "rmc"] },
  { key: "mmc", name: "Mymensingh Medical College", city: "Mymensingh", ll: [24.742, 90.408], a: ["mymensingh medical", "mmc"] },
  { key: "somc", name: "Sylhet MAG Osmani Medical College", city: "Sylhet", ll: [24.8999, 91.8517], a: ["osmani", "somc", "sylhet medical"] },
  { key: "sbmc", name: "Sher-e-Bangla Medical College", city: "Barishal", ll: [22.689, 90.36], a: ["sher e bangla", "sher bangla", "shere bangla", "sbmc", "barisal medical", "barishal medical"] },
  { key: "rpmc", name: "Rangpur Medical College", city: "Rangpur", ll: [25.7559, 89.2444], a: ["rangpur medical", "rpmc"] },
  { key: "cumc", name: "Cumilla Medical College", city: "Cumilla", ll: [23.43, 91.17], a: ["cumilla medical", "comilla medical", "cumc", "comc"] },
  { key: "kmc", name: "Khulna Medical College", city: "Khulna", ll: [22.827, 89.54], a: ["khulna medical", "kmc"] },
  { key: "szmc", name: "Shaheed Ziaur Rahman Medical College", city: "Bogura", ll: [24.836, 89.373], a: ["ziaur", "szmc", "bogura medical", "bogra medical"] },
  { key: "fmc", name: "Faridpur Medical College", city: "Faridpur", ll: [23.6, 89.84], a: ["faridpur medical", "fmc"] },
  { key: "dinajpur", name: "Dinajpur Medical College", city: "Dinajpur", ll: [25.648, 88.655], a: ["dinajpur"] },
  { key: "pabna", name: "Pabna Medical College", city: "Pabna", ll: [24.0, 89.24], a: ["pabna"] },
  { key: "noakhali", name: "Abdul Malek Ukil Medical College", city: "Noakhali", ll: [22.87, 91.1], a: ["noakhali", "malek ukil"] },
  { key: "coxs", name: "Cox's Bazar Medical College", city: "Cox's Bazar", ll: [21.45, 92.0], a: ["cox"] },
  { key: "jashore", name: "Jashore Medical College", city: "Jashore", ll: [23.181, 89.205], a: ["jashore medical", "jessore medical", "jashore", "jessore"] },
  { key: "satkhira", name: "Satkhira Medical College", city: "Satkhira", ll: [22.71, 89.07], a: ["satkhira"] },
  { key: "kushtia", name: "Kushtia Medical College", city: "Kushtia", ll: [23.9, 89.13], a: ["kushtia"] },
  { key: "tangail", name: "Sheikh Hasina Medical College, Tangail", city: "Tangail", ll: [24.25, 89.92], a: ["tangail"] },
  { key: "jamalpur", name: "Sheikh Hasina Medical College, Jamalpur", city: "Jamalpur", ll: [24.92, 89.95], a: ["jamalpur"] },
  { key: "patuakhali", name: "Patuakhali Medical College", city: "Patuakhali", ll: [22.36, 90.33], a: ["patuakhali"] },
  { key: "gopalganj", name: "Sheikh Sayera Khatun Medical College", city: "Gopalganj", ll: [23.005, 89.83], a: ["gopalganj", "sayera khatun"] },
  { key: "manikganj", name: "Colonel Malek Medical College", city: "Manikganj", ll: [23.86, 90.0], a: ["colonel malek", "col malek", "manikganj"] },
  { key: "netrokona", name: "Netrokona Medical College", city: "Netrokona", ll: [24.88, 90.73], a: ["netrokona"] },
  { key: "naogaon", name: "Naogaon Medical College", city: "Naogaon", ll: [24.8, 88.94], a: ["naogaon"] },
  { key: "nilphamari", name: "Nilphamari Medical College", city: "Nilphamari", ll: [25.93, 88.85], a: ["nilphamari"] },
  { key: "magura", name: "Magura Medical College", city: "Magura", ll: [23.48, 89.42], a: ["magura"] },
  { key: "chandpur", name: "Chandpur Medical College", city: "Chandpur", ll: [23.23, 90.66], a: ["chandpur"] },
  { key: "habiganj", name: "Habiganj Medical College", city: "Habiganj", ll: [24.38, 91.41], a: ["habiganj"] },
  { key: "sirajganj", name: "Shaheed M. Monsur Ali Medical College", city: "Sirajganj", ll: [24.45, 89.7], a: ["monsur ali", "mansur ali", "sirajganj"] },
  { key: "kishoreganj", name: "Shahid Syed Nazrul Islam Medical College", city: "Kishoreganj", ll: [24.43, 90.78], a: ["nazrul islam", "kishoreganj"] },
  { key: "sunamganj", name: "Sunamganj Medical College", city: "Sunamganj", ll: [25.07, 91.4], a: ["sunamganj"] },
  { key: "rangamati", name: "Rangamati Medical College", city: "Rangamati", ll: [22.65, 92.17], a: ["rangamati"] },
  { key: "brahmanbaria", name: "Brahmanbaria Medical College", city: "Brahmanbaria", ll: [23.96, 91.11], a: ["brahmanbaria"] },
];

const norm = (s: string) => ` ${s.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim()} `;

/** The college a typed name belongs to, or null when it is not in the list. */
export function matchCollege(typed: string | null | undefined): College | null {
  if (!typed) return null;
  const t = norm(typed);
  return COLLEGES.find((c) => c.a.some((a) => t.includes(norm(a)))) ?? null;
}

export type LearnerType = "Doctor" | "Intern" | "Student";

/** BMDC number → Doctor, year "Intern" → Intern, otherwise Student. */
export function learnerType(a: { has_bmdc: boolean; student_year: string | null }): LearnerType {
  if (a.has_bmdc) return "Doctor";
  return /intern/i.test(a.student_year ?? "") ? "Intern" : "Student";
}
