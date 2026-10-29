'use client';
import { RefObject, useEffect, useRef, useState } from 'react';

export function useReducedMotion(): boolean {
  const [r, setR] = useState(false);
  useEffect(() => {
    setR(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);
  return r;
}

/** 0 to 1 while the section is pinned (sticky) on screen. `factor` > 1 finishes a bit early. */
export function useSectionProgress(ref: RefObject<HTMLElement | null>, factor = 1, enabled = true): number {
  const [p, setP] = useState(0);
  useEffect(() => {
    if (!enabled) return;
    let raf = 0;
    const calc = () => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const st = el.firstElementChild as HTMLElement | null;
      const pin = st ? st.offsetHeight : window.innerHeight;
      const span = el.offsetHeight - pin;
      // the sticky panel sits below the site's fixed navbar, so pinning starts at its `top`, not at 0
      const off = st ? parseFloat(getComputedStyle(st).top) || 0 : 0;
      const v = span > 0 ? Math.min(1, Math.max(0, ((off - r.top) / span) * factor)) : 0;
      setP((prev) => (Math.abs(prev - v) < 0.0015 ? prev : v));
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
  }, [ref, factor, enabled]);
  return p;
}

/** true once the element has been visible (stays true). */
export function useInViewOnce<T extends HTMLElement>(threshold = 0.35): [RefObject<T | null>, boolean] {
  const ref = useRef<T | null>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (es) => {
        if (es[0].isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, seen];
}

/** Timers that are cleaned up when the component unmounts. */
export function useTimers() {
  const t = useRef<number[]>([]);
  useEffect(() => {
    const list = t.current;
    return () => list.forEach((id) => window.clearTimeout(id));
  }, []);
  return (ms: number, fn: () => void) => {
    t.current.push(window.setTimeout(fn, ms));
  };
}

export const cx = (...a: (string | false | null | undefined)[]) => a.filter(Boolean).join(' ');

/** flags[i] becomes true after times[i] ms. All true at once when motion is reduced. */
export function useFlags(times: number[], active = true): boolean[] {
  const [n, setN] = useState<boolean[]>(() => times.map(() => false));
  useEffect(() => {
    if (!active) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setN(times.map(() => true));
      return;
    }
    setN(times.map(() => false));
    const ids = times.map((t, i) =>
      window.setTimeout(() => setN((p) => p.map((v, k) => (k === i ? true : v))), t),
    );
    return () => ids.forEach(clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);
  return n;
}

/** Types text out. Returns the visible part. */
export function useTyped(text: string, msPerChar = 11, active = true): string {
  const [k, setK] = useState(0);
  useEffect(() => {
    if (!active) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setK(text.length);
      return;
    }
    setK(0);
    const id = window.setInterval(() => {
      setK((v) => {
        if (v >= text.length) {
          window.clearInterval(id);
          return v;
        }
        return v + 1;
      });
    }, msPerChar);
    return () => window.clearInterval(id);
  }, [text, msPerChar, active]);
  return text.slice(0, k);
}

/** Counts from 0 to `to` in `ms` once `active` is true. */
export function useCountUp(to: number, active: boolean, ms = 1500): number {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!active) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setV(to);
      return;
    }
    let raf = 0;
    const t0 = performance.now();
    const f = (t: number) => {
      const k = Math.min((t - t0) / ms, 1);
      setV(Math.round(to * (1 - Math.pow(1 - k, 3))));
      if (k < 1) raf = requestAnimationFrame(f);
    };
    raf = requestAnimationFrame(f);
    return () => cancelAnimationFrame(raf);
  }, [to, active, ms]);
  return v;
}
