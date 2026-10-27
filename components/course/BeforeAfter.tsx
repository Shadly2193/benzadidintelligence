'use client';
import { useRef } from 'react';
import { future } from '@/lib/course/site';
import { cx, useSectionProgress } from '@/lib/course/useScroll';

/** Option C: the slider moves as you scroll. Each row flips from a faded cross to a glowing tick. */
export default function BeforeAfter() {
  const ref = useRef<HTMLElement>(null);
  const p = useSectionProgress(ref, 1.1);
  const n = future.rows.length;
  const pct = Math.round(p * 100);
  return (
    <section className="bas" id="future" ref={ref} style={{ height: '320svh' }}>
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
              <div className={cx('br', p * 1.0 * n > i + 0.6 && 'done')} key={b}>
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
