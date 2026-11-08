import { techLogos, type TechName } from "@/data/tech-logos";

// Decorative (aria-hidden): the skill name is always shown as text, or listed elsewhere.
export function TechLogo({ name, className = "" }: { name: TechName; className?: string }) {
  const logo = techLogos[name];
  const paint = logo.outline
    ? ({ fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" } as const)
    : { fill: "currentColor" };

  return (
    <svg viewBox={logo.viewBox} aria-hidden="true" className={`${logo.color ?? ""} ${className}`} {...paint}>
      {logo.shapes.map((shape) => (
        <path key={shape.d} d={shape.d} fill={shape.fill} />
      ))}
    </svg>
  );
}
