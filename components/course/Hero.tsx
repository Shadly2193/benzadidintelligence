'use client';
import { useEffect, useState } from 'react';
import { useCourse } from '@/lib/course/content';
import { useDeadline } from '@/lib/course/useDeadline';
import { youtubeId } from './FreeClass';

function Decrypt({ text }: { text: string }) {
  const [t, setT] = useState(text);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ch = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&';
    const t0 = performance.now();
    let raf = 0;
    const f = (now: number) => {
      const k = Math.min((now - t0) / 1400, 1);
      const n = Math.floor(text.length * k);
      setT(text.split('').map((c, i) => (i < n || c === ' ' || c === '·' ? c : ch[Math.floor(Math.random() * ch.length)])).join(''));
      if (k < 1) raf = requestAnimationFrame(f);
      else setT(text);
    };
    raf = requestAnimationFrame(f);
    return () => cancelAnimationFrame(raf);
  }, [text]);
  return <>{t}</>;
}

/** Small "prompt -> result" loop. Each run takes about 1.2 seconds. */
function SeatLine() {
  const { hero, schedule } = useCourse();
  const { ready, phase, parts } = useDeadline(60000);
  const days = parts ? parts[0] : 0;
  const when = days > 0 ? `${days} day${days === 1 ? '' : 's'}` : 'less than a day';
  let text: string = hero.seatNote;
  // no amounts above the price section: only the deadline
  if (ready && phase === 'early') text = `Early bird ends in ${when}`;
  if (ready && phase === 'regular') text = `Registration closes in ${when}`;
  if (ready && phase === 'closed') text = 'Registration is closed';
  return (
    <div className="seat">
      <span className="pulse" /> {text} · Classes start {schedule.classStartLabel}
    </div>
  );
}

/** Welcome video: thumbnail until clicked, then the YouTube player. */
function HeroVideo() {
  const { hero } = useCourse();
  const [play, setPlay] = useState(false);
  // older content had the link pasted into the hint line
  const id = youtubeId(hero.videoYoutube || hero.videoHint);
  useEffect(() => {
    if (!play) return;
    document.documentElement.classList.add('dr-playing');
    return () => document.documentElement.classList.remove('dr-playing');
  }, [play]);
  if (!id) {
    return (
      <div className="video corner hero-video">
        <div className="in-v">
          <div className="play-btn" />
          <strong>{hero.videoTitle}</strong>
          <small>{hero.videoHint}</small>
        </div>
      </div>
    );
  }
  return (
    <div className="video corner hero-video fc-player">
      {play ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`}
          title={hero.videoTitle}
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
        />
      ) : (
        <button type="button" className="fc-thumb" onClick={() => setPlay(true)} aria-label={`Play: ${hero.videoTitle}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={hero.videoThumbnailUrl || `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`}
            onError={(e) => {
              // not every video has a max-res thumbnail
              const img = e.currentTarget;
              if (!img.src.includes('hqdefault')) img.src = `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
            }}
            alt=""
            fetchPriority="high"
            decoding="async"
          />
          <span className="play-btn" />
        </button>
      )}
    </div>
  );
}

export default function Hero() {
  const { hero } = useCourse();
  return (
    <header className="hero grid-bg" id="top">
      <svg className="heart" viewBox="0 0 1400 160" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0 80 H300 L330 80 L350 30 L390 140 L420 50 L440 80 H760 L790 80 L810 30 L850 140 L880 50 L900 80 H1400" />
      </svg>
      <div className="hero-stack">
        <p className="label">
          <Decrypt text={hero.eyebrow} />
        </p>
        <HeroVideo />
        <h1>
          <span className="line">
            <span>{hero.lines[0]}</span>
          </span>
          <span className="line">
            <span className="accent">{hero.lines[1]}</span>
          </span>
          <span className="line">
            <span className="accent">{hero.lines[2]}</span>
          </span>
          <span className="line tail">
            <span>
              {hero.lines[3]}
              <span className="glitch accent" data-text={hero.glitchWord}>
                {hero.glitchWord}
              </span>
              .
            </span>
          </span>
        </h1>
        <p className="sub">{hero.sub}</p>
        <div className="chips">
          {hero.chips.map((c) => (
            <span className="chip" key={c}>
              {c}
            </span>
          ))}
        </div>
        <div className="cta-row">
          <a className="btn btn-main" href="#price">
            Join the program
          </a>
          <a className="btn btn-ghost" href="#demo">
            See what you will build
          </a>
        </div>
        <SeatLine />
      </div>
    </header>
  );
}
