import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/data/projects";
import { ArrowRightIcon, ExternalLinkIcon, GitHubIcon } from "./icons";
import { card, chip } from "./styles";

const textLink =
  "inline-flex items-center gap-1.5 rounded-md text-sm font-medium transition-colors";

export function ProjectTag({ tag }: { tag: Project["tag"] }) {
  const isClient = tag === "Client project";
  return (
    <span
      className={`inline-flex w-fit rounded-full px-2.5 py-0.5 text-xs font-medium ${
        isClient ? "bg-accent/10 text-accent" : "border border-border text-muted"
      }`}
    >
      {tag}
    </span>
  );
}

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className={`${card} flex flex-col overflow-hidden`}>
      <div className="relative aspect-[16/10] border-b border-border bg-background">
        <Image
          src={`/projects/${project.slug}/desktop.png`}
          alt={`Screenshot of the ${project.title} website`}
          fill
          sizes="(min-width: 1100px) 506px, (min-width: 768px) calc(50vw - 44px), calc(100vw - 40px)"
          className="object-cover object-top"
        />
      </div>

      <div className="flex flex-1 flex-col p-6">
        <ProjectTag tag={project.tag} />
        <h3 className="mt-3 text-xl font-semibold tracking-tight">{project.title}</h3>
        <p className="mt-2 text-muted">{project.summary}</p>

        <ul className="mt-4 flex flex-wrap gap-2">
          {project.stack.map((item) => (
            <li key={item} className={`${chip} text-xs`}>
              {item}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-2 pt-6">
          <Link
            href={`/projects/${project.slug}`}
            className={`${textLink} text-accent hover:brightness-90`}
          >
            Case study <ArrowRightIcon className="size-4" />
            <span className="sr-only">: {project.title}</span>
          </Link>
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`${textLink} text-muted hover:text-foreground`}
          >
            <ExternalLinkIcon className="size-4" /> Live
            <span className="sr-only">: {project.title} (opens in a new tab)</span>
          </a>
          <a
            href={project.codeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`${textLink} text-muted hover:text-foreground`}
          >
            <GitHubIcon className="size-4" /> Code
            <span className="sr-only">: {project.title} (opens in a new tab)</span>
          </a>
        </div>
      </div>
    </article>
  );
}
