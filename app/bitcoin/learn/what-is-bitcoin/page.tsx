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
  "What Is Bitcoin? A Beginner Explanation — Hamson Bitcoin",
  "What Bitcoin actually is, explained for complete beginners without assuming knowledge of cryptocurrency, blockchains or wallets.",
  "/bitcoin/learn/what-is-bitcoin",
);

export default function WhatIsBitcoinPage() {
  return (
    <main className={`${styles.page} site`}>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <SiteHeader />
      <LearnNav activeHref="/bitcoin/learn/what-is-bitcoin" />

      <section className={styles.hero} id="main-content">
        <div>
          <p className={styles.eyebrow}>BEGINNER PATH / 01</p>
          <h1>WHAT IS <span>BITCOIN?</span></h1>
          <p className={styles.lead}>
            Bitcoin is a digital monetary system that lets people transfer
            value over a peer-to-peer network without requiring a bank to
            maintain the central account book.
          </p>
        </div>
        <aside className={styles.heroPanel}>
          <span>FIRST IDEA</span>
          <h2>BITCOIN IS NOT A PHYSICAL COIN</h2>
          <p>
            The gold coin pictures commonly used online are symbols. There is
            no physical bitcoin that moves from one wallet to another.
          </p>
          <Link href="/bitcoin/learn/blockchain">NEXT: THE BLOCKCHAIN →</Link>
        </aside>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionInner}>
          <p className={styles.definition}>
            <strong>Bitcoin</strong> can mean the network and protocol. A
            <strong> bitcoin</strong> can also mean a unit used to measure
            value on that network. BTC is the common abbreviation.
          </p>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeader}>
            <div>
              <p className={styles.eyebrow}>PLAIN ENGLISH / 02</p>
              <h2>WHAT ACTUALLY EXISTS?</h2>
            </div>
            <div className={styles.sectionIntro}>
              Bitcoin is best understood as a network of computers agreeing on
              a shared transaction history and enforcing the same rules.
            </div>
          </div>

          <div className={styles.grid3}>
            <article className={styles.card}>
              <span className={styles.cardNumber}>NETWORK</span>
              <h3>COMPUTERS COMMUNICATE</h3>
              <p>
                Bitcoin software runs on computers around the world. Those
                computers exchange transactions and blocks and independently
                check whether the rules have been followed.
              </p>
            </article>

            <article className={styles.card}>
              <span className={styles.cardNumber}>RECORD</span>
              <h3>A SHARED HISTORY</h3>
              <p>
                Confirmed transactions are recorded in the blockchain. Wallets
                use that history to determine which bitcoin can currently be spent.
              </p>
              <Link href="/bitcoin/learn/blockchain">WHAT IS A BLOCKCHAIN? →</Link>
            </article>

            <article className={styles.card}>
              <span className={styles.cardNumber}>UNIT</span>
              <h3>BTC &amp; SATOSHIS</h3>
              <p>
                One bitcoin is divisible into 100,000,000 satoshis. You do not
                need to buy or own a whole bitcoin.
              </p>
              <Link href="/bitcoin/fractions-satoshis">LEARN SATOSHIS →</Link>
            </article>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeader}>
            <div>
              <p className={styles.eyebrow}>WHY IT IS DIFFERENT / 03</p>
              <h2>NO SINGLE COMPANY RUNS THE LEDGER.</h2>
            </div>
            <div className={styles.sectionIntro}>
              In ordinary banking, a bank controls its own account database.
              Bitcoin instead uses a public network where participants can
              independently verify the same transaction rules and history.
            </div>
          </div>
          <div className={styles.callout}>
            <strong>Important:</strong> “digital” does not mean “imaginary.”
            Your online bank balance is also represented digitally. The major
            difference is who operates the system and how ownership and
            transfers are verified.
          </div>
        </div>
      </section>

      <SourcePanel />
      <StepFooter
        previous={{ href: "/bitcoin/learn", label: "START HERE" }}
        next={{ href: "/bitcoin/learn/blockchain", label: "WHAT IS A BLOCKCHAIN?" }}
      />
      <LearnFooter />
    </main>
  );
}
