import type { Metadata } from "next";
import Link from "next/link";

import BrandReveal from "../../components/BrandReveal";
import styles from "./about.module.css";

export const metadata: Metadata = {
  title: "About Dr Neil Hamson | Computer Scientist & Software Engineer",
  description:
    "Dr Neil Hamson is a computer scientist and software engineer. Read about his Computing BSc (Hons), Computer Science PhD, software delivery experience, Hamson Software and MI1 development.",
  alternates: { canonical: "/about-us" },
  openGraph: {
    title: "About Dr Neil Hamson | Computer Scientist & Software Engineer",
    description:
      "Computer scientist and software engineer behind Hamson Software, MI1 and public technical systems.",
    url: "/about-us",
    siteName: "Neil Hamson",
    type: "profile",
  },
};

const profilePageStructuredData = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "@id": "https://hamson.tech/about-us#profilepage",
  url: "https://hamson.tech/about-us",
  name: "About Dr Neil Hamson",
  mainEntity: {
    "@type": "Person",
    "@id": "https://hamson.tech/#person",
    name: "Dr Neil Hamson",
    url: "https://hamson.tech/about-us",
    description:
      "Dr Neil Hamson is a computer scientist and software engineer whose work includes software patches, application maintenance, security fixes and research-led development.",
  },
};

const work = [
  {
    number: "01",
    place: "SHENZHEN / GAME SOFTWARE",
    title: "LEAGUE OF LEGENDS",
    description:
      "While based in Shenzhen, Neil worked directly with Tencent Games on League of Legends patches. His work covered coding and implementing changes, testing, and supporting integration through the delivery process. Riot Games developed League of Legends; Neil’s contribution was patch work with Tencent Games in China.",
    tags: ["PATCH DEVELOPMENT", "TESTING", "INTEGRATION"],
  },
  {
    number: "02",
    place: "SHENZHEN / APPLICATION SOFTWARE",
    title: "WECHAT / WEIXIN",
    description:
      "Neil also worked on application updates for WeChat, known in China as Weixin. His contribution included maintenance releases and security fixes: implementing changes, testing updates and supporting their integration into the release process.",
    tags: ["APPLICATION UPDATES", "SECURITY FIXES", "RELEASES"],
  },
  {
    number: "03",
    place: "DUBAI / DOCTORAL WORK-BASED RESEARCH",
    title: "EMIRATES MARS MISSION",
    description:
      "During work-based research supporting his PhD, Neil undertook software work in Dubai connected with the Emirates Mars Mission and Hope Probe. He worked on guidance-system software using C, C# and C++.",
    tags: ["GUIDANCE SOFTWARE", "C", "C#", "C++"],
  },
] as const;

const systems = [
  {
    code: "01",
    title: "HAMSON SOFTWARE",
    state: "ACTIVE DEVELOPMENT",
    detail: "Software products, public technical systems and commercial release work.",
    href: "/services",
    action: "EXPLORE SOFTWARE",
  },
  {
    code: "02",
    title: "MI1",
    state: "PRIVATE / ACTIVE",
    detail:
      "Private Machine Intelligence development focused on human-reviewed code changes.",
    href: "/machine-intelligence",
    action: "EXPLORE MI1",
  },
  {
    code: "03",
    title: "UK BITCOIN",
    state: "LIVE SYSTEM",
    detail:
      "UK-focused Bitcoin tools and guides built as working public software.",
    href: "/bitcoin",
    action: "OPEN BITCOIN",
  },
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

export default function AboutPage() {
  return (
    <main className={`${styles.page} site`}>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>

      <Header />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(profilePageStructuredData).replace(
            /</g,
            "\\u003c",
          ),
        }}
      />

      <section
        className={styles.hero}
        id="main-content"
        aria-labelledby="about-title"
      >
        <div className={styles.heroIndex} aria-hidden="true">
          <span>HS</span>
          <span>PROFILE</span>
          <span>OPERATOR / 01</span>
        </div>

        <div className={styles.heroGrid}>
          <div className={styles.heroCopy}>
            <p className="eyebrow">HAMSON SOFTWARE / ENGINEERING PROFILE</p>

            <h1 id="about-title">
              NEIL
              <span>HAMSON.</span>
            </h1>

            <p className={styles.lede}>
              Computer scientist and software engineer working across software
              delivery, public technical systems, Bitcoin tooling and private
              Machine Intelligence development.
            </p>

            <div className={styles.identityRail}>
              <div>
                <span>ROLE</span>
                <strong>SOFTWARE ENGINEER</strong>
              </div>
              <div>
                <span>DISCIPLINE</span>
                <strong>COMPUTER SCIENCE</strong>
              </div>
              <div>
                <span>CURRENT SYSTEMS</span>
                <strong>SOFTWARE / MI1 / BITCOIN</strong>
              </div>
              <div>
                <span>STATE</span>
                <strong className={styles.activeState}>
                  <i aria-hidden="true" />
                  ACTIVE DEVELOPMENT
                </strong>
              </div>
            </div>
          </div>

          <aside className={styles.profileConsole} aria-label="Engineering profile">
            <span className={styles.cornerA} aria-hidden="true" />
            <span className={styles.cornerB} aria-hidden="true" />

            <div className={styles.consoleTop}>
              <span>HS / PERSONNEL / 01</span>
              <span className={styles.consoleState}>
                <i aria-hidden="true" />
                ACTIVE
              </span>
            </div>

            <div className={styles.consoleIdentity}>
              <small>PROFILE</small>
              <strong>DR NEIL HAMSON</strong>
              <p>
                Software engineering grounded in implementation, testing,
                integration and research-led development.
              </p>
            </div>

            <dl className={styles.profileData}>
              <div>
                <dt>UNDERGRADUATE</dt>
                <dd>COMPUTING BSc (HONS)</dd>
              </div>
              <div>
                <dt>DOCTORAL</dt>
                <dd>PhD COMPUTER SCIENCE</dd>
              </div>
              <div>
                <dt>CURRENT</dt>
                <dd>HAMSON SOFTWARE / MI1</dd>
              </div>
            </dl>

            <div className={styles.consoleActions}>
              <Link href="/services">HAMSON SOFTWARE →</Link>
              <Link href="/contact-us">DIRECT CONTACT →</Link>
            </div>
          </aside>
        </div>
      </section>

      <section className={styles.foundation} aria-labelledby="foundation-title">
        <div className={styles.sectionHeading}>
          <div>
            <span className={styles.sectionCode}>FOUNDATION / 01</span>
            <h2 id="foundation-title">COMPUTING AND RESEARCH.</h2>
          </div>

          <p>
            Formal computing education followed by doctoral research in Computer
            Science, alongside software work connected with real delivery systems.
          </p>
        </div>

        <div className={styles.qualifications}>
          <article>
            <span>01 / UNDERGRADUATE</span>
            <strong>Computing BSc (Hons)</strong>
            <p>UHI Perth · University of the Highlands and Islands</p>
          </article>

          <article>
            <span>02 / DOCTORAL</span>
            <strong>PhD in Computer Science</strong>
            <p>University of Liverpool</p>
          </article>
        </div>
      </section>

      <section className={styles.delivery} aria-labelledby="delivery-title">
        <div className={styles.sectionHeading}>
          <div>
            <span className={styles.sectionCode}>DELIVERY RECORD / 02</span>
            <h2 id="delivery-title">CODE IN REAL SYSTEMS.</h2>
          </div>

          <p>
            Selected examples describe the technical contribution rather than
            relying on organisation names as a substitute for detail.
          </p>
        </div>

        <div className={styles.work}>
          {work.map(({ number, place, title, description, tags }) => (
            <article className={styles.project} key={number}>
              <div className={styles.projectIndex}>
                <span>{number}</span>
                <small>{place}</small>
              </div>

              <div className={styles.projectBody}>
                <h3>{title}</h3>
                <p>{description}</p>

                <div className={styles.tags}>
                  {tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.systemsSection} aria-labelledby="systems-title">
        <div className={styles.sectionHeading}>
          <div>
            <span className={styles.sectionCode}>CURRENT SYSTEMS / 03</span>
            <h2 id="systems-title">WHAT I AM BUILDING NOW.</h2>
          </div>

          <p>
            Current work is centred on Hamson Software, MI1 and live Bitcoin
            systems rather than maintaining a separate publishing programme.
          </p>
        </div>

        <div className={styles.systemGrid}>
          {systems.map((system) => (
            <Link className={styles.systemCard} href={system.href} key={system.code}>
              <div className={styles.systemTop}>
                <span>{system.code}</span>
                <small>{system.state}</small>
              </div>

              <h3>{system.title}</h3>
              <p>{system.detail}</p>

              <div className={styles.systemAction}>
                <span>{system.action}</span>
                <strong aria-hidden="true">→</strong>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className={styles.directSection}>
        <div className={styles.directFrame}>
          <div>
            <span className={styles.sectionCode}>DIRECT CHANNEL / 04</span>
            <h2>DISCUSS THE WORK.</h2>
            <p>
              Relevant enquiries concerning Hamson Software, MI1, licensing,
              development funding or technical collaboration can be routed
              directly through the Contact system.
            </p>
          </div>

          <Link className={styles.directAction} href="/contact-us">
            OPEN CONTACT SYSTEM →
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}