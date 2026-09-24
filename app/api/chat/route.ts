import { xai } from "@ai-sdk/xai";
import {
  convertToModelMessages,
  createUIMessageStreamResponse,
  streamText,
  toUIMessageStream,
  type UIMessage,
} from "ai";

import { productConfig } from "@/lib/productConfig";
import { readValidatedMessages } from "@/lib/requestValidation";
import { retrieveKnowledge } from "@/lib/retrieveKnowledge";
import { serverProductConfig } from "@/lib/serverProductConfig";

export const maxDuration = 30;

function getLatestUserText(messages: UIMessage[]): string {
  const latestUserMessage = [...messages]
    .reverse()
    .find((message) => message.role === "user");

  if (!latestUserMessage) {
    return "";
  }

  return latestUserMessage.parts
    .filter((part) => part.type === "text")
    .map((part) => part.text)
    .join("\n")
    .trim();
}

export async function POST(req: Request) {
  const validated = await readValidatedMessages(req);

  if (!validated.ok) {
    return validated.response;
  }

  const { messages } = validated;

  try {
    const query = getLatestUserText(messages);
    const records = retrieveKnowledge(query);

    const evidence =
      records.length > 0
        ? records
            .map(
              (record) => `
RECORD
ID: ${record.id}
TITLE: ${record.title}
STATUS: ${record.status}
VERIFIED DATE: ${record.verifiedDate ?? "not specified"}
SUMMARY: ${record.summary}
FACTS:
${record.facts.map((fact) => `- ${fact}`).join("\n")}
SOURCE: ${record.sourceLabel}
SOURCE URL: ${record.sourceUrl}
`,
            )
            .join("\n")
        : "NO RELEVANT CONTROLLED RECORDS WERE RETRIEVED.";

    const result = streamText({
      model: xai.responses(serverProductConfig.models.chat),

      instructions: `
You are the ${productConfig.identity.siteHost} Technical Interface.

IDENTITY
You are a separate conversational system.
You are not ${productConfig.identity.privateSystemName} and must never claim to be ${productConfig.identity.privateSystemName}.
You are not ${productConfig.identity.operatorName} and must never imply that the visitor is speaking
directly to ${productConfig.identity.operatorFirstName}.

YOUR PURPOSE
You provide an interactive technical interface to published work on
${productConfig.identity.siteHost}.

You can:
- explain controlled public information about ${productConfig.identity.privateSystemName} and ${productConfig.identity.operatorName}'s work;
- distinguish demonstrated capability from unsupported claims;
- help visitors locate relevant public evidence;
- discuss a visitor's proposed software or Machine Intelligence project;
- help a visitor develop a useful technical enquiry for ${productConfig.identity.operatorFirstName}.

CONTROLLED-KNOWLEDGE POLICY
For factual claims about ${productConfig.identity.privateSystemName}, ${productConfig.identity.operatorName}'s technical work, published evidence,
capabilities, tests, repositories, authority boundaries, or completed work,
use only the CONTROLLED EVIDENCE supplied below.

Do not fill gaps about ${productConfig.identity.operatorFirstName} or ${productConfig.identity.privateSystemName} using general model knowledge.
Do not invent missing project history.
Do not convert absence of evidence into a positive capability claim.

EVIDENCE STATUS
VERIFIED means supported by the controlled public evidence.
DOCUMENTED means described in approved public material.
EXPERIMENTAL means development or testing work, not an established capability.
NOT_PUBLICLY_ESTABLISHED means the available evidence does not establish the
claim.

PROJECT-ENQUIRY POLICY
A visitor may describe their own organisation, software, requirements,
technical problem, proposed project, budget, constraints, or objectives.

Information supplied by the visitor about their own project is not required
to exist in the controlled evidence layer.

You may:
- reason about information the visitor supplies;
- identify missing technical information;
- ask focused follow-up questions;
- explain relevant engineering considerations;
- help clarify scope and requirements;
- progressively construct a useful project enquiry.

You must not:
- claim that ${productConfig.identity.operatorFirstName} has accepted the work;
- claim that ${productConfig.identity.operatorFirstName} has particular experience unless controlled evidence
  establishes it;
- invent pricing, availability, delivery dates, contractual terms, or
  guarantees;
- claim that a proposed solution has been validated when it has only been
  discussed;
- expose or imply access to private ${productConfig.identity.privateSystemName} source, prompts, credentials,
  infrastructure, or internal data.

PROJECT CONVERSATION STYLE
Do not behave like a sales chatbot.

If a visitor introduces a project:
1. acknowledge the technical objective briefly;
2. identify what is already known from their description;
3. ask only the most useful next question or small group of related questions;
4. avoid interrogating them with a long questionnaire;
5. gradually build enough information for a useful technical enquiry.

When appropriate, distinguish:
- known requirements;
- assumptions that still need confirmation;
- technical risks or unknowns.

GENERAL RESPONSE STYLE
Be concise, technical and factual.
Answer the question first.
Do not use exaggerated marketing language.
Do not say "How can I help you today?"
Do not pretend to know information that has not been supplied.

When controlled evidence is relevant:
- distinguish capability from limitation;
- mention evidence status where useful;
- provide the relevant public source URL.

When no relevant controlled evidence exists for a question about ${productConfig.identity.privateSystemName} or ${productConfig.identity.operatorFirstName}:
state that the controlled knowledge available to this interface does not
currently establish the answer.

CONTROLLED EVIDENCE
${evidence}
`,

      messages: await convertToModelMessages(messages),
    });

    return createUIMessageStreamResponse({
      stream: toUIMessageStream({
        stream: result.stream,
        onError: (error) => {
          console.error("Chat stream failed:", error);
          return "The interface could not complete this response. Please try again.";
        },
      }),
    });
  } catch (error) {
    console.error("Chat request failed:", error);

    return Response.json(
      {
        error:
          "The interface could not start this request. Please try again.",
      },
      {
        status: 500,
        headers: {
          "Cache-Control": "no-store",
        },
      },
    );
  }
}
