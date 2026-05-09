"use client";

import { ElementType, useEffect, useRef, useState } from "react";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#$%&@<>/\\|+-_*";

interface DecryptTextProps {
  text: string;
  as?: ElementType;
  className?: string;
  delay?: number;
  speed?: number;
  step?: number;
  once?: boolean;
}

function randomGlyph() {
  return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
}

export default function DecryptText({
  text,
  as: Tag = "span",
  className = "",
  delay = 0,
  speed = 34,
  step = 2.8,
  once = true,
}: DecryptTextProps) {
  const ref = useRef<HTMLElement>(null);
  const hasPlayedRef = useRef(false);
  const runRef = useRef(0);
  const [display, setDisplay] = useState(text);
  const [settled, setSettled] = useState(text.length);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      setDisplay(text);
      setSettled(text.length);
      return;
    }

    const play = () => {
      if (once && hasPlayedRef.current) return;
      hasPlayedRef.current = true;

      const currentRun = ++runRef.current;
      const chars = text.split("");
      const output = chars.map((char) => (char === " " ? " " : randomGlyph()));
      let frame = 0;

      setDisplay(output.join(""));
      setSettled(0);

      const startTimer = window.setTimeout(() => {
        const interval = window.setInterval(() => {
          if (currentRun !== runRef.current) {
            window.clearInterval(interval);
            return;
          }

          frame += 1;
          const nextSettled = Math.floor(frame / step);

          chars.forEach((char, index) => {
            if (char === " ") output[index] = " ";
            else if (index < nextSettled) output[index] = char;
            else output[index] = randomGlyph();
          });

          setDisplay(output.join(""));
          setSettled(nextSettled);

          if (nextSettled > chars.length) {
            window.clearInterval(interval);
            setDisplay(text);
            setSettled(text.length);
          }
        }, speed);
      }, delay);

      return () => window.clearTimeout(startTimer);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          play();
          if (once) observer.disconnect();
        } else if (!once) {
          hasPlayedRef.current = false;
        }
      },
      { threshold: 0.45 }
    );

    observer.observe(node);

    return () => {
      runRef.current += 1;
      observer.disconnect();
    };
  }, [delay, once, speed, step, text]);

  return (
    <Tag ref={ref} className={className} aria-label={text}>
      {display.split("").map((char, index) => (
        <span
          key={`${text}-${index}`}
          aria-hidden="true"
          className={index < settled || char === " " ? "" : "text-brand-orange text-glow-orange"}
        >
          {char === " " ? "\u00a0" : char}
        </span>
      ))}
    </Tag>
  );
}
