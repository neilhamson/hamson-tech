import Link from "next/link";

import { Actions, PageShell, Section, pageMetadata } from "../_components/SubpageShell";

export const metadata = pageMetadata(
  "Software Engineering | Neil Hamson",
  "Discuss clearly scoped software development, improvement and technical prototyping with Neil Hamson.",
  "/services",
);

export default function ServicesPage() {
  return (
    <PageShell
      eyebrow="SOFTWARE ENGINEERING / NEIL HAMSON"
      title="BUILD SOFTWARE THAT HAS A PURPOSE."
      lede={<p>I design, develop and improve software for clearly scoped projects. Tell me what problem it must solve, what exists now and what a successful result would look like.</p>}
      compactHero
    >
      <Section label="DEFINED PROJECTS" title="DISCUSS YOUR BRIEF" narrow>
        <p>Software development, improvements to an existing system and technical prototypes can be discussed as individual projects.</p>
        <p>Include your goal, any existing code or platform, constraints and desired outcome. Scope, timing and price are agreed before work begins.</p>
        <Actions>
          <Link className="brand-button brand-button-secondary" href="/contact-us">SEND A PROJECT ENQUIRY</Link>
        </Actions>
      </Section>
    </PageShell>
  );
}
