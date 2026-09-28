import Image from "next/image";
import Link from "next/link";

import { pageMetadata } from "../../_components/SubpageShell";
import bitcoinStyles from "../bitcoin.module.css";
import BitcoinFeeHeroConsole from "./BitcoinFeeHeroConsole";
import BitcoinFeeMonitor from "./BitcoinFeeMonitor";

export const metadata = pageMetadata(
  "Bitcoin Network Fees UK — Live sat/vB Fee Monitor",
  "See current Bitcoin network fee rates, mempool activity and approximate transaction costs in satoshis and British pounds with Hamson Software.",
  "/bitcoin/fees",
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

          <Link href="/bitcoin">
            BITCOIN
          </Link>

          <Link href="/services">
            SOFTWARE
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

export default function BitcoinFeesPage() {
  return (
    <main
      className={`${bitcoinStyles.page} site`}
    >
      <a
        className="skip-link"
        href="#main-content"
      >
        Skip to content
      </a>

      <Header />

      <section
        className={bitcoinStyles.hero}
        id="main-content"
      >
        <div className={bitcoinStyles.heroCopy}>
          <p className={bitcoinStyles.kicker}>
            BITCOIN / NETWORK / LIVE FEES
          </p>

          <h1>
            NETWORK
            <span>FEES</span>
          </h1>

          <p
            className={bitcoinStyles.heroLead}
          >
            See the current Bitcoin network fee
            rates, understand what sat/vB means
            and estimate the network cost of an
            example transaction in satoshis and
            pounds.
          </p>

          <div
            className={bitcoinStyles.heroActions}
          >
            <Link href="#live-fees">
              VIEW LIVE FEES
            </Link>

            <Link href="#understand-fees">
              WHAT IS SAT/VB?
            </Link>
          </div>
        </div>

        <BitcoinFeeHeroConsole />
      </section>

      <div
        className={bitcoinStyles.signalBar}
        aria-hidden="true"
      >
        <span>
          DATA <strong>LIVE</strong>
        </span>

        <span>
          UNIT <strong>SAT/VB</strong>
        </span>

        <span>
          COST <strong>SATOSHIS</strong>
        </span>

        <span>
          GBP <strong>REFERENCE</strong>
        </span>
      </div>

      <section
        className={bitcoinStyles.section}
        id="live-fees"
      >
        <div
          className={bitcoinStyles.sectionInner}
        >
          <div
            className={
              bitcoinStyles.sectionHeader
            }
          >
            <div>
              <p
                className={
                  bitcoinStyles.sectionCode
                }
              >
                LIVE NETWORK / 01
              </p>

              <h2>
                WHAT DOES IT COST TO SEND
                BITCOIN?
              </h2>
            </div>

            <div
              className={
                bitcoinStyles.sectionIntro
              }
            >
              Bitcoin transaction fees change with
              network demand. Hamson Software reads
              current recommended fee rates and
              mempool statistics from
              mempool.space, then combines them with
              the existing BTC/GBP market reference
              for an approximate sterling value.
            </div>
          </div>

          <BitcoinFeeMonitor />
        </div>
      </section>

      <section
        className={`${bitcoinStyles.section} ${bitcoinStyles.development}`}
        id="understand-fees"
      >
        <div
          className={bitcoinStyles.sectionInner}
        >
          <div
            className={
              bitcoinStyles.sectionHeader
            }
          >
            <div>
              <p
                className={
                  bitcoinStyles.sectionCode
                }
              >
                UNDERSTAND / 02
              </p>

              <h2>
                SAT/VB IS A RATE — NOT THE
                TOTAL FEE
              </h2>
            </div>

            <div
              className={
                bitcoinStyles.sectionIntro
              }
            >
              Bitcoin wallets normally choose a
              fee rate based on transaction size
              and network conditions. A larger
              transaction can cost more even when
              it uses exactly the same sat/vB fee
              rate.
            </div>
          </div>

          <div className={bitcoinStyles.grid3}>
            <article
              className={bitcoinStyles.panel}
            >
              <span
                className={
                  bitcoinStyles.panelNumber
                }
              >
                SAT
              </span>

              <h3>SATOSHIS</h3>

              <p>
                The final network fee is paid in
                satoshis, the smaller units of
                Bitcoin.
              </p>
            </article>

            <article
              className={bitcoinStyles.panel}
            >
              <span
                className={
                  bitcoinStyles.panelNumber
                }
              >
                vB
              </span>

              <h3>VIRTUAL BYTES</h3>

              <p>
                vB measures the effective size of
                a Bitcoin transaction for fee
                calculation and block-space use.
              </p>
            </article>

            <article
              className={bitcoinStyles.panel}
            >
              <span
                className={
                  bitcoinStyles.panelNumber
                }
              >
                SAT/VB
              </span>

              <h3>THE FEE RATE</h3>

              <p>
                Multiply the fee rate by the
                transaction&apos;s virtual size to
                estimate the total network fee.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section
        className={`${bitcoinStyles.section} ${bitcoinStyles.field}`}
      >
        <div
          className={bitcoinStyles.sectionInner}
        >
          <div
            className={
              bitcoinStyles.sectionHeader
            }
          >
            <div>
              <p
                className={
                  bitcoinStyles.sectionCode
                }
              >
                IMPORTANT / 03
              </p>

              <h2>
                AN ESTIMATE IS NOT A
                CONFIRMATION PROMISE
              </h2>
            </div>

            <div
              className={
                bitcoinStyles.sectionIntro
              }
            >
              Recommended fee rates are estimates
              based on current network conditions.
              They can change quickly and cannot
              guarantee that a transaction will be
              confirmed within a particular time.
            </div>
          </div>

          <div className={bitcoinStyles.grid3}>
            <article
              className={bitcoinStyles.panel}
            >
              <span
                className={
                  bitcoinStyles.panelNumber
                }
              >
                LIVE
              </span>

              <h3>NETWORK CONDITIONS MOVE</h3>

              <p>
                New transactions arrive and blocks
                are mined continuously, so the
                mempool can become busier or
                quieter.
              </p>
            </article>

            <article
              className={bitcoinStyles.panel}
            >
              <span
                className={
                  bitcoinStyles.panelNumber
                }
              >
                WALLET
              </span>

              <h3>ACTUAL SIZE VARIES</h3>

              <p>
                Real transaction size depends on
                its inputs, outputs and transaction
                structure. The calculator uses the
                size entered by the user.
              </p>
            </article>

            <article
              className={bitcoinStyles.panel}
            >
              <span
                className={
                  bitcoinStyles.panelNumber
                }
              >
                EXECUTION
              </span>

              <h3>NO TRANSACTION IS SENT</h3>

              <p>
                This tool estimates fees only. It
                does not create, sign, broadcast or
                accelerate Bitcoin transactions.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section
        className={`${bitcoinStyles.section} ${bitcoinStyles.development}`}
      >
        <div
          className={bitcoinStyles.sectionInner}
        >
          <div
            className={
              bitcoinStyles.sectionHeader
            }
          >
            <div>
              <p
                className={
                  bitcoinStyles.sectionCode
                }
              >
                NEXT / 04
              </p>

              <h2>CONNECT THE SYSTEM</h2>
            </div>

            <div
              className={
                bitcoinStyles.sectionIntro
              }
            >
              Fees connect directly to wallets,
              transactions and mining. Continue
              with the part of Bitcoin you want to
              understand next.
            </div>
          </div>

          <div className={bitcoinStyles.grid3}>
            <article
              className={bitcoinStyles.panel}
            >
              <span
                className={
                  bitcoinStyles.panelNumber
                }
              >
                WALLETS
              </span>

              <h3>SEND & RECEIVE</h3>

              <p>
                See where network fees appear when
                Bitcoin is sent from one wallet to
                another.
              </p>

              <Link href="/bitcoin/wallets">
                OPEN WALLETS &amp; USE →
              </Link>
            </article>

            <article
              className={bitcoinStyles.panel}
            >
              <span
                className={
                  bitcoinStyles.panelNumber
                }
              >
                MINING
              </span>

              <h3>BLOCK SPACE</h3>

              <p>
                Understand why miners select
                transactions and how fees relate to
                Bitcoin block space.
              </p>

              <Link href="/bitcoin/mining">
                OPEN MINING →
              </Link>
            </article>

            <article
              className={bitcoinStyles.panel}
            >
              <span
                className={
                  bitcoinStyles.panelNumber
                }
              >
                GBP
              </span>

              <h3>BITCOIN IN POUNDS</h3>

              <p>
                Explore the live BTC/GBP market
                reference used for the sterling fee
                estimate.
              </p>

              <Link href="/bitcoin/gbp">
                OPEN BTC / GBP →
              </Link>
            </article>
          </div>
        </div>
      </section>

      <section
        className={bitcoinStyles.disclaimer}
      >
        <div
          className={
            bitcoinStyles.disclaimerInner
          }
        >
          <span
            className={
              bitcoinStyles.disclaimerCode
            }
          >
            HAMSON SOFTWARE / NETWORK DATA
          </span>

          <p>
            Fee rates and mempool statistics are
            current network estimates supplied by
            mempool.space. Sterling values use the
            Hamson Software BTC/GBP market
            reference. Values are approximate and
            this page does not create or execute
            Bitcoin transactions.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}