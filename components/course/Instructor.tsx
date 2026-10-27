'use client';
import { instructor } from '@/lib/course/site';

export default function Instructor() {
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
    </section>
  );
}
