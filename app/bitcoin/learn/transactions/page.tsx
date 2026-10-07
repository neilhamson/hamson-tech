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
  "How a Bitcoin Transaction Works — Beginner Guide",
  "Follow a Bitcoin payment from destination address through wallet construction, signing, broadcast, mining and confirmations.",
  "/bitcoin/learn/transactions",
);

export default function TransactionsPage() {
  return (
    <main className={`${styles.page} site`}>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <SiteHeader />
      <LearnNav activeHref="/bitcoin/learn/transactions" />

      <section className={styles.hero} id="main-content">
        <div>
          <p className={styles.eyebrow}>BEGINNER PATH / 05</p>
          <h1>HOW DOES A <span>BITCOIN PAYMENT WORK?</span></h1>
          <p className={styles.lead}>
            A wallet does not send a digital coin through the internet. It
            constructs and signs a transaction that changes who can spend
            specific Bitcoin outputs, then broadcasts that transaction to the network.
          </p>
        </div>
        <aside className={styles.heroPanel}>
          <span>TRANSACTION PATH</span>
          <h2>CREATE → SIGN → BROADCAST → CONFIRM</h2>
          <p>
            These are the same core stages being engineered and tested in
            Hamson Bitcoin Wallet.
          </p>
          <Link href="https://wallet.hamson.tech">OPEN WALLET DEVELOPMENT →</Link>
        </aside>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionInner}>
          <div className={styles.flow}>
            <div className={styles.flowStep}>
              <span>01</span><strong>DESTINATION</strong>
              <p>The sender obtains a Bitcoin address or payment request from the recipient.</p>
            </div>
            <div className={styles.flowStep}>
              <span>02</span><strong>CONSTRUCT</strong>
              <p>The wallet selects spendable outputs, creates recipient output(s), change and a fee.</p>
            </div>
            <div className={styles.flowStep}>
              <span>03</span><strong>SIGN</strong>
              <p>The wallet uses the appropriate private key to authorize the spend cryptographically.</p>
            </div>
            <div className={styles.flowStep}>
              <span>04</span><strong>BROADCAST</strong>
              <p>The signed transaction is sent to the Bitcoin network for validation and relay.</p>
            </div>
            <div className={styles.flowStep}>
              <span>05</span><strong>CONFIRM</strong>
              <p>A miner can include the transaction in a block; later blocks add further confirmations.</p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeader}>
            <div>
              <p className={styles.eyebrow}>ONE IMPORTANT DETAIL / 06</p>
              <h2>THE WHOLE BALANCE IS NOT ONE “COIN”.</h2>
            </div>
            <div className={styles.sectionIntro}>
              Bitcoin wallets commonly work with unspent transaction outputs
              (UTXOs). A transaction can spend one or more outputs and create
              new outputs for the recipient and, where appropriate, change.
            </div>
          </div>

          <div className={styles.grid3}>
            <article className={styles.card}>
              <span className={styles.cardNumber}>INPUTS</span>
              <h3>WHAT IS BEING SPENT</h3>
              <p>Existing spendable Bitcoin outputs are referenced as transaction inputs.</p>
            </article>
            <article className={styles.card}>
              <span className={styles.cardNumber}>OUTPUTS</span>
              <h3>WHERE VALUE GOES</h3>
              <p>New outputs specify the conditions under which the transferred bitcoin can next be spent.</p>
            </article>
            <article className={styles.card}>
              <span className={styles.cardNumber}>FEE</span>
              <h3>INPUTS MINUS OUTPUTS</h3>
              <p>The difference between total input value and total output value is the transaction fee.</p>
              <Link href="/bitcoin/fees">UNDERSTAND FEES →</Link>
            </article>
          </div>
        </div>
      </section>

      <SourcePanel />
      <StepFooter
        previous={{ href: "/bitcoin/learn/keys-and-recovery", label: "KEYS, ADDRESSES & RECOVERY" }}
        next={{ href: "/bitcoin/fractions-satoshis", label: "FRACTIONS & SATOSHIS" }}
      />
      <LearnFooter />
    </main>
  );
}
