import type { ReactNode } from "react";

type SectionProps = {
  id: string; // used for the anchor link, e.g. "about" -> /#about
  title: string;
  children?: ReactNode;
};

// Shared wrapper so every section has the same width, spacing and heading style.
export function Section({ id, title, children }: SectionProps) {
  const headingId = `${id}-heading`;

  return (
    <section id={id} aria-labelledby={headingId} className="py-16 md:py-24">
      <div className="mx-auto w-full max-w-content px-5 md:px-8">
        <h2 id={headingId} className="text-2xl font-semibold tracking-tight sm:text-3xl">
          {title}
        </h2>
        <div className="mt-10">{children}</div>
      </div>
    </section>
  );
}
