import { hero, links, profile } from "@/data/site";
import { GitHubIcon, LinkedInIcon, MailIcon } from "../icons";
import { buttonOutline, buttonPrimary, iconLink } from "../styles";
import { TechOrbit } from "../tech-orbit";

const heroLinks = [
  { label: "GitHub", href: links.github, Icon: GitHubIcon, external: true },
  { label: "LinkedIn", href: links.linkedin, Icon: LinkedInIcon, external: true },
  { label: "Email", href: links.emailHref, Icon: MailIcon, external: false },
];

// No scroll animation here, so the hero text is readable immediately.
export function Hero() {
  const [greeting] = hero.heading.split(profile.name);

  return (
    // -mt-16 + pt-16 slides the color glow up behind the 64px navbar.
    <section aria-labelledby="hero-heading" className="relative -mt-16 overflow-hidden pt-16">
      <div className="pointer-events-none absolute inset-0 bg-aurora" aria-hidden="true" />

      <div className="relative mx-auto flex w-full max-w-content flex-col items-center gap-12 px-5 py-16 md:px-8 md:py-24 lg:flex-row lg:justify-between">
        <div className="w-full max-w-2xl lg:max-w-xl">
          <p className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-sm text-muted">
            <span className="size-2 rounded-full bg-emerald-500" aria-hidden="true" />
            {profile.availability}
          </p>

          <h1
            id="hero-heading"
            className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl"
          >
            {greeting}
            <span className="text-brand">{profile.name}</span>
          </h1>
          <p className="mt-4 text-xl font-medium sm:text-2xl">{hero.subheading}</p>
          <p className="mt-4 max-w-xl text-base leading-7 text-muted sm:text-lg sm:leading-8">
            {hero.text}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#contact" className={buttonPrimary}>
              {hero.primaryButton}
            </a>
            <a
              href={profile.cv}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonOutline}
            >
              {hero.secondaryButton}
            </a>
          </div>

          <ul className="mt-6 -ml-2 flex items-center gap-1">
            {heroLinks.map(({ label, href, Icon, external }) => (
              <li key={label}>
                <a
                  href={href}
                  aria-label={label}
                  {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className={iconLink}
                >
                  <Icon className="size-5" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <TechOrbit />
      </div>
    </section>
  );
}
