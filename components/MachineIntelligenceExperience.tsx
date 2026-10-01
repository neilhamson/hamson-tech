import BitcoinLiveStrip from "../app/bitcoin/BitcoinLiveStrip";
import TechnicalInterface from "./TechnicalInterface";

export default function MachineIntelligenceExperience() {
  return (
    <div className="machine-intelligence-experience">
      <div className="machine-intelligence-system-index" aria-hidden="true">
        <span>HS / SOFTWARE</span>
        <span>LIVE PRODUCT SYSTEMS</span>
        <span>PUBLIC INTERFACE / ACTIVE</span>
      </div>

      <div className="machine-intelligence-experience-heading">
        <div>
          <p className="eyebrow">HAMSON SOFTWARE / LIVE SYSTEMS</p>

          <h1>
            SOFTWARE
            <br />
            <span>BUILT TO BE USED.</span>
          </h1>
        </div>

        <div className="machine-intelligence-experience-intro">
          <p>
            Hamson Software builds focused software products and live digital
            systems. Explore the Hamson Technical Interface and Hamson Bitcoin,
            both developed as active products rather than static demonstrations.
          </p>

          <div className="machine-intelligence-home-actions">
            <a
              className="machine-intelligence-hire-link"
              href="#technical-interface"
            >
              OPEN LIVE INTERFACE →
            </a>

            <a
              className="brand-button brand-button-secondary"
              href="/bitcoin"
            >
              EXPLORE HAMSON BITCOIN
            </a>
          </div>

          <div
            className="machine-intelligence-stage-summary"
            aria-label="Current Hamson Software product state"
          >
            <div>
              <span>COMPANY</span>
              <strong>HAMSON SOFTWARE</strong>
            </div>

            <div>
              <span>STATE</span>
              <strong className="machine-intelligence-stage-active">
                <i aria-hidden="true" />
                ACTIVE DEVELOPMENT
              </strong>
            </div>

            <div>
              <span>PUBLIC PRODUCTS</span>
              <strong>INTERFACE / BITCOIN</strong>
            </div>

            <div>
              <span>PRIVATE R&amp;D</span>
              <strong>MI1</strong>
            </div>
          </div>
        </div>
      </div>

      <TechnicalInterface />

      <section
        className="machine-intelligence-progression machine-intelligence-bitcoin-section"
        aria-labelledby="hamson-bitcoin-home-title"
      >
        <div className="machine-intelligence-progression-heading">
          <div>
            <span className="machine-intelligence-panel-label">
              HS / HAMSON BITCOIN / LIVE PRODUCT / 02
            </span>

            <h2 id="hamson-bitcoin-home-title">
              BITCOIN, LIVE IN POUNDS.
            </h2>
          </div>

          <div className="machine-intelligence-section-readout">
            <div>
              <span>MARKET</span>
              <strong>BTC / GBP</strong>
            </div>

            <div>
              <span>STATE</span>
              <strong>LIVE DATA</strong>
            </div>

            <p>
              Live Bitcoin market information, network state and practical
              tools for UK users. Market, network and learning systems are
              available now through Hamson Bitcoin.
            </p>
          </div>
        </div>

        <div className="machine-intelligence-bitcoin-console">
          <div className="machine-intelligence-bitcoin-console-top">
            <span>HS / BITCOIN / LIVE TELEMETRY</span>

            <span className="machine-intelligence-bitcoin-console-state">
              <i aria-hidden="true" />
              LIVE
            </span>
          </div>

          <div className="machine-intelligence-bitcoin-live">
            <BitcoinLiveStrip />
          </div>

          <nav
            className="machine-intelligence-bitcoin-routes"
            aria-label="Hamson Bitcoin live systems"
          >
            <a href="/bitcoin/gbp">
              <span>01 / LIVE</span>
              <strong>MARKET</strong>
              <small>PRICE · CHART · GBP →</small>
            </a>

            <a href="/bitcoin/fees">
              <span>02 / LIVE</span>
              <strong>NETWORK</strong>
              <small>BLOCKS · FEES · STATE →</small>
            </a>

            <a href="/bitcoin/fractions-satoshis">
              <span>03 / GUIDE</span>
              <strong>LEARN</strong>
              <small>SATS · WALLETS · MINING →</small>
            </a>
          </nav>
        </div>

        <a
          className="brand-button brand-button-primary machine-intelligence-record-link"
          href="/bitcoin"
        >
          OPEN HAMSON BITCOIN
        </a>
      </section>

      <div className="machine-intelligence-investor-strip">
        <div>
          <span className="machine-intelligence-panel-label">
            HS / MI1 / PRIVATE R&amp;D / FUNDING
          </span>

          <p>
            MI1 is Hamson Software's private Machine Intelligence R&amp;D
            programme, developed internally by Neil Hamson. It is not a
            commercial product; public progress supports technical review
            and potential funding discussions.
          </p>
        </div>

        <a
          className="brand-button brand-button-secondary"
          href="/machine-intelligence"
        >
          VIEW MI1 R&amp;D
        </a>
      </div>
    </div>
  );
}