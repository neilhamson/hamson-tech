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
              <Link href="/services">SERVICES</Link>
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
        <p className="eyebrow">SOFTWARE ENGINEERING / NEIL HAMSON</p>

        <h2 id="closing-title">HAVE SOFTWARE TO BUILD OR IMPROVE?</h2>

        <p className="closing-copy">
          Bring a defined problem, an existing system or an idea to explore.
          Work begins with a clear scope and a direct conversation.
        </p>

        <Link
          className="brand-button brand-button-primary"
          href="/services"
        >
          DISCUSS A SOFTWARE PROJECT
        </Link>
      </section>

      <footer className="site-footer">
        <span>© 2026 Neil Hamson</span>
        <span>Human direction. Machine intelligence. Shared construction.</span>
        <span>Developed by Dr Neil Hamson</span>
      </footer>
    </main>
  );
}