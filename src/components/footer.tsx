import { links, profile } from "@/data/site";
import { GitHubIcon, LinkedInIcon, MailIcon, WhatsAppIcon } from "./icons";

const socialLinks = [
  { label: "GitHub", href: links.github, Icon: GitHubIcon, external: true },
  { label: "LinkedIn", href: links.linkedin, Icon: LinkedInIcon, external: true },
  { label: "WhatsApp", href: links.whatsappHref, Icon: WhatsAppIcon, external: true },
  { label: "Email", href: links.emailHref, Icon: MailIcon, external: false },
];

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex w-full max-w-content flex-col items-center gap-4 px-5 py-8 sm:flex-row sm:justify-between md:px-8">
        <p className="text-sm text-muted">
          © {profile.name} · {profile.title}
        </p>
        <ul className="flex items-center gap-1">
          {socialLinks.map(({ label, href, Icon, external }) => (
            <li key={label}>
              <a
                href={href}
                aria-label={label}
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="inline-flex size-9 items-center justify-center rounded-lg text-muted transition-colors hover:bg-surface hover:text-foreground"
              >
                <Icon className="size-5" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
