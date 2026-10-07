import Link from "next/link";

import { pageMetadata } from "../../../_components/SubpageShell";
import {
  LearnFooter,
  LearnNav,
  SiteHeader,
  SourcePanel,
  StepFooter,
} from "../LearnShell";
import styles from "../learn.module.css";

export const metadata = pageMetadata(
  "What Is a Bitcoin Wallet? Physical Wallet vs Crypto Wallet",
  "A beginner comparison of physical wallets and Bitcoin wallets, explaining balances, keys, addresses, recovery and where bitcoin actually exists.",
  "/bitcoin/learn/wallets",
);

export default function LearnWalletsPage() {
  return (
    <main className={`${styles.page} site`}>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <SiteHeader />
      <LearnNav activeHref="/bitcoin/learn/wallets" />

      <section className={styles.hero} id="main-content">
        <div>
          <p className={styles.eyebrow}>BEGINNER PATH / 03</p>
          <h1>WHAT IS A <span>BITCOIN WALLET?</span></h1>
          <p className={styles.lead}>
            A Bitcoin wallet is software or hardware that manages the keys and
            information needed to receive and spend bitcoin. It does not hold
            digital coins in the same way a physical wallet holds cash.
          </p>
        </div>
        <aside className={styles.heroPanel}>
          <span>THE BIG DIFFERENCE</span>
          <h2>YOUR BITCOIN IS NOT “INSIDE” THE APP</h2>
          <p>
            The blockchain records spendable Bitcoin outputs. The wallet
            discovers the ones controlled by your keys and helps you authorize
            new transactions.
          </p>
          <Link href="/bitcoin/learn/keys-and-recovery">NEXT: KEYS &amp; RECOVERY →</Link>
        </aside>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeader}>
            <div>
              <p className={styles.eyebrow}>COMPARE / 04</p>
              <h2>PHYSICAL WALLET VS BITCOIN WALLET.</h2>
            </div>
            <div className={styles.sectionIntro}>
              The word “wallet” is useful, but it can be misleading because
              the two things store very different kinds of information.
            </div>
          </div>

          <table className={styles.compare}>
            <thead>
              <tr>
                <th>PHYSICAL FIAT WALLET</th>
                <th>BITCOIN WALLET</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Can physically contain notes and coins.</td>
                <td>Does not contain physical or digital bitcoin objects.</td>
              </tr>
              <tr>
                <td>Your balance is the cash physically present.</td>
                <td>Your displayed balance is calculated from blockchain data relevant to the wallet's keys.</td>
              </tr>
              <tr>
                <td>Possession of cash usually allows it to be spent.</td>
                <td>Spending requires valid cryptographic authorization using the appropriate key.</td>
              </tr>
              <tr>
                <td>If cash is lost, there is normally no backup copy.</td>
                <td>A properly backed-up self-custody wallet can often be recovered using its recovery information.</td>
              </tr>
              <tr>
                <td>A £20 note is physically transferred to someone else.</td>
                <td>A Bitcoin transaction changes which outputs can be spent and under what conditions.</td>
              </tr>
            </tbody>
          </table>

          <div className={styles.callout}>
            <strong>A wallet is therefore closer to a secure key manager plus a
            Bitcoin interface than a digital purse full of coins.</strong>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionInner}>
          <div className={styles.grid3}>
            <article className={styles.card}>
              <span className={styles.cardNumber}>SEE</span>
              <h3>READS WALLET STATE</h3>
              <p>
                It finds relevant Bitcoin transactions and calculates the
                amount currently available to spend.
              </p>
              <Link href="/bitcoin/learn/blockchain">WHERE THAT DATA COMES FROM →</Link>
            </article>
            <article className={styles.card}>
              <span className={styles.cardNumber}>CONTROL</span>
              <h3>MANAGES KEYS</h3>
              <p>
                Private keys provide the ability to produce valid signatures
                for Bitcoin that the wallet controls.
              </p>
              <Link href="/bitcoin/learn/keys-and-recovery">UNDERSTAND KEYS →</Link>
            </article>
            <article className={styles.card}>
              <span className={styles.cardNumber}>USE</span>
              <h3>SENDS &amp; RECEIVES</h3>
              <p>
                The wallet creates receive information, constructs payments,
                signs transactions and broadcasts them to the Bitcoin network.
              </p>
              <Link href="/bitcoin/learn/transactions">FOLLOW A TRANSACTION →</Link>
            </article>
          </div>
        </div>
      </section>

      <SourcePanel />
      <StepFooter
        previous={{ href: "/bitcoin/learn/blockchain", label: "WHAT IS A BLOCKCHAIN?" }}
        next={{ href: "/bitcoin/learn/keys-and-recovery", label: "KEYS, ADDRESSES & RECOVERY" }}
      />
      <LearnFooter />
    </main>
  );
}
