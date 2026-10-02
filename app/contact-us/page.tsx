import type { Metadata } from "next";
import Link from "next/link";

import BrandReveal from "../../components/BrandReveal";
import CopyEmailButton from "./CopyEmailButton";
import styles from "./contact.module.css";

export const metadata: Metadata = {
  title: "Contact Dr Neil Hamson | Hamson Software",
  description:
    "Contact Dr Neil Hamson regarding Hamson Software, development funding, strategic partnerships, licensing, commercial collaboration and MI1.",
  alternates: { canonical: "/contact-us" },
  openGraph: {
    title: "Contact Dr Neil Hamson | Hamson Software",
    description:
      "Direct contact for Hamson Software funding, partnerships, licensing, commercial collaboration and MI1 technical discussions.",
    url: "/contact-us",
    siteName: "Neil Hamson",
    type: "website",
  },
};

const enquiryRoutes = [
  {
    code: "01",
    title: "DEVELOPMENT FUNDING",
    routeClass: "STRATEGIC",
    state: "OPEN",
    channel: "DIRECT",
    subject: "Hamson Software — Development Funding Enquiry",
    copy: "Strategic support for active Hamson Software product and engineering work.",
  },
  {
    code: "02",
    title: "STRATEGIC PARTNERSHIPS",
    routeClass: "COMMERCIAL / TECHNICAL",
    state: "OPEN",
    channel: "DIRECT",
    subject: "Hamson Software — Strategic Partnership Enquiry",
    copy: "Commercial or technical partnership discussions that align with current systems and product direction.",
  },
  {
    code: "03",
    title: "LICENSING",
    routeClass: "SOFTWARE / DISTRIBUTION",
    state: "OPEN",
    channel: "DIRECT",
    subject: "Hamson Software — Licensing Enquiry",
    copy: "Relevant licensing, deployment and commercial distribution discussions for Hamson Software.",
  },
  {
    code: "04",
    title: "MI1",
    routeClass: "MACHINE INTELLIGENCE",
    state: "SELECTIVE",
    channel: "DIRECT",
    subject: "MI1 — Technical or Strategic Enquiry",
    copy: "Technical, research, funding or strategic discussions relating to the private Machine Intelligence work.",
  },
  {
    code: "05",
    title: "COMMERCIAL COLLABORATION",
    routeClass: "PRODUCT / TECHNOLOGY",
    state: "OPEN",
    channel: "DIRECT",
    subject: "Hamson Software — Commercial Collaboration Enquiry",
    copy: "Relevant product, technology or distribution opportunities connected with the work on hamson.tech.",
  },
] as const;

const transmissionItems = [
  ["01", "ORGANISATION / CONTEXT", "Who you are and the organisation or project involved."],
  ["02", "RELEVANT WORK AREA", "Which Hamson Software system, product or development area the enquiry concerns."],
  ["03", "OBJECTIVE", "What you would like to discuss, explore or propose."],
  ["04", "RELEVANCE", "Why the enquiry connects to the current work."],
] as const;

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
        </nav>

        <div className="header-actions">
          <Link className="header-buy" href="/bitcoin#buy-bitcoin">
            BUY BITCOIN
          </Link>

          <Link className="header-contact" href="/contact-us">
            CONTACT
          </Link>
        </div>

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

export default function ContactPage() {
  return (
    <main className={`${styles.page} site`}>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>

      <Header />

      <section
        className={styles.hero}
        id="main-content"
        aria-labelledby="contact-title"
      >
        <div className={styles.heroIndex} aria-hidden="true">
          <span>HS</span>
          <span>COMMS</span>
          <span>DIRECT / 01</span>
        </div>

        <div className={styles.heroGrid}>
          <div className={styles.heroCopy}>
            <p className="eyebrow">HAMSON SOFTWARE / COMMUNICATION SYSTEM</p>

            <h1 id="contact-title">
              CONTACT
              <span>NEIL HAMSON.</span>
            </h1>

            <p className={styles.lede}>
              Direct contact regarding Hamson Software products, MI1, development
              funding, licensing and relevant strategic or commercial partnerships.
            </p>

            <div className={styles.heroStatus} aria-label="Contact system status">
              <div>
                <span>SYSTEM</span>
                <strong>HS / COMMS</strong>
              </div>
              <div>
                <span>STATE</span>
                <strong className={styles.openState}>
                  <i aria-hidden="true" />
                  ACTIVE
                </strong>
              </div>
              <div>
                <span>ROUTING MODE</span>
                <strong>SELECTIVE</strong>
              </div>
              <div>
                <span>OPERATOR</span>
                <strong>NEIL HAMSON</strong>
              </div>
            </div>
          </div>

          <aside className={styles.channelConsole} aria-label="Direct email channel">
            <span className={styles.consoleCornerA} aria-hidden="true" />
            <span className={styles.consoleCornerB} aria-hidden="true" />

            <div className={styles.consoleTop}>
              <span>HS / COMMS / PRIMARY</span>
              <span className={styles.channelStatus}>
                <span aria-hidden="true" />
                DIRECT CHANNEL / OPEN
              </span>
            </div>

            <div className={styles.signalRail} aria-hidden="true">
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
            </div>

            <div className={styles.channelIdentity}>
              <span>PRIMARY MEDIUM</span>
              <strong>EMAIL</strong>
            </div>

            <a
              className={styles.emailAddress}
              href="mailto:neil@hamson.tech"
              aria-label="Email Dr Neil Hamson at neil@hamson.tech"
            >
              neil@hamson.tech
            </a>

            <div className={styles.channelActions}>
              <CopyEmailButton />
              <a className={styles.emailButton} href="mailto:neil@hamson.tech">
                OPEN DIRECT CHANNEL →
              </a>
            </div>

            <dl className={styles.channelMeta}>
              <div>
                <dt>RECIPIENT</dt>
                <dd>DR NEIL HAMSON</dd>
              </div>
              <div>
                <dt>TRANSMISSION</dt>
                <dd>DIRECT</dd>
              </div>
              <div>
                <dt>SCOPE</dt>
                <dd>HAMSON SOFTWARE / MI1</dd>
              </div>
            </dl>
          </aside>
        </div>
      </section>

      <section className={styles.routingSection} aria-labelledby="routing-title">
        <div className={styles.sectionHeading}>
          <div>
            <span className={styles.sectionCode}>HS / COMMUNICATION ROUTER / 01</span>
            <h2 id="routing-title">SELECT CHANNEL.</h2>
          </div>

          <div className={styles.sectionReadout}>
            <span>ROUTES AVAILABLE</span>
            <strong>05</strong>
            <p>
              Select the route that best matches the discussion. The channel opens
              a direct email with the enquiry class already identified.
            </p>
          </div>
        </div>

        <div className={styles.routeGrid}>
          {enquiryRoutes.map((route) => {
            const href = `mailto:neil@hamson.tech?subject=${encodeURIComponent(
              route.subject,
            )}`;

            return (
              <a className={styles.route} href={href} key={route.code}>
                <span className={styles.routeCorner} aria-hidden="true" />

                <div className={styles.routeTopline}>
                  <span className={styles.routeCode}>CH / {route.code}</span>
                  <span className={styles.routeState}>
                    <i aria-hidden="true" />
                    {route.state}
                  </span>
                </div>

                <div className={styles.routeBody}>
                  <h3>{route.title}</h3>
                  <p>{route.copy}</p>
                </div>

                <dl className={styles.routeTelemetry}>
                  <div>
                    <dt>CLASS</dt>
                    <dd>{route.routeClass}</dd>
                  </div>
                  <div>
                    <dt>STATUS</dt>
                    <dd>{route.state}</dd>
                  </div>
                  <div>
                    <dt>CHANNEL</dt>
                    <dd>{route.channel}</dd>
                  </div>
                </dl>

                <div className={styles.routeAction}>
                  <span>OPEN DIRECT CHANNEL</span>
                  <strong aria-hidden="true">→</strong>
                </div>
              </a>
            );
          })}
        </div>
      </section>

      <section
        className={styles.transmissionSection}
        aria-labelledby="transmission-title"
      >
        <div className={styles.transmissionFrame}>
          <div className={styles.transmissionHeading}>
            <span className={styles.sectionCode}>HS / TRANSMISSION GUIDE / 02</span>

            <h2 id="transmission-title">SEND USEFUL CONTEXT.</h2>

            <p>
              A concise first message is enough. Include the information needed
              to understand the enquiry and how it relates to the current work.
            </p>

            <div className={styles.readyState}>
              <span aria-hidden="true" />
              <div>
                <small>TRANSMISSION STATE</small>
                <strong>READY</strong>
              </div>
            </div>
          </div>

          <div className={styles.transmissionPanel}>
            <div className={styles.transmissionTop}>
              <span>MESSAGE PREPARATION</span>
              <span>04 FIELDS / RECOMMENDED</span>
            </div>

            <div className={styles.transmissionList}>
              {transmissionItems.map(([code, title, copy]) => (
                <div className={styles.transmissionItem} key={code}>
                  <span>{code}</span>
                  <div>
                    <strong>{title}</strong>
                    <p>{copy}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.transmissionFooter}>
              <span>HS / COMMS</span>
              <strong>READY FOR TRANSMISSION</strong>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}