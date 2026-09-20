"use client";

import { useState } from "react";

type DiffLine = { kind: "same" | "added" | "removed"; text: string };
type Decision = "approved" | "rejected" | null;

const exampleBefore = `function canCommit(approved, validated) {
  return approved;
}`;
const exampleAfter = `function canCommit(approved, validated) {
  return approved && validated;
}`;

// A line-based comparison. It compares text only; it never executes the code.
function compareLines(before: string, after: string): DiffLine[] {
  const oldLines = before.replace(/\r\n/g, "\n").split("\n");
  const newLines = after.replace(/\r\n/g, "\n").split("\n");
  const lengths = Array.from({ length: oldLines.length + 1 }, () =>
    Array<number>(newLines.length + 1).fill(0),
  );

  for (let i = oldLines.length - 1; i >= 0; i--) {
    for (let j = newLines.length - 1; j >= 0; j--) {
      lengths[i][j] = oldLines[i] === newLines[j]
        ? lengths[i + 1][j + 1] + 1
        : Math.max(lengths[i + 1][j], lengths[i][j + 1]);
    }
  }

  const result: DiffLine[] = [];
  let i = 0;
  let j = 0;
  while (i < oldLines.length || j < newLines.length) {
    if (i < oldLines.length && j < newLines.length && oldLines[i] === newLines[j]) {
      result.push({ kind: "same", text: oldLines[i++] });
      j++;
    } else if (i < oldLines.length && (j === newLines.length || lengths[i + 1][j] >= lengths[i][j + 1])) {
      result.push({ kind: "removed", text: oldLines[i++] });
    } else {
      result.push({ kind: "added", text: newLines[j++] });
    }
  }
  return result;
}

export default function CodeReviewSandbox() {
  const [before, setBefore] = useState(exampleBefore);
  const [after, setAfter] = useState(exampleAfter);
  const [diff, setDiff] = useState<DiffLine[] | null>(() => compareLines(exampleBefore, exampleAfter));
  const [decision, setDecision] = useState<Decision>(null);
  const [comparedSource, setComparedSource] = useState({ before: exampleBefore, after: exampleAfter });

  function edit(which: "before" | "after", value: string) {
    if (which === "before") setBefore(value);
    else setAfter(value);
    setDiff(null);
    setDecision(null);
  }

  function resetExample() {
    setBefore(exampleBefore);
    setAfter(exampleAfter);
    setDiff(compareLines(exampleBefore, exampleAfter));
    setComparedSource({ before: exampleBefore, after: exampleAfter });
    setDecision(null);
  }

  function review() {
    setDiff(compareLines(before, after));
    setComparedSource({ before, after });
    setDecision(null);
  }

  function exportReview() {
    if (!diff) return;
    const lines = [
      "PUBLIC CODE REVIEW SANDBOX — BROWSER-ONLY TEXT COMPARISON",
      "This report is not an MI1 output, code test, or repository approval.",
      `Review decision: ${decision ?? "not recorded"}`,
      "",
      "BEFORE:", comparedSource.before, "", "AFTER:", comparedSource.after, "", "LINE DIFF:",
      ...diff.map(({ kind, text }) => `${kind === "added" ? "+" : kind === "removed" ? "-" : " "} ${text}`),
    ];
    const url = URL.createObjectURL(new Blob([lines.join("\n")], { type: "text/plain" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = "code-review-sandbox.txt";
    link.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  const additions = diff?.filter((line) => line.kind === "added").length ?? 0;
  const removals = diff?.filter((line) => line.kind === "removed").length ?? 0;
  const hasChange = additions + removals > 0;

  return (
    <div className="mi-review-sandbox">
      <div className="mi-review-heading">
        <div>
          <span className="machine-intelligence-panel-label">PUBLIC REVIEW SANDBOX / 001</span>
          <h2>SEE THE CHANGE. MAKE THE CALL.</h2>
        </div>
        <span className="mi-review-indicator">BROWSER ONLY · NO MODEL CALL</span>
      </div>
      <p className="mi-review-intro">
        Edit the two snippets to compare a code change, then record your decision. The initial example is illustrative, not output from MI1.
      </p>

      <div className="mi-review-editors">
        <label htmlFor="mi-review-before"><span>01 / CURRENT CODE</span>
          <textarea id="mi-review-before" spellCheck={false} maxLength={3000} value={before} onChange={(event) => edit("before", event.target.value)} />
        </label>
        <label htmlFor="mi-review-after"><span>02 / PROPOSED CODE</span>
          <textarea id="mi-review-after" spellCheck={false} maxLength={3000} value={after} onChange={(event) => edit("after", event.target.value)} />
        </label>
      </div>
      <div className="mi-review-actions">
        <button type="button" className="mi-review-primary" onClick={review}>COMPARE CODE</button>
        <button type="button" className="mi-review-quiet" onClick={resetExample}>RESET EXAMPLE</button>
      </div>

      <div className="mi-review-output" aria-live="polite">
        <div className="mi-review-output-heading">
          <strong>03 / LINE COMPARISON</strong>
          <span>{diff ? `+${additions} added  −${removals} removed` : "EDITED · COMPARE TO REVIEW"}</span>
        </div>
        {diff ? (
          <div className="mi-review-diff" role="region" aria-label="Line by line code comparison" tabIndex={0}>
            {diff.map((line, index) => <div key={index} className={`mi-review-line mi-review-line-${line.kind}`}>
              <span aria-hidden="true">{line.kind === "added" ? "+" : line.kind === "removed" ? "−" : " "}</span>
              <code>{line.text || " "}</code>
            </div>)}
          </div>
        ) : <p className="mi-review-pending">The code has changed. Select COMPARE CODE to see the new diff.</p>}
      </div>

      <div className="mi-review-decision">
        <div><strong>04 / YOUR DECISION</strong><p aria-live="polite">{decision ? `Recorded in this browser: ${decision.toUpperCase()}` : hasChange ? "Review the diff, then decide." : "Compare two different versions to make a decision."}</p></div>
        <div className="mi-review-actions">
          <button type="button" disabled={!diff || !hasChange} aria-pressed={decision === "approved"} onClick={() => setDecision("approved")}>APPROVE IN DEMO</button>
          <button type="button" disabled={!diff || !hasChange} aria-pressed={decision === "rejected"} onClick={() => setDecision("rejected")}>REJECT IN DEMO</button>
          <button type="button" disabled={!diff} onClick={exportReview}>EXPORT REVIEW</button>
        </div>
      </div>
      <p className="mi-review-disclosure">Text comparison and review run entirely in this browser. This does not access MI1, execute code, run tests, approve a real change, or write to Git.</p>
    </div>
  );
}
