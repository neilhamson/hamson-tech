import Image from "next/image";
import Link from "next/link";

import { pageMetadata } from "../_components/SubpageShell";
import styles from "./bitcoin.module.css";

export const metadata = pageMetadata(
  "Bitcoin UK — Bitcoin Explained in British Pounds",
  "Bitcoin explained for people in Britain: what Bitcoin is, what £50 represents in BTC and satoshis, how wallets work, how Bitcoin is used and how mining secures the network.",
  "/bitcoin",
);

function Header() {
  return (
    <header className="site-header">
      <div className="header-inner">
        <Link className="brand-lockup" href="/" aria-label="Neil Hamson home">
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
          <Link
            href="/machine-intelligence"
            aria-label="MI1 — Machine Intelligence"
          >
            MI1
          </Link>

          <details className="nav-dropdown">
            <summary>BITCOIN</summary>

            <div className="nav-dropdown-menu">
              <Link href="/bitcoin">OVERVIEW</Link>
              <Link href="/bitcoin/gbp">BTC / GBP</Link>
              <Link href="/bitcoin/wallets">WALLETS &amp; USE</Link>
              <Link href="/bitcoin/mining">MINING</Link>
            </div>
          </details>

          <Link href="/services">SERVICES</Link>
          <Link href="/about-us">ABOUT</Link>
          <Link href="/articles">ARTICLES</Link>
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
            <Link href="/bitcoin">BITCOIN</Link>
            <Link href="/services">SERVICES</Link>
            <Link href="/about-us">ABOUT</Link>
            <Link href="/articles">ARTICLES</Link>
            <Link href="/contact-us">CONTACT</Link>
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
      <span>Human direction. Machine intelligence. Shared construction.</span>
      <span>Developed by Dr Neil Hamson</span>
    </footer>
  );
}

export default function BitcoinPage() {
  return (
    <main className={`${styles.page} site`}>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>

      <Header />

      <section className={styles.hero} id="main-content">
        <div className={styles.heroCopy}>
          <p className={styles.kicker}>
            BITCOIN / UNITED KINGDOM / PLAIN ENGLISH
          </p>

          <h1>
            BITCOIN
            <span>IN POUNDS</span>
          </h1>

          <p className={styles.heroLead}>
            Bitcoin explained for Britain — without assuming you already
            understand cryptocurrency. Start with pounds, learn what Bitcoin
            actually is, see what £50 represents, and understand how people
            buy, own and use it.
          </p>

          <div className={styles.heroActions}>
            <Link href="#what-is-bitcoin">START WITH BITCOIN</Link>
            <Link href="/bitcoin/gbp">SHOW ME £50 IN BITCOIN</Link>
          </div>
        </div>

        <aside
          className={styles.console}
          aria-label="Start here with Bitcoin"
        >
          <div className={styles.consoleTop}>
            <span className={styles.consoleName}>
              START HERE // UK BITCOIN
            </span>

            <span className={styles.consoleStatus}>
              <span className={styles.statusDot} />
              BEGINNER GUIDE
            </span>
          </div>

          <div className={styles.readout}>
            <div className={styles.readoutBlock}>
              <span className={styles.readoutLabel}>STARTING POINT</span>
              <span className={styles.readoutValue}>£50</span>
            </div>

            <span className={styles.readoutArrow}>→</span>

            <div className={styles.readoutBlock}>
              <span className={styles.readoutLabel}>SEE IT AS</span>
              <span className={styles.readoutValue}>BTC</span>
            </div>
          </div>

          <div className={styles.sats}>
            <span className={styles.readoutLabel}>AND UNDERSTAND</span>
            <strong>SATOSHIS</strong>
          </div>

          <div className={styles.consoleMeta}>
            <div className={styles.consoleRow}>
              <span>GUIDE</span>
              <strong>BEGINNER FIRST</strong>
            </div>

            <div className={styles.consoleRow}>
              <span>REGION</span>
              <strong>UNITED KINGDOM</strong>
            </div>

            <div className={styles.consoleRow}>
              <span>CURRENCY</span>
              <strong>GBP</strong>
            </div>

            <div className={styles.consoleRow}>
              <span>LANGUAGE</span>
              <strong>PLAIN ENGLISH</strong>
            </div>
          </div>
        </aside>
      </section>

      <div className={styles.signalBar} aria-hidden="true">
        <span>
          START <strong>£50</strong>
        </span>
        <span>
          ASSET <strong>BITCOIN</strong>
        </span>
        <span>
          UNIT <strong>SATOSHI</strong>
        </span>
        <span>
          GUIDE <strong>PLAIN ENGLISH</strong>
        </span>
      </div>

      <section
        className={styles.section}
        id="what-is-bitcoin"
      >
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeader}>
            <div>
              <p className={styles.sectionCode}>START HERE / 01</p>
              <h2>WHAT IS BITCOIN?</h2>
            </div>

            <div className={styles.sectionIntro}>
              At its simplest, Bitcoin is a way of holding and transferring
              digital value over the internet. It operates through a network of
              computers following the same rules rather than through one bank
              or company.
            </div>
          </div>

          <div className={styles.grid3}>
            <article className={styles.panel}>
              <span className={styles.panelNumber}>BTC</span>
              <h3>THE ASSET</h3>
              <p>
                BTC is the digital asset people can own, send and receive. You
                do not need to own one whole bitcoin.
              </p>
            </article>

            <article className={styles.panel}>
              <span className={styles.panelNumber}>NETWORK</span>
              <h3>THE SYSTEM</h3>
              <p>
                Computers around the world communicate with each other and
                independently check that Bitcoin&apos;s rules are being
                followed.
              </p>
            </article>

            <article className={styles.panel}>
              <span className={styles.panelNumber}>RECORD</span>
              <h3>THE BLOCKCHAIN</h3>
              <p>
                Confirmed Bitcoin transactions become part of a shared
                historical record known as the blockchain.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.development}`}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeader}>
            <div>
              <p className={styles.sectionCode}>UNDERSTAND VALUE / 02</p>
              <h2>START WITH POUNDS</h2>
            </div>

            <div className={styles.sectionIntro}>
              Bitcoin is global, but everyday money is local. For somebody in
              Britain, starting with pounds makes unfamiliar Bitcoin numbers
              much easier to understand.
            </div>
          </div>

          <div className={styles.grid3}>
            <article className={styles.panel}>
              <span className={styles.panelNumber}>GBP</span>
              <h3>START WITH £50</h3>
              <p>
                Begin with an amount in British Sterling that already makes
                sense to you.
              </p>
            </article>

            <article className={styles.panel}>
              <span className={styles.panelNumber}>BTC</span>
              <h3>SEE THE BITCOIN</h3>
              <p>
                Convert the pound value into the corresponding fraction of one
                bitcoin.
              </p>
            </article>

            <article className={styles.panel}>
              <span className={styles.panelNumber}>SATS</span>
              <h3>SEE THE SATOSHIS</h3>
              <p>
                One bitcoin contains 100 million satoshis, allowing much
                smaller values to be represented.
              </p>
            </article>
          </div>

          <div className={styles.heroActions}>
            <Link href="/bitcoin/gbp">TRY BTC / GBP →</Link>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeader}>
            <div>
              <p className={styles.sectionCode}>EVERYDAY BITCOIN / 03</p>
              <h2>WHAT CAN PEOPLE DO WITH BITCOIN?</h2>
            </div>

            <div className={styles.sectionIntro}>
              Bitcoin is not only a number on a price chart. People can obtain
              it, hold it, send it to somebody else, receive it and use it with
              businesses or services that support Bitcoin.
            </div>
          </div>

          <div className={styles.grid4}>
            <article className={styles.panel}>
              <span className={styles.panelNumber}>01</span>
              <h3>BUY OR RECEIVE</h3>
              <p>
                Bitcoin can be bought through supported services or received
                directly from another person.
              </p>
            </article>

            <article className={styles.panel}>
              <span className={styles.panelNumber}>02</span>
              <h3>OWN</h3>
              <p>
                You can hold a fraction of a bitcoin rather than needing to
                purchase one whole BTC.
              </p>
            </article>

            <article className={styles.panel}>
              <span className={styles.panelNumber}>03</span>
              <h3>SEND &amp; RECEIVE</h3>
              <p>
                Bitcoin can be transferred between compatible Bitcoin wallets
                over the network.
              </p>
            </article>

            <article className={styles.panel}>
              <span className={styles.panelNumber}>04</span>
              <h3>USE</h3>
              <p>
                Bitcoin can be used with merchants and services that choose to
                accept or support it.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.development}`}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeader}>
            <div>
              <p className={styles.sectionCode}>WALLETS / 04</p>
              <h2>WHERE DOES MY BITCOIN GO?</h2>
            </div>

            <div className={styles.sectionIntro}>
              A Bitcoin wallet does not contain coins in the same way a
              physical wallet contains cash. It helps manage the information
              needed to control and use Bitcoin recorded on the network.
            </div>
          </div>

          <div className={styles.grid3}>
            <article className={styles.panel}>
              <span className={styles.panelNumber}>SERVICE</span>
              <h3>A COMPANY CAN HOLD IT</h3>
              <p>
                Some services hold Bitcoin on behalf of their customers and
                manage the keys needed to control it.
              </p>
            </article>

            <article className={styles.panel}>
              <span className={styles.panelNumber}>SELF-CUSTODY</span>
              <h3>YOU CAN CONTROL IT</h3>
              <p>
                A self-custody wallet allows the user to control the keys
                required to authorise transactions.
              </p>
            </article>

            <article className={styles.panel}>
              <span className={styles.panelNumber}>KEYS</span>
              <h3>CONTROL MATTERS</h3>
              <p>
                Private keys are what allow Bitcoin to be spent. Protecting
                them is therefore fundamental to self-custody.
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

      <section className={styles.section}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeader}>
            <div>
              <p className={styles.sectionCode}>THE NETWORK / 05</p>
              <h2>HOW DOES A BITCOIN PAYMENT MOVE?</h2>
            </div>

            <div className={styles.sectionIntro}>
              You do not need to understand every technical detail to use
              Bitcoin. At a high level, a payment moves through four simple
              stages.
            </div>
          </div>

          <div className={styles.grid4}>
            <article className={styles.panel}>
              <span className={styles.panelNumber}>01 / CREATE</span>
              <h3>AUTHORISE</h3>
              <p>
                A wallet creates and digitally signs a transaction telling the
                network where Bitcoin should be sent.
              </p>
            </article>

            <article className={styles.panel}>
              <span className={styles.panelNumber}>02 / SHARE</span>
              <h3>BROADCAST</h3>
              <p>
                The transaction is shared with computers participating in the
                Bitcoin network.
              </p>
            </article>

            <article className={styles.panel}>
              <span className={styles.panelNumber}>03 / CHECK</span>
              <h3>VERIFY</h3>
              <p>
                Network participants independently check that the transaction
                follows Bitcoin&apos;s rules.
              </p>
            </article>

            <article className={styles.panel}>
              <span className={styles.panelNumber}>04 / RECORD</span>
              <h3>CONFIRM</h3>
              <p>
                Valid transactions can be included in a mined block and become
                part of the blockchain.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.field}`}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeader}>
            <div>
              <p className={styles.sectionCode}>
                REAL EXPERIENCE / PLAIN ENGLISH
              </p>
              <h2>EXPLAINED FROM PRACTICAL EXPERIENCE</h2>
            </div>

            <div className={styles.sectionIntro}>
              Neil Hamson owns and uses Bitcoin and has previous hands-on
              experience operating Bitcoin mining hardware. That practical experience informs this guide and Neil Hamson's support for wider voluntary Bitcoin adoption in the United Kingdom.
            </div>
          </div>

          <div className={styles.grid3}>
            <article className={styles.panel}>
              <span className={styles.panelNumber}>OWNER</span>
              <h3>OWNS &amp; USES BITCOIN</h3>
              <p>
                The explanations here are informed by practical experience
                owning and using Bitcoin.
              </p>
            </article>

            <article className={styles.panel}>
              <span className={styles.panelNumber}>MINING</span>
              <h3>10 × ANTMINER S9</h3>
              <p>
                Neil Hamson previously worked as data centre manager within a
                student Bitcoin mining operation using ten Antminer S9 units.
              </p>
            </article>

            <article className={styles.panel}>
              <span className={styles.panelNumber}>SOFTWARE</span>
              <h3>UK BITCOIN TOOLS</h3>
              <p>
                hamson.tech is developing software intended to make Bitcoin
                easier to understand in British pounds.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.development}`}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeader}>
            <div>
              <p className={styles.sectionCode}>CHOOSE YOUR ROUTE / 07</p>
              <h2>GO DEEPER WHEN YOU ARE READY</h2>
            </div>

            <div className={styles.sectionIntro}>
              You do not need to learn everything at once. Choose the part of
              Bitcoin that answers your next question.
            </div>
          </div>

          <div className={styles.grid3}>
            <article className={styles.panel}>
              <span className={styles.panelNumber}>BTC / GBP</span>
              <h3>BITCOIN IN POUNDS</h3>
              <p>
                See how British pounds relate to bitcoin and satoshis using the
                working conversion system.
              </p>

              <Link href="/bitcoin/gbp">OPEN BTC / GBP →</Link>
            </article>

            <article className={styles.panel}>
              <span className={styles.panelNumber}>WALLETS</span>
              <h3>WALLETS &amp; USE</h3>
              <p>
                Understand keys, custody, self-custody and what happens when
                Bitcoin is sent or received.
              </p>

              <Link href="/bitcoin/wallets">
                OPEN WALLETS &amp; USE →
              </Link>
            </article>

            <article className={styles.panel}>
              <span className={styles.panelNumber}>MINING</span>
              <h3>BITCOIN MINING</h3>
              <p>
                Understand the computing hardware, power and proof-of-work
                process behind Bitcoin mining.
              </p>

              <Link href="/bitcoin/mining">OPEN MINING →</Link>
            </article>
          </div>
        </div>
      </section>

      <section className={styles.disclaimer}>
        <div className={styles.disclaimerInner}>
          <span className={styles.disclaimerCode}>BITCOIN / POSITION</span>

          <p>
            hamson.tech does not sell Bitcoin, take Bitcoin orders or hold customer Bitcoin. Neil Hamson owns and uses Bitcoin, accepts Bitcoin for eligible software and development services, and supports wider voluntary adoption of Bitcoin in the United Kingdom, including its use as a means of payment alongside sterling. Bitcoin prices can rise or fall substantially.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
