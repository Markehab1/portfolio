import { skills } from "@/data/site";
import { Section } from "../section";
import { card, chip } from "../styles";

export function Skills() {
  return (
    <Section id="skills" title={skills.title}>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {skills.groups.map((group) => (
          <div key={group.name} className={`${card} p-6 ${group.learning ? "border-dashed" : ""}`}>
            <h3 className="text-sm font-semibold tracking-wider text-muted uppercase">
              {group.name}
            </h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {group.skills.map((skill) => (
                <li key={skill} className={chip}>
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
        ))}
      </div>
    </Section>
  );
}
