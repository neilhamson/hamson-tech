import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";

import BrandReveal from "../../components/BrandReveal";
import styles from "./services.module.css";

export const metadata: Metadata = {
  title: "Hamson Software | Software by Neil Hamson",
  description:
    "Explore live Hamson Software systems, UK Bitcoin tools, commercial Windows release preparation and private MI1 Machine Intelligence development by Neil Hamson.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Hamson Software | Software by Neil Hamson",
    description:
      "Live software, UK Bitcoin tools, Windows commercial release preparation and private MI1 Machine Intelligence development by Neil Hamson.",
    url: "/services",
    siteName: "Neil Hamson",
    type: "website",
  },
};

function Header() {
  return (
    <header className="site-header">
      <div className="header-inner">
        <Link className="brand-lockup" href="/" aria-label="Neil Hamson home">
          <BrandReveal />
        </Link>

        <nav className="navigation" aria-label="Main navigation">
          <Link
            href="/machine-intelligence"
            aria-label="MI1 — Machine Intelligence"
          >
            MI1
          </Link>
          <Link href="/bitcoin">BITCOIN</Link>
          <Link href="/services">SOFTWARE</Link>
          <Link href="/about-us">ABOUT</Link>
          <Link href="/articles">ARTICLES</Link>
        </nav>

        <Link className="header-contact" href="/contact-us">
          CONTACT
        </Link>

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
            <Link href="/services">SOFTWARE</Link>
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

function LiveStatus({ children }: { children: ReactNode }) {
  return (
    <span className={styles.liveStatus}>
      <span aria-hidden="true" />
      {children}
    </span>
  );
}

export default function SoftwarePage() {
  return (
    <main className={`${styles.page} site`}>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>

      <Header />

      <section className={styles.hero} id="main-content">
        <div className={styles.heroGrid}>
          <div className={styles.heroCopy}>
            <p className="eyebrow">HAMSON SOFTWARE / SYSTEMS / UK</p>
            <h1>
              SOFTWARE
              <span>BUILT TO BE USED.</span>
            </h1>
            <p className={styles.heroLead}>
              Live software, UK-focused Bitcoin systems, commercial Windows
              release preparation and private Machine Intelligence research —
              designed, built and operated by Neil Hamson.
            </p>

            <div className={styles.heroActions}>
              <a className="brand-button brand-button-primary" href="#live-systems">
                VIEW LIVE SYSTEMS
              </a>
              <a className="brand-button brand-button-secondary" href="#funding">
                FUNDING &amp; PARTNERSHIPS
              </a>
            </div>
          </div>

          <aside className={styles.systemConsole} aria-label="Hamson Software system status">
            <div className={styles.consoleTop}>
              <span>HS / SYSTEM INDEX / 01</span>
              <LiveStatus>ACTIVE</LiveStatus>
            </div>

            <div className={styles.consoleReadout}>
              <div>
                <span>PUBLIC SYSTEMS</span>
                <strong>03</strong>
                <small>LIVE</small>
              </div>
              <div>
                <span>WINDOWS</span>
                <strong>01</strong>
                <small>COMMERCIAL PREP</small>
              </div>
              <div>
                <span>MI1</span>
                <strong>R&amp;D</strong>
                <small>PRIVATE / ACTIVE</small>
              </div>
            </div>

            <div className={styles.consoleRows}>
              <div><span>OPERATING MODEL</span><strong>PRODUCT DEVELOPMENT</strong></div>
              <div><span>PRIMARY DOMAIN</span><strong>HAMSON.TECH</strong></div>
              <div><span>HUMAN CONTROL</span><strong>NEIL HAMSON</strong></div>
              <div><span>COMPANY IDENTITY</span><strong>REGISTRATION IN PROGRESS</strong></div>
            </div>
          </aside>
        </div>

        <nav
          className={styles.heroRail}
          aria-label="Hamson Software system routes"
        >
          <a href="#live-systems">
            <span>01 / LIVE SYSTEMS</span>
            <strong>03 ACTIVE</strong>
            <small>VIEW ↓</small>
          </a>

          <a href="#windows-release">
            <span>02 / WINDOWS RELEASE</span>
            <strong>COMMERCIAL PREP</strong>
            <small>VIEW ↓</small>
          </a>

          <a href="#mi1-development">
            <span>03 / MI1</span>
            <strong>PRIVATE / ACTIVE</strong>
            <small>VIEW ↓</small>
          </a>

          <Link href="/bitcoin">
            <span>04 / UK BITCOIN</span>
            <strong>LIVE SYSTEM</strong>
            <small>OPEN →</small>
          </Link>
        </nav>
      </section>

      <section className={styles.liveSection} id="live-systems" aria-labelledby="live-title">
        <div className={styles.sectionHeading}>
          <div>
            <span className={styles.sectionCode}>LIVE SYSTEMS / 01</span>
            <h2 id="live-title">WORKING SOFTWARE. LIVE NOW.</h2>
          </div>
          <p>
            These systems are already operating through hamson.tech. The software
            is the evidence: visitors can use it, inspect the published material
            around it and move directly into the relevant technical area.
          </p>
        </div>

        <div className={styles.productGrid}>
          <article className={styles.flagshipProduct}>
            <div className={styles.productTopline}>
              <span>HS / INTERFACE / 01</span>
              <LiveStatus>LIVE</LiveStatus>
            </div>

            <div className={styles.flagshipBody}>
              <div>
                <p className={styles.productType}>PUBLIC TECHNICAL SYSTEM</p>
                <h3>ASK HAMSON.TECH</h3>
                <p className={styles.productLead}>
                  The site-wide chatbot and full technical interface provide a
                  live route into published Hamson Software work, MI1 evidence
                  and technical information.
                </p>

                <Link className="brand-button brand-button-primary" href="/">
                  OPEN LIVE INTERFACE
                </Link>
              </div>

              <dl className={styles.productReadout}>
                <div><dt>SITE-WIDE CHAT</dt><dd>LIVE</dd></div>
                <div><dt>TECHNICAL INTERFACE</dt><dd>LIVE</dd></div>
                <div><dt>PUBLISHED MI1 EVIDENCE</dt><dd>AVAILABLE</dd></div>
                <div><dt>PRIVATE MI1 ACCESS</dt><dd>ISOLATED</dd></div>
              </dl>
            </div>
          </article>

          <div className={styles.productStack}>
            <article className={styles.productPanel}>
              <div className={styles.productTopline}>
                <span>HS / BTC-GBP / UK-01</span>
                <LiveStatus>LIVE</LiveStatus>
              </div>
              <p className={styles.productType}>UK BITCOIN SOFTWARE</p>
              <h3>BITCOIN IN POUNDS</h3>
              <p>
                Convert pounds into Bitcoin and satoshis using a live BTC/GBP
                reference, with beginner-first explanations built into the system.
              </p>
              <div className={styles.panelMetrics}>
                <span>GBP → BTC</span>
                <span>BTC → GBP</span>
                <span>SATOSHIS</span>
              </div>
              <Link href="/bitcoin/gbp">OPEN BITCOIN IN POUNDS →</Link>
            </article>

            <article className={styles.productPanel}>
              <div className={styles.productTopline}>
                <span>HS / BITCOIN / KNOWLEDGE</span>
                <LiveStatus>LIVE</LiveStatus>
              </div>
              <p className={styles.productType}>BEGINNER-FIRST EDUCATION</p>
              <h3>UK BITCOIN GUIDES</h3>
              <p>
                Fractions, satoshis, wallets, use and mining explained in plain
                English, connected directly to the working Bitcoin tools.
              </p>
              <div className={styles.panelMetrics}>
                <span>FRACTIONS</span>
                <span>WALLETS</span>
                <span>MINING</span>
              </div>
              <Link href="/bitcoin">EXPLORE BITCOIN →</Link>
            </article>
          </div>
        </div>
      </section>

      <section className={styles.windowsSection} id="windows-release" aria-labelledby="windows-title">
        <div className={styles.windowsFrame}>
          <div className={styles.windowsHeading}>
            <div>
              <span className={styles.sectionCode}>COMMERCIAL RELEASE / 02</span>
              <h2 id="windows-title">WINDOWS DISTRIBUTION.</h2>
            </div>
            <p>
              Commercial Windows distribution is being prepared under Hamson
              Software. The intended company identity will be finalised for that
              licensing and distribution path after Companies House incorporation
              is complete.
            </p>
          </div>

          <div className={styles.releaseConsole}>
            <div className={styles.releaseState}>
              <span>RELEASE STATE</span>
              <strong>PREPARING COMMERCIAL DISTRIBUTION</strong>
            </div>
            <div><span>PLATFORM</span><strong>WINDOWS</strong></div>
            <div><span>COMMERCIAL IDENTITY</span><strong>REGISTRATION IN PROGRESS</strong></div>
            <div><span>LICENSING</span><strong>PREPARATION</strong></div>
            <div><span>NEXT STAGE</span><strong>DISTRIBUTION IDENTITY</strong></div>
          </div>
        </div>
      </section>

      <section className={styles.miSection} id="mi1-development" aria-labelledby="mi-title">
        <div className={styles.miGrid}>
          <div className={styles.miCopy}>
            <span className={styles.sectionCode}>PRIVATE R&amp;D / 03</span>
            <h2 id="mi-title">
              MI1
              <span>HUMAN-REVIEWED MACHINE INTELLIGENCE.</span>
            </h2>
            <p>
              MI1 is Neil Hamson&apos;s private Machine Intelligence development
              system. It is being engineered around bounded changes, explicit
              human approval and validation rather than unrestricted autonomous
              action.
            </p>
            <Link className="brand-button brand-button-secondary" href="/machine-intelligence">
              EXPLORE MI1
            </Link>
          </div>

          <aside className={styles.miConsole} aria-label="MI1 development state">
            <div className={styles.consoleTop}>
              <span>MI1 / DEVELOPMENT STATE</span>
              <LiveStatus>ACTIVE</LiveStatus>
            </div>
            <div className={styles.miRows}>
              <div><span>DEVELOPMENT LOOP</span><strong>IMPLEMENTED</strong></div>
              <div><span>HUMAN REVIEW</span><strong>REQUIRED</strong></div>
              <div><span>AUTHORITY</span><strong>BOUNDED</strong></div>
              <div><span>PUBLIC RELEASE</span><strong>NOT ANNOUNCED</strong></div>
            </div>
            <p>
              Public pages describe the current engineering direction without
              exposing the private MI1 core.
            </p>
          </aside>
        </div>
      </section>

      <section className={styles.fundingSection} id="funding" aria-labelledby="funding-title">
        <div className={styles.fundingGrid}>
          <div>
            <span className={styles.sectionCode}>FUNDING &amp; PARTNERSHIPS / 04</span>
            <h2 id="funding-title">BUILD THE NEXT STAGE.</h2>
          </div>

          <div className={styles.fundingCopy}>
            <p>
              Enquiries are welcome from organisations or individuals interested
              in development funding, strategic partnerships, licensing,
              commercial collaboration or development support for Hamson Software.
            </p>
            <p className={styles.fundingNote}>
              No shares, investment terms or financial returns are offered on this
              page. This page is not an offer or invitation to invest.
            </p>
            <Link className="brand-button brand-button-primary" href="/contact-us">
              OPEN DIRECT CHANNEL
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
