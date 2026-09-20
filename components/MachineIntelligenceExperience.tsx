import CodeReviewSandbox from "./CodeReviewSandbox";

export default function MachineIntelligenceExperience() {
  return (
    <div className="machine-intelligence-experience">
      <div className="machine-intelligence-experience-heading">
        <div>
          <p className="eyebrow">MI1 / PRIVATE MACHINE INTELLIGENCE PROTOTYPE</p>
          <h1>
            BUILDING
            <br />
            <span>MI1.</span>
          </h1>
        </div>

        <div className="machine-intelligence-experience-intro">
          <p>
            Neil Hamson is engineering MI1: private software designed to prepare
            code changes for human review, then validate changes after approval.
            A complete controlled development cycle has now been demonstrated on an external repository; repeatability is still being developed.
          </p>

          <div className="machine-intelligence-home-actions">
            <a className="machine-intelligence-hire-link" href="/services">
              SOFTWARE ENGINEERING
            </a>
            <a className="brand-button brand-button-secondary" href="/machine-intelligence">
              EXPLORE MI1
            </a>
          </div>

          <div
            className="machine-intelligence-stage-summary"
            aria-label="Current Machine Intelligence development stage"
          >
            <span>CURRENT FOCUS</span>
            <strong>HUMAN-REVIEWED CODE CHANGES</strong>
            <span>PRIVATE PROTOTYPE · RELIABILITY IN DEVELOPMENT</span>
          </div>
        </div>
      </div>

      <div className="machine-intelligence-interaction-grid">
        <div className="machine-intelligence-ask-panel">
          <CodeReviewSandbox />
        </div>

        <aside
          className="machine-intelligence-status-panel"
          id="machine-intelligence-status"
          aria-label="Machine Intelligence development status"
        >
          <div className="machine-intelligence-status-heading">
            <span className="machine-intelligence-panel-label">CURRENT SYSTEM STATE</span>

            <span className="machine-intelligence-active-indicator">
              <span aria-hidden="true" />
              DEVELOPMENT ACTIVE
            </span>
          </div>

          <h3>WHY THE REVIEW MATTERS</h3>
          <p className="machine-intelligence-status-explainer">
            A code suggestion should be visible before anyone applies it.
            The developer decides whether to approve it; validation then checks
            the changed project. MI1 is being built around that boundary.
          </p>
          <ol className="machine-intelligence-status-steps">
            <li><span>01</span> Inspect the task and source</li>
            <li><span>02</span> Prepare a change for review</li>
            <li><span>03</span> Ask before applying it</li>
            <li><span>04</span> Validate and report the result</li>
          </ol>

          <p className="machine-intelligence-status-note">
            MI1 is private and under development. The sandbox beside this
            explanation compares text in your browser; it does not connect to
            MI1, execute code or write to a repository.
          </p>
        </aside>
      </div>

      <section
        className="machine-intelligence-progression"
        aria-labelledby="machine-intelligence-progression-title"
      >
        <div className="machine-intelligence-progression-heading">
          <div>
            <span className="machine-intelligence-panel-label">BUILD STATUS / MI1</span>
            <h2 id="machine-intelligence-progression-title">BUILT, TESTED, STILL BEING PROVED.</h2>
          </div>

          <p>
            The private prototype includes saved project state, bounded tools
            and an approval-based development loop. Recovery after an interruption has now been demonstrated, and one complete controlled cycle has been verified; broader repeatability still needs further evidence.
            The public reviewer above shows the review idea; it is not MI1 itself.
          </p>
        </div>

        <a className="brand-button brand-button-secondary machine-intelligence-record-link" href="/machine-intelligence">
          SEE THE DEVELOPMENT DETAILS
        </a>
      </section>

      <div className="machine-intelligence-investor-strip">
        <div>
          <span className="machine-intelligence-panel-label">A SEPARATE MODEL EXPERIMENT</span>

          <p>
            Local inference with Qwen3-14B has been demonstrated through llama.cpp.
            It is separate from the MI1 development tool and does not establish
            that the full workflow runs reliably on a local model.
          </p>
        </div>

        <a className="brand-button brand-button-primary" href="/machine-intelligence">
          DEVELOPMENT DETAILS
        </a>
      </div>
    </div>
  );
}
