import Link from "next/link";

import { pageMetadata } from "../../../_components/SubpageShell";
import {
  LearnFooter,
  LearnNav,
  SiteHeader,
  SourcePanel,
  StepFooter,
} from "../LearnShell";
import styles from "../learn.module.css";

export const metadata = pageMetadata(
  "Bitcoin Self-Custody & Safety — Beginner Guide",
  "Understand custodial services, self-custody, recovery responsibility and common safety principles before deciding how to hold Bitcoin.",
  "/bitcoin/learn/security",
);

export default function SecurityPage() {
  return (
    <main className={`${styles.page} site`}>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <SiteHeader />
      <LearnNav />

      <section className={styles.hero} id="main-content">
        <div>
          <p className={styles.eyebrow}>BEGINNER PATH / 12</p>
          <h1>SELF-CUSTODY <span>&amp; SAFETY.</span></h1>
          <p className={styles.lead}>
            Self-custody removes reliance on another company to authorize your
            withdrawal, but it also makes you responsible for protecting the
            information that controls the wallet.
          </p>
        </div>
        <aside className={styles.heroPanel}>
          <span>DECISION, NOT DOGMA</span>
          <h2>CUSTODY IS A RESPONSIBILITY CHOICE</h2>
          <p>
            A beginner should understand both models before moving funds simply
            because someone told them “self-custody is better.”
          </p>
          <Link href="/bitcoin/wallets">DEEPER WALLET GUIDE →</Link>
        </aside>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeader}>
            <div>
              <p className={styles.eyebrow}>COMPARE / 10</p>
              <h2>CUSTODIAL VS SELF-CUSTODY.</h2>
            </div>
            <div className={styles.sectionIntro}>
              The important question is who ultimately controls the keys needed
              to authorize spending.
            </div>
          </div>

          <table className={styles.compare}>
            <thead>
              <tr>
                <th>CUSTODIAL SERVICE</th>
                <th>SELF-CUSTODY WALLET</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>The provider safeguards the keys and operates the account or wallet service.</td>
                <td>You control the keys or recovery material needed to spend.</td>
              </tr>
              <tr>
                <td>Account recovery may be possible through the provider.</td>
                <td>Losing the necessary recovery information can permanently remove access.</td>
              </tr>
              <tr>
                <td>You rely on the provider's security, solvency, policies and withdrawal availability.</td>
                <td>You remove that custody reliance but accept direct operational responsibility.</td>
              </tr>
            </tbody>
          </table>

          <div className={styles.callout}>
            <strong>Before using real Bitcoin:</strong> understand your backup,
            verify receiving information carefully, start with small amounts
            while learning, and never disclose wallet recovery information.
          </div>
        </div>
      </section>

      <SourcePanel />
      <StepFooter
        previous={{ href: "/bitcoin/fees", label: "FEES & CONFIRMATIONS" }}
        next={{ href: "/bitcoin/learn/risks-scams", label: "RISKS, MISTAKES & SCAMS" }}
      />
      <LearnFooter />
    </main>
  );
}
