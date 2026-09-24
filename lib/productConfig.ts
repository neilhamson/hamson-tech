export type WorkflowMode = "general" | "project_enquiry" | "contact";

export type ProductPrompt = Readonly<{
  label: string;
  text: string;
  mode: WorkflowMode;
}>;

export type ProductConfig = Readonly<{
  identity: Readonly<{
    siteName: string;
    siteHost: string;
    technicalInterfaceName: string;
    operatorName: string;
    operatorFirstName: string;
    privateSystemName: string;
  }>;

  contact: Readonly<{
    email: string;
    projectEmailSubject: string;
  }>;

  enquiry: Readonly<{
    documentTitle: string;
  }>;

  launcher: Readonly<{
    ariaLabel: string;
    eyebrow: string;
    title: string;
    emptyState: string;
    inputPlaceholder: string;
    closedLabel: string;
    openLabel: string;
    closedSubtitle: string;
    openSubtitle: string;
    emailLabel: string;
    copyBlockedMessage: string;
    copyIdleMessage: string;
    prompts: readonly ProductPrompt[];
  }>;

  technicalInterface: Readonly<{
    ariaLabel: string;
    title: string;
    intro: string;
    queryPlaceholder: string;
    emailLabel: string;
    copyBlockedMessage: string;
    copyIdleMessage: string;
    footerStatusLabels: readonly [string, string, string];
    disclaimer: string;
    prompts: readonly ProductPrompt[];
  }>;
}>;

/**
 * Public-safe product configuration.
 *
 * This object contains customer-facing identity, copy and workflow defaults.
 * It must never contain API keys, credentials or other secrets because it can
 * be imported by client components.
 *
 * The initial values intentionally reproduce the current hamson.tech product
 * behaviour so the configuration boundary can be introduced before changing
 * any live customer-facing behaviour.
 */
export const productConfig = {
  identity: {
    siteName: "HAMSON.TECH",
    siteHost: "hamson.tech",
    technicalInterfaceName: "Hamson Technical Interface",
    operatorName: "Neil Hamson",
    operatorFirstName: "Neil",
    privateSystemName: "MI1",
  },

  contact: {
    email: "neil@hamson.tech",
    projectEmailSubject:
      "Software project enquiry via Hamson Technical Interface",
  },

  enquiry: {
    documentTitle: "HAMSON TECHNICAL INTERFACE — PROJECT ENQUIRY",
  },

  launcher: {
    ariaLabel: "Hamson technical chat",
    eyebrow: "HAMSON.TECH / TECHNICAL CHAT",
    title: "Ask about the work.",
    emptyState:
      "Ask about MI1, published evidence, software engineering, services, or a project.",
    inputPlaceholder: "Ask a question or describe a project...",
    closedLabel: "ASK HAMSON.TECH",
    openLabel: "CLOSE INTERFACE",
    closedSubtitle: "MI1 · SOFTWARE · PROJECTS",
    openSubtitle: "TECHNICAL CHAT OPEN",
    emailLabel: "EMAIL NEIL",
    copyBlockedMessage:
      "Clipboard access was blocked. You can still email Neil directly.",
    copyIdleMessage:
      "Nothing is sent automatically. Copy the draft, then email it to Neil.",
    prompts: [
      {
        label: "MI1",
        text: "What has MI1 actually demonstrated?",
        mode: "general",
      },
      {
        label: "PROJECT",
        text: "I have a software project I would like to discuss.",
        mode: "project_enquiry",
      },
      {
        label: "CONTACT",
        text: "I would like to contact Neil about working together.",
        mode: "contact",
      },
    ],
  },

  technicalInterface: {
    ariaLabel: "Hamson Technical Interface",
    title: "Ask about the work.",
    intro: "MI1 evidence · software engineering · project enquiries",
    queryPlaceholder:
      "Ask about MI1, evidence, Neil's work, or describe a project...",
    emailLabel: "EMAIL NEIL",
    copyBlockedMessage:
      "Your browser blocked clipboard access. You can still email Neil directly and copy the visible draft manually.",
    copyIdleMessage:
      "Copy the prepared enquiry, then email it to Neil. Nothing is sent automatically.",
    footerStatusLabels: [
      "CONTROLLED PUBLIC SOURCES",
      "EVIDENCE-AWARE",
      "NOT MI1",
    ],
    disclaimer:
      "This interface provides access to published material and technical evidence. It is a separate system and does not expose or operate the private MI1 core.",
    prompts: [
      {
        label: "EXPLORE MI1",
        text: "What has MI1 actually demonstrated?",
        mode: "general",
      },
      {
        label: "VIEW EVIDENCE",
        text: "Show me the public technical evidence for MI1.",
        mode: "general",
      },
      {
        label: "DISCUSS A PROJECT",
        text: "I have a software project I would like to discuss.",
        mode: "project_enquiry",
      },
      {
        label: "CONTACT NEIL",
        text: "I would like to contact Neil about working together.",
        mode: "contact",
      },
    ],
  },
} as const satisfies ProductConfig;

export function projectMailtoHref(): string {
  const subject = encodeURIComponent(productConfig.contact.projectEmailSubject);

  return `mailto:${productConfig.contact.email}?subject=${subject}`;
}
