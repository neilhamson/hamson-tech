import type { ConversationState } from "@/lib/conversationState";

export const projectEnquiryVersion = 1 as const;

export type ProjectEnquiry = {
  version: typeof projectEnquiryVersion;
  status: "draft";
  objective: string | null;
  organisation: {
    type: string | null;
    sector: string | null;
  };
  existingSystem: {
    summary: string | null;
    technologies: string[];
    dataStorage: string | null;
    deploymentEnvironment: string | null;
  };
  problems: string[];
  requestedCapabilities: string[];
  constraints: string[];
  assumptions: string[];
  technicalRisks: string[];
  openQuestions: string[];
  readiness: {
    status: ConversationState["readiness"]["status"];
    score: number;
    missingCriticalInformation: string[];
  };
};

export function prepareProjectEnquiry(
  state: ConversationState,
): ProjectEnquiry {
  return {
    version: projectEnquiryVersion,
    status: "draft",
    objective: state.objective,
    organisation: {
      type: state.organisation.type,
      sector: state.organisation.sector,
    },
    existingSystem: {
      summary: state.existingSystem.summary,
      technologies: [...state.existingSystem.technologies],
      dataStorage: state.existingSystem.dataStorage,
      deploymentEnvironment:
        state.existingSystem.deploymentEnvironment,
    },
    problems: [...state.problems],
    requestedCapabilities: [...state.requirements],
    constraints: [...state.constraints],
    assumptions: [...state.assumptions],
    technicalRisks: [...state.risks],
    openQuestions: [...state.unknowns],
    readiness: {
      status: state.readiness.status,
      score: state.readiness.score,
      missingCriticalInformation: [
        ...state.readiness.missingCriticalInformation,
      ],
    },
  };
}

export function formatProjectEnquiryText(
  enquiry: ProjectEnquiry,
): string {
  const lines: string[] = [
    "HAMSON TECHNICAL INTERFACE — PROJECT ENQUIRY",
    `DRAFT ARTEFACT — VERSION ${enquiry.version}`,
    "",
  ];

  function addValue(label: string, value: string | null) {
    if (!value) {
      return;
    }

    lines.push(label, value, "");
  }

  function addList(label: string, items: string[]) {
    if (items.length === 0) {
      return;
    }

    lines.push(label);
    lines.push(...items.map((item) => `- ${item}`));
    lines.push("");
  }

  addValue("OBJECTIVE", enquiry.objective);

  const organisation = [
    enquiry.organisation.type,
    enquiry.organisation.sector,
  ]
    .filter((value): value is string => Boolean(value))
    .join(" · ");

  addValue("ORGANISATION", organisation || null);
  addValue("EXISTING SYSTEM", enquiry.existingSystem.summary);
  addList("TECHNOLOGIES", enquiry.existingSystem.technologies);
  addValue("DATA STORAGE", enquiry.existingSystem.dataStorage);
  addValue(
    "DEPLOYMENT ENVIRONMENT",
    enquiry.existingSystem.deploymentEnvironment,
  );
  addList("CURRENT PROBLEMS", enquiry.problems);
  addList(
    "REQUESTED CAPABILITIES",
    enquiry.requestedCapabilities,
  );
  addList("CONSTRAINTS", enquiry.constraints);
  addList("TECHNICAL RISKS", enquiry.technicalRisks);
  addList("ASSUMPTIONS", enquiry.assumptions);
  addList("OPEN QUESTIONS", enquiry.openQuestions);
  addList(
    "CRITICAL INFORMATION STILL NEEDED",
    enquiry.readiness.missingCriticalInformation,
  );

  lines.push(
    "Prepared from the structured Project State. This draft does not imply project acceptance, price, timeline, or delivery commitment.",
  );

  return lines.join("\n");
}
