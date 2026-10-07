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
  "Bitcoin Private Keys, Addresses & Recovery Phrases — Beginner Guide",
  "Private keys, Bitcoin addresses and recovery phrases explained in plain English, including what must remain secret and what can be shared.",
  "/bitcoin/learn/keys-and-recovery",
);

export default function KeysRecoveryPage() {
  return (
    <main className={`${styles.page} site`}>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <SiteHeader />
      <LearnNav activeHref="/bitcoin/learn/keys-and-recovery" />

      <section className={styles.hero} id="main-content">
        <div>
          <p className={styles.eyebrow}>BEGINNER PATH / 04</p>
          <h1>KEYS, ADDRESSES <span>&amp; RECOVERY.</span></h1>
          <p className={styles.lead}>
            Bitcoin separates the information you can safely share to receive
            funds from the secret information that can authorize spending.
          </p>
        </div>
        <aside className={styles.heroPanel}>
          <span>SAFETY RULE</span>
          <h2>SHARE ADDRESSES. PROTECT SECRETS.</h2>
          <p>
            A receiving address is intended to be shared. Private keys and
            recovery information are not.
          </p>
        </aside>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionInner}>
          <div className={styles.grid3}>
            <article className={styles.card}>
              <span className={styles.cardNumber}>ADDRESS</span>
              <h3>WHERE SOMEONE SENDS BITCOIN</h3>
              <p>
                A wallet can generate Bitcoin addresses for receiving
                payments. An address is not your private key and does not give
                someone permission to spend your funds.
              </p>
            </article>

            <article className={styles.card}>
              <span className={styles.cardNumber}>PRIVATE KEY</span>
              <h3>SPENDING AUTHORITY</h3>
              <p>
                A private key is secret cryptographic information used to
                produce signatures that authorize spending under the relevant
                Bitcoin locking conditions.
              </p>
            </article>

            <article className={styles.card}>
              <span className={styles.cardNumber}>RECOVERY</span>
              <h3>A HUMAN BACKUP</h3>
              <p>
                Many modern wallets represent the backup of their key material
                as a recovery phrase. Anyone who obtains that recovery
                information may be able to reconstruct control of the wallet.
              </p>
            </article>
          </div>

          <div className={styles.callout}>
            <strong>Never type a real recovery phrase into an unfamiliar
            website, message, support chat or form.</strong> A legitimate
            self-custody backup should be treated as highly sensitive secret
            information.
          </div>
        </div>
      </section>

      <SourcePanel />
      <StepFooter
        previous={{ href: "/bitcoin/learn/wallets", label: "WHAT IS A BITCOIN WALLET?" }}
        next={{ href: "/bitcoin/learn/transactions", label: "HOW A TRANSACTION WORKS" }}
      />
      <LearnFooter />
    </main>
  );
}
