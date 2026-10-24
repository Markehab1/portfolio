import { contact, links } from "@/data/site";
import { ContactForm } from "../contact-form";
import { MailIcon, WhatsAppIcon } from "../icons";
import { Section } from "../section";
import { buttonOutline } from "../styles";

export function Contact() {
  return (
    <Section id="contact" title={contact.title} intro={contact.text}>
      <div className="grid gap-8 md:grid-cols-[1fr_1.6fr] md:gap-12">
        <div className="flex flex-col gap-3">
          <a
            href={links.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className={`${buttonOutline} justify-start`}
          >
            <WhatsAppIcon className="size-5 text-[#128C7E] dark:text-[#25D366]" />
            WhatsApp
            <span className="ml-auto text-muted">{links.whatsapp}</span>
          </a>
          <a href={links.emailHref} className={`${buttonOutline} justify-start`}>
            <MailIcon className="size-5 text-accent" />
            Email
            <span className="ml-auto truncate text-muted">{links.email}</span>
          </a>
        </div>

        <ContactForm />
      </div>
    </Section>
  );
}
