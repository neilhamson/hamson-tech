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
  "What Is a Blockchain? Bitcoin Explained — Hamson Bitcoin",
  "A plain-English explanation of Bitcoin's blockchain: transactions, blocks, proof-of-work, verification and why past records become difficult to change.",
  "/bitcoin/learn/blockchain",
);

export default function BlockchainPage() {
  return (
    <main className={`${styles.page} site`}>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <SiteHeader />
      <LearnNav activeHref="/bitcoin/learn/blockchain" />

      <section className={styles.hero} id="main-content">
        <div>
          <p className={styles.eyebrow}>BEGINNER PATH / 02</p>
          <h1>WHAT IS A <span>BLOCKCHAIN?</span></h1>
          <p className={styles.lead}>
            In Bitcoin, the blockchain is the shared public transaction record
            that the network uses to agree which bitcoin has already been spent
            and which can still be spent.
          </p>
        </div>
        <aside className={styles.heroPanel}>
          <span>MENTAL MODEL</span>
          <h2>THINK “SHARED ACCOUNT BOOK”</h2>
          <p>
            Instead of one bank owning the master ledger, many Bitcoin nodes
            can keep and verify their own copy of the history.
          </p>
          <Link href="/bitcoin/learn/wallets">NEXT: WALLETS →</Link>
        </aside>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionInner}>
          <div className={styles.flow}>
            <div className={styles.flowStep}>
              <span>01</span><strong>TRANSACTIONS</strong>
              <p>People create and broadcast Bitcoin transactions.</p>
            </div>
            <div className={styles.flowStep}>
              <span>02</span><strong>VALIDATION</strong>
              <p>Network participants check transactions against Bitcoin's rules.</p>
            </div>
            <div className={styles.flowStep}>
              <span>03</span><strong>BLOCK</strong>
              <p>Miners assemble valid transactions into candidate blocks.</p>
            </div>
            <div className={styles.flowStep}>
              <span>04</span><strong>PROOF OF WORK</strong>
              <p>A valid proof-of-work allows a new block to be proposed to the network.</p>
            </div>
            <div className={styles.flowStep}>
              <span>05</span><strong>CHAIN</strong>
              <p>Each block refers to the previous one, creating a chronological history.</p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeader}>
            <div>
              <p className={styles.eyebrow}>WHY BLOCKS LINK / 03</p>
              <h2>CHANGING OLD HISTORY GETS HARDER.</h2>
            </div>
            <div className={styles.sectionIntro}>
              Bitcoin's proof-of-work links the cost of changing an old block
              to all of the work that followed it. New blocks therefore add
              further evidence behind the transaction history already recorded.
            </div>
          </div>

          <div className={styles.grid3}>
            <article className={styles.card}>
              <span className={styles.cardNumber}>PUBLIC</span>
              <h3>THE RECORD CAN BE CHECKED</h3>
              <p>
                Bitcoin's blockchain is not a secret bank database. Transactions
                and blocks can be independently verified by software following
                Bitcoin's consensus rules.
              </p>
            </article>
            <article className={styles.card}>
              <span className={styles.cardNumber}>ORDER</span>
              <h3>BLOCKS CREATE HISTORY</h3>
              <p>
                Blocks provide a chronological structure so the network can
                agree which transactions came before others.
              </p>
            </article>
            <article className={styles.card}>
              <span className={styles.cardNumber}>CONFIRM</span>
              <h3>MORE BLOCKS = MORE CONFIRMATIONS</h3>
              <p>
                When later blocks are added after the block containing your
                transaction, its confirmation count increases.
              </p>
              <Link href="/bitcoin/fees">FEES &amp; CONFIRMATIONS →</Link>
            </article>
          </div>
        </div>
      </section>

      <SourcePanel />
      <StepFooter
        previous={{ href: "/bitcoin/learn/what-is-bitcoin", label: "WHAT IS BITCOIN?" }}
        next={{ href: "/bitcoin/learn/wallets", label: "WHAT IS A BITCOIN WALLET?" }}
      />
      <LearnFooter />
    </main>
  );
}
