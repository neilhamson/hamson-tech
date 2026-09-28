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
            aria-label="Neil Hamson home"
          >
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

      <section
        className="development machine-intelligence-home"
        id="main-content"
        aria-label="Machine Intelligence development"
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
              <p className="eyebrow">HAMSON SOFTWARE / NEIL HAMSON</p>

              <h2 id="closing-title">SOFTWARE BUILT TO BE USED.</h2>

              <p className="closing-copy">
                Explore live software, Bitcoin tools and the systems Neil Hamson
                is building through Hamson Software.
              </p>

              <div className="closing-system-actions">
                <Link
                  className="brand-button brand-button-primary"
                  href="/services"
                >
                  EXPLORE HAMSON SOFTWARE
                </Link>

                <Link
                  className="brand-button brand-button-secondary"
                  href="/contact-us"
                >
                  COMMERCIAL ENQUIRIES
                </Link>
              </div>
            </div>

            <nav
              className="closing-route-grid"
              aria-label="Hamson Software systems"
            >
              <Link href="/services">
                <span>01 / LIVE SOFTWARE</span>
                <strong>HAMSON SOFTWARE</strong>
                <small>OPEN →</small>
              </Link>

              <Link href="/bitcoin">
                <span>02 / UK BITCOIN</span>
                <strong>LIVE TOOLS + GUIDES</strong>
                <small>OPEN →</small>
              </Link>

              <Link href="/machine-intelligence">
                <span>03 / MI1</span>
                <strong>PRIVATE / ACTIVE</strong>
                <small>VIEW →</small>
              </Link>

              <Link href="/contact-us">
                <span>04 / DIRECT CHANNEL</span>
                <strong>COMMERCIAL CONTACT</strong>
                <small>OPEN →</small>
              </Link>
            </nav>
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <span>© 2026 Neil Hamson</span>
        <span>Human direction. Machine intelligence. Shared construction.</span>
        <span>Developed by Dr Neil Hamson</span>
      </footer>
    </main>
  );
}