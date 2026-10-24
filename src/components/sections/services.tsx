import { services } from "@/data/site";
import { Section } from "../section";
import { buttonPrimary, card } from "../styles";

export function Services() {
  return (
    <Section id="services" title={services.title}>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {services.items.map((service, index) => (
          <li key={service.title} className={`${card} p-6`}>
            <span className="font-mono text-sm text-accent" aria-hidden="true">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-3 text-lg font-semibold tracking-tight">{service.title}</h3>
            <p className="mt-2 text-sm leading-6 text-muted">{service.description}</p>
          </li>
        ))}
      </ul>

      <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
        <p className="text-lg font-medium">{services.ctaText}</p>
        <a href="#contact" className={buttonPrimary}>
          {services.ctaButton}
        </a>
      </div>
    </Section>
  );
}
