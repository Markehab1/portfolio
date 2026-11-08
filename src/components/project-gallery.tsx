"use client";

import { useState } from "react";
import type { Project } from "@/data/projects";
import { ProjectScreenshot } from "./project-screenshot";

const views = ["Desktop", "Mobile"] as const;

export function ProjectGallery({ project }: { project: Project }) {
  const [view, setView] = useState<(typeof views)[number]>("Desktop");

  return (
    <section aria-label="Screenshots" className="mt-12">
      <div className="flex gap-2">
        {views.map((name) => (
          <button
            key={name}
            type="button"
            aria-pressed={view === name}
            onClick={() => setView(name)}
            className={`h-10 rounded-lg px-4 text-sm font-medium transition ${
              view === name
                ? "bg-accent text-accent-foreground"
                : "border border-border text-muted hover:text-foreground"
            }`}
          >
            {name}
          </button>
        ))}
      </div>

      {/* The hidden view is not downloaded until it is first opened. */}
      <div
        className={`relative mt-4 aspect-[16/10] overflow-hidden rounded-xl border border-border bg-surface ${
          view === "Desktop" ? "" : "hidden"
        }`}
      >
        <ProjectScreenshot
          project={project}
          view="desktop"
          alt={`Desktop screenshot of the ${project.title} website`}
          sizes="(min-width: 1100px) 1036px, calc(100vw - 40px)"
          highPriority
        />
      </div>

      <div
        className={`mt-4 justify-center rounded-xl border border-border bg-surface p-6 sm:p-10 ${
          view === "Mobile" ? "flex" : "hidden"
        }`}
      >
        <div className="relative aspect-[390/844] w-full max-w-[280px] overflow-hidden rounded-[2rem] border-4 border-border bg-background">
          <ProjectScreenshot
            project={project}
            view="mobile"
            alt={`Mobile screenshot of the ${project.title} website`}
            sizes="280px"
          />
        </div>
      </div>
    </section>
  );
}
