'use client';
import { useEffect, useRef, useState } from 'react';
import { useCourse } from '@/lib/course/content';
import { cx, useSectionProgress } from '@/lib/course/useScroll';

/** Option C: the slider moves as you scroll. Each row flips from a faded cross to a glowing tick. */
export default function BeforeAfter() {
  const { future } = useCourse();
  const ref = useRef<HTMLElement>(null);
  const n = future.rows.length;
  // Phones and touch screens: no pinned scroll-scrub. On iPhone, three screens of pinned scrolling
  // felt like the page was stuck, so there each row flips as it scrolls into view instead.
  const [flat, setFlat] = useState(false);
  const [seen, setSeen] = useState(0);
  useEffect(() => {
    const mq = window.matchMedia('(max-width:760px),(hover:none)');
    const on = () => setFlat(mq.matches);
    on();
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);
  useEffect(() => {
    if (!flat || !ref.current) return;
    const rows = [...ref.current.querySelectorAll<HTMLElement>('.br')];
    const io = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (!e.isIntersecting) return;
          setSeen((v) => Math.max(v, rows.indexOf(e.target as HTMLElement) + 1));
          io.unobserve(e.target);
        }),
      { rootMargin: '0px 0px -30% 0px' },
    );
    rows.forEach((r) => io.observe(r));
    return () => io.disconnect();
  }, [flat]);
  const scrub = useSectionProgress(ref, 1.1, !flat);
  const p = flat ? seen / n : scrub;
  const pct = Math.round(p * 100);
  return (
    <section className={cx('bas', flat && 'flat')} id="future" ref={ref} style={flat ? undefined : { height: '320svh' }}>
      <div className="bas-st grid-bg">
        <div className="wrap">
          <p className="label">{future.label}</p>
          <h2>
            {future.title[0]}
            <br />
            <span className="accent">{future.title[1]}</span>
          </h2>
          <p className="lead">{future.lead}</p>
          <div className="sl" aria-hidden="true">
            <span className={pct < 50 ? 'lit' : 'dim'}>BEFORE</span>
            <div className="t">
              <i style={{ width: `${pct}%` }} />
              <u style={{ left: `${pct}%` }} />
            </div>
            <span className={pct >= 50 ? 'lit' : 'dim'}>AFTER</span>
            <span className="pc2">{pct}%</span>
          </div>
          <div className="brs">
            {future.rows.map(([b, a], i) => (
              <div className={cx('br', (flat ? i < seen : p * n > i + 0.6) && 'done')} key={b}>
                <div className="bf">{b}</div>
                <div className="af">{a}</div>
              </div>
            ))}
          </div>
          <p className="soft">{future.soft}</p>
        </div>
      </div>
    </section>
  );
}
