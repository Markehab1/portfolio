import { profile, techShowcase } from "@/data/site";
import type { TechName } from "@/data/tech-logos";
import { TechLogo } from "./tech-logo";

type RingProps = {
  names: TechName[];
  position: string; // where the ring sits inside the orbit
  spin: string; // animation that turns the ring
  counterSpin: string; // the opposite animation, so the logos stay upright
};

function Ring({ names, position, spin, counterSpin }: RingProps) {
  return (
    <div className={`absolute rounded-full border border-dashed border-violet/30 ${position} ${spin}`}>
      {names.map((name, index) => {
        // Spread the logos evenly around the circle.
        const angle = (index / names.length) * 2 * Math.PI;
        const left = `${(50 + 50 * Math.cos(angle)).toFixed(2)}%`;
        const top = `${(50 + 50 * Math.sin(angle)).toFixed(2)}%`;

        return (
          <div key={name} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left, top }}>
            <div
              className={`flex size-11 items-center justify-center rounded-xl border border-border bg-surface shadow-md shadow-violet/10 sm:size-12 ${counterSpin}`}
            >
              <TechLogo name={name} className="size-6 sm:size-7" />
            </div>
          </div>
        );
      })}
    </div>
  );
}

// Decorative: every technology here is also listed as text in the Skills section.
// Pure CSS animation, so it never delays the hero text. Reduced motion keeps it still.
export function TechOrbit() {
  return (
    <div aria-hidden="true" className="relative size-[270px] shrink-0 sm:size-[340px] lg:size-[400px]">
      <div className="absolute inset-[26%] rounded-full bg-brand opacity-35 blur-3xl" />

      <Ring
        names={techShowcase.orbitOuter}
        position="inset-6"
        spin="motion-safe:animate-orbit-outer"
        counterSpin="motion-safe:animate-orbit-outer-counter"
      />
      <Ring
        names={techShowcase.orbitInner}
        position="inset-[26%]"
        spin="motion-safe:animate-orbit-inner"
        counterSpin="motion-safe:animate-orbit-inner-counter"
      />

      <div className="absolute inset-0 flex items-center justify-center">
        <span className="flex size-20 items-center justify-center rounded-full bg-brand font-mono text-lg font-bold text-accent-foreground shadow-xl shadow-violet/30 sm:size-24 sm:text-xl">
          &lt;{profile.initials}/&gt;
        </span>
      </div>
    </div>
  );
}
