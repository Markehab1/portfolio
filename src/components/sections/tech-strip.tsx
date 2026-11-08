import { techShowcase } from "@/data/site";
import { TechLogo } from "../tech-logo";

// Three identical lists: the animation moves by exactly one list, so the loop has no jump.
const copies = [0, 1, 2];

export function TechStrip() {
  return (
    <section aria-label="Technologies I work with" className="border-y border-border bg-surface py-5">
      <div className="overflow-hidden motion-safe:[mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <div className="flex w-max hover:[animation-play-state:paused] motion-safe:animate-marquee motion-reduce:w-full">
          {copies.map((copy) => (
            <ul
              key={copy}
              aria-hidden={copy > 0}
              className={`flex shrink-0 items-center gap-10 pr-10 motion-reduce:w-full motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:gap-x-8 motion-reduce:gap-y-3 motion-reduce:px-5 ${
                copy > 0 ? "motion-reduce:hidden" : ""
              }`}
            >
              {techShowcase.strip.map((name) => (
                <li key={name} className="flex items-center gap-2.5 text-sm font-medium whitespace-nowrap text-muted">
                  <TechLogo name={name} className="size-7 shrink-0" />
                  {name.replace(" (ES6+)", "")}
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
