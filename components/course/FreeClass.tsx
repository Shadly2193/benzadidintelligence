'use client';
import { useState } from 'react';
import { useCourse } from '@/lib/course/content';

/** Accepts a youtu.be, watch?v=, embed or shorts link, or a bare id. */
export function youtubeId(url: string) {
  const m = url.trim().match(/(?:youtu\.be\/|v=|embed\/|shorts\/|live\/)([\w-]{11})/) ?? url.trim().match(/^([\w-]{11})$/);
  return m ? m[1] : '';
}

/** Free sample class. Shows only a thumbnail until clicked, so YouTube never slows the page down. */
export default function FreeClass() {
  const { freeClass } = useCourse();
  const [play, setPlay] = useState(false);
  const id = youtubeId(freeClass.youtube);
  if (!id) return null;
  return (
    <section className="grid-bg" id="free">
      <div className="wrap">
        <p className="label rv">{freeClass.label}</p>
        <h2 className="rv">
          {freeClass.title[0]}
          <br />
          <span className="accent">{freeClass.title[1]}</span>
        </h2>
        <p className="lead rv">{freeClass.lead}</p>
        <div className="fc-player corner rv">
          {play ? (
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`}
              title={freeClass.title.join(' ')}
              allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
              allowFullScreen
            />
          ) : (
            <button type="button" className="fc-thumb" onClick={() => setPlay(true)} aria-label={freeClass.play}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`} alt="" loading="lazy" decoding="async" />
              <span className="play-btn" />
              <span className="fc-cta">
                {freeClass.play} · {freeClass.duration}
              </span>
            </button>
          )}
        </div>
        <ul className="fc-points rv">
          {freeClass.points.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
