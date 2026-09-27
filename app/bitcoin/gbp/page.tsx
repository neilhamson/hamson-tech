import Image from "next/image";
import Link from "next/link";

import { pageMetadata } from "../../_components/SubpageShell";
import BtcGbpCalculator from "./BtcGbpCalculator";
import bitcoinStyles from "../bitcoin.module.css";
import styles from "./gbp.module.css";

export const metadata = pageMetadata(
  "Live Bitcoin Price in Pounds — BTC GBP Calculator UK",
  "See a live Bitcoin market reference in British pounds. Convert GBP to Bitcoin and satoshis with a UK-focused Bitcoin calculator developed by Neil Hamson.",
  "/bitcoin/gbp",
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
              <Link href="/bitcoin/wallets">
                WALLETS &amp; USE
              </Link>
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
      <span>
        Human direction. Machine intelligence. Shared construction.
      </span>
      <span>Developed by Dr Neil Hamson</span>
    </footer>
  );
}

export default function BitcoinGbpPage() {
  return (
    <main className={`${bitcoinStyles.page} site`}>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>

      <Header />

      <section className={styles.intro} id="main-content">
        <div className={styles.introInner}>
          <div className={styles.introGrid}>
            <div className={styles.introIdentity}>
              <p className={styles.introCode}>
                NH / BTC-GBP / UNITED KINGDOM
              </p>

              <h1 className={styles.introTitle}>
                BITCOIN
                <span>IN POUNDS</span>
              </h1>

              <p className={styles.introLead}>
                Start with money you already understand. Enter pounds,
                see the Bitcoin and satoshi equivalent, and understand
                what those numbers actually mean.
              </p>

              <p className={styles.introPlain}>
                Built for people who are completely new to Bitcoin as
                well as those who already own or use it.
              </p>
            </div>

            <aside
              className={styles.quickStart}
              aria-label="Bitcoin quick start"
            >
              <div className={styles.quickStartHeader}>
                <span>START HERE</span>
                <strong>3 SIMPLE ROUTES</strong>
              </div>

              <div className={styles.quickChoices}>
                <Link
                  href="#calculator"
                  className={styles.quickChoice}
                >
                  <span className={styles.quickNumber}>01</span>

                  <span className={styles.quickCopy}>
                    <strong>TRY THE CALCULATOR</strong>
                    <span>
                      Put in pounds and see the Bitcoin and satoshi
                      equivalent.
                    </span>
                  </span>

                  <span className={styles.quickArrow}>→</span>
                </Link>

                <Link
                  href="/bitcoin"
                  className={styles.quickChoice}
                >
                  <span className={styles.quickNumber}>02</span>

                  <span className={styles.quickCopy}>
                    <strong>NEW TO BITCOIN?</strong>
                    <span>
                      Start with the plain-English UK Bitcoin guide.
                    </span>
                  </span>

                  <span className={styles.quickArrow}>→</span>
                </Link>

                <Link
                  href="/bitcoin/wallets"
                  className={styles.quickChoice}
                >
                  <span className={styles.quickNumber}>03</span>

                  <span className={styles.quickCopy}>
                    <strong>WALLETS &amp; USE</strong>
                    <span>
                      Learn where Bitcoin is held and how people
                      actually use it.
                    </span>
                  </span>

                  <span className={styles.quickArrow}>→</span>
                </Link>
              </div>
            </aside>
          </div>

          <div className={styles.contextStrip}>
            <span className={styles.contextLabel}>
              BUILT FROM REAL BITCOIN EXPERIENCE
            </span>

            <p>
              Neil Hamson owns and uses Bitcoin, has previous hands-on
              experience operating Bitcoin mining hardware, accepts
              Bitcoin for eligible software and development services,
              and supports wider voluntary adoption of Bitcoin in the
              United Kingdom. This page is designed to make Bitcoin
              values easier to understand in British pounds.
            </p>
          </div>
        </div>
      </section>

      <section
        className={bitcoinStyles.section}
        id="calculator"
      >
        <div className={bitcoinStyles.sectionInner}>
          <div className={bitcoinStyles.sectionHeader}>
            <div>
              <p className={bitcoinStyles.sectionCode}>
                USE IT / 01
              </p>

              <h2>WHAT DOES £50 LOOK LIKE IN BITCOIN?</h2>
            </div>

            <div className={bitcoinStyles.sectionIntro}>
              The calculator uses a live BTC/GBP market reference
              supplied by CoinMarketCap. Enter an amount in pounds or
              Bitcoin to see the corresponding BTC, sterling and
              satoshi values.
            </div>
          </div>

          <BtcGbpCalculator />
        </div>
      </section>

      <section
        className={`${bitcoinStyles.section} ${bitcoinStyles.development}`}
      >
        <div className={bitcoinStyles.sectionInner}>
          <div className={bitcoinStyles.sectionHeader}>
            <div>
              <p className={bitcoinStyles.sectionCode}>
                HOW IT WORKS / 02
              </p>

              <h2>POUNDS → BITCOIN → SATOSHIS</h2>
            </div>

            <div className={bitcoinStyles.sectionIntro}>
              Bitcoin can look difficult when every number is shown in
              BTC. Starting with pounds makes the relationship much
              easier to see.
            </div>
          </div>

          <div className={bitcoinStyles.grid3}>
            <article className={bitcoinStyles.panel}>
              <span className={bitcoinStyles.panelNumber}>
                01 / POUNDS
              </span>

              <h3>START WITH £</h3>

              <p>
                Enter an amount you already understand, such as £10,
                £50 or £100.
              </p>
            </article>

            <article className={bitcoinStyles.panel}>
              <span className={bitcoinStyles.panelNumber}>
                02 / BITCOIN
              </span>

              <h3>SEE THE BTC</h3>

              <p>
                The system shows how much Bitcoin that sterling amount
                represents at the current market reference rate.
              </p>
            </article>

            <article className={bitcoinStyles.panel}>
              <span className={bitcoinStyles.panelNumber}>
                03 / SATOSHIS
              </span>

              <h3>SEE THE SATS</h3>

              <p>
                The same amount is also shown in satoshis — the
                smaller units that make up one bitcoin.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className={bitcoinStyles.section}>
        <div className={bitcoinStyles.sectionInner}>
          <div className={bitcoinStyles.sectionHeader}>
            <div>
              <p className={bitcoinStyles.sectionCode}>
                MARKET SYSTEM / 03
              </p>

              <h2>LIVE MARKET DATA. LOCAL CALCULATION.</h2>
            </div>

            <div className={bitcoinStyles.sectionIntro}>
              hamson.tech retrieves the BTC/GBP market reference from
              CoinMarketCap through a server-side connection. The
              conversion calculations are then performed locally in
              the calculator.
            </div>
          </div>

          <div className={bitcoinStyles.grid3}>
            <article className={bitcoinStyles.panel}>
              <span className={bitcoinStyles.panelNumber}>
                MARKET
              </span>

              <h3>LIVE BTC / GBP</h3>

              <p>
                The current Bitcoin market reference is supplied by
                CoinMarketCap and refreshed periodically by
                hamson.tech.
              </p>
            </article>

            <article className={bitcoinStyles.panel}>
              <span className={bitcoinStyles.panelNumber}>
                ENGINE
              </span>

              <h3>LOCAL CONVERSION</h3>

              <p>
                GBP, BTC and satoshi calculations are performed in the
                calculator using deterministic arithmetic.
              </p>
            </article>

            <article className={bitcoinStyles.panel}>
              <span className={bitcoinStyles.panelNumber}>
                TRANSPARENCY
              </span>

              <h3>SOURCE &amp; TIME</h3>

              <p>
                The calculator displays its market-data source, feed
                status, 24-hour change and the source&apos;s latest
                market-update time.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className={bitcoinStyles.disclaimer}>
        <div className={bitcoinStyles.disclaimerInner}>
          <span className={bitcoinStyles.disclaimerCode}>
            MARKET DATA / NOTICE
          </span>

          <p>
            The BTC/GBP figure shown here is a market reference
            supplied by CoinMarketCap. It may differ from the price
            available from an exchange, wallet, payment provider or
            other service at a particular moment. hamson.tech does not
            execute Bitcoin purchases or sales through this
            calculator.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}