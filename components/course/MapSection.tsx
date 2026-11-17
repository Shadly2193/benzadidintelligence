'use client';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useCourse } from '@/lib/course/content';
import type { MapPin } from './CollegeMap';

const CollegeMap = dynamic(() => import('./CollegeMap'), { ssr: false });

interface Row { name: string; city: string; ll: [number, number]; n: number; Doctor: number; Intern: number; Student: number }

const TYPES = ['Doctor', 'Intern', 'Student'] as const;
const plural = (n: number, w: string) => `${n} ${w}${n > 1 ? 's' : ''}`;

/** Public: one pin per medical college our learners come from. Counts only, refreshed every minute. */
export default function MapSection() {
  const { collegeMap: t } = useCourse();
  const [rows, setRows] = useState<Row[] | null>(null);

  useEffect(() => {
    let live = true;
    const load = () =>
      fetch('/api/course/map')
        .then((r) => r.json())
        .then((j) => live && setRows(j.colleges ?? []))
        .catch(() => {});
    load();
    const id = setInterval(load, 60000);
    return () => {
      live = false;
      clearInterval(id);
    };
  }, []);

  if (rows && !rows.length) return null;
  const pins: MapPin[] = (rows ?? []).map((r) => ({
    key: r.name,
    ll: r.ll,
    n: r.n,
    popup: [r.name, TYPES.filter((k) => r[k]).map((k) => plural(r[k], k)).join(' · ')].join('\n'),
  }));

  return (
    <section className="grid-bg" id="map">
      <div className="wrap">
        <div className="cmap-head">
          <p className="label">{t.label}</p>
          <h2>
            {t.title} <span className="accent">{t.accent}</span>
          </h2>
          <p className="lead">{t.lead}</p>
        </div>
        <div className="cmap-frame corner">
          <CollegeMap pins={pins} />
        </div>
      </div>
    </section>
  );
}
