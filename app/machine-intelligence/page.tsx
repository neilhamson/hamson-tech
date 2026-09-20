import Link from "next/link";

import { Actions, PageShell, Section, pageMetadata } from "../_components/SubpageShell";
import styles from "./machine-intelligence.module.css";

export const metadata = pageMetadata(
  "MI1: Machine Intelligence Development Tool | Neil Hamson",
  "MI1 is Neil Hamson's private Machine Intelligence software prototype for human-reviewed code changes. See how its development loop works, what exists and what remains to be verified.",
  "/machine-intelligence",
);

const workflow = [
  ["01", "INSPECT", "Read the approved repository and the task before preparing a change."],
  ["02", "PROPOSE", "Present a bounded change set for human review."],
  ["03", "APPROVE TO APPLY", "The developer reviews the proposed changes and explicitly authorises application."],
  ["04", "VALIDATE", "Apply the approved change, run bounded validation, and report the result. The loop supports one repair attempt or rollback after failure."],
  ["05", "APPROVE TO COMMIT", "A separate human decision authorises a local Git commit. The loop has no autonomous push authority."],
] as const;

export default function MachineIntelligencePage() {
  return (
    <PageShell
      eyebrow="MI1 / PRIVATE SOFTWARE PROTOTYPE"
      title="MI1: REVIEW THE CHANGE BEFORE IT LANDS."
      lede={<p>MI1 is software Neil Hamson is developing to inspect a codebase, propose a limited change, and put a person in control of applying and committing it. The development loop is implemented in a private environment; a dependable complete cycle and recovery after interruption remain to be verified.</p>}
      compactHero
      accent="blue"
    >
      <Section
        id="workflow"
        label="HOW THE DEVELOPMENT LOOP WORKS"
        title="TWO DECISIONS. ONE REVIEWABLE CHANGE."
        intro={<p>These are the stages of the private Development Loop v1.0. Approval to apply a proposal and approval to make a local commit are separate decisions.</p>}
      >
        <ol className={styles.workflow}>
          {workflow.map(([number, title, description]) => (
            <li key={number}><span>{number}</span><div><h3>{title}</h3><p>{description}</p></div></li>
          ))}
        </ol>
        <p className={styles.note}>The homepage sandbox illustrates the review step in your browser. It is not connected to MI1, does not execute code and cannot approve a real change.</p>
      </Section>

      <Section
        label="IMPLEMENTED AND UNRESOLVED"
        title="CURRENT ENGINEERING STATE"
        intro={<p>Persistent project state, memory records, bounded tools and the development loop exist in the private prototype. The following distinction matters more than a list of component names.</p>}
      >
        <div className={styles.record}>
          <div><span>IMPLEMENTED</span><p>Source inspection, structured proposals, human approval gates, bounded validation, one repair attempt or rollback, and a controlled local commit path.</p></div>
          <div><span>STILL TO VERIFY</span><p>Reliable restart with a previously approved proposal when the working tree already contains that exact change; a documented complete cycle from proposal through local commit.</p></div>
          <div><span>AUTHORITY LIMIT</span><p>No arbitrary shell access or autonomous push authority is granted to the development loop.</p></div>
          <div><span>PUBLIC EVIDENCE</span><p>The source and operational records are private. This page does not present a public end-to-end demonstration or performance benchmark.</p></div>
        </div>
      </Section>

      <Section
        label="TERMINOLOGY AND MODEL INFRASTRUCTURE"
        title="WHY MACHINE INTELLIGENCE?"
        intro={<p>Artificial intelligence (AI) is the widely used term for this field. I use <strong>Machine Intelligence</strong> to name the engineering direction of MI1: persistent software, model reasoning and tools working within defined human authority. It is a choice of emphasis, not a claim that MI1 falls outside AI or is a new proprietary language model.</p>}
      >
        <p className={styles.note}>Separately, local inference with Qwen3-14B through llama.cpp has been demonstrated on a CPU. External models still provide the primary reasoning layer. That model experiment does not establish that MI1’s full development workflow runs reliably on a local model.</p>
      </Section>

      <Section
        label="TECHNICAL ENQUIRIES"
        title="DISCUSS MI1 WITH NEIL HAMSON"
        intro={<p>MI1 is private and has no public release date. For a technical discussion about the development work or a separately scoped software project, contact Neil directly.</p>}
        narrow
      >
        <Actions><Link className="brand-button brand-button-primary" href="/contact-us">CONTACT NEIL</Link></Actions>
      </Section>
    </PageShell>
  );
}
