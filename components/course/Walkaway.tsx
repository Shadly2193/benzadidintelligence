'use client';
import { walkaway } from '@/lib/course/site';
import { cx, useCountUp, useFlags, useInViewOnce } from '@/lib/course/useScroll';
import { useDeadline } from '@/lib/course/useDeadline';

const fmt = (n: number) => n.toLocaleString('en-US');

export default function Walkaway() {
  const [ref, seen] = useInViewOnce<HTMLDivElement>(0.45);
  const valued = walkaway.cards.filter((c) => c.v > 0);
  const total = valued.reduce((a, c) => a + c.v, 0);
  // 0 bars grow, 1 total counts, 2 strike, 3 price
  const f = useFlags([100, 200, 1500, 1900], seen);
  const shown = useCountUp(total, f[1], 1200);
  const { amount } = useDeadline(60000);
  return (
    <section className="grid-bg" id="value">
      <div className="wrap">
        <p className="label rv">{walkaway.label}</p>
        <h2 className="rv">{walkaway.title}</h2>
        <p className="lead rv">{walkaway.lead}</p>
        <div className="rgrid">
          {walkaway.cards.map((c, i) => (
            <div className={`card rv d${i % 4}`} key={c.h}>
              <small className="rk">{String(i + 1).padStart(2, '0')}</small>
              <h3>{c.h}</h3>
              <p>{c.t}</p>
              {c.v > 0 ? (
                <span className="vtag">Value {fmt(c.v)} BDT</span>
              ) : (
                <span className="vtag soft2">{walkaway.alsoIncluded}</span>
              )}
            </div>
          ))}
        </div>

        <div className="vstack card corner" ref={ref}>
          <p className="sm">{walkaway.valueNote}</p>
          <div className="vbars" aria-hidden="true">
            {valued.map((c) => (
              <div key={c.h} className="vseg" style={{ flexGrow: c.v, ['--w' as string]: f[0] ? '1' : '0' }}>
                <i style={{ transform: f[0] ? 'scaleX(1)' : 'scaleX(0)' }} />
                <span>{c.h.replace('A vibe-coded website', 'Website').replace('AI in your medical practice', 'AI in practice').replace('Your personal brand', 'Brand').replace('Digital marketing', 'Marketing').replace('Vibe editing', 'Editing').replace('Vibe research', 'Research')}</span>
              </div>
            ))}
          </div>
          <div className="vtotals">
            <div className={cx('vt', f[2] && 'struck')}>
              <small>{walkaway.totalLabel.toUpperCase()}</small>
              <b>{fmt(shown)} <em>BDT</em></b>
            </div>
            <div className={cx('vp', f[3] && 'show')}>
              <small>{walkaway.priceLabel.toUpperCase()}</small>
              <b>{fmt(amount)} <em>BDT</em></b>
              <span>{amount < walkaway.priceAmount ? 'Early bird, full payment.' : 'Pay in full, or in 2 parts.'}</span>
            </div>
          </div>
        </div>

        <h3 className="rv" style={{ marginTop: 46, fontSize: '1.5rem' }}>{walkaway.insideTitle}</h3>
        <ul className="inside rv">
          {walkaway.inside.map((x) => (
            <li key={x}>{x}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
