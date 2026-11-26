'use client';
import { useEffect, useState } from 'react';
import { useCourse } from '@/lib/course/content';
import './recentJoins.css';

interface P { id: number; name: string; type: 'Doctor' | 'Intern' | 'Student'; college: string; at: string; kind: 'registered' | 'joined' }

const shuffle = <T,>(xs: T[]) => [...xs].sort(() => Math.random() - 0.5);

/** Joined first, then the pattern joined, joined, registered; leftovers at the end. Never the same person twice in a row. */
function mix(xs: P[]) {
  const J = shuffle(xs.filter((x) => x.kind === 'joined'));
  const R = shuffle(xs.filter((x) => x.kind === 'registered'));
  const a: P[] = [];
  while (J.length || R.length) {
    for (let k = 0; k < 2 && J.length; k++) a.push(J.shift()!);
    if (R.length) a.push(R.shift()!);
  }
  for (let k = 1; k < a.length; k++) {
    if (a[k].id !== a[k - 1].id) continue;
    const s = a.findIndex((x, m) => m > k && x.kind === a[k].kind && x.id !== a[k - 1].id);
    if (s > 0) [a[k], a[s]] = [a[s], a[k]];
  }
  return a;
}

const ago = (iso: string) => {
  const m = Math.max(1, Math.round((Date.now() - +new Date(iso)) / 60000));
  if (m < 60) return `${m} min ago`;
  const h = Math.round(m / 60);
  if (h < 24) return `${h} hour${h > 1 ? 's' : ''} ago`;
  const d = Math.round(h / 24);
  return d === 1 ? 'yesterday' : `${d} days ago`;
};

/** Small popup, bottom-left: real registrations from the last 30 days, each shown once, then it stops. */
export default function RecentJoins() {
  const { collegeMap: t } = useCourse();
  const [list, setList] = useState<P[]>([]);
  const [i, setI] = useState(-1);
  const [on, setOn] = useState(false);
  const [closed, setClosed] = useState(false);
  const enabled = (t.toast ?? 'on').trim().toLowerCase() !== 'off';

  useEffect(() => {
    if (!enabled) return;
    fetch('/api/course/recent').then((r) => r.json()).then((j) => setList(mix(j.people ?? []))).catch(() => {});
  }, [enabled]);

  useEffect(() => {
    if (!list.length || closed) return;
    const timers: ReturnType<typeof setTimeout>[] = [];
    list.forEach((_, k) => {
      const start = 4000 + k * 9000;
      timers.push(setTimeout(() => { setI(k); setOn(true); }, start));
      timers.push(setTimeout(() => setOn(false), start + 5500));
    });
    return () => timers.forEach(clearTimeout);
  }, [list, closed]);

  if (!enabled || closed || i < 0) return null;
  const p = list[i];
  return (
    <div className={`rj ${p.kind === 'joined' ? 'rj-join' : ''} ${on ? 'rj-on' : ''}`} role="status" aria-live="polite">
      <button className="rj-x" aria-label="Close" onClick={() => setClosed(true)}>✕</button>
      <span className="rj-pin">
        {p.kind === 'joined' ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFD27A" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>
        ) : <svg width="18" height="24" viewBox="0 0 24 32" aria-hidden="true"><path d="M12 0C5.4 0 0 5.3 0 11.9 0 20.8 12 32 12 32s12-11.2 12-20.1C24 5.3 18.6 0 12 0z" fill="#FF6A00"/><circle cx="12" cy="12" r="4.5" fill="#0a0603"/></svg>}
      </span>
      <span className="rj-body">
        <span className="rj-t1">{p.name}<span className={`rj-b rj-${p.type}`}>{p.type}</span>{p.kind === 'joined' && <span className="rj-b rj-mem">MEMBER</span>}</span>
        <span className="rj-t2">from {p.college} {p.kind === 'joined' ? t.toastJoined : t.toastText}</span>
        <span className="rj-t3">{ago(p.at)}</span>
      </span>
    </div>
  );
}
