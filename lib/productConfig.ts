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
      "Hamson Software product or investor enquiry",
  },

  enquiry: {
    documentTitle: "HAMSON SOFTWARE — ENQUIRY",
  },

  launcher: {
    ariaLabel: "Hamson Software live interface",
    eyebrow: "HAMSON.SOFTWARE / LIVE INTERFACE",
    title: "Explore the systems.",
    emptyState:
      "Ask about Hamson Software, the live interface, Hamson Bitcoin, MI1 R&D or published technical material.",
    inputPlaceholder:
      "Ask about Hamson Software products, Bitcoin, MI1 R&D or published evidence...",
    closedLabel: "ASK HAMSON.TECH",
    openLabel: "CLOSE INTERFACE",
    closedSubtitle: "SOFTWARE · BITCOIN · MI1 R&D",
    openSubtitle: "LIVE INTERFACE OPEN",
    emailLabel: "CONTACT HAMSON SOFTWARE",
    copyBlockedMessage:
      "Clipboard access was blocked. You can still contact Hamson Software directly.",
    copyIdleMessage:
      "Nothing is sent automatically.",
    prompts: [
      {
        label: "INTERFACE",
        text: "What can the Hamson Technical Interface do?",
        mode: "general",
      },
      {
        label: "BITCOIN",
        text: "What is Hamson Bitcoin and what can I use now?",
        mode: "general",
      },
      {
        label: "MI1 R&D",
        text: "What has MI1 actually demonstrated?",
        mode: "general",
      },
      {
        label: "CONTACT",
        text: "How can I contact Hamson Software about a product or investment enquiry?",
        mode: "contact",
      },
    ],
  },

  technicalInterface: {
    ariaLabel: "Hamson Software Live Interface",
    title: "Use the live interface.",
    intro:
      "Hamson Software products · Hamson Bitcoin · private MI1 R&D",
    queryPlaceholder:
      "Ask about Hamson Software products, Hamson Bitcoin, MI1 R&D or published evidence...",
    emailLabel: "CONTACT HAMSON SOFTWARE",
    copyBlockedMessage:
      "Your browser blocked clipboard access. You can still contact Hamson Software directly.",
    copyIdleMessage:
      "Nothing is sent automatically.",
    footerStatusLabels: [
      "LIVE PRODUCT INTERFACE",
      "PUBLIC PRODUCT INFORMATION",
      "NOT MI1",
    ],
    disclaimer:
      "This public interface provides information about Hamson Software products and published technical material. It is a separate system and does not expose or operate the private MI1 core.",
    prompts: [
      {
        label: "LIVE INTERFACE",
        text: "What can the Hamson Technical Interface do?",
        mode: "general",
      },
      {
        label: "HAMSON BITCOIN",
        text: "What is Hamson Bitcoin and what can I use now?",
        mode: "general",
      },
      {
        label: "MI1 R&D",
        text: "What has MI1 actually demonstrated?",
        mode: "general",
      },
      {
        label: "CONTACT",
        text: "How can I contact Hamson Software about a product or investment enquiry?",
        mode: "contact",
      },
    ],
  },
} as const satisfies ProductConfig;

export function projectMailtoHref(): string {
  const subject = encodeURIComponent(productConfig.contact.projectEmailSubject);

  return `mailto:${productConfig.contact.email}?subject=${subject}`;
}