'use client';
import { useState } from 'react';
import { useCourse } from '@/lib/course/content';
import { cx } from '@/lib/course/useScroll';

export default function Faq() {
  const { faq } = useCourse();
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section id="faq">
      <div className="wrap">
        <p className="label rv">{faq.label}</p>
        <h2 className="rv">{faq.title}</h2>
        <div className="faq">
          {faq.items.map(([q, a], i) => (
            <div className={cx('q', open === i && 'open')} key={q}>
              <button aria-expanded={open === i} onClick={() => setOpen(open === i ? null : i)}>
                {q}
              </button>
              <div className="a">{a}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
