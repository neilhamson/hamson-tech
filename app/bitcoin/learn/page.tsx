import Link from "next/link";

import { pageMetadata } from "../../_components/SubpageShell";
import {
  LearnFooter,
  LearnNav,
  SiteHeader,
  SourcePanel,
  learnSteps,
} from "./LearnShell";
import styles from "./learn.module.css";

export const metadata = pageMetadata(
  "Learn Bitcoin From the Beginning — Hamson Bitcoin",
  "A plain-English Bitcoin learning system from Hamson Software: Bitcoin, blockchain, wallets, keys, transactions, value, supply, cryptocurrency, mining, fees, safety, risk and buying.",
  "/bitcoin/learn",
);

const routes = [
  {
    code: "ZERO KNOWLEDGE",
    title: "I KNOW NOTHING ABOUT BITCOIN",
    text: "Start with what Bitcoin actually is, then move through the blockchain, wallets, keys, transactions, value, supply and safety in order.",
    href: "/bitcoin/learn/what-is-bitcoin",
    action: "START FROM THE BEGINNING →",
  },
  {
    code: "READY TO BUY",
    title: "I WANT TO BUY BITCOIN",
    text: "Understand what you are buying, why you do not need a whole bitcoin, how pricing works, what can go wrong and where the Bitcoin will be held.",
    href: "/bitcoin/learn/how-to-buy",
    action: "UNDERSTAND BUYING →",
  },
  {
    code: "ALREADY OWN BITCOIN",
    title: "I WANT TO USE A WALLET",
    text: "Go directly to wallets, private keys, recovery and self-custody before deciding how you want to hold and use your Bitcoin.",
    href: "/bitcoin/learn/wallets",
    action: "UNDERSTAND WALLETS →",
  },
  {
    code: "TECHNICAL",
    title: "I WANT TO UNDERSTAND THE NETWORK",
    text: "Explore transactions, mining, blocks, fees, confirmations and the public ledger without being forced through every beginner lesson.",
    href: "/bitcoin/learn/transactions",
    action: "EXPLORE THE NETWORK →",
  },
];

export default function BitcoinLearnPage() {
  return (
    <main className={`${styles.page} site`}>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>

      <SiteHeader />
      <LearnNav />

      <section className={styles.hero} id="main-content">
        <div>
          <p className={styles.eyebrow}>HAMSON BITCOIN / START HERE</p>
          <h1>
            LEARN BITCOIN
            <span>FROM ZERO.</span>
          </h1>
          <p className={styles.lead}>
            You do not need to understand cryptocurrency, computing or finance
            before you begin. Choose what you already know — even if the answer
            is nothing — and Hamson Bitcoin will take you from first principles
            through ownership, risk, buying and self-custody.
          </p>
        </div>

        <aside className={styles.heroPanel}>
          <span>LEARNING SYSTEM / 00</span>
          <h2>YOU CHOOSE THE STARTING POINT</h2>
          <p>
            Experienced users can go straight to buying, the wallet or live
            network information. Complete beginners can follow the numbered
            path without leaving Hamson Bitcoin to understand the fundamentals.
          </p>
          <Link href="/bitcoin">RETURN TO HAMSON BITCOIN →</Link>
        </aside>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeader}>
            <div>
              <p className={styles.eyebrow}>CHOOSE YOUR ROUTE / 01</p>
              <h2>WHAT DO YOU WANT TO DO?</h2>
            </div>
            <div className={styles.sectionIntro}>
              The learning system is not a compulsory funnel. Pick the route
              that matches your current knowledge and intent.
            </div>
          </div>

          <div className={styles.grid4}>
            {routes.map((route) => (
              <article className={`${styles.card} ${styles.routeCard}`} key={route.title}>
                <span className={styles.cardNumber}>{route.code}</span>
                <h3>{route.title}</h3>
                <p>{route.text}</p>
                <Link href={route.href}>{route.action}</Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeader}>
            <div>
              <p className={styles.eyebrow}>COMPLETE BEGINNER PATH / 02</p>
              <h2>FROM “WHAT IS BITCOIN?” TO “AM I READY TO BUY?”</h2>
            </div>
            <div className={styles.sectionIntro}>
              Follow these in order if Bitcoin is completely new to you. Each
              step introduces concepts needed by later steps, while experienced
              visitors can jump directly to any subject.
            </div>
          </div>

          <div className={styles.grid2}>
            {learnSteps.map((step) => (
              <article className={styles.card} key={step.href}>
                <span className={styles.cardNumber}>STEP {step.number}</span>
                <h3>{step.title}</h3>
                <p>
                  Open this lesson when you are ready. You can always return to
                  this learning map or jump directly to another Hamson Bitcoin
                  product area.
                </p>
                <Link href={step.href}>OPEN STEP {step.number} →</Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <SourcePanel />
      <LearnFooter />
    </main>
  );
}
