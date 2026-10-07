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
  "Ready to Buy Bitcoin? Beginner Readiness Check — Hamson Bitcoin",
  "A practical Bitcoin readiness check covering price risk, fractions, fees, custody, wallet recovery, irreversible transactions and scams.",
  "/bitcoin/learn/ready-to-buy",
);

const checks = [
  ["01", "I KNOW WHAT I AM BUYING", "I understand that Bitcoin is a digital monetary network and that a bitcoin is not a physical coin or a file sitting inside a wallet."],
  ["02", "I UNDERSTAND FRACTIONS", "I know I can buy a fraction of one bitcoin and that 1 BTC equals 100,000,000 satoshis."],
  ["03", "I ACCEPT PRICE RISK", "I understand that Bitcoin's market price can rise or fall significantly and that no future return is guaranteed."],
  ["04", "I WILL REVIEW THE COST", "I know to check the quoted BTC amount, exchange rate, fees, spread and total payment before confirming a purchase."],
  ["05", "I KNOW WHERE IT WILL BE HELD", "I understand the difference between leaving Bitcoin with a custodian and moving it to a self-custody wallet."],
  ["06", "I UNDERSTAND RECOVERY", "If I use self-custody, I understand that recovery information is highly sensitive and may be necessary to restore access."],
  ["07", "I KNOW PAYMENTS ARE HARD TO REVERSE", "I will verify addresses, amounts and transaction details before authorizing a Bitcoin payment."],
  ["08", "I WILL NOT SHARE WALLET SECRETS", "I know that a legitimate support interaction should not require me to disclose a private key or recovery phrase."],
];

export default function ReadyToBuyPage() {
  return (
    <main className={`${styles.page} site`}>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <SiteHeader />
      <LearnNav />

      <section className={styles.hero} id="main-content">
        <div>
          <p className={styles.eyebrow}>BEGINNER PATH / 16</p>
          <h1>ARE YOU READY <span>TO BUY?</span></h1>
          <p className={styles.lead}>
            There is no exam and Hamson Bitcoin should not pressure you into a
            purchase. This final check simply confirms that the concepts most
            likely to affect a first-time buyer are understood before real
            money is involved.
          </p>
        </div>

        <aside className={styles.heroPanel}>
          <span>DECIDE, DO NOT RUSH</span>
          <h2>UNDERSTANDING COMES BEFORE PURCHASE</h2>
          <p>
            If one of these checks is unclear, open the linked learning section
            and return when the decision makes sense to you.
          </p>
          <Link href="/bitcoin/learn">RETURN TO LEARNING MAP →</Link>
        </aside>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionInner}>
          <div className={styles.grid2}>
            {checks.map(([number, title, text]) => (
              <article className={styles.card} key={number}>
                <span className={styles.cardNumber}>CHECK {number}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>

          <div className={styles.callout}>
            <strong>Hamson Bitcoin purchase status:</strong> the buying service
            is in development and is not currently presented here as a live
            purchase service. The education system is being built first so the
            eventual purchase path can be understood rather than merely clicked.
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeader}>
            <div>
              <p className={styles.eyebrow}>NEXT ROUTE / 17</p>
              <h2>BUY, HOLD OR SELF-CUSTODY.</h2>
            </div>
            <div className={styles.sectionIntro}>
              Once the commercial purchase service is available, an experienced
              visitor will be able to go directly to BUY. A beginner can arrive
              here through the learning path and understand the decisions first.
            </div>
          </div>

          <div className={styles.grid3}>
            <article className={styles.card}>
              <span className={styles.cardNumber}>BUY</span>
              <h3>HAMSON BITCOIN</h3>
              <p>
                Return to the Hamson Bitcoin portal to view the current BUY
                development status and the rest of the product interface.
              </p>
              <Link href="/bitcoin#buy-bitcoin">VIEW BUY STATUS →</Link>
            </article>

            <article className={styles.card}>
              <span className={styles.cardNumber}>WALLET</span>
              <h3>HAMSON BITCOIN WALLET</h3>
              <p>
                Explore the public wallet development build and understand the
                self-custody direction before Mainnet use is enabled.
              </p>
              <a href="https://wallet.hamson.tech" target="_blank" rel="noreferrer">
                OPEN WALLET DEVELOPMENT →
              </a>
            </article>

            <article className={styles.card}>
              <span className={styles.cardNumber}>REVIEW</span>
              <h3>NOT READY YET?</h3>
              <p>
                Return to the learning map. There is no benefit in purchasing
                Bitcoin before the basic risks, custody choices and recovery
                responsibilities make sense.
              </p>
              <Link href="/bitcoin/learn">RETURN TO START HERE →</Link>
            </article>
          </div>
        </div>
      </section>

      <SourcePanel />
      <StepFooter
        previous={{ href: "/bitcoin/learn/how-to-buy", label: "HOW BUYING BITCOIN WORKS" }}
      />
      <LearnFooter />
    </main>
  );
}
