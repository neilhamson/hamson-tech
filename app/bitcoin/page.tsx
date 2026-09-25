import Image from "next/image";
import Link from "next/link";

import { pageMetadata } from "../_components/SubpageShell";
import styles from "./bitcoin.module.css";

export const metadata = pageMetadata(
  "Bitcoin UK — Bitcoin Explained in British Pounds",
  "Bitcoin for UK users: British Sterling, BTC, satoshis, wallets, transactions, mining and the development of a UK-first BTC/GBP reference system.",
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
          <p className={styles.kicker}>BITCOIN / UNITED KINGDOM / GBP</p>

          <h1>
            BITCOIN
            <span>IN POUNDS</span>
          </h1>

          <p className={styles.heroLead}>
            Bitcoin explained for Britain in the currency people here actually
            earn, spend and understand. Follow BTC through pounds, satoshis,
            wallets, transactions and mining.
          </p>

          <div className={styles.heroActions}>
            <a href="#gbp-system">BTC / GBP SYSTEM</a>
            <Link href="/bitcoin/wallets">WALLETS &amp; USE</Link>
          </div>
        </div>

        <aside className={styles.console} aria-label="BTC GBP development panel">
          <div className={styles.consoleTop}>
            <span className={styles.consoleName}>HAMSON // BTC_GBP</span>

            <span className={styles.consoleStatus}>
              <span className={styles.statusDot} />
              DEVELOPMENT
            </span>
          </div>

          <div className={styles.readout}>
            <div className={styles.readoutBlock}>
              <span className={styles.readoutLabel}>STERLING INPUT</span>
              <span className={styles.readoutValue}>£100.00</span>
            </div>

            <span className={styles.readoutArrow}>→</span>

            <div className={styles.readoutBlock}>
              <span className={styles.readoutLabel}>BTC OUTPUT</span>
              <span className={styles.readoutValue}>—</span>
            </div>
          </div>

          <div className={styles.sats}>
            <span className={styles.readoutLabel}>SATOSHI OUTPUT</span>
            <strong>—</strong>
          </div>

          <div className={styles.consoleMeta}>
            <div className={styles.consoleRow}>
              <span>MARKET</span>
              <strong>BTC / GBP</strong>
            </div>

            <div className={styles.consoleRow}>
              <span>REGION</span>
              <strong>UNITED KINGDOM</strong>
            </div>

            <div className={styles.consoleRow}>
              <span>REFERENCE ENGINE</span>
              <strong>NOT YET LIVE</strong>
            </div>

            <div className={styles.consoleRow}>
              <span>FUNCTION</span>
              <strong>EDUCATION / CONVERSION</strong>
            </div>
          </div>
        </aside>
      </section>

      <div className={styles.signalBar} aria-hidden="true">
        <span>
          NETWORK <strong>BITCOIN</strong>
        </span>
        <span>
          FIAT <strong>GBP</strong>
        </span>
        <span>
          UNIT <strong>SATOSHI</strong>
        </span>
        <span>
          SYSTEM <strong>IN DEVELOPMENT</strong>
        </span>
      </div>

      <section className={styles.section} id="gbp-system">
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeader}>
            <div>
              <p className={styles.sectionCode}>UK BITCOIN / 01</p>
              <h2>START WITH POUNDS</h2>
            </div>

            <div className={styles.sectionIntro}>
              Bitcoin is global. Everyday finances are local. For people in the
              UK, that means understanding Bitcoin against British Sterling
              rather than defaulting to US dollars.
            </div>
          </div>

          <div className={styles.grid3}>
            <article className={styles.panel}>
              <span className={styles.panelNumber}>GBP</span>
              <h3>BRITISH STERLING</h3>
              <p>
                Familiar pound values provide the starting point for
                understanding what a quantity of Bitcoin represents.
              </p>
            </article>

            <article className={styles.panel}>
              <span className={styles.panelNumber}>BTC</span>
              <h3>BITCOIN</h3>
              <p>
                BTC is the digital asset transferred through the Bitcoin
                network. Ownership does not require buying one whole bitcoin.
              </p>
            </article>

            <article className={styles.panel}>
              <span className={styles.panelNumber}>SATS</span>
              <h3>SATOSHIS</h3>
              <p>
                One bitcoin contains 100 million satoshis, allowing Bitcoin to
                represent much smaller values.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.development}`}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeader}>
            <div>
              <p className={styles.sectionCode}>HAMSON BTC / GBP / 02</p>
              <h2>BUILD THE REFERENCE SYSTEM</h2>
            </div>

            <div className={styles.sectionIntro}>
              The planned system will collect sterling Bitcoin market data and
              produce a transparent BTC/GBP reference value for educational
              conversion between pounds, bitcoin and satoshis.
            </div>
          </div>

          <div className={styles.grid3}>
            <article className={styles.panel}>
              <span className={styles.panelNumber}>INPUT</span>
              <h3>£ → BTC</h3>
              <p>
                Enter a sterling value and see the equivalent quantity of
                bitcoin and satoshis.
              </p>
            </article>

            <article className={styles.panel}>
              <span className={styles.panelNumber}>INPUT</span>
              <h3>BTC → £</h3>
              <p>
                Enter a Bitcoin quantity and translate it back into British
                Sterling.
              </p>
            </article>

            <article className={styles.panel}>
              <span className={styles.panelNumber}>STATUS</span>
              <h3>DEVELOPMENT</h3>
              <p>
                The rate methodology, data sources and calculator will be added
                as working software rather than simulated functionality.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeader}>
            <div>
              <p className={styles.sectionCode}>BITCOIN NETWORK / 03</p>
              <h2>FROM WALLET TO BLOCK</h2>
            </div>

            <div className={styles.sectionIntro}>
              A Bitcoin payment is authorised by a wallet, broadcast to the
              peer-to-peer network, validated independently and then eligible
              for inclusion in a mined block.
            </div>
          </div>

          <div className={styles.grid4}>
            <article className={styles.panel}>
              <span className={styles.panelNumber}>01 / SIGN</span>
              <h3>AUTHORISE</h3>
              <p>
                A wallet uses private-key control to digitally sign an
                authorised transaction.
              </p>
            </article>

            <article className={styles.panel}>
              <span className={styles.panelNumber}>02 / BROADCAST</span>
              <h3>PROPAGATE</h3>
              <p>
                The signed transaction is distributed across Bitcoin&apos;s
                peer-to-peer network.
              </p>
            </article>

            <article className={styles.panel}>
              <span className={styles.panelNumber}>03 / VALIDATE</span>
              <h3>CHECK</h3>
              <p>
                Nodes independently check the transaction against Bitcoin&apos;s
                consensus rules.
              </p>
            </article>

            <article className={styles.panel}>
              <span className={styles.panelNumber}>04 / CONFIRM</span>
              <h3>BLOCK</h3>
              <p>
                Mining can include the transaction in a valid block, with later
                blocks adding further confirmation.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeader}>
            <div>
              <p className={styles.sectionCode}>BITCOIN PATH / 04</p>
              <h2>GO DEEPER</h2>
            </div>

            <div className={styles.sectionIntro}>
              The Bitcoin area is being split into focused technical paths
              rather than forcing every subject into one long beginner page.
            </div>
          </div>

          <div className={styles.grid2}>
            <article className={styles.panel}>
              <span className={styles.panelNumber}>WALLETS / USE</span>
              <h3>KEYS. CUSTODY. TRANSACTIONS.</h3>
              <p>
                Understand what wallets actually control, the difference
                between custody and self-custody, and how Bitcoin is used.
              </p>
              <Link href="/bitcoin/wallets">ENTER WALLETS &amp; USE →</Link>
            </article>

            <article className={styles.panel}>
              <span className={styles.panelNumber}>MINING</span>
              <h3>COMPUTE. POWER. PROOF OF WORK.</h3>
              <p>
                Understand what Bitcoin miners actually do and the physical
                infrastructure behind the network.
              </p>
              <Link href="/bitcoin/mining">ENTER BITCOIN MINING →</Link>
            </article>
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.field}`}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeader}>
            <div>
              <p className={styles.sectionCode}>FIELD EXPERIENCE / 2018</p>
              <h2>MINING WAS PHYSICAL</h2>
            </div>

            <div className={styles.sectionIntro}>
              In 2018 I was part of a four-student Bitcoin mining team at Perth
              College UHI and acted as data centre manager. Our installation
              operated ten Bitmain Antminer S9 units and participated in a
              wider 30-machine mining pool.
            </div>
          </div>

          <div className={styles.grid3}>
            <article className={styles.panel}>
              <span className={styles.panelNumber}>HARDWARE</span>
              <h3>10 × ANTMINER S9</h3>
              <p>
                Dedicated ASIC hardware running continuously as part of the
                mining installation.
              </p>
            </article>

            <article className={styles.panel}>
              <span className={styles.panelNumber}>ROLE</span>
              <h3>DATA CENTRE MANAGER</h3>
              <p>
                Technical operation, configuration and maintenance formed part
                of the day-to-day work.
              </p>
            </article>

            <article className={styles.panel}>
              <span className={styles.panelNumber}>REALITY</span>
              <h3>HEAT / NOISE / POWER</h3>
              <p>
                Mining meant electricity, cooling, networking, noise and
                physical hardware — not an abstract cloud process.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.development}`}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeader}>
            <div>
              <p className={styles.sectionCode}>DIRECTION / 2026 →</p>
              <h2>BUILD IT IN PUBLIC</h2>
            </div>

            <div className={styles.sectionIntro}>
              Bitcoin is becoming a larger technical area within hamson.tech.
              The site will evolve alongside the BTC/GBP system, wallet work and
              future return to mining rather than presenting unfinished ideas
              as completed products.
            </div>
          </div>

          <div className={styles.grid3}>
            <article className={styles.panel}>
              <span className={styles.panelNumber}>NOW</span>
              <h3>UK BITCOIN</h3>
              <p>
                Build a clear British entry point using pounds, bitcoin and
                satoshis.
              </p>
            </article>

            <article className={styles.panel}>
              <span className={styles.panelNumber}>NEXT</span>
              <h3>BTC / GBP ENGINE</h3>
              <p>
                Build the market-data pipeline, reference methodology and
                interactive conversion software.
              </p>
            </article>

            <article className={styles.panel}>
              <span className={styles.panelNumber}>FUTURE</span>
              <h3>WALLET + MINING</h3>
              <p>
                Move from educational material into original Bitcoin software
                and physical mining infrastructure.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className={styles.disclaimer}>
        <div className={styles.disclaimerInner}>
          <span className={styles.disclaimerCode}>SYSTEM / NOTICE</span>
          <p>
            hamson.tech does not sell Bitcoin, take orders or hold customer
            Bitcoin. BTC/GBP figures presented here are intended for technical
            and educational use and do not represent an executable purchase
            price.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}