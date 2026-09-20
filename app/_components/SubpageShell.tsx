import type { CSSProperties, ReactNode } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import styles from "./subpage.module.css";

const navigation = [
  { href: "/machine-intelligence", label: "MI1", accessibleLabel: "MI1 — Machine Intelligence" },
  { href: "/bitcoin", label: "BITCOIN" },
  { href: "/services", label: "SERVICES" },
  { href: "/about-us", label: "ABOUT" },
  { href: "/articles", label: "ARTICLES" },
  { href: "/contact-us", label: "CONTACT" },
] as const;

export function pageMetadata(
  title: string,
  description: string,
  path: string,
): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      siteName: "Neil Hamson",
      type: "website",
    },
  };
}

function Header() {
  return (
    <header className="site-header">
      <div className="header-inner">
        <Link className="brand-lockup" href="/" aria-label="Neil Hamson home">
          <span className="brand-reveal-shell" aria-hidden="true">
            <Image className="brand-reveal" src="/brand/neil-hamson-wordmark.svg" alt="" width={1624} height={88} priority />
          </span>
        </Link>

        <nav className="navigation" aria-label="Main navigation">
          {navigation.map((item) => <Link key={item.href} href={item.href} aria-label={"accessibleLabel" in item ? item.accessibleLabel : undefined}>{item.label}</Link>)}
        </nav>

        <details className="mobile-navigation">
          <summary aria-label="Open navigation"><span /><span /></summary>
          <nav aria-label="Mobile navigation">
            {navigation.map((item) => <Link key={item.href} href={item.href} aria-label={"accessibleLabel" in item ? item.accessibleLabel : undefined}>{item.label}</Link>)}
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

type PageShellProps = {
  eyebrow: string;
  title: ReactNode;
  lede: ReactNode;
  heroImage?: string;
  heroAlt?: string;
  heroAside?: ReactNode;
  compactHero?: boolean;
  accent?: "blue" | "gold";
  children: ReactNode;
};

const accents = {
  blue: "#013DF6",
  gold: "#f2b84b",
};

export function PageShell({ eyebrow, title, lede, heroImage, heroAlt = "", heroAside, compactHero = false, accent = "blue", children }: PageShellProps) {
  const pageStyle = { "--page-accent": accents[accent] } as CSSProperties;

  return (
    <main className={`${styles.page} site`} style={pageStyle}>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Header />
      <section className={`${styles.hero} ${compactHero ? styles.heroCompact : ""}`} id="main-content">
        <div className={styles.heroCopy}>
          <p className="eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
          <div className={styles.lede}>{lede}</div>
        </div>
        {heroAside ? (
          <div className={styles.heroAside}>{heroAside}</div>
        ) : heroImage ? (
          <figure className={styles.heroMedia}>
            <Image src={heroImage} alt={heroAlt} fill sizes="(max-width: 800px) 100vw, 48vw" priority />
          </figure>
        ) : !compactHero ? <div className={styles.signal} aria-hidden="true"><span>NEIL</span><span>HAMSON</span></div> : null}
      </section>
      <div className={styles.content}>{children}</div>
      <Footer />
    </main>
  );
}

type SectionProps = {
  label?: string;
  title: ReactNode;
  intro?: ReactNode;
  children: ReactNode;
  id?: string;
  narrow?: boolean;
};

export function Section({ label, title, intro, children, id, narrow = false }: SectionProps) {
  return (
    <section className={`${styles.section} ${narrow ? styles.narrow : ""}`} id={id}>
      {label && <p className="eyebrow">{label}</p>}
      <h2>{title}</h2>
      {intro && <div className={styles.sectionIntro}>{intro}</div>}
      {children}
    </section>
  );
}

export function Cards({ children, columns = 3 }: { children: ReactNode; columns?: 2 | 3 | 4 }) {
  return <div className={styles.cards} data-columns={columns}>{children}</div>;
}

export function Card({ label, title, children }: { label?: string; title: ReactNode; children: ReactNode }) {
  return (
    <article className={styles.card}>
      {label && <span>{label}</span>}
      <h3>{title}</h3>
      <div>{children}</div>
    </article>
  );
}

export function MediaBlock({ src, alt, portrait = false }: { src: string; alt: string; portrait?: boolean }) {
  return (
    <figure className={`${styles.mediaBlock} ${portrait ? styles.portrait : ""}`}>
      <Image src={src} alt={alt} fill sizes={portrait ? "(max-width: 800px) 82vw, 34vw" : "(max-width: 800px) 100vw, 72vw"} />
    </figure>
  );
}

export function Actions({ children }: { children: ReactNode }) {
  return <div className={styles.actions}>{children}</div>;
}

export function ArticleBody({ children }: { children: ReactNode }) {
  return <article className={styles.articleBody}>{children}</article>;
}
