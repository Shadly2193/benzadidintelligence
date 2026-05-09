"use client";
import { motion } from "framer-motion";

interface AnimatedTextProps {
  lines: string[];
  className?: string;
  lineClassName?: string;
  stagger?: number;
  redLast?: boolean;
}

export default function AnimatedText({
  lines,
  className = "",
  lineClassName = "",
  stagger = 0.15,
  redLast = false,
}: AnimatedTextProps) {
  return (
    <div className={className}>
      {lines.map((line, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: i * stagger, ease: [0.22, 1, 0.36, 1] }}
          className={`${lineClassName} ${redLast && i === lines.length - 1 ? "text-brand-orange" : ""}`}
        >
          {line}
        </motion.div>
      ))}
    </div>
  );
}
