'use client';
import { createContext, useContext, useMemo } from 'react';
import { courseDefaults, type CourseContent } from '@/lib/course/defaults';

const Ctx = createContext<CourseContent>(courseDefaults);

export function CourseProvider({ value, children }: { value: CourseContent; children: React.ReactNode }) {
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

/** Page content (published, or the draft in preview) plus a WhatsApp link builder. */
export function useCourse() {
  const c = useContext(Ctx);
  return useMemo(() => {
    const sections = c.sections.filter((s) => !c.hidden.includes(s.id));
    const waLink = (text: string) => `https://wa.me/${c.whatsapp}?text=${encodeURIComponent(text)}`;
    return { ...c, sections, waLink };
  }, [c]);
}
