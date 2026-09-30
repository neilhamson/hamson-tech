import Image from "next/image";
import Link from "next/link";

import { pageMetadata } from "../_components/SubpageShell";
import BitcoinHomeDashboard from "./BitcoinHomeDashboard";
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
            SOFTWARE
          </Link>

          <Link href="/about-us">
            ABOUT
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
              SOFTWARE
            </Link>

            <Link href="/about-us">
              ABOUT
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
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>

      <Header />

      <section className={styles.homeHero} id="main-content">
        <div className={styles.homeHeroCopy}>
          <p className={styles.kicker}>
            HAMSON BITCOIN / MARKET · NETWORK · WALLET · LEARN
          </p>

          <h1>
            HAMSON
            <span>BITCOIN</span>
          </h1>

          <p className={styles.homeHeroLead}>
            A focused Bitcoin platform from Hamson Software.
            Live market and network data now, with buying and
            wallet services developing as the platform evolves.
          </p>

          <div className={styles.homeHeroActions}>
            <Link href="/bitcoin/gbp">OPEN MARKET</Link>
            <Link href="/bitcoin/fees">VIEW NETWORK</Link>
          </div>
        </div>

        <BitcoinHomeDashboard />
      </section>

      <section className={styles.homeDevelopment}>
        <div className={styles.homeDevelopmentInner}>
          <span>PLATFORM DEVELOPMENT</span>

          <div>
            <strong>BUY + WALLET</strong>
            <p>
              Hamson Bitcoin is being developed beyond information
              tools into a broader Bitcoin service platform.
            </p>
          </div>

          <div className={styles.homeDevelopmentStatus}>
            <span>BUY</span>
            <strong>IN DEVELOPMENT</strong>
          </div>

          <div className={styles.homeDevelopmentStatus}>
            <span>WALLET</span>
            <strong>IN DEVELOPMENT</strong>
          </div>
        </div>
      </section>

      <section className={styles.disclaimer}>
        <div className={styles.disclaimerInner}>
          <span className={styles.disclaimerCode}>
            HAMSON BITCOIN / CURRENT SERVICE
          </span>

          <p>
            Current Hamson Bitcoin services provide live market,
            network and educational information. Buy and wallet
            functions shown as in development are not currently
            operational services.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
