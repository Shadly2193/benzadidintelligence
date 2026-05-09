interface GlitchTextProps {
  text: string;
  className?: string;
  tag?: "span" | "h1" | "h2" | "h3" | "p";
}

export default function GlitchText({ text, className = "", tag: Tag = "span" }: GlitchTextProps) {
  return (
    <Tag className={`glitch ${className}`} data-text={text}>
      {text}
    </Tag>
  );
}
