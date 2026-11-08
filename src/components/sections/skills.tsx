import { skills } from "@/data/site";
import { Section } from "../section";
import { brandColors, card, chip } from "../styles";
import { TechLogo } from "../tech-logo";

// Three cards on the first row and two wider ones on the second, so no gap is left.
const groupWidths = [
  "lg:col-span-2",
  "lg:col-span-2",
  "lg:col-span-2",
  "lg:col-span-3",
  "sm:col-span-2 lg:col-span-3",
];

export function Skills() {
  return (
    <Section id="skills" title={skills.title} tint="violet">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
        {skills.groups.map((group, index) => {
          const color = brandColors[index % brandColors.length];

          return (
            <div
              key={group.name}
              className={`${card} relative overflow-hidden p-6 ${groupWidths[index]} ${
                group.learning ? "border-dashed" : ""
              }`}
            >
              <span className={`absolute inset-x-0 top-0 h-1 ${color.bg}`} aria-hidden="true" />
              <h3 className={`text-sm font-semibold tracking-wider uppercase ${color.text}`}>
                {group.name}
              </h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <li key={skill} className={`${chip} py-1.5`}>
                    <TechLogo name={skill} className="size-5 shrink-0" />
                    {skill}
                    {/* "learning" label so it is clearly not a finished skill */}
                    {group.learning && (
                      <span className="rounded border border-accent/40 px-1.5 py-0.5 text-xs font-medium text-accent">
                        learning
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
