import { TOOLS } from "@/lib/content";
import DecryptText from "@/components/ui/DecryptText";

export default function ToolsStrip() {
  const doubled = [...TOOLS, ...TOOLS];
  return (
    <section className="py-16 bg-transparent overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-8">
        <p className="section-label">
          <DecryptText text="[TOOLS I BUILD WITH]" />
        </p>
      </div>
      <div className="overflow-hidden">
        <div className="marquee-track">
          {doubled.map((tool, i) => (
            <span
              key={i}
              className="flex-shrink-0 glass-card-dark mx-3 px-5 py-2.5 rounded-full text-sm font-semibold text-white/80 whitespace-nowrap"
            >
              {tool}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
