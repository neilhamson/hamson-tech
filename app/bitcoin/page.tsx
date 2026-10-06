import Image from "next/image";
import Link from "next/link";

import { pageMetadata } from "../_components/SubpageShell";
import BitcoinHomeDashboard from "./BitcoinHomeDashboard";
import HamsonBitcoinInstall from "./HamsonBitcoinInstall";
import styles from "./bitcoin.module.css";

const bitcoinPageMetadata = pageMetadata(
  "Hamson Bitcoin — Bitcoin Market, Network, Wallets & Guides UK",
  "Hamson Bitcoin is a UK-focused Bitcoin platform with live BTC/GBP market data, network information, wallet guidance and beginner tools.",
  "/bitcoin",
);

export const metadata = {
  ...bitcoinPageMetadata,
  manifest: "/bitcoin/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    title: "Hamson Bitcoin",
    statusBarStyle: "black-translucent" as const,
  },
  icons: {
    apple: [
      {
        url: "/hamson-bitcoin/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },
};

function Header() {
  return (
    <header className="site-header">
      <div className="header-inner">
        <Link
          className="brand-lockup"
          href="/"
          aria-label="Hamson Software home"
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
          <Link href="/services">
            SOFTWARE
          </Link>

          <Link href="/bitcoin">
            BITCOIN
          </Link>

          <Link
            href="/machine-intelligence"
            aria-label="MI1 — Machine Intelligence"
          >
            MI1
          </Link>

          <Link href="/about-us">
            ABOUT
          </Link>

          <Link href="/contact-us">
            CONTACT
          </Link>
        </nav>

        <details className="mobile-navigation">
          <summary aria-label="Open navigation">
            <span />
            <span />
          </summary>

          <nav aria-label="Mobile navigation">
            <Link href="/services">
              SOFTWARE
            </Link>

            <Link href="/bitcoin">
              BITCOIN
            </Link>

            <Link
              href="/machine-intelligence"
              aria-label="MI1 — Machine Intelligence"
            >
              MI1
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

function BitcoinProductNav() {
  return (
    <nav
      className={styles.productNav}
      aria-label="Hamson Bitcoin"
    >
      <div className={styles.productNavInner}>
        <Link
          href="/bitcoin"
          className={styles.productNavActive}
          aria-current="page"
        >
          <span>01</span>
          <strong>HOME</strong>
          <small>LIVE</small>
        </Link>

        <Link href="/bitcoin/gbp">
          <span>02</span>
          <strong>MARKET</strong>
          <small>LIVE</small>
        </Link>

        <a href="#buy-bitcoin">
          <span>03</span>
          <strong>BUY</strong>
          <small>BUILDING</small>
        </a>

        <Link href="/bitcoin/wallets">
          <span>04</span>
          <strong>WALLET</strong>
          <small>GUIDE</small>
        </Link>

        <Link href="/bitcoin/fees">
          <span>05</span>
          <strong>NETWORK</strong>
          <small>LIVE</small>
        </Link>

        <Link href="/bitcoin/fractions-satoshis">
          <span>06</span>
          <strong>LEARN</strong>
          <small>GUIDES</small>
        </Link>
      </div>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <span>© 2026 Hamson Software</span>

      <span>
        Hamson Bitcoin / UK Bitcoin platform
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

      <BitcoinProductNav />

      <section
        className={styles.homeHero}
        id="main-content"
      >
        <div className={styles.homeHeroCopy}>
          <p className={styles.kicker}>
            HAMSON BITCOIN / HOME · MARKET · BUY · WALLET · NETWORK · LEARN
          </p>

          <h1>
            HAMSON
            <span>BITCOIN</span>
          </h1>

          <p className={styles.homeHeroLead}>
            A focused UK Bitcoin platform from Hamson Software.
            Live BTC/GBP market and network data are available now,
            alongside wallet information and practical learning tools.
          </p>

          <div className={styles.homeHeroActions}>
            <Link href="/bitcoin/gbp">
              OPEN MARKET
            </Link>

            <Link href="/bitcoin/fees">
              VIEW NETWORK
            </Link>

            <HamsonBitcoinInstall />
          </div>
        </div>

        <BitcoinHomeDashboard />
      </section>

      <section
        className={styles.homeDevelopment}
        id="buy-development"
        aria-labelledby="bitcoin-development-title"
      >
        <div className={styles.homeDevelopmentInner}>
          <span>HAMSON BITCOIN / LIVE WALLET DEVELOPMENT</span>

          <div>
            <strong id="bitcoin-development-title">
              HAMSON BITCOIN WALLET
            </strong>

            <p>
              Hamson Software is developing a non-custodial Bitcoin wallet in
              public. The current build runs exclusively on Bitcoin Signet and
              demonstrates local wallet recovery, BDK synchronization, UTXO
              discovery and unsigned PSBT construction. Visitors can open the
              working development system now and follow the product as signing,
              broadcast, persistence and further security work are completed.
            </p>

            <div className={styles.homeHeroActions}>
              <a
                href="https://wallet.hamson.tech"
                target="_blank"
                rel="noreferrer"
              >
                OPEN LIVE WALLET
              </a>

              <Link href="/bitcoin/wallets">
                WALLET GUIDE
              </Link>
            </div>
          </div>

          <div className={styles.homeDevelopmentStatus}>
            <span>PUBLIC DEVELOPMENT BUILD</span>
            <strong>OPERATIONAL / BITCOIN SIGNET</strong>
          </div>

          <div className={styles.homeDevelopmentStatus}>
            <span>VERIFIED CAPABILITIES</span>
            <strong>RECOVERY · SYNC · UTXO · PSBT</strong>
          </div>
        </div>
      </section>

      <section className={styles.disclaimer}>
        <div className={styles.disclaimerInner}>
          <span className={styles.disclaimerCode}>
            HAMSON BITCOIN / CURRENT SERVICE
          </span>

          <p>
            Live BTC/GBP market data, Bitcoin network information, wallet
            guidance and educational tools are available now. The Hamson
            Bitcoin Wallet is also available as a public Bitcoin Signet
            development build for demonstration and testing. It is not a
            Mainnet wallet or live financial service. Hamson Software's
            Bitcoin purchase system remains in development.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}