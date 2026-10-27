'use client';
import { useEffect, useRef } from 'react';
import { proof } from '@/lib/course/site';

function Clip({ src }: { src: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const io = new IntersectionObserver(
      (es) => {
        if (es[0].isIntersecting) {
          if (!v.getAttribute('src')) v.setAttribute('src', src);
          v.play().catch(() => {});
        } else v.pause();
      },
      { threshold: 0.35 },
    );
    io.observe(v);
    return () => io.disconnect();
  }, [src]);
  return <video ref={ref} muted loop playsInline preload="none" />;
}

export default function Proof() {
  return (
    <section className="grid-bg" id="proof">
      <div className="wrap">
        <p className="label rv">{proof.label}</p>
        <h2 className="rv">
          {proof.title[0]}
          <br />
          <span className="accent">{proof.title[1]}</span>
        </h2>
        <p className="lead rv">{proof.lead}</p>
        <div className="pg">
          {proof.items.map((it, i) => (
            <div key={it.src} className={`card pv corner rv${it.wide ? ' wide' : ''} d${i % 3}`}>
              <div className="vw">
                <Clip src={it.src} />
                <span className="tag">{it.tag}</span>
              </div>
              <div className="cp">
                <h3>{it.title}</h3>
                <p>{it.sub}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="proofnote rv">{proof.note}</p>
      </div>
    </section>
  );
}
