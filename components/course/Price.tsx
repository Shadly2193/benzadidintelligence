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
  const closed = phase === 'closed';
  const full = useCountUp(price.amount, seen, 1200);
  const eb = useCountUp(schedule.earlyBirdAmount, seen, 1200);
  const half = price.amount / 2;
  const save = price.amount - schedule.earlyBirdAmount;
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
        <div className="pc rec corner rv pmain" ref={ref}>
          <span className="badge">{price.badge}</span>
          <h3>{price.name}</h3>

          <div className="pcmp">
            <div className="pt pt-reg">
              <small>COURSE PRICE</small>
              <b>
                {fmt(full)} <em>{price.currency}</em>
              </b>
              <span>Pay in full, or 12,000 + 12,000</span>
              <span className="pt-when">Until {schedule.regEndLabel}</span>
            </div>
            <div className={cx('pt pt-eb', !early && 'over')}>
              <small>EARLY BIRD</small>
              <b>
                {fmt(eb)} <em>{price.currency}</em>
              </b>
              <span>Full payment only</span>
              <span className="pt-when">{early ? `Until ${schedule.earlyBirdEndLabel}` : 'Ended'}</span>
              {early && <i className="pt-save">Save {fmt(save)}</i>}
            </div>
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
          <p className="split">
            {mode === 'full' ? (
              early ? (
                <>
                  Pay <b>{fmt(schedule.earlyBirdAmount)} BDT</b> once by {schedule.earlyBirdEndLabel} (early bird). After that, <b>{fmt(price.amount)} BDT</b>.
                </>
              ) : (
                <>
                  Pay <b>{fmt(price.amount)} BDT</b> once.
                </>
              )
            ) : (
              <>
                Pay <b>{fmt(half)} BDT</b> now (50%). Pay <b>{fmt(half)} BDT</b> after 1 month (50%). Total <b>{fmt(price.amount)} BDT</b>.
              </>
            )}
          </p>
          <p className="urg">
            {phase === 'early' && <>{schedule.priceUpNote} Registration closes {schedule.regEndLabel}.</>}
            {phase === 'regular' && <>Registration closes {schedule.regEndLabel}. No late entry.</>}
            {closed && <>Registration is closed for this batch.</>}
          </p>
          <ul>
            {price.includes.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
          {closed ? (
            <span className="btn btn-ghost" aria-disabled="true">Registration closed</span>
          ) : (
            <a className="btn btn-main" href="#join">
              Apply to join
            </a>
          )}
        </div>

        <p className="sm" style={{ textAlign: 'center', marginTop: 16 }}>{price.note}</p>

        <div className="pc rv one2one">
          <div>
            <h3>{price.oneToOne.title}</h3>
            <p className="split">{price.oneToOne.line}</p>
          </div>
          <div className="o2o-r">
            <div className="amt">
              {fmt(price.oneToOne.amount)} <small>{price.currency}</small>
            </div>
            <a className="btn btn-ghost" href={waLink(price.oneToOne.wa)} target="_blank" rel="noopener noreferrer">
              {price.oneToOne.cta}
            </a>
          </div>
        </div>

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
