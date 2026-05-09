import { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  redTop?: boolean;
  hover?: boolean;
}

export default function GlassCard({ children, className = "", redTop = false, hover = false }: GlassCardProps) {
  return (
    <div
      className={`glass-card-dark rounded-2xl p-6 ${redTop ? "border-t-2 border-t-brand-orange" : ""} ${
        hover ? "transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-brand-orange/20" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}
