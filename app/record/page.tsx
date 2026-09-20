import Link from "next/link";

import { Actions, PageShell, Section, pageMetadata } from "../_components/SubpageShell";

export const metadata = pageMetadata(
  "Development Record | Neil Hamson",
  "Dated, evidence-based notes from Neil Hamson's private Machine Intelligence development work.",
  "/record",
);

export default function DevelopmentRecord() {
  return (
    <PageShell
      eyebrow="PRIVATE R&D / PUBLIC RECORD"
      title="DEVELOPMENT RECORD"
      lede={
        <p>
          A place for dated, reviewable events from the private system. Entries
          will state what happened, which model provided reasoning, what Neil
          accepted or rejected, and what the evidence does not show.
        </p>
      }
    >
      <Section
        label="PUBLIC EVIDENCE"
        title="No dated public entries yet."
        intro={
          <p>
            The private system uses external models and is not a proprietary
            language model. Local Qwen3-14B inference has been demonstrated via
            llama.cpp, but its run date and evidence have not been established
            for a record entry. This page will be updated when a real event can
            be documented without exposing private source or operational state.
          </p>
        }
        narrow
      >
        <Actions>
          <Link className="brand-button brand-button-secondary" href="/machine-intelligence">
            CURRENT SYSTEM DETAILS
          </Link>
          <Link className="machine-intelligence-hire-link" href="/services">
            HIRE NEIL
          </Link>
        </Actions>
      </Section>
    </PageShell>
  );
}
