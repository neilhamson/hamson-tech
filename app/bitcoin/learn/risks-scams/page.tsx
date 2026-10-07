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
  "Bitcoin Risks, Mistakes & Scams — Beginner Safety Guide",
  "Understand Bitcoin price risk, irreversible payments, recovery loss, custodial risk, privacy, scams and practical checks before using real funds.",
  "/bitcoin/learn/risks-scams",
);

export default function RisksScamsPage() {
  return (
    <main className={`${styles.page} site`}>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <SiteHeader />
      <LearnNav />

      <section className={styles.hero} id="main-content">
        <div>
          <p className={styles.eyebrow}>BEGINNER PATH / 13</p>
          <h1>RISKS, MISTAKES <span>&amp; SCAMS.</span></h1>
          <p className={styles.lead}>
            Understanding Bitcoin also means understanding what it cannot do
            for you. There is no central undo button, prices can fall sharply,
            self-custody can be lost through poor backup practices, and
            scammers actively target Bitcoin users.
          </p>
        </div>

        <aside className={styles.heroPanel}>
          <span>CORE RULE</span>
          <h2>VERIFY BEFORE YOU SEND</h2>
          <p>
            Bitcoin payments are designed to be difficult to reverse. Check the
            destination, amount and fee before authorizing a transaction.
          </p>
          <Link href="/bitcoin/learn/how-to-buy">NEXT: HOW BUYING WORKS →</Link>
        </aside>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionInner}>
          <div className={styles.grid3}>
            <article className={styles.card}>
              <span className={styles.cardNumber}>MARKET RISK</span>
              <h3>PRICE CAN FALL</h3>
              <p>
                Bitcoin's market price can move substantially in either
                direction. A fixed maximum supply does not create a guaranteed
                minimum price or guaranteed investment return.
              </p>
            </article>

            <article className={styles.card}>
              <span className={styles.cardNumber}>TRANSACTION RISK</span>
              <h3>NO CENTRAL REVERSAL</h3>
              <p>
                If you send Bitcoin to the wrong valid destination, there is no
                bank or central Bitcoin operator that can simply cancel the
                transaction. A refund depends on the recipient cooperating.
              </p>
            </article>

            <article className={styles.card}>
              <span className={styles.cardNumber}>RECOVERY RISK</span>
              <h3>SECRETS CAN BE LOST OR STOLEN</h3>
              <p>
                A self-custody wallet depends on protecting its keys and
                recovery information. Losing necessary recovery material can
                remove access; exposing it can allow someone else to take control.
              </p>
            </article>

            <article className={styles.card}>
              <span className={styles.cardNumber}>CUSTODY RISK</span>
              <h3>THIRD PARTIES CAN FAIL</h3>
              <p>
                Leaving Bitcoin with a custodian means relying on that
                provider's security, solvency, systems, policies and ability to
                process withdrawals.
              </p>
              <Link href="/bitcoin/learn/security">CUSTODY VS SELF-CUSTODY →</Link>
            </article>

            <article className={styles.card}>
              <span className={styles.cardNumber}>PRIVACY RISK</span>
              <h3>THE BLOCKCHAIN IS PUBLIC</h3>
              <p>
                Bitcoin is not automatically anonymous. Transactions are
                recorded publicly, and information revealed elsewhere can
                sometimes connect activity to a person or organization.
              </p>
            </article>

            <article className={styles.card}>
              <span className={styles.cardNumber}>TECHNICAL RISK</span>
              <h3>SOFTWARE MATTERS</h3>
              <p>
                Wallets, devices and services can contain defects or be
                compromised. Security depends on both Bitcoin's protocol and
                the quality of the software and operational practices you use.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeader}>
            <div>
              <p className={styles.eyebrow}>COMMON ATTACKS / 14</p>
              <h2>SCAMMERS TARGET HUMAN DECISIONS.</h2>
            </div>
            <div className={styles.sectionIntro}>
              Many losses do not involve breaking Bitcoin's cryptography. They
              involve persuading a person to reveal a recovery phrase, install
              malicious software, trust a fake investment, or send funds to the
              attacker's address.
            </div>
          </div>

          <div className={styles.grid3}>
            <article className={styles.card}>
              <span className={styles.cardNumber}>SECRET REQUEST</span>
              <h3>“SEND ME YOUR SEED PHRASE”</h3>
              <p>
                Anyone who obtains recovery information may be able to
                reconstruct the wallet. Treat requests for it as a critical warning.
              </p>
            </article>

            <article className={styles.card}>
              <span className={styles.cardNumber}>ADDRESS SWAP</span>
              <h3>VERIFY THE WHOLE DESTINATION</h3>
              <p>
                Malware and address-poisoning attacks can try to make you copy
                an attacker's address. Verify destination information rather
                than relying only on the first or last characters.
              </p>
            </article>

            <article className={styles.card}>
              <span className={styles.cardNumber}>GUARANTEED RETURNS</span>
              <h3>NO ONE CAN GUARANTEE THE MARKET</h3>
              <p>
                Claims of guaranteed Bitcoin profit, guaranteed doubling or
                risk-free returns should be treated with extreme caution.
              </p>
            </article>
          </div>

          <div className={styles.callout}>
            <strong>Beginner operating rule:</strong> use small amounts while
            learning, independently verify addresses and software, protect
            recovery information, and do not act under pressure from someone
            demanding an urgent Bitcoin payment.
          </div>
        </div>
      </section>

      <SourcePanel />
      <StepFooter
        previous={{ href: "/bitcoin/learn/security", label: "SELF-CUSTODY & SAFETY" }}
        next={{ href: "/bitcoin/gbp", label: "BITCOIN IN POUNDS" }}
      />
      <LearnFooter />
    </main>
  );
}
