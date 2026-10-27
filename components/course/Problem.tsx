'use client';
import { useState } from 'react';
import { useCourse } from '@/lib/course/content';
import { cx } from '@/lib/course/useScroll';

export default function Problem() {
  const { problem } = useCourse();
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section className="hook" id="problem">
      <div className="wrap">
        <p className="label rv">{problem.label}</p>
        <div className="big">
          {problem.big.map((t, i) => (
            <span className="line" key={t}>
              <span className={i === 1 ? 'dim' : undefined}>{t}</span>
            </span>
          ))}
        </div>
        <div className="flips">
          {problem.cards.map((c, i) => (
            <div
              key={c.q}
              className={cx('flip rv', `d${i % 5}`, open === i && 'on')}
              role="button"
              aria-pressed={open === i}
              tabIndex={0}
              onClick={() => setOpen(open === i ? null : i)}
              onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setOpen(open === i ? null : i)}
            >
              <div>
                <div className="f">
                  <small>{String(i + 1).padStart(2, '0')}</small>
                  <h3>&ldquo;{c.q}&rdquo;</h3>
                  <span className="pto" aria-hidden="true">P.T.O &middot; Tap to flip &#8635;</span>
                </div>
                <div className="b">
                  <small>HOW WE FIX IT</small>
                  <p>{c.a}</p>
                  <span className="pto" aria-hidden="true">Tap to flip back &#8634;</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <p className="sm rv" style={{ marginTop: 14 }}>{problem.hint}</p>
      </div>
    </section>
  );
}
