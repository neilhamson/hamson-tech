import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import styles from "./contact.module.css";
import CopyEmailButton from "./CopyEmailButton";

const navigation = [
  { href: "/machine-intelligence", label: "MACHINE INTELLIGENCE" },
  { href: "/bitcoin", label: "BITCOIN" },
  { href: "/services", label: "SERVICES" },
  { href: "/about-us", label: "ABOUT" },
  { href: "/articles", label: "ARTICLES" },
  { href: "/contact-us", label: "CONTACT" },
] as const;

export const metadata: Metadata = {
  title: "Contact Dr Neil Hamson",
  description:
    "Contact Dr Neil Hamson regarding Machine Intelligence development, technical collaboration and scoped software engineering enquiries.",
  alternates: { canonical: "/contact-us" },
  openGraph: {
    title: "Contact Dr Neil Hamson",
    description:
      "Contact Dr Neil Hamson regarding Machine Intelligence development, technical collaboration and scoped software engineering enquiries.",
    url: "/contact-us",
    siteName: "Neil Hamson",
    type: "website",
  },
};

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
          {navigation.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>

        <details className="mobile-navigation">
          <summary aria-label="Open navigation">
            <span />
            <span />
          </summary>
          <nav aria-label="Mobile navigation">
            {navigation.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
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

export default function ContactPage() {
  return (
    <main className={`${styles.page} site`}>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>

      <Header />

      <div className={styles.inner} id="main-content">
        <section className={styles.intro} aria-labelledby="contact-title">
          <p className={styles.kicker}>CONTACT</p>
          <h1 id="contact-title">Get in touch</h1>
          <p className={styles.lede}>
            For a scoped software engineering project, technical collaboration
            or a conversation about MI1 development, contact Dr Neil Hamson directly.
          </p>
        </section>

        <section className={styles.contactSection} aria-labelledby="email-title">
          <div className={styles.sectionLabel}>EMAIL</div>

          <div className={styles.primaryPanel}>
            <div className={styles.primaryCopy}>
              <h2 id="email-title">Dr Neil Hamson</h2>
              <p>
                The preferred contact method for software project and
                technical collaboration enquiries.
              </p>
            </div>

            <div className={styles.emailAction}>
              <a
                className={styles.emailAddress}
                href="mailto:neil@hamson.tech"
                aria-label="Email Dr Neil Hamson at neil@hamson.tech"
              >
                neil@hamson.tech
              </a>

              <CopyEmailButton />
            </div>
          </div>
        </section>

        <section className={styles.guidance} aria-labelledby="before-title">
          <p className={styles.rowLabel}>BEFORE YOU WRITE</p>
          <div className={styles.guidanceGrid}>
            <h2 id="before-title">A short brief is enough.</h2>
            <p>
              Please include a short description of what you would like to
              discuss. For a software project, include the goal, any existing
              system and the outcome you need.
            </p>
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}
