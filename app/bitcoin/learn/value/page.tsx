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
  "Why Does Bitcoin Have Value? — Hamson Bitcoin",
  "Hamson Bitcoin explains Bitcoin value, price, scarcity, usefulness, monetary properties, adoption and why no future price is guaranteed.",
  "/bitcoin/learn/value",
);

export default function BitcoinValuePage() {
  return (
    <main className={`${styles.page} site`}>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <SiteHeader />
      <LearnNav />

      <section className={styles.hero} id="main-content">
        <div>
          <p className={styles.eyebrow}>HAMSON BITCOIN / BEGINNER PATH / 07</p>
          <h1>WHY DOES BITCOIN <span>HAVE VALUE?</span></h1>
          <p className={styles.lead}>
            Bitcoin does not have a guaranteed price and no authority promises
            that it will increase in value. People assign value to it because
            they are willing to acquire, hold or accept it for its monetary and
            network properties.
          </p>
        </div>

        <aside className={styles.heroPanel}>
          <span>VALUE ≠ PRICE GUARANTEE</span>
          <h2>PRICE COMES FROM A MARKET</h2>
          <p>
            Buyers and sellers meet in markets. If demand rises relative to
            available supply, price can rise; if demand falls, price can fall.
          </p>
          <Link href="/bitcoin/learn/supply">NEXT: WHY ONLY 21 MILLION? →</Link>
        </aside>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionInner}>
          <p className={styles.definition}>
            A useful way to separate the ideas is: <strong>value</strong> is
            why people may want Bitcoin; <strong>price</strong> is what buyers
            and sellers agree to exchange it for at a particular moment.
          </p>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeader}>
            <div>
              <p className={styles.eyebrow}>HAMSON BITCOIN / MONETARY PROPERTIES / 08</p>
              <h2>WHY PEOPLE MAY CHOOSE TO HOLD OR USE IT.</h2>
            </div>
            <div className={styles.sectionIntro}>
              Bitcoin can be examined through properties commonly associated
              with money: durability, portability, fungibility, scarcity,
              divisibility and recognizability. Bitcoin expresses these through
              software, cryptography and network rules rather than through a
              physical commodity.
            </div>
          </div>

          <div className={styles.grid3}>
            <article className={styles.card}>
              <span className={styles.cardNumber}>SCARCITY</span>
              <h3>PREDICTABLE SUPPLY</h3>
              <p>
                Bitcoin's issuance follows protocol rules and approaches a
                maximum of 21 million bitcoin. No company can simply decide to
                create an unlimited additional supply under the existing rules.
              </p>
              <Link href="/bitcoin/learn/supply">UNDERSTAND THE SUPPLY →</Link>
            </article>

            <article className={styles.card}>
              <span className={styles.cardNumber}>PORTABILITY</span>
              <h3>DIGITAL TRANSFER</h3>
              <p>
                Bitcoin can be transferred over its peer-to-peer network and
                does not require moving a physical token between people.
              </p>
              <Link href="/bitcoin/learn/transactions">HOW A PAYMENT WORKS →</Link>
            </article>

            <article className={styles.card}>
              <span className={styles.cardNumber}>DIVISIBILITY</span>
              <h3>100 MILLION SATOSHIS</h3>
              <p>
                One bitcoin is divisible into 100,000,000 satoshis, so a person
                does not need to acquire a whole bitcoin to use or own some.
              </p>
              <Link href="/bitcoin/fractions-satoshis">UNDERSTAND SATOSHIS →</Link>
            </article>

            <article className={styles.card}>
              <span className={styles.cardNumber}>VERIFIABILITY</span>
              <h3>RULES CAN BE CHECKED</h3>
              <p>
                Bitcoin nodes independently validate blocks and transactions
                against consensus rules rather than relying on one central
                database operator to declare the ledger valid.
              </p>
              <Link href="/bitcoin/learn/blockchain">UNDERSTAND THE BLOCKCHAIN →</Link>
            </article>

            <article className={styles.card}>
              <span className={styles.cardNumber}>NETWORK</span>
              <h3>USE DEPENDS ON ADOPTION</h3>
              <p>
                A monetary network becomes more useful when people, businesses
                and services are willing to use it. Adoption can grow or
                contract and should never be treated as guaranteed.
              </p>
            </article>

            <article className={styles.card}>
              <span className={styles.cardNumber}>MARKET</span>
              <h3>PRICE CAN MOVE SHARPLY</h3>
              <p>
                A scarce asset can still fall in price. Market demand,
                confidence, liquidity, competition and wider economic
                conditions can all affect what people are willing to pay.
              </p>
              <Link href="/bitcoin/learn/risks-scams">UNDERSTAND THE RISKS →</Link>
            </article>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionInner}>
          <div className={styles.callout}>
            <strong>Important distinction:</strong> scarcity alone does not
            guarantee value. Something also needs people who find it useful or
            desirable. Bitcoin's market value ultimately depends on people
            continuing to choose to use, hold or accept it.
          </div>
        </div>
      </section>

      <SourcePanel />
      <StepFooter
        previous={{ href: "/bitcoin/fractions-satoshis", label: "FRACTIONS & SATOSHIS" }}
        next={{ href: "/bitcoin/learn/supply", label: "WHY ONLY 21 MILLION?" }}
      />
      <LearnFooter />
    </main>
  );
}
