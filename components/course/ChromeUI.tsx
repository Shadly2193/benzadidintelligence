'use client';
import { useEffect, useRef, useState } from 'react';
import { sections } from '@/lib/course/site';
import { cx } from '@/lib/course/useScroll';

/**
 * Page-level helpers (mock only, the real site has its own header and footer):
 * progress bar + ECG dot, blood-pressure gauge, section dots, NEXT pill, mobile join bar,
 * and the scroll reveal for every element with class "rv" or "line" (sets data-in).
 */
export default function ChromeUI() {
  const [p, setP] = useState(0);
  const [idx, setIdx] = useState(0);
  const [pump, setPump] = useState(false);
  const [showNext, setShowNext] = useState(false);
  const [showJoin, setShowJoin] = useState(false);
  const [hideGauge, setHideGauge] = useState(false);
  const [inSticky, setInSticky] = useState(false);
  const last = useRef(0);

  useEffect(() => {
    const io = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (e.isIntersecting) {
            (e.target as HTMLElement).setAttribute('data-in', '1');
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.15 },
    );
    document.querySelectorAll(".rv,.line").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    let raf = 0;
    const calc = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      const pr = h > 0 ? window.scrollY / h : 0;
      setP(pr);
      const mid = window.scrollY + window.innerHeight * 0.4;
      let cur = 0;
      sections.forEach((s, i) => {
        const el = document.getElementById(s.id);
        if (el && el.getBoundingClientRect().top + window.scrollY <= mid) cur = i;
      });
      setIdx(cur);
      if (cur !== last.current) {
        last.current = cur;
        setPump(true);
        window.setTimeout(() => setPump(false), 380);
      }
      const mid2 = window.innerHeight / 2;
      setHideGauge(
        ['road', 'future'].some((id) => {
          const r = document.getElementById(id)?.getBoundingClientRect();
          return !!r && r.top <= mid2 && r.bottom >= mid2;
        }),
      );
      setShowNext(window.scrollY > window.innerHeight * 0.5);
      setShowJoin(window.scrollY > window.innerHeight * 0.8);
      setInSticky(['road', 'future'].some((id) => { const r = document.getElementById(id)?.getBoundingClientRect(); return !!r && r.top <= mid2 && r.bottom >= mid2; }));
    };
    const on = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(calc);
    };
    calc();
    window.addEventListener('scroll', on, { passive: true });
    window.addEventListener('resize', on);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', on);
      window.removeEventListener('resize', on);
    };
  }, []);

  const done = p > 0.985;
  const lastIdx = sections.length - 1;
  const nextLabel = idx >= lastIdx ? 'Join the program' : sections[idx + 1].name;
  const goNext = () => {
    const id = idx >= lastIdx ? 'price' : sections[idx + 1].id;
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <div id="bar">
        <i id="barfill" style={{ width: `${p * 100}%` }} />
      </div>
      <svg id="ecg" viewBox="0 0 54 22" style={{ left: `${p * 100}%` }} aria-hidden="true">
        <path d="M0 11 H14 L18 11 L21 3 L26 19 L30 8 L33 11 H54" />
      </svg>
      <div id="gauge" className={cx(pump && 'pump', hideGauge && 'gone')} aria-hidden="true">
        <svg viewBox="0 0 120 80">
          <path className="arc" d="M10 68 A50 50 0 0 1 110 68" />
          <path className="arc2" pathLength={100} d="M10 68 A50 50 0 0 1 110 68" style={{ strokeDashoffset: 100 - p * 100 }} />
          <g transform={`rotate(${-90 + p * 180} 60 68)`}>
            <line x1="60" y1="68" x2="60" y2="24" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" />
            <circle cx="60" cy="68" r="4.5" fill="#FF6A00" />
          </g>
        </svg>
        <div className="rd">
          <b>{done ? '120/80' : Math.round(p * 140)}</b> <span>{done ? 'healthy brand' : 'mmHg'}</span>
        </div>
      </div>
      <nav id="dots" aria-label="Page sections">
        {sections.map((s, i) => (
          <a key={s.id} href={`#${s.id}`} className={cx(i === idx && 'on')} aria-label={s.name}>
            <span>{s.name}</span>
          </a>
        ))}
      </nav>
      <button id="next" className={cx(showNext && 'show')} onClick={goNext} aria-label="Go to next section">
        <small>NEXT</small>
        <span>{nextLabel}</span>
        <b>↓</b>
      </button>
      <div id="joinbar" className={cx(showJoin && !(inSticky && typeof window !== 'undefined' && window.innerWidth < 760) && 'show')}>
        <a className="btn btn-main" href="#price">
          Join the program
        </a>
      </div>
    </>
  );
}
