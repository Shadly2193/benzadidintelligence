import { how } from '@/lib/course/site';

export default function HowItWorks() {
  return (
    <section className="grid-bg" id="how">
      <div className="wrap">
        <p className="label rv">{how.label}</p>
        <h2 className="rv">
          {how.title[0]}
          <br />
          <span className="accent">{how.title[1]}</span>
        </h2>
        <p className="lead rv">{how.lead}</p>
        <div className="flow">
          {how.steps.map(([h, t], i) => (
            <div className={`card rv d${i % 5}`} key={h}>
              <div className="n">{i + 1}</div>
              <h3>{h}</h3>
              <p>{t}</p>
            </div>
          ))}
        </div>
        <div className="flowline"><i /></div>
        <div className="rules">
          {how.rules.map(([b, t], i) => (
            <div className={`rule rv d${i}`} key={t}>
              <b>{b}</b> {t}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
