'use client';
import { useCourse } from '@/lib/course/content';

export default function Instructor() {
  const { instructor } = useCourse();
  return (
    <section className="grid-bg" id="inst">
      <div className="wrap inst">
        {instructor.photoUrl ? (
          <div className="photo has-img corner rv">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={instructor.photoUrl} alt={instructor.photoAlt} loading="lazy" decoding="async" />
          </div>
        ) : (
          <div className="photo corner rv">
            {instructor.photo}
            <br />
            {instructor.photoNote}
          </div>
        )}
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
