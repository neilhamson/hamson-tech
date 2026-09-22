import { extractConversationState } from "@/lib/extractConversationState";
import { readValidatedMessages } from "@/lib/requestValidation";

export async function POST(req: Request) {
  const validated = await readValidatedMessages(req);

  if (!validated.ok) {
    return validated.response;
  }

  try {
    const state = await extractConversationState(
      validated.messages,
    );

    return Response.json(state, {
      headers: {
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error("Project state request failed:", error);

    return Response.json(
      { error: "Project State could not be updated." },
      {
        status: 500,
        headers: {
          "Cache-Control": "no-store",
        },
      },
    );
  }
}
