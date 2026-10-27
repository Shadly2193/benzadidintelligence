'use client';
import { schedule, waLink } from '@/lib/course/site';
import { useDeadline } from '@/lib/course/useDeadline';

const pad = (n: number) => String(n).padStart(2, '0');

export default function Countdown() {
  const { phase, parts } = useDeadline();
  const c = schedule.clock;
  return (
    <section className="clock grid-bg" id="clock" aria-live="off">
      <div className="clock-in">
        <p className="label">{c.label}</p>
        {phase === 'closed' ? (
          <>
            <h2 className="clock-t">{c.closedTitle}</h2>
            <p className="lead">{c.closedLine}</p>
            <a className="btn btn-ghost" href={waLink('Hello, I want to hear about the next batch of the Digital Residency Program.')} target="_blank" rel="noopener noreferrer">
              Message me on WhatsApp
            </a>
          </>
        ) : (
          <>
            <h2 className="clock-t">{phase === 'early' ? c.earlyTitle : c.regTitle}</h2>
            <div className="digits" role="timer">
              {c.units.map((u, i) => (
                <div className="dg" key={u}>
                  <b suppressHydrationWarning>{parts ? (i === 0 ? String(parts[0]) : pad(parts[i])) : '--'}</b>
                  <small>{u}</small>
                </div>
              ))}
            </div>
            <p className="clock-s">
              {phase === 'early' ? (
                <>
                  Early bird {schedule.earlyBirdAmount.toLocaleString('en-US')} BDT until {schedule.earlyBirdEndLabel}. Last day to join: <b>{schedule.regEndLabel}</b>.
                </>
              ) : (
                <>
                  Last day to join: <b>{schedule.regEndLabel}</b>. No late entry.
                </>
              )}
              <br />
              Classes start <b>{schedule.classStartLabel}</b>.
            </p>
            <a className="btn btn-main" href="#join">
              Join the program
            </a>
          </>
        )}
      </div>
    </section>
  );
}
