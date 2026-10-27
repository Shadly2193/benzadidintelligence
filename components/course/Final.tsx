import { final } from '@/lib/course/site';

export default function Final() {
  return (
    <section className="final grid-bg" id="final">
      <div className="wrap">
        <p className="label rv">{final.label}</p>
        <div className="big">
          <span className="line"><span>{final.big[0]}</span></span>
          <span className="line"><span className="accent">{final.big[1]}</span></span>
        </div>
        <p className="lead rv" style={{ margin: '22px 0 28px' }}>{final.lead}</p>
        <div className="cta-row rv">
          <a className="btn btn-main" href="#price">{final.ctaMain}</a>
          <a className="btn btn-ghost" href="#road">{final.ctaGhost}</a>
        </div>
      </div>
    </section>
  );
}
