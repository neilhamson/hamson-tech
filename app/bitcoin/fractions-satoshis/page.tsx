import Image from "next/image";
import Link from "next/link";

import { pageMetadata } from "../../_components/SubpageShell";
import bitcoinStyles from "../bitcoin.module.css";

export const metadata = pageMetadata(
  "Bitcoin Fractions & Satoshis — Understand Bitcoin in Pounds",
  "A plain-English UK guide from Hamson Software explaining Bitcoin fractions, satoshis and why you do not need to buy one whole Bitcoin.",
  "/bitcoin/fractions-satoshis",
);

function Header() {
  return (
    <header className="site-header">
      <div className="header-inner">
        <Link
          className="brand-lockup"
          href="/"
          aria-label="Neil Hamson home"
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
          <Link
            href="/machine-intelligence"
            aria-label="MI1 — Machine Intelligence"
          >
            MI1
          </Link>

          <Link href="/bitcoin">BITCOIN</Link>

          <Link href="/services">
            SOFTWARE
          </Link>

          <Link href="/about-us">
            ABOUT
          </Link>

          <Link href="/articles">
            ARTICLES
          </Link>
          <Link href="/contact-us">CONTACT</Link>
        </nav>

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

            <Link href="/bitcoin">
              BITCOIN
            </Link>

            <Link href="/services">
              SOFTWARE
            </Link>

            <Link href="/about-us">
              ABOUT
            </Link>

            <Link href="/articles">
              ARTICLES
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

function Footer() {
  return (
    <footer className="site-footer">
      <span>© 2026 Neil Hamson</span>

      <span>
        Human direction. Machine intelligence.
        Shared construction.
      </span>

      <span>
        Developed by Dr Neil Hamson
      </span>
    </footer>
  );
}

export default function BitcoinFractionsSatoshisPage() {
  return (
    <main className={`${bitcoinStyles.page} site`}>
      <a
        className="skip-link"
        href="#main-content"
      >
        Skip to content
      </a>

      <Header />

      <section
        className={`${bitcoinStyles.section} ${bitcoinStyles.development}`}
        id="main-content"
      >
        <div className={bitcoinStyles.sectionInner}>
          <div className={bitcoinStyles.sectionHeader}>
            <div>
              <p className={bitcoinStyles.sectionCode}>
                HAMSON SOFTWARE / BITCOIN BASICS / 01
              </p>

              <h1
                style={{
                  margin: 0,
                  fontSize:
                    "clamp(2.5rem, 4vw, 4.75rem)",
                  lineHeight: 1,
                  letterSpacing: "-0.035em",
                  textTransform: "uppercase",
                }}
              >
                YOU DO NOT NEED
                <br />
                A WHOLE BITCOIN
              </h1>
            </div>

            <div className={bitcoinStyles.sectionIntro}>
              One of the easiest ways to misunderstand
              Bitcoin is to think that owning Bitcoin
              means buying one complete BTC.

              <br />
              <br />

              It does not.

              <br />
              <br />

              Bitcoin can be divided into much smaller
              amounts. You can understand £5, £20,
              £100 or any other sterling amount as a
              fraction of one Bitcoin.
            </div>
          </div>

          <div className={bitcoinStyles.grid3}>
            <article className={bitcoinStyles.panel}>
              <span
                className={bitcoinStyles.panelNumber}
              >
                WHAT YOU KNOW
              </span>

              <h3>£20</h3>

              <p>
                Twenty pounds is familiar. You already
                understand what that amount means in
                everyday British life.
              </p>
            </article>

            <article className={bitcoinStyles.panel}>
              <span
                className={bitcoinStyles.panelNumber}
              >
                BITCOIN
              </span>

              <h3>A FRACTION OF 1 BTC</h3>

              <p>
                If one whole Bitcoin is worth tens of
                thousands of pounds, £20 naturally
                represents only a small fraction of
                one BTC.
              </p>
            </article>

            <article className={bitcoinStyles.panel}>
              <span
                className={bitcoinStyles.panelNumber}
              >
                SMALLER UNIT
              </span>

              <h3>SATOSHIS</h3>

              <p>
                That same fraction of Bitcoin can also
                be expressed as satoshis, which are
                smaller units of Bitcoin.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className={bitcoinStyles.section}>
        <div className={bitcoinStyles.sectionInner}>
          <div className={bitcoinStyles.sectionHeader}>
            <div>
              <p className={bitcoinStyles.sectionCode}>
                THE IMPORTANT DIFFERENCE / 02
              </p>

              <h2>
                £1 DOES NOT MEAN
                <br />
                THE SAME THING AS 1 BTC
              </h2>
            </div>

            <div className={bitcoinStyles.sectionIntro}>
              A pound and a Bitcoin are different
              units with completely different market
              values.

              <br />
              <br />

              The fact that both can be written as
              the number &quot;1&quot; does not make
              them financially equivalent.
            </div>
          </div>

          <div className={bitcoinStyles.grid3}>
            <article className={bitcoinStyles.panel}>
              <span
                className={bitcoinStyles.panelNumber}
              >
                £1
              </span>

              <h3>ONE POUND</h3>

              <p>
                £1 is one unit of sterling. It can be
                represented by a coin, or simply as
                part of a digital bank balance.
              </p>
            </article>

            <article className={bitcoinStyles.panel}>
              <span
                className={bitcoinStyles.panelNumber}
              >
                1 BTC
              </span>

              <h3>ONE WHOLE BITCOIN</h3>

              <p>
                1 BTC means one complete Bitcoin. Its
                value in pounds changes with the
                Bitcoin market and can be worth tens
                of thousands of pounds.
              </p>
            </article>

            <article className={bitcoinStyles.panel}>
              <span
                className={bitcoinStyles.panelNumber}
              >
                KEY POINT
              </span>

              <h3>YOU CAN OWN A FRACTION</h3>

              <p>
                You do not need to own 1 BTC. A Bitcoin
                balance can be 0.1 BTC, 0.001 BTC or a
                much smaller amount.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section
        className={`${bitcoinStyles.section} ${bitcoinStyles.development}`}
      >
        <div className={bitcoinStyles.sectionInner}>
          <div className={bitcoinStyles.sectionHeader}>
            <div>
              <p className={bitcoinStyles.sectionCode}>
                £20 EXAMPLE / 03
              </p>

              <h2>
                WHY DOES £20 TURN INTO
                <br />
                0.000... BTC?
              </h2>
            </div>

            <div className={bitcoinStyles.sectionIntro}>
              Because £20 is being measured against
              the value of one whole Bitcoin.

              <br />
              <br />

              The small decimal does not mean your
              money has disappeared or become less
              important. It simply shows what fraction
              of one BTC has approximately the same
              value.
            </div>
          </div>

          <div className={bitcoinStyles.grid3}>
            <article className={bitcoinStyles.panel}>
              <span
                className={bitcoinStyles.panelNumber}
              >
                STEP / 01
              </span>

              <h3>START WITH £20</h3>

              <p>
                Begin with the amount you already
                understand: twenty pounds.
              </p>
            </article>

            <article className={bitcoinStyles.panel}>
              <span
                className={bitcoinStyles.panelNumber}
              >
                STEP / 02
              </span>

              <h3>TRANSLATE IT INTO BTC</h3>

              <p>
                The live Bitcoin price determines what
                fraction of one BTC corresponds
                approximately to £20 at that moment.
              </p>
            </article>

            <article className={bitcoinStyles.panel}>
              <span
                className={bitcoinStyles.panelNumber}
              >
                STEP / 03
              </span>

              <h3>SHOW IT IN SATOSHIS</h3>

              <p>
                The same Bitcoin amount can also be
                displayed in satoshis, which can make
                a small BTC decimal easier to read.
              </p>
            </article>
          </div>

          <div
            style={{
              marginTop: "2rem",
              padding:
                "clamp(28px, 4vw, 48px)",
              border:
                "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <span
              className={bitcoinStyles.sectionCode}
              style={{
                display: "block",
                marginBottom: "1rem",
              }}
            >
              SAME VALUE / DIFFERENT UNITS
            </span>

            <div
              style={{
                fontSize:
                  "clamp(1.5rem, 3vw, 3rem)",
                fontWeight: 700,
                lineHeight: 1.3,
              }}
            >
              £20
              {"  ≈  "}
              A SMALL FRACTION OF 1 BTC
              {"  ≈  "}
              THOUSANDS OF SATOSHIS
            </div>

            <p
              style={{
                margin: "1rem 0 0",
                maxWidth: "850px",
                lineHeight: 1.7,
                opacity: 0.78,
              }}
            >
              The exact BTC and satoshi amounts change
              as the Bitcoin market price changes. The
              important idea is that all three can
              describe approximately the same value.
            </p>
          </div>
        </div>
      </section>

      <section className={bitcoinStyles.section}>
        <div className={bitcoinStyles.sectionInner}>
          <div className={bitcoinStyles.sectionHeader}>
            <div>
              <p className={bitcoinStyles.sectionCode}>
                SATOSHIS / 04
              </p>

              <h2>
                WHAT IS A SATOSHI?
              </h2>
            </div>

            <div className={bitcoinStyles.sectionIntro}>
              A satoshi is a smaller unit of Bitcoin.

              <br />
              <br />

              <strong>
                1 Bitcoin = 100,000,000 satoshis.
              </strong>
            </div>
          </div>

          <div className={bitcoinStyles.grid3}>
            <article className={bitcoinStyles.panel}>
              <span
                className={bitcoinStyles.panelNumber}
              >
                WHOLE UNIT
              </span>

              <h3>1 BTC</h3>

              <p>
                One complete Bitcoin.
              </p>
            </article>

            <article className={bitcoinStyles.panel}>
              <span
                className={bitcoinStyles.panelNumber}
              >
                SMALLER UNITS
              </span>

              <h3>100,000,000 SATOSHIS</h3>

              <p>
                The same one Bitcoin expressed in its
                smaller standard units.
              </p>
            </article>

            <article className={bitcoinStyles.panel}>
              <span
                className={bitcoinStyles.panelNumber}
              >
                IMPORTANT
              </span>

              <h3>NOT THE SAME AS PENCE</h3>

              <p>
                A pound contains 100 pence. Bitcoin
                works differently: one Bitcoin contains
                100,000,000 satoshis. The useful
                comparison is simply that both systems
                have smaller units.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section
        className={`${bitcoinStyles.section} ${bitcoinStyles.development}`}
      >
        <div className={bitcoinStyles.sectionInner}>
          <div className={bitcoinStyles.sectionHeader}>
            <div>
              <p className={bitcoinStyles.sectionCode}>
                HAMSON SOFTWARE / 05
              </p>

              <h2>
                NOW TRANSLATE YOUR OWN
                POUNDS INTO BITCOIN
              </h2>
            </div>

            <div className={bitcoinStyles.sectionIntro}>
              The Hamson Software Bitcoin in Pounds
              calculator links pounds, Bitcoin and
              satoshis using a live BTC/GBP market
              reference.

              <br />
              <br />

              Enter a pound amount you already
              understand. The system translates the
              rest automatically.
            </div>
          </div>

          <div className={bitcoinStyles.grid3}>
            <article className={bitcoinStyles.panel}>
              <span
                className={bitcoinStyles.panelNumber}
              >
                01
              </span>

              <h3>ENTER POUNDS</h3>

              <p>
                Start with £5, £20, £50, £100 or
                another amount that makes sense to you.
              </p>
            </article>

            <article className={bitcoinStyles.panel}>
              <span
                className={bitcoinStyles.panelNumber}
              >
                02
              </span>

              <h3>SEE THE BTC FRACTION</h3>

              <p>
                Hamson Software automatically shows
                approximately what fraction of one
                Bitcoin that amount represents.
              </p>
            </article>

            <article className={bitcoinStyles.panel}>
              <span
                className={bitcoinStyles.panelNumber}
              >
                03
              </span>

              <h3>SEE THE SATOSHIS</h3>

              <p>
                The same Bitcoin amount is also shown
                in satoshis so the smaller unit is easy
                to understand.
              </p>
            </article>
          </div>

          <div
            style={{
              marginTop: "2rem",
            }}
          >
            <Link
              href="/bitcoin/gbp"
              className="button button-primary"
            >
              OPEN BITCOIN IN POUNDS
            </Link>
          </div>
        </div>
      </section>

      <section className={bitcoinStyles.disclaimer}>
        <div className={bitcoinStyles.disclaimerInner}>
          <span
            className={bitcoinStyles.disclaimerCode}
          >
            HAMSON SOFTWARE / EDUCATION
          </span>

          <p>
            This page explains Bitcoin units and
            fractions in plain English. Bitcoin market
            values can rise or fall substantially.
            Hamson Software&apos;s Bitcoin in Pounds
            calculator provides an approximate market
            reference and does not execute Bitcoin
            purchases or sales.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}