import * as site from '@/lib/course/site';

/**
 * Everything on the course page that the admin can edit.
 * The code values in site.ts are the fallback: Supabase content is deep-merged on top,
 * so a missing field never renders blank.
 */
export const courseDefaults = {
  whatsapp: site.WHATSAPP_NUMBER,
  hidden: [] as string[],
  schedule: site.schedule,
  hero: site.hero,
  problem: site.problem,
  future: site.future,
  demo: site.demo,
  proof: site.proof,
  roadmap: site.roadmap,
  how: site.how,
  who: site.who,
  fit: site.fit,
  instructor: site.instructor,
  price: site.price,
  riskFree: site.riskFree,
  walkaway: site.walkaway,
  join: site.join,
  faq: site.faq,
  final: site.final,
  sections: site.sections,
};

export type CourseContent = typeof courseDefaults;

const isObj = (v: unknown): v is Record<string, unknown> => !!v && typeof v === 'object' && !Array.isArray(v);

/** Objects merge key by key; arrays and primitives replace the fallback only when the type matches. */
export function deepMerge<T>(base: T, over: unknown): T {
  if (isObj(base)) {
    if (!isObj(over)) return base;
    const out: Record<string, unknown> = { ...base };
    for (const k of Object.keys(base)) if (k in over) out[k] = deepMerge(base[k], over[k]);
    return out as T;
  }
  if (Array.isArray(base)) return (Array.isArray(over) ? over : base) as T;
  return (typeof over === typeof base ? over : base) as T;
}

export const mergeCourse = (over: unknown): CourseContent => deepMerge(courseDefaults, over);
