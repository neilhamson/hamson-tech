import Image from "next/image";
import Link from "next/link";

import { pageMetadata } from "../../_components/SubpageShell";
import styles from "../bitcoin.module.css";

export const metadata = pageMetadata(
  "Bitcoin Wallets UK — Keys, Custody & Using Bitcoin",
  "Bitcoin wallets explained in plain English for UK users: custody, self-custody, private keys, recovery phrases, sending, receiving and using Bitcoin.",
  "/bitcoin/wallets",
);

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
              <Link href="/bitcoin/gbp">BTC / GBP</Link>
              <Link href="/bitcoin/wallets">WALLETS &amp; USE</Link>
              <Link href="/bitcoin/mining">MINING</Link>
            </div>
          </details>

          <Link href="/services">SERVICES</Link>
          <Link href="/about-us">ABOUT</Link>
          <Link href="/articles">ARTICLES</Link>
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
            <Link href="/bitcoin">BITCOIN</Link>
            <Link href="/services">SERVICES</Link>
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

export default function BitcoinWalletsPage() {
  return (
    <main className={`${styles.page} site`}>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>

      <Header />

      <section className={styles.hero} id="main-content">
        <div className={styles.heroCopy}>
          <p className={styles.kicker}>
            BITCOIN / WALLETS / PLAIN ENGLISH
          </p>

          <h1>
            WALLETS
            <span>&amp; USE</span>
          </h1>

          <p className={styles.heroLead}>
            A Bitcoin wallet is how Bitcoin can be accessed, controlled, sent
            and received. There is no need to understand cryptography first —
            start with one simple question: who controls the keys?
          </p>

          <div className={styles.heroActions}>
            <Link href="#what-is-a-wallet">START WITH WALLETS</Link>
            <Link href="#receive-bitcoin">HOW TO RECEIVE BITCOIN</Link>
          </div>
        </div>

        <aside
          className={styles.console}
          aria-label="Bitcoin wallet quick start"
        >
          <div className={styles.consoleTop}>
            <span className={styles.consoleName}>
              START HERE // WALLET
            </span>

            <span className={styles.consoleStatus}>
              <span className={styles.statusDot} />
              PLAIN ENGLISH
            </span>
          </div>

          <div className={styles.readout}>
            <div className={styles.readoutBlock}>
              <span className={styles.readoutLabel}>QUESTION</span>
              <span className={styles.readoutValue}>KEYS</span>
            </div>

            <span className={styles.readoutArrow}>→</span>

            <div className={styles.readoutBlock}>
              <span className={styles.readoutLabel}>MEANS</span>
              <span className={styles.readoutValue}>CONTROL</span>
            </div>
          </div>

          <div className={styles.sats}>
            <span className={styles.readoutLabel}>FIRST PRINCIPLE</span>
            <strong>WHO CONTROLS THEM?</strong>
          </div>

          <div className={styles.consoleMeta}>
            <div className={styles.consoleRow}>
              <span>APP / EXCHANGE</span>
              <strong>MAY BE CUSTODIAL</strong>
            </div>

            <div className={styles.consoleRow}>
              <span>OWN WALLET</span>
              <strong>SELF-CUSTODY</strong>
            </div>

            <div className={styles.consoleRow}>
              <span>BACKUP</span>
              <strong>RECOVERY PHRASE</strong>
            </div>

            <div className={styles.consoleRow}>
              <span>RULE</span>
              <strong>KEEP IT PRIVATE</strong>
            </div>
          </div>
        </aside>
      </section>

      <div className={styles.signalBar} aria-hidden="true">
        <span>
          PURPOSE <strong>CONTROL</strong>
        </span>
        <span>
          ACTION <strong>SEND</strong>
        </span>
        <span>
          ACTION <strong>RECEIVE</strong>
        </span>
        <span>
          SECURITY <strong>BACK UP</strong>
        </span>
      </div>

      <section
        className={styles.section}
        id="what-is-a-wallet"
      >
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeader}>
            <div>
              <p className={styles.sectionCode}>START HERE / 01</p>
              <h2>WHAT DOES A BITCOIN WALLET ACTUALLY DO?</h2>
            </div>

            <div className={styles.sectionIntro}>
              A Bitcoin wallet does not contain coins like cash in a physical
              wallet. It manages the information that allows Bitcoin recorded
              on the network to be accessed and controlled.
            </div>
          </div>

          <div className={styles.grid3}>
            <article className={styles.panel}>
              <span className={styles.panelNumber}>SEE</span>
              <h3>SHOWS BITCOIN</h3>
              <p>
                A wallet can show addresses, transaction history and the
                Bitcoin associated with the keys it manages.
              </p>
            </article>

            <article className={styles.panel}>
              <span className={styles.panelNumber}>CONTROL</span>
              <h3>MANAGES KEYS</h3>
              <p>
                The keys are what allow a wallet to authorise transactions
                involving the Bitcoin they control.
              </p>
            </article>

            <article className={styles.panel}>
              <span className={styles.panelNumber}>USE</span>
              <h3>SENDS &amp; RECEIVES</h3>
              <p>
                The wallet provides the interface for receiving Bitcoin and
                creating payments to other Bitcoin addresses.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.development}`}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeader}>
            <div>
              <p className={styles.sectionCode}>CUSTODY / 02</p>
              <h2>
                NEIL HAMSON USES REVOLUT FOR BITCOIN — WHO CONTROLS THE KEYS?
              </h2>
            </div>

            <div className={styles.sectionIntro}>
              Neil Hamson uses Revolut to buy and hold Bitcoin. Revolut states
              that it appoints third-party custodians to protect customers&apos;
              crypto private keys, so customers do not directly hold or access
              those keys. Supported Bitcoin can also be withdrawn to a
              compatible external wallet.
            </div>
          </div>

          <div className={styles.grid2}>
            <article className={styles.panel}>
              <span className={styles.panelNumber}>
                REVOLUT / CUSTODIAL
              </span>

              <h3>REVOLUT&apos;S CUSTODIANS SAFEGUARD THE KEYS</h3>

              <p>
                While Bitcoin is held through Revolut, appointed third-party
                custodians protect the private keys associated with the
                cryptoassets.
              </p>

              <p>
                Neil Hamson can use Revolut to buy, sell and, where supported,
                withdraw Bitcoin, but does not directly possess the private
                keys while it remains within that custodial arrangement.
              </p>
            </article>

            <article className={styles.panel}>
              <span className={styles.panelNumber}>SELF-CUSTODY</span>

              <h3>NEIL HAMSON CAN MOVE BTC TO HIS OWN WALLET</h3>

              <p>
                Revolut supports withdrawals of Bitcoin to compatible external
                Bitcoin addresses. That allows BTC to be moved from the
                custodial service to a self-custody wallet.
              </p>

              <p>
                In self-custody, control of the keys moves to the wallet owner.
                That provides greater direct control, but also transfers
                responsibility for protecting the wallet and its recovery
                information.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeader}>
            <div>
              <p className={styles.sectionCode}>SECURITY / 03</p>
              <h2>PRIVATE KEYS — THE IMPORTANT PART</h2>
            </div>

            <div className={styles.sectionIntro}>
              A private key is normally managed by the wallet rather than typed
              or handled directly. But understanding what it represents is
              essential: control of the key means control of the Bitcoin it can
              spend.
            </div>
          </div>

          <div className={styles.grid3}>
            <article className={styles.panel}>
              <span className={styles.panelNumber}>PRIVATE KEY</span>
              <h3>AUTHORISES SPENDING</h3>
              <p>
                A private key is secret information used by the wallet to
                authorise Bitcoin transactions.
              </p>
            </article>

            <article className={styles.panel}>
              <span className={styles.panelNumber}>RECOVERY</span>
              <h3>BACK UP THE WALLET</h3>
              <p>
                Many modern wallets provide a recovery phrase that can restore
                access if the original device is lost, stolen or damaged.
              </p>
            </article>

            <article className={styles.panel}>
              <span className={styles.panelNumber}>NEVER SHARE</span>
              <h3>KEEP IT PRIVATE</h3>
              <p>
                Anyone who obtains a recovery phrase may be able to control
                the corresponding Bitcoin. A legitimate support service should
                never need that phrase to be revealed.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section
        className={`${styles.section} ${styles.development}`}
        id="receive-bitcoin"
      >
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeader}>
            <div>
              <p className={styles.sectionCode}>RECEIVE / 04</p>
              <h2>HOW TO RECEIVE BITCOIN</h2>
            </div>

            <div className={styles.sectionIntro}>
              Receiving Bitcoin is conceptually simple: a wallet provides a
              receiving address, that address is given to the sender, and the
              sender creates the transaction.
            </div>
          </div>

          <div className={styles.grid4}>
            <article className={styles.panel}>
              <span className={styles.panelNumber}>01</span>
              <h3>OPEN RECEIVE</h3>
              <p>
                Choose the receive function in the Bitcoin wallet.
              </p>
            </article>

            <article className={styles.panel}>
              <span className={styles.panelNumber}>02</span>
              <h3>GET AN ADDRESS</h3>
              <p>
                The wallet displays a Bitcoin receiving address, often
                alongside a QR code.
              </p>
            </article>

            <article className={styles.panel}>
              <span className={styles.panelNumber}>03</span>
              <h3>SHARE IT</h3>
              <p>
                Give the receiving address or QR code to the person sending
                the Bitcoin.
              </p>
            </article>

            <article className={styles.panel}>
              <span className={styles.panelNumber}>04</span>
              <h3>RECEIVE</h3>
              <p>
                The wallet detects the transaction and shows its progress as
                the Bitcoin network processes it.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeader}>
            <div>
              <p className={styles.sectionCode}>SEND / 05</p>
              <h2>HOW TO SEND BITCOIN</h2>
            </div>

            <div className={styles.sectionIntro}>
              Sending Bitcoin reverses the process. Enter the recipient,
              choose the amount, check the details carefully and then
              authorise the transaction.
            </div>
          </div>

          <div className={styles.grid4}>
            <article className={styles.panel}>
              <span className={styles.panelNumber}>01</span>
              <h3>GET THE ADDRESS</h3>
              <p>
                Obtain the Bitcoin address or QR code supplied by the
                recipient.
              </p>
            </article>

            <article className={styles.panel}>
              <span className={styles.panelNumber}>02</span>
              <h3>ENTER THE AMOUNT</h3>
              <p>
                Choose how much Bitcoin or how many satoshis should be sent.
              </p>
            </article>

            <article className={styles.panel}>
              <span className={styles.panelNumber}>03</span>
              <h3>CHECK EVERYTHING</h3>
              <p>
                Verify the destination, amount and network fee before
                authorising the payment.
              </p>
            </article>

            <article className={styles.panel}>
              <span className={styles.panelNumber}>04</span>
              <h3>AUTHORISE</h3>
              <p>
                The wallet signs and broadcasts the transaction to the Bitcoin
                network.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.development}`}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeader}>
            <div>
              <p className={styles.sectionCode}>RECOVERY / 06</p>
              <h2>WHAT HAPPENS IF A PHONE IS LOST?</h2>
            </div>

            <div className={styles.sectionIntro}>
              Losing a phone does not automatically mean losing Bitcoin. What
              matters is whether the wallet can be securely restored.
            </div>
          </div>

          <div className={styles.grid3}>
            <article className={styles.panel}>
              <span className={styles.panelNumber}>DEVICE</span>
              <h3>PHONES CAN BE REPLACED</h3>
              <p>
                If the wallet was properly backed up, a replacement device can
                often restore access.
              </p>
            </article>

            <article className={styles.panel}>
              <span className={styles.panelNumber}>BACKUP</span>
              <h3>RECOVERY MATTERS</h3>
              <p>
                Recovery information should be stored securely and separately
                from the device it protects.
              </p>
            </article>

            <article className={styles.panel}>
              <span className={styles.panelNumber}>WARNING</span>
              <h3>LOSS CAN BE PERMANENT</h3>
              <p>
                In self-custody, losing the required recovery information can
                make the Bitcoin permanently inaccessible.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeader}>
            <div>
              <p className={styles.sectionCode}>WALLET TYPES / 07</p>
              <h2>WHICH KIND OF WALLET?</h2>
            </div>

            <div className={styles.sectionIntro}>
              There is no single wallet type that is right for every use.
              Convenience, security and how often Bitcoin will be used all
              matter.
            </div>
          </div>

          <div className={styles.grid4}>
            <article className={styles.panel}>
              <span className={styles.panelNumber}>MOBILE</span>
              <h3>PHONE WALLET</h3>
              <p>
                Convenient for everyday use, QR codes and smaller payments
                while away from a computer.
              </p>
            </article>

            <article className={styles.panel}>
              <span className={styles.panelNumber}>DESKTOP</span>
              <h3>COMPUTER WALLET</h3>
              <p>
                Runs on a desktop or laptop and can provide more advanced
                control and features.
              </p>
            </article>

            <article className={styles.panel}>
              <span className={styles.panelNumber}>HARDWARE</span>
              <h3>DEDICATED DEVICE</h3>
              <p>
                Designed to keep private keys isolated from an ordinary
                internet-connected computer or phone.
              </p>
            </article>

            <article className={styles.panel}>
              <span className={styles.panelNumber}>CUSTODIAL</span>
              <h3>SERVICE ACCOUNT</h3>
              <p>
                A provider manages the keys on behalf of the customer, trading
                direct key control for convenience.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.field}`}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeader}>
            <div>
              <p className={styles.sectionCode}>USE BITCOIN / 08</p>
              <h2>BITCOIN IS MADE TO MOVE</h2>
            </div>

            <div className={styles.sectionIntro}>
              Bitcoin can be held, transferred between wallets, received from
              other people and used to pay businesses that choose to accept
              it.
            </div>
          </div>

          <div className={styles.grid3}>
            <article className={styles.panel}>
              <span className={styles.panelNumber}>RECEIVE</span>
              <h3>GET PAID IN BITCOIN</h3>
              <p>
                A Bitcoin address allows another person or business to send
                Bitcoin directly to a wallet.
              </p>
            </article>

            <article className={styles.panel}>
              <span className={styles.panelNumber}>PAY</span>
              <h3>SPEND BITCOIN</h3>
              <p>
                Bitcoin can be used with merchants and service providers that
                accept it as a method of payment.
              </p>
            </article>

            <article className={styles.panel}>
              <span className={styles.panelNumber}>HAMSON.TECH</span>
              <h3>BITCOIN ACCEPTED</h3>
              <p>
                Neil Hamson accepts Bitcoin for eligible software engineering
                and development services.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.development}`}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeader}>
            <div>
              <p className={styles.sectionCode}>NEXT / 09</p>
              <h2>WHERE NEXT?</h2>
            </div>

            <div className={styles.sectionIntro}>
              Once wallets make sense, the rest of Bitcoin becomes much easier
              to follow. Choose the next question to explore.
            </div>
          </div>

          <div className={styles.grid3}>
            <article className={styles.panel}>
              <span className={styles.panelNumber}>OVERVIEW</span>
              <h3>BACK TO THE BEGINNING</h3>
              <p>
                Review Bitcoin in plain English from a UK and GBP perspective.
              </p>
              <Link href="/bitcoin">BITCOIN OVERVIEW →</Link>
            </article>

            <article className={styles.panel}>
              <span className={styles.panelNumber}>BTC / GBP</span>
              <h3>BITCOIN IN POUNDS</h3>
              <p>
                See how pounds, Bitcoin and satoshis relate using the working
                BTC/GBP conversion system.
              </p>
              <Link href="/bitcoin/gbp">OPEN BTC / GBP →</Link>
            </article>

            <article className={styles.panel}>
              <span className={styles.panelNumber}>MINING</span>
              <h3>HOW IS BITCOIN SECURED?</h3>
              <p>
                Continue into mining, proof of work and the physical machines
                involved in Bitcoin mining.
              </p>
              <Link href="/bitcoin/mining">OPEN MINING →</Link>
            </article>
          </div>
        </div>
      </section>

      <section className={styles.disclaimer}>
        <div className={styles.disclaimerInner}>
          <span className={styles.disclaimerCode}>BITCOIN / POSITION</span>

          <p>
            hamson.tech does not sell Bitcoin, take Bitcoin orders or hold
            customer Bitcoin. Neil Hamson owns and uses Bitcoin, accepts
            Bitcoin for eligible software and development services, and
            supports wider voluntary adoption of Bitcoin in the United
            Kingdom, including its use as a means of payment alongside
            sterling. Bitcoin prices can rise or fall substantially.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}