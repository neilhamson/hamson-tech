import Image from "next/image";
import Link from "next/link";

import styles from "./learn.module.css";

export type LearnStep = {
  number: string;
  title: string;
  href: string;
  status?: string;
};

export const learnSteps: LearnStep[] = [
  { number: "01", title: "WHAT IS BITCOIN?", href: "/bitcoin/learn/what-is-bitcoin" },
  { number: "02", title: "WHAT IS A BLOCKCHAIN?", href: "/bitcoin/learn/blockchain" },
  { number: "03", title: "WHAT IS A BITCOIN WALLET?", href: "/bitcoin/learn/wallets" },
  { number: "04", title: "KEYS, ADDRESSES & RECOVERY", href: "/bitcoin/learn/keys-and-recovery" },
  { number: "05", title: "HOW A TRANSACTION WORKS", href: "/bitcoin/learn/transactions" },
  { number: "06", title: "FRACTIONS & SATOSHIS", href: "/bitcoin/fractions-satoshis" },
  { number: "07", title: "WHY DOES BITCOIN HAVE VALUE?", href: "/bitcoin/learn/value" },
  { number: "08", title: "WHY ONLY 21 MILLION?", href: "/bitcoin/learn/supply" },
  { number: "09", title: "BITCOIN VS CRYPTOCURRENCY", href: "/bitcoin/learn/bitcoin-vs-cryptocurrency" },
  { number: "10", title: "MINING & BLOCKS", href: "/bitcoin/mining" },
  { number: "11", title: "FEES & CONFIRMATIONS", href: "/bitcoin/fees" },
  { number: "12", title: "SELF-CUSTODY & SAFETY", href: "/bitcoin/learn/security" },
  { number: "13", title: "RISKS, MISTAKES & SCAMS", href: "/bitcoin/learn/risks-scams" },
  { number: "14", title: "BITCOIN IN POUNDS", href: "/bitcoin/gbp" },
  { number: "15", title: "HOW BUYING BITCOIN WORKS", href: "/bitcoin/learn/how-to-buy" },
  { number: "16", title: "READY TO BUY?", href: "/bitcoin/learn/ready-to-buy" },
];

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="header-inner">
        <Link
          className="brand-lockup"
          href="/"
          aria-label="Hamson Software home"
        >
          <span className="brand-reveal-shell" aria-hidden="true">
            <Image
              className="brand-reveal"
              src="/brand/neil-hamson-wordmark.svg"
              alt=""
              width={1624}
              height={88}
              priority
            />
          </span>
        </Link>

        <nav className="navigation" aria-label="Main navigation">
          <Link href="/services">SOFTWARE</Link>
          <Link href="/bitcoin">BITCOIN</Link>
          <Link
            href="/machine-intelligence"
            aria-label="TRON — Machine Intelligence"
          >
            TRON
          </Link>
          <Link href="/about-us">ABOUT</Link>
          <Link href="/contact-us">CONTACT</Link>
        </nav>

        <details className="mobile-navigation">
          <summary aria-label="Open navigation">
            <span />
            <span />
          </summary>
          <nav aria-label="Mobile navigation">
            <Link href="/services">SOFTWARE</Link>
            <Link href="/bitcoin">BITCOIN</Link>
            <Link
              href="/machine-intelligence"
              aria-label="TRON — Machine Intelligence"
            >
              TRON
            </Link>
            <Link href="/about-us">ABOUT</Link>
            <Link href="/contact-us">CONTACT</Link>
          </nav>
        </details>
      </div>
    </header>
  );
}

export function LearnNav({
  activeHref,
}: {
  activeHref?: string;
}) {
  return (
    <nav className={styles.learnNav} aria-label="Hamson Bitcoin learning path">
      <div className={styles.learnNavInner}>
        <Link
          href="/bitcoin/learn"
          className={!activeHref ? styles.active : undefined}
        >
          <span>00</span>
          <strong>START HERE</strong>
          <small>LEARN</small>
        </Link>

        {learnSteps.slice(0, 5).map((step) => (
          <Link
            key={step.href}
            href={step.href}
            className={activeHref === step.href ? styles.active : undefined}
          >
            <span>{step.number}</span>
            <strong>{step.title.replace("WHAT IS A ", "").replace("WHAT IS ", "")}</strong>
            <small>OPEN</small>
          </Link>
        ))}
      </div>
    </nav>
  );
}

export function LearnFooter() {
  return (
    <footer className="site-footer">
      <span>© 2026 Hamson Software</span>
      <span>Hamson Bitcoin / Learn from first principles</span>
      <span>Developed by Dr Neil Hamson</span>
    </footer>
  );
}

export function SourcePanel() {
  return (
    <aside className={styles.sourcePanel} aria-label="Hamson Bitcoin learning">
      <span>HAMSON BITCOIN LEARNING</span>
      <p>
        Hamson Bitcoin is developed by Hamson Software to make Bitcoin easier
        to understand, evaluate and use. Learning material is written and
        maintained by Neil Hamson as part of the wider Hamson Bitcoin platform.
      </p>
      <div>
        <Link href="/bitcoin/learn">HAMSON BITCOIN LEARN →</Link>
        <Link href="/bitcoin">HAMSON BITCOIN →</Link>
        <Link href="/about-us">ABOUT NEIL HAMSON →</Link>
      </div>
    </aside>
  );
}

export function StepFooter({
  previous,
  next,
}: {
  previous?: { href: string; label: string };
  next?: { href: string; label: string };
}) {
  return (
    <nav className={styles.stepFooter} aria-label="Continue Hamson Bitcoin learning">
      {previous ? (
        <Link href={previous.href}>
          <span>← PREVIOUS</span>
          <strong>{previous.label}</strong>
        </Link>
      ) : (
        <div />
      )}

      {next ? (
        <Link href={next.href}>
          <span>NEXT →</span>
          <strong>{next.label}</strong>
        </Link>
      ) : null}
    </nav>
  );
}
