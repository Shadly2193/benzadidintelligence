"use client";
import { useEffect, useRef, useState } from "react";

/**
 * YouTube embed that shows only the thumbnail until it scrolls near the screen,
 * then mounts the real player. Three autoplaying players on load were costing ~8 MB on phones.
 */
export default function LazyYouTube({ id, title, params = "", className = "" }: { id: string; title: string; params?: string; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShow(true);
          io.disconnect();
        }
      },
      { rootMargin: "200px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={`absolute inset-0 ${className}`}>
      {show ? (
        <iframe
          src={`https://www.youtube.com/embed/${id}?${params}`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
        />
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`} alt={title} loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover" />
      )}
    </div>
  );
}
