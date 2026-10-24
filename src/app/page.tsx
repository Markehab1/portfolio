import { Section } from "@/components/section";
import { about, contact, hero, projectsSection, services, skills } from "@/data/site";

// Step 1: page skeleton. Each section gets its real content in later steps.
export default function Home() {
  return (
    <>
      <section aria-labelledby="hero-heading" className="py-16 md:py-24">
        <div className="mx-auto w-full max-w-content px-5 md:px-8">
          <h1 id="hero-heading" className="text-4xl font-bold tracking-tight sm:text-5xl">
            {hero.heading}
          </h1>
        </div>
      </section>

      <Section id="about" title={about.title} />
      <Section id="skills" title={skills.title} />
      <Section id="projects" title={projectsSection.title} />
      <Section id="services" title={services.title} />
      <Section id="contact" title={contact.title} />
    </>
  );
}
