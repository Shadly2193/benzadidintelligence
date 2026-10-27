'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useCourse } from '@/lib/course/content';
import { cx } from '@/lib/course/useScroll';

/**
 * Hand-driven roadmap: swipe on phones, drag (or arrows / wheel) on laptops.
 * The card closest to the centre of the frame is focused, the rest are dimmed.
 */
export default function Roadmap() {
  const { roadmap } = useCourse();
  const vp = useRef<HTMLDivElement>(null);
  const drag = useRef({ on: false, x: 0, left: 0, moved: false });
  const [idx, setIdx] = useState(0);
  const [p, setP] = useState(0);
  const [grabbing, setGrabbing] = useState(false);
  const n = roadmap.rotations.length;

  const sync = useCallback(() => {
    const el = vp.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setP(max > 0 ? el.scrollLeft / max : 0);
    const mid = el.getBoundingClientRect().left + el.clientWidth / 2;
    let best = 0;
    let bestD = Infinity;
    Array.from(el.children).forEach((c, i) => {
      const r = c.getBoundingClientRect();
      const d = Math.abs(r.left + r.width / 2 - mid);
      if (d < bestD) {
        bestD = d;
        best = i;
      }
    });
    setIdx(best);
  }, []);

  useEffect(() => {
    const el = vp.current;
    if (!el) return;
    let raf = 0;
    const on = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(sync);
    };
    sync();
    el.addEventListener('scroll', on, { passive: true });
    window.addEventListener('resize', on);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener('scroll', on);
      window.removeEventListener('resize', on);
    };
  }, [sync]);

  const go = (i: number) => {
    const el = vp.current;
    const c = el?.children[Math.max(0, Math.min(n - 1, i))] as HTMLElement | undefined;
    if (!el || !c) return;
    const off = c.getBoundingClientRect().left - el.getBoundingClientRect().left;
    el.scrollTo({ left: el.scrollLeft + off - (el.clientWidth - c.offsetWidth) / 2, behavior: 'smooth' });
  };

  // mouse drag only; touch uses native swipe
  const down = (e: React.PointerEvent) => {
    if (e.pointerType !== 'mouse' || !vp.current) return;
    drag.current = { on: true, x: e.clientX, left: vp.current.scrollLeft, moved: false };
    setGrabbing(true);
  };
  const move = (e: React.PointerEvent) => {
    const d = drag.current;
    if (!d.on || !vp.current) return;
    const dx = e.clientX - d.x;
    if (Math.abs(dx) > 4) d.moved = true;
    vp.current.scrollLeft = d.left - dx;
  };
  const up = () => {
    if (!drag.current.on) return;
    drag.current.on = false;
    setGrabbing(false);
    go(idx);
  };

  return (
    <section className="hroad" id="road">
      <div className="wrap">
        <p className="label rv">{roadmap.label}</p>
        <h2 className="hh rv">
          {roadmap.title[0]}
          <br />
          <span className="accent">{roadmap.title[1]}</span>
        </h2>
        <p className="lead hl rv">{roadmap.lead}</p>
        <div className="hprog">
          <i style={{ width: `${Math.max(p, 1 / n) * 100}%` }} />
        </div>
        <div className="hmeta">
          <span>
            Rotation {idx + 1} of {n} · {roadmap.rotations[idx].n}
          </span>
          <span className="harrows">
            <button type="button" aria-label="Previous rotation" onClick={() => go(idx - 1)} disabled={idx === 0}>
              &larr;
            </button>
            <button type="button" aria-label="Next rotation" onClick={() => go(idx + 1)} disabled={idx === n - 1}>
              &rarr;
            </button>
          </span>
        </div>
        <p className="sm hhint">{roadmap.hint}</p>
      </div>
      <div
        className={cx('hvp', grabbing && 'grab')}
        ref={vp}
        onPointerDown={down}
        onPointerMove={move}
        onPointerUp={up}
        onPointerLeave={up}
        onClickCapture={(e) => drag.current.moved && e.preventDefault()}
      >
        {roadmap.rotations.map((r, i) => (
          <div
            key={r.n}
            className={cx('hcard card', i === idx && 'act')}
            onClick={() => !drag.current.moved && i !== idx && go(i)}
          >
            <div className="hn">{i + 1}</div>
            <small className="rk">{r.w}</small>
            <h3>{r.n}</h3>
            <p className="promise">{r.promise}</p>
            <ul className="cl2">
              {r.topics.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
            <div className="make">
              <b>{roadmap.youMake.toUpperCase()}</b>
              {r.make}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
