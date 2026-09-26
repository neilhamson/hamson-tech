import Image from "next/image";
import Link from "next/link";

import { pageMetadata } from "../../_components/SubpageShell";
import styles from "../bitcoin.module.css";

export const metadata = pageMetadata(
  "Bitcoin Mining UK — Proof of Work, ASICs & Mining Explained",
  "Bitcoin mining explained in plain English by Neil Hamson: proof of work, ASIC hardware, blocks, mining pools, electricity and practical Antminer S9 experience.",
  "/bitcoin/mining",
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

export default function BitcoinMiningPage() {
  return (
    <main className={`${styles.page} site`}>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>

      <Header />

      <section className={styles.hero} id="main-content">
        <div className={styles.heroCopy}>
          <p className={styles.kicker}>
            BITCOIN / MINING / PLAIN ENGLISH
          </p>

          <h1>
            BITCOIN
            <span>MINING</span>
          </h1>

          <p className={styles.heroLead}>
            Bitcoin mining combines specialised computing hardware,
            electricity and proof of work. Miners compete to produce valid
            blocks, while Bitcoin nodes independently check that those blocks
            obey the network rules.
          </p>

          <div className={styles.heroActions}>
            <Link href="#what-is-mining">START WITH MINING</Link>
            <Link href="#real-experience">
              NEIL HAMSON&apos;S EXPERIENCE
            </Link>
          </div>
        </div>

        <aside
          className={styles.console}
          aria-label="Bitcoin mining quick start"
        >
          <div className={styles.consoleTop}>
            <span className={styles.consoleName}>
              START HERE // MINING
            </span>

            <span className={styles.consoleStatus}>
              <span className={styles.statusDot} />
              PROOF OF WORK
            </span>
          </div>

          <div className={styles.readout}>
            <div className={styles.readoutBlock}>
              <span className={styles.readoutLabel}>INPUT</span>
              <span className={styles.readoutValue}>POWER</span>
            </div>

            <span className={styles.readoutArrow}>→</span>

            <div className={styles.readoutBlock}>
              <span className={styles.readoutLabel}>COMPUTATION</span>
              <span className={styles.readoutValue}>HASHES</span>
            </div>
          </div>

          <div className={styles.sats}>
            <span className={styles.readoutLabel}>OBJECTIVE</span>
            <strong>VALID PROOF OF WORK</strong>
          </div>

          <div className={styles.consoleMeta}>
            <div className={styles.consoleRow}>
              <span>HARDWARE</span>
              <strong>ASIC</strong>
            </div>

            <div className={styles.consoleRow}>
              <span>PROCESS</span>
              <strong>HASHING</strong>
            </div>

            <div className={styles.consoleRow}>
              <span>MINER</span>
              <strong>PROPOSES BLOCK</strong>
            </div>

            <div className={styles.consoleRow}>
              <span>NODES</span>
              <strong>VERIFY RULES</strong>
            </div>
          </div>
        </aside>
      </section>

      <div className={styles.signalBar} aria-hidden="true">
        <span>
          HARDWARE <strong>ASIC</strong>
        </span>
        <span>
          PROCESS <strong>PROOF OF WORK</strong>
        </span>
        <span>
          OUTPUT <strong>BLOCK</strong>
        </span>
        <span>
          VALIDATION <strong>NODES</strong>
        </span>
      </div>

      <section
        className={styles.section}
        id="what-is-mining"
      >
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeader}>
            <div>
              <p className={styles.sectionCode}>START HERE / 01</p>
              <h2>WHAT DOES BITCOIN MINING ACTUALLY DO?</h2>
            </div>

            <div className={styles.sectionIntro}>
              Bitcoin mining is the competitive process used to produce proof
              of work for new blocks. Mining software assembles candidate
              blocks and specialised hardware repeatedly performs calculations
              looking for a result that satisfies the current difficulty
              target.
            </div>
          </div>

          <div className={styles.grid3}>
            <article className={styles.panel}>
              <span className={styles.panelNumber}>01 / ASSEMBLE</span>
              <h3>BUILD A CANDIDATE BLOCK</h3>
              <p>
                Mining software selects valid transactions and arranges them
                into a proposed Bitcoin block.
              </p>
            </article>

            <article className={styles.panel}>
              <span className={styles.panelNumber}>02 / COMPUTE</span>
              <h3>SEARCH FOR PROOF OF WORK</h3>
              <p>
                ASIC hardware performs enormous numbers of hashing attempts
                while searching for a result below the network&apos;s current
                target.
              </p>
            </article>

            <article className={styles.panel}>
              <span className={styles.panelNumber}>03 / PROPOSE</span>
              <h3>BROADCAST THE BLOCK</h3>
              <p>
                When valid proof of work is found, the miner broadcasts the
                proposed block to the wider Bitcoin network.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.development}`}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeader}>
            <div>
              <p className={styles.sectionCode}>PROOF OF WORK / 02</p>
              <h2>WHAT IS PROOF OF WORK?</h2>
            </div>

            <div className={styles.sectionIntro}>
              Proof of work makes producing a valid Bitcoin block
              computationally expensive while allowing the rest of the network
              to check the result comparatively easily.
            </div>
          </div>

          <div className={styles.grid3}>
            <article className={styles.panel}>
              <span className={styles.panelNumber}>HASH</span>
              <h3>REPEAT THE CALCULATION</h3>
              <p>
                Mining hardware repeatedly hashes changing block data,
                producing a new candidate result each time.
              </p>
            </article>

            <article className={styles.panel}>
              <span className={styles.panelNumber}>TARGET</span>
              <h3>MEET THE DIFFICULTY</h3>
              <p>
                Only a result satisfying Bitcoin&apos;s current proof-of-work
                target can be used to propose a valid block.
              </p>
            </article>

            <article className={styles.panel}>
              <span className={styles.panelNumber}>VERIFY</span>
              <h3>NODES CHECK THE WORK</h3>
              <p>
                Bitcoin nodes can independently verify the proof of work and
                the contents of the proposed block.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeader}>
            <div>
              <p className={styles.sectionCode}>CONSENSUS / 03</p>
              <h2>MINERS DO NOT CONTROL BITCOIN</h2>
            </div>

            <div className={styles.sectionIntro}>
              Miners perform an important role, but finding proof of work does
              not give a miner authority to rewrite Bitcoin&apos;s rules. A
              proposed block must still satisfy the validation rules enforced
              independently by Bitcoin nodes.
            </div>
          </div>

          <div className={styles.grid3}>
            <article className={styles.panel}>
              <span className={styles.panelNumber}>MINER</span>
              <h3>PROPOSES A BLOCK</h3>
              <p>
                The miner performs proof of work and broadcasts a candidate
                block to the network.
              </p>
            </article>

            <article className={styles.panel}>
              <span className={styles.panelNumber}>NODE</span>
              <h3>CHECKS THE RULES</h3>
              <p>
                Bitcoin nodes independently verify transactions, block
                structure and proof of work against the rules they enforce.
              </p>
            </article>

            <article className={styles.panel}>
              <span className={styles.panelNumber}>INVALID</span>
              <h3>REJECTED</h3>
              <p>
                A block that violates those rules can be rejected regardless
                of how much mining work was performed to create it.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section
        className={`${styles.section} ${styles.field}`}
        id="real-experience"
      >
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeader}>
            <div>
              <p className={styles.sectionCode}>
                NEIL HAMSON / PRACTICAL EXPERIENCE
              </p>
              <h2>MINING WAS PHYSICAL</h2>
            </div>

            <div className={styles.sectionIntro}>
              Neil Hamson has hands-on Bitcoin mining experience from working
              as data centre manager within a student mining operation using
              ten Antminer S9 units. Bitcoin mining was not an abstract chart
              or website — it involved real machines, power, heat, noise,
              networking and operational management.
            </div>
          </div>

          <div className={styles.grid3}>
            <article className={styles.panel}>
              <span className={styles.panelNumber}>10 × S9</span>
              <h3>ANTMINER HARDWARE</h3>
              <p>
                Ten Bitmain Antminer S9 machines formed the mining hardware
                used within the operation.
              </p>
            </article>

            <article className={styles.panel}>
              <span className={styles.panelNumber}>HEAT / NOISE</span>
              <h3>PHYSICAL INFRASTRUCTURE</h3>
              <p>
                ASIC miners produce substantial heat and noise. Ventilation,
                airflow and the physical environment are part of running the
                hardware.
              </p>
            </article>

            <article className={styles.panel}>
              <span className={styles.panelNumber}>OPERATIONS</span>
              <h3>MORE THAN SOFTWARE</h3>
              <p>
                Mining combines hardware, networking, electrical power,
                cooling, monitoring and day-to-day operational management.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeader}>
            <div>
              <p className={styles.sectionCode}>HARDWARE / 05</p>
              <h2>WHAT IS AN ASIC?</h2>
            </div>

            <div className={styles.sectionIntro}>
              Modern Bitcoin mining uses specialised ASIC hardware. These
              machines are designed specifically for Bitcoin&apos;s hashing
              workload rather than being general-purpose computers.
            </div>
          </div>

          <div className={styles.grid3}>
            <article className={styles.panel}>
              <span className={styles.panelNumber}>ASIC</span>
              <h3>PURPOSE-BUILT HARDWARE</h3>
              <p>
                ASIC means application-specific integrated circuit. The
                hardware is engineered for a narrow, specialised task.
              </p>
            </article>

            <article className={styles.panel}>
              <span className={styles.panelNumber}>HASH RATE</span>
              <h3>WORK PER SECOND</h3>
              <p>
                Hash rate describes how many hashing attempts mining hardware
                can perform over a given period.
              </p>
            </article>

            <article className={styles.panel}>
              <span className={styles.panelNumber}>EFFICIENCY</span>
              <h3>POWER PER UNIT OF WORK</h3>
              <p>
                More efficient mining hardware performs more computational
                work for the electricity it consumes.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.development}`}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeader}>
            <div>
              <p className={styles.sectionCode}>ENERGY / 06</p>
              <h2>ELECTRICITY, HEAT AND ECONOMICS</h2>
            </div>

            <div className={styles.sectionIntro}>
              Mining is physical computation. ASIC hardware consumes
              electricity while hashing, and much of that electrical energy
              ultimately becomes heat that must be managed.
            </div>
          </div>

          <div className={styles.grid3}>
            <article className={styles.panel}>
              <span className={styles.panelNumber}>POWER</span>
              <h3>RUN THE HARDWARE</h3>
              <p>
                ASIC miners require a continuous electrical supply while they
                perform proof-of-work calculations.
              </p>
            </article>

            <article className={styles.panel}>
              <span className={styles.panelNumber}>HEAT</span>
              <h3>REMOVE THE HEAT</h3>
              <p>
                Operating multiple miners means dealing with significant heat,
                making airflow and cooling part of the infrastructure.
              </p>
            </article>

            <article className={styles.panel}>
              <span className={styles.panelNumber}>COST</span>
              <h3>ECONOMICS MATTER</h3>
              <p>
                Electricity price, hardware efficiency, network difficulty,
                Bitcoin price and transaction fees can all affect mining
                economics.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeader}>
            <div>
              <p className={styles.sectionCode}>POOLS / 07</p>
              <h2>WHY DO MINERS USE POOLS?</h2>
            </div>

            <div className={styles.sectionIntro}>
              Finding a Bitcoin block is probabilistic. A miner with a small
              share of the network&apos;s total hash rate might wait a very long
              time to find a block independently.
            </div>
          </div>

          <div className={styles.grid2}>
            <article className={styles.panel}>
              <span className={styles.panelNumber}>SOLO</span>
              <h3>MINE INDEPENDENTLY</h3>
              <p>
                A solo miner performs proof of work independently and receives
                the block compensation if that miner finds a valid block.
              </p>

              <p>
                With relatively little hash rate, successful blocks may be
                extremely infrequent.
              </p>
            </article>

            <article className={styles.panel}>
              <span className={styles.panelNumber}>POOL</span>
              <h3>COMBINE HASH RATE</h3>
              <p>
                Mining pools combine the work of many miners and distribute
                payments according to the pool&apos;s chosen reward system.
              </p>

              <p>
                Pooling can make income more regular, but it does not remove
                the proof-of-work requirement.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.development}`}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeader}>
            <div>
              <p className={styles.sectionCode}>INCENTIVE / 08</p>
              <h2>WHY DO MINERS DO THE WORK?</h2>
            </div>

            <div className={styles.sectionIntro}>
              A miner that successfully produces a valid block can receive
              economic compensation. That combines Bitcoin&apos;s block subsidy
              with transaction fees included in the block.
            </div>
          </div>

          <div className={styles.grid3}>
            <article className={styles.panel}>
              <span className={styles.panelNumber}>SUBSIDY</span>
              <h3>NEWLY ISSUED BITCOIN</h3>
              <p>
                Bitcoin&apos;s rules allow each valid block to include a
                predetermined amount of newly issued bitcoin.
              </p>
            </article>

            <article className={styles.panel}>
              <span className={styles.panelNumber}>FEES</span>
              <h3>TRANSACTION FEES</h3>
              <p>
                The miner can also receive transaction fees associated with
                transactions included in the block.
              </p>
            </article>

            <article className={styles.panel}>
              <span className={styles.panelNumber}>HALVING</span>
              <h3>THE SUBSIDY DECLINES</h3>
              <p>
                Bitcoin&apos;s block subsidy reduces over time according to its
                programmed issuance schedule.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeader}>
            <div>
              <p className={styles.sectionCode}>DISTINCTION / 09</p>
              <h2>MINING IS NOT THE SAME AS BUYING BITCOIN</h2>
            </div>

            <div className={styles.sectionIntro}>
              Buying Bitcoin means acquiring BTC from another person or
              service. Mining means operating specialised computing
              infrastructure that participates in Bitcoin&apos;s proof-of-work
              process.
            </div>
          </div>

          <div className={styles.grid2}>
            <article className={styles.panel}>
              <span className={styles.panelNumber}>BUY</span>
              <h3>ACQUIRE BTC</h3>
              <p>
                Bitcoin can be bought and owned without running mining hardware
                or participating directly in mining.
              </p>
            </article>

            <article className={styles.panel}>
              <span className={styles.panelNumber}>MINE</span>
              <h3>OPERATE INFRASTRUCTURE</h3>
              <p>
                Mining requires specialised hardware, electricity and
                participation in the competitive proof-of-work process.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.field}`}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeader}>
            <div>
              <p className={styles.sectionCode}>NEXT / 10</p>
              <h2>WHERE NEXT?</h2>
            </div>

            <div className={styles.sectionIntro}>
              Mining explains one part of Bitcoin. Continue with whichever
              part of the system answers the next question.
            </div>
          </div>

          <div className={styles.grid3}>
            <article className={styles.panel}>
              <span className={styles.panelNumber}>OVERVIEW</span>
              <h3>BITCOIN IN PLAIN ENGLISH</h3>
              <p>
                Return to the beginner overview and follow Bitcoin from pounds
                through wallets, transactions and the network.
              </p>

              <Link href="/bitcoin">BITCOIN OVERVIEW →</Link>
            </article>

            <article className={styles.panel}>
              <span className={styles.panelNumber}>BTC / GBP</span>
              <h3>BITCOIN IN POUNDS</h3>
              <p>
                See how British pounds relate to bitcoin and satoshis using the
                BTC/GBP conversion system.
              </p>

              <Link href="/bitcoin/gbp">OPEN BTC / GBP →</Link>
            </article>

            <article className={styles.panel}>
              <span className={styles.panelNumber}>WALLETS</span>
              <h3>CONTROL &amp; USE</h3>
              <p>
                Understand custody, private keys, recovery and how Bitcoin is
                sent and received.
              </p>

              <Link href="/bitcoin/wallets">
                OPEN WALLETS &amp; USE →
              </Link>
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