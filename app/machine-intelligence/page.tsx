import Link from "next/link";

import { PageShell, pageMetadata } from "../_components/SubpageShell";
import styles from "./machine-intelligence.module.css";

export const metadata = pageMetadata(
  "TRON: Private Machine Intelligence System | Neil Hamson",
  "TRON is Neil Hamson's private Machine Intelligence development system: persistent state, bounded tools, human-controlled code changes and verified local model experiments.",
  "/machine-intelligence",
);

const loop = [
  ["01", "INSPECT", "SYSTEM"],
  ["02", "PROPOSE", "SYSTEM"],
  ["03", "APPROVE", "HUMAN GATE"],
  ["04", "VALIDATE", "BOUNDED"],
  ["05", "COMMIT", "HUMAN GATE"],
] as const;

const evidence = [
  [
    "47 AUTOMATED TESTS",
    "PASS",
    "Verified after the bounded local-repository development work on the Windows development machine.",
  ],
  [
    "PYTHON COMPILATION",
    "PASS",
    "The recorded development run completed Python compilation checks without errors.",
  ],
  [
    "GIT DIFF INTEGRITY",
    "PASS",
    "The recorded development run completed git diff --check without errors.",
  ],
  [
    "QWEN3-14B / LLAMA.CPP",
    "VERIFIED",
    "Local Qwen3-14B Q4_K_M inference generated output on CPU. This does not establish a proprietary TRON model.",
  ],
  [
    "CONTROLLED DEVELOPMENT CYCLE",
    "VERIFIED",
    "A controlled software-development cycle was documented on 20 September 2026, including an approved local commit. Broader repeatability remains under development.",
  ],
] as const;

const authority = [
  ["INSPECT REPOSITORY", "ALLOWED"],
  ["PROPOSE CHANGE", "BOUNDED"],
  ["APPLY CHANGE", "HUMAN APPROVAL"],
  ["LOCAL COMMIT", "SEPARATE APPROVAL"],
  ["REMOTE PUSH", "NOT AUTHORISED"],
  ["ARBITRARY SHELL", "NOT GRANTED"],
] as const;

export default function MachineIntelligencePage() {
  return (
    <PageShell
      eyebrow="TRON / PRIVATE MACHINE INTELLIGENCE"
      title={<span className={styles.heroTitle}>CONTROLLED SOFTWARE DEVELOPMENT.</span>}
      lede={
        <p className={styles.heroLede}>
          TRON is a private Machine Intelligence engineering assistant, built to
          support software development through bounded tools, model reasoning
          and explicit human authority. It is not for sale or distribution.
        </p>
      }
      compactHero
      accent="blue"
    >
      <main className={styles.interface}>
        <nav className={styles.controlBus} aria-label="TRON control bus">
          <div className={styles.busIdentity}>
            <span>TRON / CONTROL BUS</span>
            <strong>SIGNAL / HARDWARE / AUTHORITY</strong>
          </div>

          <a className={styles.busActive} href="#console">
            <span>01 / CONSOLE</span>
            <strong>SYSTEM ACTIVE</strong>
          </a>

          <a href="#evidence">
            <span>02 / EVIDENCE</span>
            <strong>47 TESTS / PASS</strong>
          </a>

          <a className={styles.busAuthority} href="#authority">
            <span>03 / AUTHORITY</span>
            <strong>HUMAN CONTROL</strong>
          </a>

          <a className={styles.busCopper} href="#model">
            <span>04 / MODEL</span>
            <strong>QWEN3-14B</strong>
          </a>

          <Link href="/contact-us">
            <span>05 / CONTACT</span>
            <strong>OPEN CHANNEL →</strong>
          </Link>
        </nav>

        <section className={styles.console} id="console" aria-labelledby="console-title">
          <header className={styles.consoleHeader}>
            <div>
              <span className={styles.micro}>TRON / DEVELOPMENT CONTROL SURFACE</span>
              <h2 id="console-title">SYSTEM ACTIVE</h2>
            </div>

            <div className={styles.live}>
              <i aria-hidden="true" />
              PRIVATE / ACTIVE DEVELOPMENT
            </div>
          </header>

          <div className={styles.consoleBody}>
            <div className={styles.primaryState}>
              <div className={styles.stateBlock}>
                <span className={styles.label}>CURRENT MODE</span>
                <strong>BOUNDED REPOSITORY DEVELOPMENT</strong>
                <p>
                  TRON can select and inspect a local Git repository while
                  preserving restricted write authority, separate approval
                  gates and no autonomous push.
                </p>
              </div>

              <div className={styles.telemetry}>
                <div>
                  <span>LOOP</span>
                  <strong>v1.0</strong>
                  <small>IMPLEMENTED</small>
                </div>
                <div>
                  <span>TESTS</span>
                  <strong>47</strong>
                  <small>PASSING</small>
                </div>
                <div>
                  <span>MEMORY</span>
                  <strong>v1</strong>
                  <small>IMPLEMENTED</small>
                </div>
                <div>
                  <span>LOCAL MODEL</span>
                  <strong>14B</strong>
                  <small>DEMONSTRATED</small>
                </div>
              </div>
            </div>

            <div className={styles.taskStrip}>
              <span>DOCUMENTED DEVELOPMENT CYCLE</span>
              <strong>HUMAN-APPROVED CHANGE AND LOCAL COMMIT</strong>
              <p>
                Proposal → approval → application → validation → separate
                commit approval → local commit.
              </p>
            </div>

            <div className={styles.loop} aria-label="TRON Development Loop v1.0">
              {loop.map(([number, title, type], index) => (
                <div className={styles.loopStep} key={number}>
                  <div className={styles.stepTop}>
                    <span>{number}</span>
                    <small className={type === "HUMAN GATE" ? styles.human : ""}>
                      {type}
                    </small>
                  </div>
                  <strong>{title}</strong>
                  {index < loop.length - 1 ? <i aria-hidden="true">→</i> : null}
                </div>
              ))}
            </div>

            <div className={styles.consoleFooter}>
              <span>REMOTE PUSH / DISABLED</span>
              <span>ARBITRARY SHELL / NOT GRANTED</span>
              <span>PUBLIC BENCHMARK / NONE CLAIMED</span>
            </div>
          </div>
        </section>

        <section className={styles.lowerSection} id="evidence" aria-labelledby="evidence-title">
          <div className={styles.desktopLower}>
            <div className={styles.evidencePanel}>
              <header className={styles.sectionHeader}>
                <div>
                  <span className={styles.micro}>ENGINEERING RECORD</span>
                  <h2 id="evidence-title">VERIFIED EVIDENCE</h2>
                </div>
                <span>CLICK A ROW FOR DETAIL</span>
              </header>

              <div className={styles.evidenceRows}>
                {evidence.map(([name, state, detail]) => (
                  <details key={name}>
                    <summary>
                      <span>{name}</span>
                      <strong data-state={state}>{state}</strong>
                      <small>DETAILS +</small>
                    </summary>
                    <p>{detail}</p>
                  </details>
                ))}
              </div>
            </div>
          </div>

          <details className={`${styles.mobileDisclosure} ${styles.mobileEvidence}`}>
            <summary>
              <div>
                <span>ENGINEERING STATUS</span>
                <strong>5 EVIDENCE RECORDS</strong>
              </div>
              <small>OPEN +</small>
            </summary>
            <div className={styles.mobileDisclosureBody}>
              {evidence.map(([name, state, detail]) => (
                <div className={styles.mobileRecord} key={name}>
                  <div>
                    <span>{name}</span>
                    <strong data-state={state}>{state}</strong>
                  </div>
                  <p>{detail}</p>
                </div>
              ))}
            </div>
          </details>
        </section>

        <section className={styles.dualPanel}>
          <div className={styles.lowerSlot} id="authority">
            <div className={`${styles.authority} ${styles.desktopLower}`}>
              <header className={styles.sectionHeader}>
                <div>
                  <span className={styles.micro}>AUTHORITY BOUNDARY</span>
                  <h2>HUMAN CONTROL</h2>
                </div>
              </header>

              <div className={styles.authorityRows}>
                {authority.map(([action, rule]) => (
                  <div key={action}>
                    <span>{action}</span>
                    <strong>{rule}</strong>
                  </div>
                ))}
              </div>
            </div>

            <details className={`${styles.mobileDisclosure} ${styles.mobileAuthority}`}>
              <summary>
                <div>
                  <span>CONTROL</span>
                  <strong>HUMAN CONTROL</strong>
                </div>
                <small>OPEN +</small>
              </summary>
              <div className={styles.mobileDisclosureBody}>
                {authority.map(([action, rule]) => (
                  <div className={styles.mobilePair} key={action}>
                    <span>{action}</span>
                    <strong>{rule}</strong>
                  </div>
                ))}
              </div>
            </details>
          </div>

          <div className={styles.lowerSlot} id="model">
            <div className={`${styles.model} ${styles.desktopLower}`}>
              <header className={styles.sectionHeader}>
                <div>
                  <span className={styles.micro}>MODEL INFRASTRUCTURE</span>
                  <h2>REASONING LAYER</h2>
                </div>
              </header>

              <div className={styles.modelBody}>
                <div>
                  <span>PRIMARY REASONING</span>
                  <strong>EXTERNAL MODELS</strong>
                </div>
                <div>
                  <span>LOCAL INFERENCE</span>
                  <strong>QWEN3-14B / LLAMA.CPP</strong>
                </div>
                <div>
                  <span>FULL LOCAL WORKFLOW</span>
                  <strong>NOT ESTABLISHED</strong>
                </div>
                <div>
                  <span>PROPRIETARY MODEL</span>
                  <strong>NOT CLAIMED</strong>
                </div>
              </div>
            </div>

            <details className={`${styles.mobileDisclosure} ${styles.mobileModel}`}>
              <summary>
                <div>
                  <span>MODEL</span>
                  <strong>QWEN3-14B / LOCAL DEMONSTRATED</strong>
                </div>
                <small>OPEN +</small>
              </summary>
              <div className={styles.mobileDisclosureBody}>
                <div className={styles.mobilePair}>
                  <span>PRIMARY REASONING</span>
                  <strong>EXTERNAL MODELS</strong>
                </div>
                <div className={styles.mobilePair}>
                  <span>LOCAL INFERENCE</span>
                  <strong>QWEN3-14B / LLAMA.CPP</strong>
                </div>
                <div className={styles.mobilePair}>
                  <span>FULL LOCAL WORKFLOW</span>
                  <strong>NOT ESTABLISHED</strong>
                </div>
                <div className={styles.mobilePair}>
                  <span>PROPRIETARY MODEL</span>
                  <strong>NOT CLAIMED</strong>
                </div>
              </div>
            </details>
          </div>
        </section>

        <section className={styles.closeout}>
          <div>
            <span className={styles.micro}>TRON / CURRENT POSITION</span>
            <strong>PRIVATE. CONTROLLED. UNDER ACTIVE DEVELOPMENT.</strong>
          </div>
          <p>
            A controlled development cycle has been documented. Repeatability and
            broader capability remain under development. TRON is a private
            engineering assistant, not a product for sale or distribution.
          </p>
          <Link href="/contact-us">DISCUSS TRON</Link>
        </section>
      </main>
    </PageShell>
  );
}
