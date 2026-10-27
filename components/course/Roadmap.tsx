'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import { roadmap } from '@/lib/course/site';
import { cx, useSectionProgress } from '@/lib/course/useScroll';

/**
 * Horizontal roadmap driven by vertical scroll.
 * Framing fix: the track starts after a left gutter (large on wide screens).
 * Distance to travel = trackWidth + 2 x gutter - viewportWidth, so the first card sits
 * inside the gutter at the start and the last card ends one gutter from the right edge.
 */
export default function Roadmap() {
  const sec = useRef<HTMLElement>(null);
  const vp = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [dist, setDist] = useState(0);
  const [gut, setGut] = useState(22);
  const p = useSectionProgress(sec);
  const n = roadmap.rotations.length;

  const measure = useCallback(() => {
    const t = track.current;
    if (!t) return;
    const vw = document.documentElement.clientWidth;
    const g = Math.max(22, (vw - 1180) / 2 + 22);
    setGut(g);
    const kids = Array.from(t.children) as HTMLElement[];
    const gap = parseFloat(getComputedStyle(t).columnGap) || 0;
    const trackW = kids.reduce((a, k) => a + k.offsetWidth, 0) + gap * (kids.length - 1);
    setDist(Math.max(0, trackW + 2 * g - vw));
  }, []);

  useEffect(() => {
    measure();
    window.addEventListener('resize', measure);
    const ro = new ResizeObserver(measure);
    if (track.current) ro.observe(track.current);
    return () => {
      window.removeEventListener('resize', measure);
      ro.disconnect();
    };
  }, [measure]);

  const idx = Math.min(n - 1, Math.round(p * (n - 1)));
  return (
    <section
      className="hroad"
      id="road"
      ref={sec}
      style={{ height: `calc(100svh + ${dist}px)`, minHeight: '300svh' }}
    >
      <div className="hsticky">
        <div className="wrap">
          <p className="label">{roadmap.label}</p>
          <h2 className="hh">
            {roadmap.title[0]}
            <br />
            <span className="accent">{roadmap.title[1]}</span>
          </h2>
          <p className="lead hl">{roadmap.lead}</p>
          <div className="hprog">
            <i style={{ width: `${p * 100}%` }} />
          </div>
          <div className="hmeta">
            <span>
              Rotation {idx + 1} of {n} · {roadmap.rotations[idx].n}
            </span>
            <span className="sm">{roadmap.hint}</span>
          </div>
        </div>
        <div className="hvp" ref={vp} style={{ ['--gut' as string]: `${gut}px` }}>
          <div className="htrack" ref={track} style={{ transform: `translate3d(${-p * dist}px,0,0)` }}>
            {roadmap.rotations.map((r, i) => (
              <div key={r.n} className={cx('hcard card', i === idx && 'act')}>
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
        </div>
      </div>
    </section>
  );
}
