import type { KnowledgeRecord } from "@/lib/knowledgeRecord";

export const productKnowledge: readonly KnowledgeRecord[] = [
  {
    id: "mi1-overview",
    title: "MI1 overview",
    status: "DOCUMENTED",
    summary:
      "MI1 is Neil Hamson's private Machine Intelligence software system. Its core source code is not public.",
    facts: [
      "MI1 is developed by Neil Hamson.",
      "The MI1 core remains private.",
      "Public technical evidence is published separately from the private implementation.",
    ],
    sourceLabel: "MI1 Evidence Repository",
    sourceUrl: "https://github.com/neilhamson/mi1-evidence",
    tags: ["mi1", "overview", "private-core", "machine-intelligence"],
  },

  {
    id: "mi1-test-suite-2026-09-20",
    title: "MI1 verified test-suite run",
    status: "VERIFIED",
    summary:
      "The existing MI1 test suite was run successfully on 20 September 2026 against commit 24bd1bff7acea092cb2ec3dcb8814a4815860f90.",
    facts: [
      "Python version: 3.14.7.",
      "78 tests were executed.",
      "78 tests passed.",
      "Result: OK.",
      "Exit code: 0.",
      "Runtime: 3.353 seconds.",
      "Verified MI1 commit: 24bd1bff7acea092cb2ec3dcb8814a4815860f90.",
    ],
    sourceLabel: "MI1 Evidence Repository",
    sourceUrl: "https://github.com/neilhamson/mi1-evidence",
    verifiedDate: "2026-09-20",
    tags: ["mi1", "tests", "verification", "commit", "evidence"],
  },

  {
    id: "mi1-controlled-development-cycle",
    title: "MI1 controlled development cycle",
    status: "VERIFIED",
    summary:
      "MI1 completed a controlled software-development cycle against an external Next.js repository.",
    facts: [
      "The demonstrated sequence was: inspect → propose → explicit human approval → apply → validate → controlled local Git commit.",
      "Proposal ID: d9a0881c-50d7-4525-882b-e4ced057b33e.",
      "Resulting development commit: 1a7170e1d1d2c63ffb0315c256e7b01e4268ed78.",
      "MI1 did not have remote push authority.",
      "MI1 did not have production deployment authority.",
    ],
    sourceLabel: "MI1 Evidence Repository",
    sourceUrl: "https://github.com/neilhamson/mi1-evidence",
    verifiedDate: "2026-09-20",
    tags: [
      "mi1",
      "development-cycle",
      "human-approval",
      "git",
      "authority-boundary",
      "evidence",
    ],
  },

  {
    id: "mi1-deployment-authority",
    title: "MI1 deployment authority",
    status: "NOT_PUBLICLY_ESTABLISHED",
    summary:
      "The published evidence does not establish autonomous remote push or production deployment capability.",
    facts: [
      "The demonstrated development cycle ended with a controlled local Git commit.",
      "Remote push authority was excluded.",
      "Production deployment authority was excluded.",
    ],
    sourceLabel: "MI1 Evidence Repository",
    sourceUrl: "https://github.com/neilhamson/mi1-evidence",
    verifiedDate: "2026-09-20",
    tags: [
      "mi1",
      "deployment",
      "authority",
      "limitations",
      "evidence-boundary",
    ],
  },

  {
    id: "public-source-repositories",
    title: "Public source repositories",
    status: "VERIFIED",
    summary:
      "Public evidence and public website source are available separately from the private MI1 core.",
    facts: [
      "MI1 public evidence: https://github.com/neilhamson/mi1-evidence",
      "hamson.tech public website source: https://github.com/neilhamson/hamson-tech",
      "MI1 core source is not public.",
    ],
    sourceLabel: "Public GitHub repositories",
    sourceUrl: "https://github.com/neilhamson",
    tags: ["github", "public-source", "mi1", "hamson-tech"],
  },
];