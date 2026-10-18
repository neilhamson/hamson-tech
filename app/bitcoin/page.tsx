import Image from "next/image";
import Link from "next/link";

import { pageMetadata } from "../_components/SubpageShell";
import BitcoinHomeDashboard from "./BitcoinHomeDashboard";
import HamsonBitcoinInstall from "./HamsonBitcoinInstall";
import styles from "./bitcoin.module.css";
import campaign from "../wallet-campaign.module.css";

const bitcoinPageMetadata = pageMetadata(
  "Hamson Bitcoin — Bitcoin Market, Wallet Development & Guides UK",
  "Hamson Bitcoin is a UK-focused Bitcoin platform with live BTC/GBP market data, network information, practical guides and a public Bitcoin-only wallet development build.",
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
              src="/brand/hamson-software-wordmark.svg"
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

        <Link href="/bitcoin/learn">
          <span>06</span>
          <strong>LEARN</strong>
          <small>START HERE</small>
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
            alongside wallet information, practical learning tools and
            the public development of Hamson Bitcoin Wallet.
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
              Hamson Software is building a Bitcoin-only, non-custodial wallet
              in public. The current development build now completes an
              end-to-end Bitcoin Signet transaction cycle: deterministic wallet
              recovery, BDK synchronization, transaction construction, explicit
              review, local signing, broadcast and automatic wallet-state refresh.
              Encrypted browser persistence is also operational, allowing a saved
              wallet to return locked after reload and unlock locally without
              re-entering the recovery phrase.
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
            <span>VERIFIED MILESTONES</span>
            <strong>RECOVERY · SYNC · LOCAL SIGNING · BROADCAST · ENCRYPTED VAULT</strong>
          </div>
        </div>
      </section>

      <section id="wallet-development-status" className={campaign.panel} aria-labelledby="wallet-status-title">
        <p className={campaign.eyebrow}>HAMSON BITCOIN WALLET / DEVELOPMENT RECORD / OCTOBER 2026</p>
        <h2 id="wallet-status-title" className={campaign.heading}>INDEPENDENT BITCOIN WALLET DEVELOPMENT.</h2>
        <p className={campaign.lead}>Hamson Software is developing a Bitcoin-only, non-custodial wallet. The public Signet test build and a separate Mainnet receive-only development path represent distinct stages; neither is approved for storing real funds.</p>
        <div className={campaign.columns}>
          <div className={campaign.detail}>
            <h3>DOCUMENTED DEVELOPMENT MILESTONES</h3>
            <ul>
              <li>Signet test-network wallet: recovery, blockchain synchronisation, transaction review, local signing and broadcast demonstrated.</li>
              <li>Mainnet receive-only development: genuine Bitcoin address derivation, encrypted vault persistence and synchronisation demonstrated.</li>
              <li>Receiving history and validation implemented; deterministic checks and a Windows production build passed.</li>
              <li>Published BIP84 address vectors independently checked against Hamson's compiled wallet core.</li>
            </ul>
          </div>
          <div className={campaign.detail}>
            <h3>WHAT REMAINS BEFORE RELEASE</h3>
            <ul>
              <li>End-to-end private-wallet recovery and a verified route to spend or recover funds.</li>
              <li>Live incoming-payment detection and confirmation handling for a fresh private wallet.</li>
              <li>Mainnet transaction creation, review, authorisation, signing and broadcasting.</li>
              <li>Appropriate security assessment, usability checks and customer distribution readiness.</li>
            </ul>
          </div>
        </div>
        <p className={campaign.warning}><strong>TEST BUILD ONLY.</strong> The public wallet runs on Bitcoin Signet; test coins have no monetary value. The separate Mainnet receive-only development build is not approved for real funds. Do not send BTC to a development wallet.</p>
        <h3 className={campaign.subheading}>SUPPORT THE NEXT DEVELOPMENT STAGE.</h3>
        <p className={campaign.note}>Wallet development is currently paused while work continues on MI1. Commercial development sponsorship is the priority for funding further wallet engineering, recovery and transaction testing, independent security review and release preparation. Voluntary supporter interest is also welcome. Enquiries do not constitute an investment offer; this page does not accept payments, deposits or pre-orders. No release date is promised.</p>
        <div className={campaign.actions}>
          <Link href="/contact-us#wallet-interest" className={campaign.primary}>DISCUSS SPONSORSHIP / SUPPORT</Link>
          <a href="https://wallet.hamson.tech" target="_blank" rel="noopener noreferrer" className={campaign.secondary}>VIEW SIGNET TEST BUILD</a>
        </div>
      </section>

      <section className={styles.disclaimer}>
        <div className={styles.disclaimerInner}>
          <span className={styles.disclaimerCode}>
            HAMSON BITCOIN / CURRENT SERVICE
          </span>

          <p>
            Live BTC/GBP market data, Bitcoin network information, wallet
            guidance and educational tools are available now. Hamson Bitcoin
            Wallet is available as a public Bitcoin Signet development build
            for demonstration and testing, with local signing, Signet broadcast
            and encrypted browser persistence now operational. Mainnet sending remains unavailable in the public build; a separate
            Mainnet receive-only implementation is under development and is
            not approved for real funds. Wallet development is currently
            paused while MI1 work continues.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
