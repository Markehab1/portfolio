import type { Metadata, ResolvingMetadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { ArrowLeftIcon, ArrowRightIcon, ExternalLinkIcon, GitHubIcon } from "@/components/icons";
import { ProjectTag } from "@/components/project-card";
import { buttonOutline, buttonPrimary, card, chip } from "@/components/styles";
import { projects } from "@/data/projects";

// Build one static page per project at build time.
export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export async function generateMetadata(
  { params }: PageProps<"/projects/[slug]">,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  // Keep the site's share image from the root layout.
  const parentImages = (await parent).openGraph?.images ?? [];

  return {
    title: project.title,
    description: project.summary,
    openGraph: {
      title: `${project.title} | Mark Ehab`,
      description: project.summary,
      images: parentImages,
    },
  };
}

function Heading({ children }: { children: ReactNode }) {
  return <h2 className="text-2xl font-semibold tracking-tight">{children}</h2>;
}

export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const index = projects.findIndex((project) => project.slug === slug);
  if (index === -1) notFound();

  const project = projects[index];
  const nextProject = projects[(index + 1) % projects.length];

  return (
    <article className="mx-auto w-full max-w-content px-5 py-12 md:px-8 md:py-16">
      <Link
        href="/#projects"
        className="inline-flex items-center gap-2 rounded-md text-sm text-muted transition-colors hover:text-foreground"
      >
        <ArrowLeftIcon className="size-4" /> All projects
      </Link>

      {/* Title, tag, summary, links */}
      <header className="mt-8 max-w-3xl">
        <ProjectTag tag={project.tag} />
        <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">{project.title}</h1>
        <p className="mt-4 text-lg text-muted sm:text-xl">{project.summary}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className={buttonPrimary}>
            <ExternalLinkIcon className="size-4" /> Live site
          </a>
          <a href={project.codeUrl} target="_blank" rel="noopener noreferrer" className={buttonOutline}>
            <GitHubIcon className="size-4" /> Code
          </a>
        </div>
      </header>

      <div className="relative mt-12 aspect-[16/10] overflow-hidden rounded-xl border border-border bg-surface">
        <Image
          src={`/projects/${project.slug}/desktop.png`}
          alt={`Desktop screenshot of the ${project.title} website`}
          fill
          preload
          sizes="(min-width: 1100px) 1036px, calc(100vw - 40px)"
          className="object-cover object-top"
        />
      </div>

      <div className="mt-16 grid gap-12 lg:grid-cols-[1fr_300px] lg:gap-16">
        <div className="max-w-3xl space-y-12">
          <section>
            <Heading>Overview</Heading>
            <p className="mt-4 leading-7 text-muted">{project.overview}</p>
          </section>

          <section>
            <Heading>My role</Heading>
            <p className="mt-4 leading-7 text-muted">{project.role}</p>
          </section>

          <section>
            <Heading>Features</Heading>
            <ul className="mt-4 space-y-3">
              {project.features.map((feature) => (
                <li key={feature} className="flex gap-3 leading-7 text-muted">
                  <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                  {feature}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <Heading>Challenges</Heading>
            <ul className="mt-4 space-y-4">
              {project.challenges.map((challenge) => (
                <li key={challenge.problem} className={`${card} p-6`}>
                  <p className="text-xs font-semibold tracking-wider text-muted uppercase">Problem</p>
                  <p className="mt-1 leading-7">{challenge.problem}</p>
                  <p className="mt-4 text-xs font-semibold tracking-wider text-accent uppercase">
                    Solution
                  </p>
                  <p className="mt-1 leading-7 text-muted">{challenge.solution}</p>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <Heading>Tech stack</Heading>
            <ul className="mt-4 flex flex-wrap gap-2">
              {project.stack.map((item) => (
                <li key={item} className={chip}>
                  {item}
                </li>
              ))}
            </ul>
          </section>

          {project.status && (
            <p
              role="note"
              className="rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm leading-6 text-amber-900 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-200"
            >
              <strong className="font-semibold">Status: </strong>
              {project.status}
            </p>
          )}
        </div>

        {/* Mobile screenshot */}
        <section className="lg:pt-1">
          <Heading>On mobile</Heading>
          <div className="relative mt-4 aspect-[390/844] w-full max-w-[280px] overflow-hidden rounded-[2rem] border-4 border-border bg-surface">
            <Image
              src={`/projects/${project.slug}/mobile.png`}
              alt={`Mobile screenshot of the ${project.title} website`}
              fill
              sizes="280px"
              className="object-cover object-top"
            />
          </div>
        </section>
      </div>

      <nav aria-label="Next project" className="mt-20 border-t border-border pt-8">
        <Link
          href={`/projects/${nextProject.slug}`}
          className="group flex items-center justify-between gap-4 rounded-xl"
        >
          <span>
            <span className="block text-sm text-muted">Next project</span>
            <span className="mt-1 block text-2xl font-semibold tracking-tight transition-colors group-hover:text-accent">
              {nextProject.title}
            </span>
          </span>
          <ArrowRightIcon className="size-6 shrink-0 text-muted transition group-hover:text-accent motion-safe:group-hover:translate-x-1" />
        </Link>
      </nav>
    </article>
  );
}
