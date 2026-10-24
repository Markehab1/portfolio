import { projects } from "@/data/projects";
import { projectsSection } from "@/data/site";
import { ProjectCard } from "../project-card";
import { Section } from "../section";

export function Projects() {
  return (
    <Section id="projects" title={projectsSection.title}>
      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </Section>
  );
}
