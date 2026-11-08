import type { ReactNode } from "react";
import { Reveal } from "./reveal";

// Soft full-width background color for a section.
const tints = {
  none: "",
  blue: "bg-accent/[0.06]",
  violet: "bg-violet/[0.07]",
  pink: "bg-pink/[0.06]",
};

type SectionProps = {
  id: string; // used for the anchor link, e.g. "about" -> /#about
  title: string;
  intro?: string; // optional short line under the heading
  tint?: keyof typeof tints;
  children?: ReactNode;
};

// Shared wrapper so every section has the same width, spacing, heading style
// and scroll-reveal animation.
export function Section({ id, title, intro, tint = "none", children }: SectionProps) {
  const headingId = `${id}-heading`;

  return (
    <section id={id} aria-labelledby={headingId} className={`py-16 md:py-24 ${tints[tint]}`}>
      <div className="mx-auto w-full max-w-content px-5 md:px-8">
        <Reveal>
          <span className="mb-4 block h-1 w-12 rounded-full bg-brand" aria-hidden="true" />
          <h2 id={headingId} className="text-3xl font-semibold tracking-tight sm:text-4xl">
            {title}
          </h2>
          {intro && <p className="mt-3 max-w-2xl text-lg text-muted">{intro}</p>}
          <div className="mt-10">{children}</div>
        </Reveal>
      </div>
    </section>
  );
}
