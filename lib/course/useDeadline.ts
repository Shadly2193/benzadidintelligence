'use client';
import { useEffect, useState } from 'react';
import { price, schedule } from '@/lib/course/site';

export type Phase = 'early' | 'regular' | 'closed';

const EARLY = Date.parse(schedule.earlyBirdEnd);
const REG = Date.parse(schedule.regEnd);

export function phaseAt(now: number): Phase {
  if (now <= EARLY) return 'early';
  if (now <= REG) return 'regular';
  return 'closed';
}

/**
 * Current sales phase and time left, ticking every second.
 * `now` is null during server render, so nothing time-based renders before hydration.
 */
export function useDeadline(tick = 1000) {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    setNow(Date.now());
    const id = window.setInterval(() => setNow(Date.now()), tick);
    return () => window.clearInterval(id);
  }, [tick]);

  const phase: Phase = now === null ? 'early' : phaseAt(now);
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
