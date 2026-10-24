import Image from "next/image";
import { hero, links, profile } from "@/data/site";
import { GitHubIcon, LinkedInIcon, MailIcon } from "../icons";
import { buttonOutline, buttonPrimary, iconLink } from "../styles";

const heroLinks = [
  { label: "GitHub", href: links.github, Icon: GitHubIcon, external: true },
  { label: "LinkedIn", href: links.linkedin, Icon: LinkedInIcon, external: true },
  { label: "Email", href: links.emailHref, Icon: MailIcon, external: false },
];

// No scroll animation here, so the hero text is readable immediately.
export function Hero() {
  return (
    <section aria-labelledby="hero-heading" className="py-16 md:py-24">
      <div className="mx-auto flex w-full max-w-content flex-col-reverse gap-10 px-5 md:flex-row md:items-center md:justify-between md:px-8">
        <div className="max-w-2xl">
          <p className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-sm text-muted">
            <span className="size-2 rounded-full bg-emerald-500" aria-hidden="true" />
            {profile.availability}
          </p>

          <h1
            id="hero-heading"
            className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl"
          >
            {hero.heading}
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

        {/* preload replaces the old `priority` prop in Next.js 16 */}
        <Image
          src={profile.avatar}
          alt={`Photo of ${profile.name}`}
          width={200}
          height={200}
          sizes="(min-width: 768px) 200px, 140px"
          preload
          className="size-[140px] shrink-0 rounded-full border border-border object-cover md:size-[200px]"
        />
      </div>
    </section>
  );
}
