import Image from "next/image";
import Link from "next/link";

import { pageMetadata } from "../../_components/SubpageShell";
import BtcGbpCalculator from "./BtcGbpCalculator";
import bitcoinStyles from "../bitcoin.module.css";

export const metadata = pageMetadata(
  "BTC GBP Calculator — Bitcoin in British Pounds",
  "A UK-focused Bitcoin and British Sterling conversion system under development by Neil Hamson.",
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

export default function BitcoinGbpPage() {
  return (
    <main className={`${bitcoinStyles.page} site`}>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>

      <Header />

      <section className={bitcoinStyles.section} id="main-content">
        <div className={bitcoinStyles.sectionInner}>
          <div className={bitcoinStyles.sectionHeader}>
            <div>
              <p className={bitcoinStyles.sectionCode}>
                NH / BTC-GBP / DEVELOPMENT
              </p>

              <h2>BITCOIN IN BRITISH STERLING</h2>
            </div>

            <div className={bitcoinStyles.sectionIntro}>
              A UK-focused conversion system for understanding Bitcoin in
              pounds, bitcoin and satoshis. The calculation engine is working;
              the live market-data feed is deliberately not connected yet.
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
                SYSTEM METHOD / 01
              </p>

              <h2>CALCULATE FIRST. CONNECT MARKET DATA SECOND.</h2>
            </div>

            <div className={bitcoinStyles.sectionIntro}>
              The conversion logic does not require an exchange. Once an
              approved market-data source is connected, the manual reference
              rate can be replaced by the Hamson BTC/GBP reference feed.
            </div>
          </div>

          <div className={bitcoinStyles.grid3}>
            <article className={bitcoinStyles.panel}>
              <span className={bitcoinStyles.panelNumber}>01 / RATE</span>
              <h3>REFERENCE VALUE</h3>
              <p>
                Development mode accepts a manually entered GBP value for one
                bitcoin.
              </p>
            </article>

            <article className={bitcoinStyles.panel}>
              <span className={bitcoinStyles.panelNumber}>
                02 / CONVERT
              </span>
              <h3>GBP / BTC / SATS</h3>
              <p>
                Conversion takes place locally using deterministic arithmetic,
                without sending an order or moving Bitcoin.
              </p>
            </article>

            <article className={bitcoinStyles.panel}>
              <span className={bitcoinStyles.panelNumber}>03 / FEED</span>
              <h3>MARKET DATA</h3>
              <p>
                Live market data will be connected only after the source and
                usage rights have been formally selected.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className={bitcoinStyles.disclaimer}>
        <div className={bitcoinStyles.disclaimerInner}>
          <span className={bitcoinStyles.disclaimerCode}>
            DEVELOPMENT / NOTICE
          </span>

          <p>
            The current calculator uses a manually supplied reference rate. It
            is a software-development and educational tool, not a live market
            quotation, exchange service or executable Bitcoin purchase price.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}