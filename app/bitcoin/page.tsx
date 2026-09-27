import Image from "next/image";
import Link from "next/link";

import { pageMetadata } from "../_components/SubpageShell";
import BitcoinLiveStrip from "./BitcoinLiveStrip";
import styles from "./bitcoin.module.css";

export const metadata = pageMetadata(
  "Bitcoin UK — Bitcoin in Pounds, Wallets & Beginner Guides",
  "Bitcoin explained in plain English for people in Britain. Understand Bitcoin fractions and satoshis, convert pounds to Bitcoin using a live BTC/GBP tool, and learn about wallets, use and mining.",
  "/bitcoin",
);

function Header() {
  return (
    <header className="site-header">
      <div className="header-inner">
        <Link
          className="brand-lockup"
          href="/"
          aria-label="Neil Hamson home"
        >
          <span
            className="brand-reveal-shell"
            aria-hidden="true"
          >
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

        <nav
          className="navigation"
          aria-label="Main navigation"
        >
          <Link
            href="/machine-intelligence"
            aria-label="MI1 — Machine Intelligence"
          >
            MI1
          </Link>

          <Link href="/bitcoin">BITCOIN</Link>

          <Link href="/services">
            SERVICES
          </Link>

          <Link href="/about-us">
            ABOUT
          </Link>

          <Link href="/articles">
            ARTICLES
          </Link>
          <Link href="/contact-us">CONTACT</Link>
        </nav>

        <details className="mobile-navigation">
          <summary aria-label="Open navigation">
            <span />
            <span />
          </summary>

          <nav aria-label="Mobile navigation">
            <Link
              href="/machine-intelligence"
              aria-label="MI1 — Machine Intelligence"
            >
              MI1
            </Link>

            <Link href="/bitcoin">
              BITCOIN
            </Link>

            <Link href="/services">
              SERVICES
            </Link>

            <Link href="/about-us">
              ABOUT
            </Link>

            <Link href="/articles">
              ARTICLES
            </Link>

            <Link href="/contact-us">
              CONTACT
            </Link>
          </nav>
        </details>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <span>© 2026 Neil Hamson</span>

      <span>
        Human direction. Machine intelligence.
        Shared construction.
      </span>

      <span>
        Developed by Dr Neil Hamson
      </span>
    </footer>
  );
}

export default function BitcoinPage() {
  return (
    <main className={`${styles.page} site`}>
      <a
        className="skip-link"
        href="#main-content"
      >
        Skip to content
      </a>

      <Header />

      <section
        className={styles.hero}
        id="main-content"
      >
        <div className={styles.heroCopy}>
          <p className={styles.kicker}>
            BITCOIN / UNITED KINGDOM / PLAIN ENGLISH
          </p>

          <h1>
            BITCOIN
            <span>IN POUNDS</span>
          </h1>

          <p className={styles.heroLead}>
            Understand Bitcoin through money you
            already know. Start with pounds, learn
            why you do not need a whole Bitcoin,
            then explore wallets, use and mining
            when you are ready.
          </p>

          <div className={styles.heroActions}>
            <Link href="/bitcoin/fractions-satoshis">
              UNDERSTAND BITCOIN
            </Link>

            <Link href="/bitcoin/gbp">
              TRY THE LIVE CALCULATOR
            </Link>
          </div>
        </div>

        <aside
          className={styles.console}
          aria-label="Choose where to start with Bitcoin"
        >
          <div className={styles.consoleTop}>
            <span className={styles.consoleName}>
              START HERE // UK BITCOIN
            </span>

            <span className={styles.consoleStatus}>
              <span className={styles.statusDot} />
              CHOOSE A ROUTE
            </span>
          </div>

          <div className={styles.readout}>
            <Link
              href="/bitcoin/fractions-satoshis"
              className={styles.readoutBlock}
              style={{
                color: "inherit",
                textDecoration: "none",
              }}
            >
              <span className={styles.readoutLabel}>
                01 / UNDERSTAND
              </span>

              <span className={styles.readoutValue}>
                FRACTIONS
              </span>
            </Link>

            <span
              className={styles.readoutArrow}
              aria-hidden="true"
            >
              →
            </span>

            <Link
              href="/bitcoin/gbp"
              className={styles.readoutBlock}
              style={{
                color: "inherit",
                textDecoration: "none",
              }}
            >
              <span className={styles.readoutLabel}>
                02 / CALCULATE
              </span>

              <span className={styles.readoutValue}>
                £ ⇄ BTC
              </span>
            </Link>
          </div>

          <div className={styles.sats}>
            <Link
              href="/bitcoin/wallets"
              style={{
                display: "block",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              <span className={styles.readoutLabel}>
                03 / OWN &amp; USE
              </span>

              <strong>WALLETS →</strong>
            </Link>
          </div>

          <div className={styles.consoleMeta}>
            <div className={styles.consoleRow}>
              <span>REGION</span>
              <strong>UNITED KINGDOM</strong>
            </div>

            <div className={styles.consoleRow}>
              <span>CURRENCY</span>
              <strong>GBP</strong>
            </div>

            <div className={styles.consoleRow}>
              <span>EXPERIENCE</span>
              <strong>BEGINNER FIRST</strong>
            </div>
          </div>
        </aside>
      </section>

      <BitcoinLiveStrip />

      <section
        className={styles.section}
        id="what-is-bitcoin"
      >
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeader}>
            <div>
              <p className={styles.sectionCode}>
                START HERE / 01
              </p>

              <h2>WHAT IS BITCOIN?</h2>
            </div>

            <div className={styles.sectionIntro}>
              At its simplest, Bitcoin is a way of
              holding and transferring digital value
              over the internet. It operates through
              a network of computers following the
              same rules rather than through one bank
              or company.
            </div>
          </div>

          <div className={styles.grid3}>
            <article className={styles.panel}>
              <span className={styles.panelNumber}>
                BTC
              </span>

              <h3>THE ASSET</h3>

              <p>
                BTC is the digital asset people can
                own, send and receive. You do not
                need to own one whole Bitcoin.
              </p>
            </article>

            <article className={styles.panel}>
              <span className={styles.panelNumber}>
                NETWORK
              </span>

              <h3>THE SYSTEM</h3>

              <p>
                Computers around the world
                communicate with each other and
                independently check that
                Bitcoin&apos;s rules are being
                followed.
              </p>
            </article>

            <article className={styles.panel}>
              <span className={styles.panelNumber}>
                RECORD
              </span>

              <h3>THE BLOCKCHAIN</h3>

              <p>
                Confirmed Bitcoin transactions
                become part of a shared historical
                record known as the blockchain.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section
        className={`${styles.section} ${styles.development}`}
      >
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeader}>
            <div>
              <p className={styles.sectionCode}>
                EVERYDAY BITCOIN / 02
              </p>

              <h2>
                WHAT CAN PEOPLE DO WITH BITCOIN?
              </h2>
            </div>

            <div className={styles.sectionIntro}>
              Bitcoin is not only a number on a
              price chart. People can obtain it,
              hold it, send it to somebody else,
              receive it and use it with businesses
              or services that support Bitcoin.
            </div>
          </div>

          <div className={styles.grid4}>
            <article className={styles.panel}>
              <span className={styles.panelNumber}>
                01
              </span>

              <h3>BUY OR RECEIVE</h3>

              <p>
                Bitcoin can be bought through
                supported services or received
                directly from another person.
              </p>
            </article>

            <article className={styles.panel}>
              <span className={styles.panelNumber}>
                02
              </span>

              <h3>OWN</h3>

              <p>
                You can hold a fraction of a Bitcoin
                rather than needing to purchase one
                whole BTC.
              </p>
            </article>

            <article className={styles.panel}>
              <span className={styles.panelNumber}>
                03
              </span>

              <h3>SEND &amp; RECEIVE</h3>

              <p>
                Bitcoin can be transferred between
                compatible Bitcoin wallets over the
                network.
              </p>
            </article>

            <article className={styles.panel}>
              <span className={styles.panelNumber}>
                04
              </span>

              <h3>USE</h3>

              <p>
                Bitcoin can be used with merchants
                and services that choose to accept
                or support it.
              </p>
            </article>
          </div>

          <div className={styles.heroActions}>
            <Link href="/bitcoin/wallets">
              UNDERSTAND WALLETS &amp; USE →
            </Link>
          </div>
        </div>
      </section>

      <section
        className={`${styles.section} ${styles.field}`}
      >
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeader}>
            <div>
              <p className={styles.sectionCode}>
                REAL EXPERIENCE / PLAIN ENGLISH
              </p>

              <h2>
                EXPLAINED FROM PRACTICAL EXPERIENCE
              </h2>
            </div>

            <div className={styles.sectionIntro}>
              Neil Hamson owns and uses Bitcoin and
              has previous hands-on experience
              operating Bitcoin mining hardware.
              That practical experience informs the
              tools and explanations presented here.
            </div>
          </div>

          <div className={styles.grid3}>
            <article className={styles.panel}>
              <span className={styles.panelNumber}>
                OWNER
              </span>

              <h3>OWNS &amp; USES BITCOIN</h3>

              <p>
                The explanations here are informed
                by practical experience owning and
                using Bitcoin.
              </p>
            </article>

            <article className={styles.panel}>
              <span className={styles.panelNumber}>
                MINING
              </span>

              <h3>10 × ANTMINER S9</h3>

              <p>
                Neil Hamson previously worked as
                data centre manager within a student
                Bitcoin mining operation using ten
                Antminer S9 units.
              </p>
            </article>

            <article className={styles.panel}>
              <span className={styles.panelNumber}>
                SOFTWARE
              </span>

              <h3>
                HAMSON SOFTWARE / UK BITCOIN TOOLS
              </h3>

              <p>
                Hamson Software develops UK-focused
                Bitcoin software and educational
                tools designed to make unfamiliar
                Bitcoin concepts easier to
                understand in pounds.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section
        className={`${styles.section} ${styles.development}`}
      >
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeader}>
            <div>
              <p className={styles.sectionCode}>
                CHOOSE YOUR ROUTE / 04
              </p>

              <h2>
                GO DEEPER WHEN YOU ARE READY
              </h2>
            </div>

            <div className={styles.sectionIntro}>
              You do not need to learn everything
              at once. Choose the part of Bitcoin
              that answers your next question.
            </div>
          </div>

          <div className={styles.grid4}>
            <article className={styles.panel}>
              <span className={styles.panelNumber}>
                BASICS
              </span>

              <h3>FRACTIONS &amp; SATOSHIS</h3>

              <p>
                Understand why £20 becomes a small
                BTC decimal, why you do not need a
                whole Bitcoin and what satoshis
                actually mean.
              </p>

              <Link href="/bitcoin/fractions-satoshis">
                OPEN FRACTIONS &amp; SATOSHIS →
              </Link>
            </article>

            <article className={styles.panel}>
              <span className={styles.panelNumber}>
                BTC / GBP
              </span>

              <h3>BITCOIN IN POUNDS</h3>

              <p>
                Translate pounds, Bitcoin and
                satoshis using the live Hamson
                Software BTC/GBP conversion system.
              </p>

              <Link href="/bitcoin/gbp">
                OPEN BITCOIN IN POUNDS →
              </Link>
            </article>

            <article className={styles.panel}>
              <span className={styles.panelNumber}>
                WALLETS
              </span>

              <h3>WALLETS &amp; USE</h3>

              <p>
                Understand keys, custody,
                self-custody and what happens when
                Bitcoin is sent or received.
              </p>

              <Link href="/bitcoin/wallets">
                OPEN WALLETS &amp; USE →
              </Link>
            </article>

            <article className={styles.panel}>
              <span className={styles.panelNumber}>
                MINING
              </span>

              <h3>BITCOIN MINING</h3>

              <p>
                Understand the computing hardware,
                energy and proof-of-work process
                behind Bitcoin mining.
              </p>

              <Link href="/bitcoin/mining">
                OPEN MINING →
              </Link>
            </article>
          </div>
        </div>
      </section>

      <section className={styles.disclaimer}>
        <div className={styles.disclaimerInner}>
          <span className={styles.disclaimerCode}>
            BITCOIN / POSITION
          </span>

          <p>
            hamson.tech does not sell Bitcoin, take
            Bitcoin orders or hold customer Bitcoin.
            Neil Hamson owns and uses Bitcoin,
            accepts Bitcoin for eligible software
            and development services, and supports
            wider voluntary adoption of Bitcoin in
            the United Kingdom, including its use
            as a means of payment alongside
            sterling. Bitcoin prices can rise or
            fall substantially.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}