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
  freeClass: site.freeClass,
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

/** Sections added in code after content was saved still appear, right after their neighbour. */
function withNewSections(saved: CourseContent['sections']) {
  const out = [...saved];
  courseDefaults.sections.forEach((s, i) => {
    if (out.some((x) => x.id === s.id)) return;
    const prev = courseDefaults.sections[i - 1];
    const at = prev ? out.findIndex((x) => x.id === prev.id) + 1 : 0;
    out.splice(at, 0, s);
  });
  return out;
}

export function mergeCourse(over: unknown): CourseContent {
  const c = deepMerge(courseDefaults, over);
  return { ...c, sections: withNewSections(c.sections) };
}
