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
  "Why Are There Only 21 Million Bitcoin? — Hamson Bitcoin",
  "Understand Bitcoin's fixed supply, block subsidy, halving schedule, mining rewards and why issuance approaches 21 million.",
  "/bitcoin/learn/supply",
);

export default function BitcoinSupplyPage() {
  return (
    <main className={`${styles.page} site`}>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <SiteHeader />
      <LearnNav />

      <section className={styles.hero} id="main-content">
        <div>
          <p className={styles.eyebrow}>BEGINNER PATH / 08</p>
          <h1>WHY ONLY <span>21 MILLION?</span></h1>
          <p className={styles.lead}>
            Bitcoin's monetary rules create new bitcoin according to a
            predictable schedule. The block subsidy is reduced every 210,000
            blocks and issuance eventually falls to zero, leaving a maximum
            supply approaching 21 million bitcoin.
          </p>
        </div>

        <aside className={styles.heroPanel}>
          <span>SUPPLY RULE</span>
          <h2>ISSUANCE SLOWS OVER TIME</h2>
          <p>
            The original block subsidy was 50 BTC. Repeated halvings reduce the
            new bitcoin created per block until the subsidy reaches zero.
          </p>
          <Link href="/bitcoin/mining">HOW MINING FITS IN →</Link>
        </aside>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionInner}>
          <div className={styles.flow}>
            <div className={styles.flowStep}>
              <span>2009</span><strong>50 BTC</strong>
              <p>Bitcoin began with a 50 BTC block subsidy.</p>
            </div>
            <div className={styles.flowStep}>
              <span>210,000 BLOCKS</span><strong>HALVING</strong>
              <p>Roughly every four years, the subsidy is cut in half.</p>
            </div>
            <div className={styles.flowStep}>
              <span>2024</span><strong>3.125 BTC</strong>
              <p>The fourth halving reduced the subsidy to 3.125 BTC per block.</p>
            </div>
            <div className={styles.flowStep}>
              <span>OVER TIME</span><strong>LESS NEW BTC</strong>
              <p>Each halving makes new issuance smaller and more gradual.</p>
            </div>
            <div className={styles.flowStep}>
              <span>~2140</span><strong>SUBSIDY → ZERO</strong>
              <p>Current rules project the final issuance around the year 2140.</p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeader}>
            <div>
              <p className={styles.eyebrow}>WHO ENFORCES IT? / 09</p>
              <h2>THE LIMIT IS A NETWORK RULE.</h2>
            </div>
            <div className={styles.sectionIntro}>
              Miners cannot simply award themselves any amount they choose.
              Nodes validate blocks and reject blocks that create more reward
              than the consensus rules permit.
            </div>
          </div>

          <div className={styles.grid3}>
            <article className={styles.card}>
              <span className={styles.cardNumber}>MINERS</span>
              <h3>PROPOSE BLOCKS</h3>
              <p>
                Miners perform proof-of-work and may include a coinbase
                transaction claiming the permitted subsidy plus transaction fees.
              </p>
            </article>
            <article className={styles.card}>
              <span className={styles.cardNumber}>NODES</span>
              <h3>CHECK THE RULES</h3>
              <p>
                Full nodes independently validate blocks. A block that violates
                the reward rules is not accepted as valid by nodes following
                the existing consensus rules.
              </p>
            </article>
            <article className={styles.card}>
              <span className={styles.cardNumber}>AFTER SUBSIDY</span>
              <h3>FEES REMAIN</h3>
              <p>
                Mining does not end when new issuance ends. Transaction fees
                are designed to remain part of the incentive for including
                transactions in blocks.
              </p>
              <Link href="/bitcoin/fees">UNDERSTAND FEES →</Link>
            </article>
          </div>

          <div className={styles.callout}>
            <strong>21 million does not mean 21 million people can each own one
            bitcoin.</strong> Bitcoin is divisible into satoshis, so ownership
            can be distributed in much smaller fractions.
          </div>
        </div>
      </section>

      <SourcePanel />
      <StepFooter
        previous={{ href: "/bitcoin/learn/value", label: "WHY DOES BITCOIN HAVE VALUE?" }}
        next={{ href: "/bitcoin/learn/bitcoin-vs-cryptocurrency", label: "BITCOIN VS CRYPTOCURRENCY" }}
      />
      <LearnFooter />
    </main>
  );
}
