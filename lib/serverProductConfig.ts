export type ServerProductConfig = Readonly<{
  models: Readonly<{
    chat: string;
    projectState: string;
  }>;
}>;

/**
 * Server-only product settings that are not customer-facing UI configuration.
 *
 * No API key is stored here. The current xAI provider reads XAI_API_KEY from
 * the server environment, matching the existing production deployment.
 */
export const serverProductConfig = {
  models: {
    chat: "grok-4.6",
    projectState: "grok-4.3",
  },
} as const satisfies ServerProductConfig;
