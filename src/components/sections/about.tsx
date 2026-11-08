import { about } from "@/data/site";
import { Section } from "../section";
import { brandColors } from "../styles";

export function About() {
  return (
    <Section id="about" title={about.title}>
      <div className="grid gap-10 md:grid-cols-[1fr_320px] md:gap-16">
        <div className="space-y-5 text-base leading-7 text-muted sm:text-lg sm:leading-8">
          {about.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        <ul className="relative h-fit space-y-4 overflow-hidden rounded-xl border border-border bg-surface p-6">
          <span className="absolute inset-x-0 top-0 h-1 bg-brand" aria-hidden="true" />
          {about.facts.map((fact, index) => (
            <li key={fact} className="flex gap-3 text-sm leading-6">
              <span
                className={`mt-1.5 size-2.5 shrink-0 rounded-full ${brandColors[index % brandColors.length].bg}`}
                aria-hidden="true"
              />
              {fact}
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
