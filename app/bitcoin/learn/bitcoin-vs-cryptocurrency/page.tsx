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
  "Bitcoin vs Cryptocurrency — What Is the Difference?",
  "Understand why Bitcoin is a cryptocurrency but cryptocurrency is a much broader category containing networks with different rules, purposes and risks.",
  "/bitcoin/learn/bitcoin-vs-cryptocurrency",
);

export default function BitcoinVsCryptocurrencyPage() {
  return (
    <main className={`${styles.page} site`}>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <SiteHeader />
      <LearnNav />

      <section className={styles.hero} id="main-content">
        <div>
          <p className={styles.eyebrow}>BEGINNER PATH / 09</p>
          <h1>BITCOIN VS <span>CRYPTOCURRENCY.</span></h1>
          <p className={styles.lead}>
            Bitcoin is a cryptocurrency, but “cryptocurrency” is a category,
            not another name for Bitcoin. Different cryptoassets can have very
            different networks, supply rules, governance, security models and uses.
          </p>
        </div>

        <aside className={styles.heroPanel}>
          <span>IMPORTANT DISTINCTION</span>
          <h2>DO NOT ASSUME ALL CRYPTO WORKS LIKE BITCOIN</h2>
          <p>
            Learning Bitcoin teaches you one system. It does not automatically
            explain the rules or risks of every other token or blockchain.
          </p>
          <Link href="/bitcoin/learn/risks-scams">WHY THIS MATTERS FOR RISK →</Link>
        </aside>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionInner}>
          <p className={styles.definition}>
            <strong>Cryptocurrency</strong> is a broad label for digital assets
            and payment systems that use cryptographic techniques.
            <strong> Bitcoin</strong> is one specific open-source peer-to-peer
            monetary network with its own consensus and issuance rules.
          </p>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeader}>
            <div>
              <p className={styles.eyebrow}>COMPARE THE RULES / 10</p>
              <h2>THE NAME “CRYPTO” TELLS YOU VERY LITTLE.</h2>
            </div>
            <div className={styles.sectionIntro}>
              Before using any cryptoasset, you need to know who can change its
              rules, how units are issued, how transactions are validated and
              whether control is concentrated in a company, foundation or small
              group of participants.
            </div>
          </div>

          <table className={styles.compare}>
            <thead>
              <tr>
                <th>QUESTION TO ASK</th>
                <th>BITCOIN</th>
                <th>OTHER CRYPTOASSETS</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>What is it for?</td>
                <td>Peer-to-peer electronic money and a monetary network.</td>
                <td>May target payments, smart contracts, applications, governance, games, stable-value tokens or many other uses.</td>
              </tr>
              <tr>
                <td>How is supply determined?</td>
                <td>Predictable issuance with a maximum supply approaching 21 million under current consensus rules.</td>
                <td>Supply policies vary widely and may be fixed, inflationary, discretionary or controlled by project-specific rules.</td>
              </tr>
              <tr>
                <td>How is consensus reached?</td>
                <td>Proof-of-work with independently validating nodes.</td>
                <td>Can use proof-of-stake, permissioned validators, proof-of-work or other mechanisms.</td>
              </tr>
              <tr>
                <td>Who can change it?</td>
                <td>Software changes only matter when network participants choose to adopt compatible rules.</td>
                <td>Governance arrangements differ substantially by project.</td>
              </tr>
            </tbody>
          </table>

          <div className={styles.callout}>
            <strong>Do not evaluate an unfamiliar cryptoasset merely because
            it is described as “like Bitcoin.”</strong> Compare its actual
            design, control, supply, security and purpose.
          </div>
        </div>
      </section>

      <SourcePanel />
      <StepFooter
        previous={{ href: "/bitcoin/learn/supply", label: "WHY ONLY 21 MILLION?" }}
        next={{ href: "/bitcoin/mining", label: "MINING & BLOCKS" }}
      />
      <LearnFooter />
    </main>
  );
}
