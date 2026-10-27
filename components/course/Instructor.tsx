'use client';
import { instructor } from '@/lib/course/site';
import { useCountUp, useInViewOnce } from '@/lib/course/useScroll';

export default function Instructor() {
  const [ref, seen] = useInViewOnce<HTMLDivElement>(0.6);
  const v = useCountUp(instructor.stat.value, seen);
  return (
    <section className="grid-bg" id="inst">
      <div className="wrap inst">
        <div className="photo corner rv">
          {instructor.photo}
          <br />
          {instructor.photoNote}
        </div>
        <div>
          <p className="label rv">{instructor.label}</p>
          <h2 className="rv">{instructor.name}</h2>
          <p className="micro rv">{instructor.micro}</p>
          <p className="lead rv">{instructor.lead}</p>
          <ul className="facts rv">
            {instructor.facts.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="wrap" style={{ marginTop: 48 }}>
        <div className="stats" style={{ gridTemplateColumns: '1fr' }}>
          <div className="stat rv" ref={ref}>
            <div className="n">
              {v.toLocaleString('en-US')}
              {instructor.stat.suffix}
            </div>
            <div className="t">{instructor.stat.label}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
