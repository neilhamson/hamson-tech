import Link from "next/link";
import BrandReveal from "../components/BrandReveal";
import MachineIntelligenceExperience from "../components/MachineIntelligenceExperience";

export default function Home() {
  return (
    <main className="site">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>

      <header className="site-header">
        <div className="header-inner">
          <Link
            className="brand-lockup"
            href="/"
            aria-label="Hamson Software home"
          >
            <BrandReveal />
          </Link>

          <nav className="navigation" aria-label="Main navigation">
            <Link href="/services">SOFTWARE</Link>

            <Link href="/bitcoin">BITCOIN</Link>

            <Link
              href="/machine-intelligence"
              aria-label="MI1 — Machine Intelligence"
            >
              MI1
            </Link>

            <Link href="/about-us">ABOUT</Link>
          </nav>

          <div className="header-actions">
            <Link className="header-buy" href="/bitcoin#buy-bitcoin">
              BUY BITCOIN
            </Link>

            <Link className="header-contact" href="/contact-us">
              <span>CONTACT</span>
              <small aria-hidden="true">↗</small>
            </Link>
          </div>

          <Link
            className="mobile-header-buy"
            href="/bitcoin#buy-bitcoin"
            aria-label="Buy Bitcoin"
          >
            BUY BITCOIN
          </Link>

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
                aria-label="MI1 — Machine Intelligence"
              >
                MI1
              </Link>

              <Link href="/about-us">ABOUT</Link>
              <Link href="/contact-us">CONTACT</Link>
            </nav>
          </details>
        </div>
      </header>

      <section
        className="development machine-intelligence-home"
        id="main-content"
        aria-label="Hamson Software live systems"
      >
        <MachineIntelligenceExperience />
      </section>

      <section
        className="closing-statement"
        aria-labelledby="closing-title"
      >
        <div className="closing-system-frame">
          <div className="closing-system-top">
            <span>HS / SOFTWARE SYSTEM / 03</span>

            <span className="closing-system-state">
              <i aria-hidden="true" />
              ACTIVE DEVELOPMENT
            </span>
          </div>

          <div className="closing-system-grid">
            <div className="closing-system-copy">
              <p className="eyebrow">HAMSON SOFTWARE / ACTIVE SYSTEMS</p>

              <h2 id="closing-title">SYSTEMS YOU CAN USE.</h2>

              <p className="closing-copy">
                Open the live Hamson Bitcoin Wallet development build, use the
                Hamson Technical Interface, explore Hamson Bitcoin, or review
                the private MI1 research programme.
              </p>

              <div className="closing-system-actions">
                <a
                  className="brand-button brand-button-primary"
                  href="https://wallet.hamson.tech"
                  target="_blank"
                  rel="noreferrer"
                >
                  OPEN LIVE BITCOIN WALLET
                </a>

                <Link
                  className="brand-button brand-button-secondary"
                  href="#technical-interface"
                >
                  OPEN LIVE INTERFACE
                </Link>
              </div>
            </div>

            <nav
              className="closing-route-grid"
              aria-label="Hamson Software systems"
            >
              <a
                href="https://wallet.hamson.tech"
                target="_blank"
                rel="noreferrer"
              >
                <span>01 / LIVE DEVELOPMENT</span>
                <strong>HAMSON BITCOIN WALLET</strong>
                <small>SIGNET / OPEN →</small>
              </a>

              <Link href="#technical-interface">
                <span>02 / LIVE INTERFACE</span>
                <strong>HAMSON TECHNICAL INTERFACE</strong>
                <small>OPEN →</small>
              </Link>

              <Link href="/bitcoin">
                <span>03 / HAMSON BITCOIN</span>
                <strong>BITCOIN PLATFORM</strong>
                <small>OPEN →</small>
              </Link>

              <Link href="/machine-intelligence">
                <span>04 / PRIVATE R&amp;D</span>
                <strong>MI1 / INVESTOR PROJECT</strong>
                <small>VIEW →</small>
              </Link>

              <Link href="/contact-us">
                <span>05 / DIRECT CHANNEL</span>
                <strong>PRODUCT / INVESTOR CONTACT</strong>
                <small>OPEN →</small>
              </Link>
            </nav>
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <span>© 2026 Hamson Software</span>
        <span>Human direction. Machine intelligence. Shared construction.</span>
        <span>Developed by Dr Neil Hamson</span>
      </footer>
    </main>
  );
}