'use client';
import { useState } from 'react';
import { fit, who } from '@/lib/course/site';
import { cx } from '@/lib/course/useScroll';

export default function WhoFor() {
  const [i, setI] = useState(0);
  const s = who.stages[i];
  return (
    <section id="who">
      <div className="wrap">
        <p className="label rv">{who.label}</p>
        <h2 className="rv">
          {who.title[0]}
          <br />
          <span className="accent">{who.title[1]}</span>
        </h2>
        <p className="lead rv">{who.lead}</p>
        <div className="pick" role="tablist">
          {who.stages.map((st, k) => (
            <button key={st.k} role="tab" aria-selected={k === i} className={cx(k === i && 'on')} onClick={() => setI(k)}>
              {st.k}
            </button>
          ))}
        </div>
        <div className="card pickout corner" key={i}>
          <h3>{s.k}</h3>
          <p>{s.t}</p>
          <ul>
            {s.a.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
          <div className="pathline" />
        </div>
        <h3 className="fit-t rv">{fit.title}</h3>
        <div className="fit rv" id="fit">
          <div className="fit-col no">
            <p className="fit-h">{fit.no}</p>
            {fit.rows.map(([n], k) => (
              <div className="fit-r" key={n} style={{ ['--k' as string]: k }}>{n}</div>
            ))}
          </div>
          <div className="fit-col yes">
            <p className="fit-h">{fit.yes}</p>
            {fit.rows.map(([, y], k) => (
              <div className="fit-r" key={y} style={{ ['--k' as string]: k }}>{y}</div>
            ))}
          </div>
        </div>
        <p className="verify rv">{who.verify}</p>
      </div>
    </section>
  );
}
