import type { ReactNode } from "react";
import { Reveal } from "./reveal";

type SectionProps = {
  id: string; // used for the anchor link, e.g. "about" -> /#about
  title: string;
  intro?: string; // optional short line under the heading
  children?: ReactNode;
};

// Shared wrapper so every section has the same width, spacing, heading style
// and scroll-reveal animation.
export function Section({ id, title, intro, children }: SectionProps) {
  const headingId = `${id}-heading`;

  return (
    <section id={id} aria-labelledby={headingId} className="py-16 md:py-24">
      <div className="mx-auto w-full max-w-content px-5 md:px-8">
        <Reveal>
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
