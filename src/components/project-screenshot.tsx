import Image from "next/image";
import type { Project } from "@/data/projects";

type ProjectScreenshotProps = {
  project: Project;
  view: "desktop" | "mobile";
  alt: string;
  sizes: string;
  // For the main image of a page. `preload` can't be used here, it would download both themes.
  highPriority?: boolean;
};

const fit = "object-cover object-top";

// Shows the screenshot that matches the site theme. Both images are in the HTML and
// CSS hides one. Images load lazily, so the browser only downloads the visible one.
export function ProjectScreenshot({ project, view, alt, sizes, highPriority }: ProjectScreenshotProps) {
  const path = `/projects/${project.slug}/${view}`;
  const fetchPriority = highPriority ? "high" : "auto";

  if (!project.hasDarkTheme) {
    return <Image src={`${path}.png`} alt={alt} fill sizes={sizes} fetchPriority={fetchPriority} className={fit} />;
  }

  return (
    <>
      <Image
        src={`${path}.png`}
        alt={alt}
        fill
        sizes={sizes}
        fetchPriority={fetchPriority}
        className={`${fit} dark:hidden`}
      />
      <Image
        src={`${path}-dark.png`}
        alt={alt}
        fill
        sizes={sizes}
        fetchPriority={fetchPriority}
        className={`${fit} hidden dark:block`}
      />
    </>
  );
}
