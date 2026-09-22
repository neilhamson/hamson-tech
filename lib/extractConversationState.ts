import { xai } from "@ai-sdk/xai";
import { generateText, Output, type UIMessage } from "ai";

import {
  conversationStateSchema,
  emptyConversationState,
  type ConversationState,
} from "@/lib/conversationState";

function messageText(message: UIMessage): string {
  return message.parts
    .filter((part) => part.type === "text")
    .map((part) => part.text)
    .join("\n")
    .trim();
}

export async function extractConversationState(
  messages: UIMessage[],
  previousState: ConversationState = emptyConversationState,
): Promise<ConversationState> {
  const transcript = messages
    .map((message) => {
      const text = messageText(message);

      if (!text) {
        return null;
      }

      return `${message.role.toUpperCase()}:\n${text}`;
    })
    .filter(Boolean)
    .join("\n\n");

  if (!transcript) {
    return previousState;
  }

  const { output } = await generateText({
    model: xai.responses("grok-4.3"),

    output: Output.object({
      name: "ConversationState",
      description:
        "Structured state extracted from a website visitor conversation.",
      schema: conversationStateSchema,
    }),

    prompt: `
Update the structured conversation state from the transcript.

CORE RULES

- Preserve previously established information unless the visitor explicitly
  corrects or replaces it.
- Extract only information stated by the visitor or directly implied by
  ordinary language.
- Do not invent project facts.
- Do not infer Neil Hamson's capabilities, pricing, availability, experience,
  delivery dates, contractual terms, or willingness to accept work.
- Do not treat assistant questions as facts about the visitor's project.

CLASSIFICATION RULES

OBJECTIVE
The principal outcome the visitor wants to achieve.

ORGANISATION
If the visitor says "company", "business", "charity", "university",
"individual", or another clear organisation type, record it.
Record the sector separately where stated or directly described.
Example:
"engineering company"
type = "company"
sector = "engineering"

EXISTING SYSTEM
Describe only the system the visitor says currently exists.
Technologies should contain named languages, frameworks, databases,
platforms, or infrastructure.

PROBLEMS
Current deficiencies or pain points.
Examples:
"difficult to maintain"
"slow"
"manual process"

REQUIREMENTS
Capabilities or outcomes the future solution should provide.
Examples:
"browser-based interface"
"automated reporting"
"support multiple users"

CONSTRAINTS
Conditions that must not be violated or must be preserved.
Examples:
"must preserve existing data"
"cannot interrupt production"
"must remain on-premises"

ASSUMPTIONS
Only include something here when it is a useful working assumption but has
not been confirmed by the visitor.
Do not silently turn assumptions into facts.

RISKS
Potential technical or delivery problems arising from the known project state.
A risk may be inferred, but it must be technically justified by supplied
information.
Do not repeat ordinary requirements as risks.

UNKNOWNS
List important information that has not yet been established and would
materially affect technical understanding or project scoping.

READINESS

Readiness means readiness to create a useful INITIAL PROJECT ENQUIRY.
It does not mean readiness to start development.

Use:

early:
Only basic intent or very limited project information is known.

developing:
The objective and several useful facts are known, but important discovery
information is still missing.

ready:
Enough information exists to create a meaningful initial enquiry for Neil,
although detailed technical discovery may still be required.

Score from 0 to 100.
Do not inflate the score.

CONSISTENCY RULES

- Every item in readiness.missingCriticalInformation must also be represented
  meaningfully in unknowns.
- Do not place the same statement into several categories unless it genuinely
  serves different purposes.
- Preservation requirements such as "without losing existing data" belong
  primarily in constraints.
- Null means genuinely unknown.
- Empty arrays mean there are currently no justified entries.

PREVIOUS STATE

${JSON.stringify(previousState, null, 2)}

CONVERSATION

${transcript}
`,
  });

  return output;
}