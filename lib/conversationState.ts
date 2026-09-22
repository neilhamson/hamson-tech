import { z } from "zod";

export const conversationStateSchema = z.object({
  mode: z.enum([
    "general",
    "evidence",
    "project_enquiry",
    "contact",
  ]),

  objective: z.string().nullable(),

  organisation: z.object({
    type: z.string().nullable(),
    sector: z.string().nullable(),
  }),

  existingSystem: z.object({
    summary: z.string().nullable(),
    technologies: z.array(z.string()),
    dataStorage: z.string().nullable(),
    deploymentEnvironment: z.string().nullable(),
  }),

  problems: z.array(z.string()),

  requirements: z.array(z.string()),

  constraints: z.array(z.string()),

  assumptions: z.array(z.string()),

  risks: z.array(z.string()),

  unknowns: z.array(z.string()),

  readiness: z.object({
    status: z.enum([
      "early",
      "developing",
      "ready",
    ]),
    score: z.number().int().min(0).max(100),
    missingCriticalInformation: z.array(z.string()),
  }),
});

export type ConversationState = z.infer<
  typeof conversationStateSchema
>;

export const emptyConversationState: ConversationState = {
  mode: "general",

  objective: null,

  organisation: {
    type: null,
    sector: null,
  },

  existingSystem: {
    summary: null,
    technologies: [],
    dataStorage: null,
    deploymentEnvironment: null,
  },

  problems: [],

  requirements: [],

  constraints: [],

  assumptions: [],

  risks: [],

  unknowns: [],

  readiness: {
    status: "early",
    score: 0,
    missingCriticalInformation: [],
  },
};