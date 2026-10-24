import { about } from "@/data/site";
import { Section } from "../section";

export function About() {
  return (
    <Section id="about" title={about.title}>
      <div className="grid gap-10 md:grid-cols-[1fr_320px] md:gap-16">
        <div className="space-y-5 text-base leading-7 text-muted sm:text-lg sm:leading-8">
          {about.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        <ul className="h-fit space-y-4 rounded-xl border border-border bg-surface p-6">
          {about.facts.map((fact) => (
            <li key={fact} className="flex gap-3 text-sm leading-6">
              <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
              {fact}
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
