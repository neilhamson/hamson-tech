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
  "How Buying Bitcoin Works — Beginner Guide",
  "A neutral step-by-step explanation of buying Bitcoin: amount, quote, fees, execution, custody destination, confirmation and wallet choice.",
  "/bitcoin/learn/how-to-buy",
);

export default function HowToBuyBitcoinPage() {
  return (
    <main className={`${styles.page} site`}>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <SiteHeader />
      <LearnNav />

      <section className={styles.hero} id="main-content">
        <div>
          <p className={styles.eyebrow}>BEGINNER PATH / 15</p>
          <h1>HOW DOES BUYING <span>BITCOIN WORK?</span></h1>
          <p className={styles.lead}>
            Buying Bitcoin normally means exchanging another form of money for
            an amount of BTC at an agreed quote, then deciding where the
            resulting Bitcoin will be held.
          </p>
        </div>

        <aside className={styles.heroPanel}>
          <span>HAMSON BITCOIN / BUY</span>
          <h2>PURCHASE SERVICE IS IN DEVELOPMENT</h2>
          <p>
            This lesson explains the process before Hamson Bitcoin offers a live
            purchasing service. It is education, not a live Bitcoin order form.
          </p>
          <Link href="/bitcoin/gbp">VIEW BITCOIN IN POUNDS →</Link>
        </aside>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionInner}>
          <div className={styles.flow}>
            <div className={styles.flowStep}>
              <span>01</span><strong>CHOOSE AMOUNT</strong>
              <p>Decide how much money you want to exchange, such as £20, £100 or another amount.</p>
            </div>
            <div className={styles.flowStep}>
              <span>02</span><strong>REVIEW QUOTE</strong>
              <p>Check the BTC amount, exchange rate, service charges and any other displayed costs.</p>
            </div>
            <div className={styles.flowStep}>
              <span>03</span><strong>AUTHORIZE PURCHASE</strong>
              <p>Confirm the transaction only after you understand the amount and terms shown.</p>
            </div>
            <div className={styles.flowStep}>
              <span>04</span><strong>CHOOSE CUSTODY</strong>
              <p>The Bitcoin may remain with a custodian or be delivered to a wallet you control, depending on the service.</p>
            </div>
            <div className={styles.flowStep}>
              <span>05</span><strong>VERIFY RECEIPT</strong>
              <p>Confirm the resulting balance or on-chain transaction and keep appropriate records.</p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeader}>
            <div>
              <p className={styles.eyebrow}>WHAT TO CHECK / 16</p>
              <h2>THE BTC PRICE IS NOT THE ONLY NUMBER.</h2>
            </div>
            <div className={styles.sectionIntro}>
              A purchase interface should make the total economics understandable
              before confirmation.
            </div>
          </div>

          <div className={styles.grid3}>
            <article className={styles.card}>
              <span className={styles.cardNumber}>RATE</span>
              <h3>BTC / FIAT QUOTE</h3>
              <p>
                The market rate tells you how much Bitcoin a unit of your local
                currency corresponds to at that moment. Quotes can change as
                markets move.
              </p>
              <Link href="/bitcoin/gbp">SEE BTC / GBP →</Link>
            </article>

            <article className={styles.card}>
              <span className={styles.cardNumber}>COST</span>
              <h3>FEES &amp; SPREAD</h3>
              <p>
                Services can charge explicit fees and may quote a buy price
                different from a reference market price. The total amount paid
                matters more than one headline percentage.
              </p>
            </article>

            <article className={styles.card}>
              <span className={styles.cardNumber}>DESTINATION</span>
              <h3>WHERE WILL THE BITCOIN BE?</h3>
              <p>
                Before buying, understand whether the provider will hold the
                Bitcoin for you or whether it will be delivered to a
                self-custody wallet you control.
              </p>
              <Link href="/bitcoin/learn/security">COMPARE CUSTODY →</Link>
            </article>
          </div>

          <div className={styles.callout}>
            <strong>You do not need to buy one whole bitcoin.</strong> The
            purchase amount can be a small fraction measured in BTC or satoshis.
          </div>
        </div>
      </section>

      <SourcePanel />
      <StepFooter
        previous={{ href: "/bitcoin/gbp", label: "BITCOIN IN POUNDS" }}
        next={{ href: "/bitcoin/learn/ready-to-buy", label: "READY TO BUY?" }}
      />
      <LearnFooter />
    </main>
  );
}
