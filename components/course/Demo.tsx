'use client';
import { useEffect, useRef, useState } from 'react';
import { demo } from '@/lib/course/site';
import { cx } from '@/lib/course/useScroll';
import { BrandPanel, EditPanel, MarketingPanel, PracticePanel, ResearchPanel, WebsitePanel } from './DemoPanels';

const PANELS = [WebsitePanel, EditPanel, ResearchPanel, BrandPanel, MarketingPanel, PracticePanel];

export default function Demo() {
  const [cur, setCur] = useState(0);
  const [seen, setSeen] = useState(false);
  const [visible, setVisible] = useState(false);
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (es) => {
        setVisible(es[0].isIntersecting);
        if (es[0].isIntersecting) setSeen(true);
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const Panel = PANELS[cur];
  const running = seen && visible;
  return (
    <section id="demo">
      <div className="wrap">
        <p className="label rv">{demo.label}</p>
        <h2 className="rv">
          {demo.title[0]}
          <br />
          <span className="accent">{demo.title[1]}</span>
        </h2>
        <p className="lead rv">{demo.lead}</p>
        <div
          className="card corner demo"
          ref={box}
        >
          <p className={cx('dhint', running && 'live')} aria-hidden="true">
            <span className="dhand">&#9758;</span> {running ? demo.hintLive : demo.hintPaused}
          </p>
          <div className="tabs">
            {demo.tabs.map((t, i) => (
              <button key={t} className={cx(i === cur && 'on', i === (cur + 1) % PANELS.length && running && 'nx')} onClick={() => setCur(i)}>
                <small>{String(i + 1).padStart(2, '0')}</small>
                <strong>{t}</strong>
                {i === cur && seen && (
                  <span
                    key={`${cur}-${seen}`}
                    className="dtabs-bar"
                    style={{ animationPlayState: running ? 'running' : 'paused' }}
                    onAnimationEnd={() => setCur((c) => (c + 1) % PANELS.length)}
                  />
                )}
              </button>
            ))}
          </div>
          <div className="stage">
            <div className="pn on" key={`${cur}-${seen}`}>
              {seen ? <Panel /> : null}
            </div>
          </div>
        </div>
        <p className="sm rv" style={{ textAlign: 'center', marginTop: 14 }}>{demo.footnote}</p>
      </div>
    </section>
  );
}
