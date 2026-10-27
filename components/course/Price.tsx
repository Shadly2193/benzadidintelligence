'use client';
import { useState } from 'react';
import { price, riskFree, schedule, waLink } from '@/lib/course/site';
import { useDeadline } from '@/lib/course/useDeadline';
import { cx, useCountUp, useInViewOnce } from '@/lib/course/useScroll';

export default function Price() {
  const [mode, setMode] = useState<'full' | 'part'>('full');
  const [ref, seen] = useInViewOnce<HTMLDivElement>(0.5);
  const { phase } = useDeadline(60000);
  const early = phase === 'early';
  // early bird is full payment only; paying in 2 parts uses the regular price
  const now = early && mode === 'full' ? schedule.earlyBirdAmount : price.amount;
  const amt = useCountUp(now, seen, 1500);
  const half = price.amount / 2;
  const fmt = (n: number) => n.toLocaleString('en-US');
  return (
    <section id="price">
      <div className="wrap">
        <p className="label rv">{price.label}</p>
        <h2 className="rv">
          {price.title[0]}
          <br />
          <span className="accent">{price.title[1]}</span>
        </h2>
        <div className="price">
          <div className="pc rec corner rv" ref={ref}>
            <span className="badge">{early ? 'EARLY BIRD' : price.badge}</span>
            <h3>{price.name}</h3>
            <div className="amt">
              {amt.toLocaleString('en-US')} <small>{price.currency}</small>
              {early && mode === 'full' && <s className="was">{fmt(price.amount)}</s>}
            </div>
            <div className="pay" role="tablist">
              <i style={{ left: mode === 'full' ? 4 : '50%', width: 'calc(50% - 4px)' }} />
              <button className={cx(mode === 'full' && 'on')} style={{ flex: 1 }} onClick={() => setMode('full')}>
                {price.payFull}
              </button>
              <button className={cx(mode === 'part' && 'on')} style={{ flex: 1 }} onClick={() => setMode('part')}>
                {price.payParts}
              </button>
            </div>
            <div className={cx('paybar', mode === 'part' && 'parts')} aria-hidden="true">
              <div>
                <span>{mode === 'full' ? `${fmt(now)} NOW` : `${fmt(half)} NOW`}</span>
              </div>
              <div>
                <span>{half.toLocaleString('en-US')} IN 1 MONTH</span>
              </div>
            </div>
            <p className="split">
              {mode === 'full' ? (
                <>
                  Pay <b>{fmt(now)} BDT</b> once.
                </>
              ) : (
                <>
                  Pay <b>{half.toLocaleString('en-US')} BDT</b> now (50%). Pay <b>{half.toLocaleString('en-US')} BDT</b> after 1 month (50%).
                </>
              )}
            </p>
            <p className="urg">
              {phase === 'early' && (
                <>
                  {schedule.earlyBirdNote} {schedule.priceUpNote}
                </>
              )}
              {phase === 'regular' && <>Registration closes {schedule.regEndLabel}. No late entry.</>}
              {phase === 'closed' && <>Registration is closed for this batch.</>}
            </p>
            <ul>
              {price.includes.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
            {phase === 'closed' ? (
              <span className="btn btn-ghost" aria-disabled="true">Registration closed</span>
            ) : (
              <a className="btn btn-main" href="#join">
                Apply to join
              </a>
            )}
          </div>
          <div className="pc rv d1">
            <h3>{price.oneToOne.title}</h3>
            <div className="amt">
              {price.oneToOne.amount.toLocaleString('en-US')} <small>{price.currency}</small>
            </div>
            <p className="split">{price.oneToOne.line}</p>
            <a className="btn btn-ghost" href={waLink(price.oneToOne.wa)} target="_blank" rel="noopener noreferrer">
              {price.oneToOne.cta}
            </a>
          </div>
        </div>

        <p className="sm" style={{ textAlign: 'center', marginTop: 16 }}>{price.note}</p>

        <div className="card corner rf rv">
          <div className="gh">
            <span className="shield">✓</span>
            <div>
              <small className="rk">{riskFree.label}</small>
              <h3>{riskFree.title}</h3>
            </div>
          </div>
          <div className="rf-flow">
            {riskFree.checks.map((c) => (
              <div className="rf-chk" key={c}>
                <i>✓</i>
                <span>{c}</span>
              </div>
            ))}
            <div className="rf-res">{riskFree.result.toUpperCase()}</div>
          </div>
          <ul className="gl">
            {riskFree.rules.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
