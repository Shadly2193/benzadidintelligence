'use client';
import { useEffect, useState } from 'react';
import { useCourse } from '@/lib/course/content';

export type Phase = 'early' | 'regular' | 'closed';

export function phaseAt(now: number, early: number, reg: number): Phase {
  if (now <= early) return 'early';
  if (now <= reg) return 'regular';
  return 'closed';
}

/**
 * Current sales phase and time left, ticking every second.
 * `now` is null during server render, so nothing time-based renders before hydration.
 */
export function useDeadline(tick = 1000) {
  const { price, schedule } = useCourse();
  const EARLY = Date.parse(schedule.earlyBirdEnd);
  const REG = Date.parse(schedule.regEnd);
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    setNow(Date.now());
    const id = window.setInterval(() => setNow(Date.now()), tick);
    return () => window.clearInterval(id);
  }, [tick]);

  const phase: Phase = now === null ? 'early' : phaseAt(now, EARLY, REG);
  const target = phase === 'early' ? EARLY : REG;
  const left = now === null ? null : Math.max(0, target - now);
  const parts =
    left === null
      ? null
      : [
          Math.floor(left / 86400000),
          Math.floor(left / 3600000) % 24,
          Math.floor(left / 60000) % 60,
          Math.floor(left / 1000) % 60,
        ];
  const amount = phase === 'early' ? schedule.earlyBirdAmount : price.amount;
  return { ready: now !== null, phase, parts, amount };
}
