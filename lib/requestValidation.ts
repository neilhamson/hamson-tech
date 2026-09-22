import type { UIMessage } from "ai";

import {
  MAX_CHAT_MESSAGES,
  MAX_INPUT_CHARS,
  MAX_REQUEST_BYTES,
} from "@/lib/interfaceLimits";

type ValidationResult =
  | { ok: true; messages: UIMessage[] }
  | { ok: false; response: Response };

function jsonError(message: string, status: number) {
  return Response.json(
    { error: message },
    {
      status,
      headers: {
        "Cache-Control": "no-store",
      },
    },
  );
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function userTextLength(message: Record<string, unknown>): number {
  if (message.role !== "user" || !Array.isArray(message.parts)) {
    return 0;
  }

  return message.parts.reduce((total, part) => {
    if (
      isRecord(part) &&
      part.type === "text" &&
      typeof part.text === "string"
    ) {
      return total + part.text.length;
    }

    return total;
  }, 0);
}

export async function readValidatedMessages(
  req: Request,
): Promise<ValidationResult> {
  const contentLength = req.headers.get("content-length");

  if (contentLength) {
    const declaredBytes = Number(contentLength);

    if (
      Number.isFinite(declaredBytes) &&
      declaredBytes > MAX_REQUEST_BYTES
    ) {
      return {
        ok: false,
        response: jsonError("Request is too large.", 413),
      };
    }
  }

  let rawBody: string;

  try {
    rawBody = await req.text();
  } catch {
    return {
      ok: false,
      response: jsonError("Request body could not be read.", 400),
    };
  }

  if (new TextEncoder().encode(rawBody).byteLength > MAX_REQUEST_BYTES) {
    return {
      ok: false,
      response: jsonError("Request is too large.", 413),
    };
  }

  let body: unknown;

  try {
    body = JSON.parse(rawBody);
  } catch {
    return {
      ok: false,
      response: jsonError("Request body must be valid JSON.", 400),
    };
  }

  if (!isRecord(body) || !Array.isArray(body.messages)) {
    return {
      ok: false,
      response: jsonError("Messages are required.", 400),
    };
  }

  if (
    body.messages.length === 0 ||
    body.messages.length > MAX_CHAT_MESSAGES
  ) {
    return {
      ok: false,
      response: jsonError("Conversation limit exceeded.", 413),
    };
  }

  let hasUserText = false;

  for (const message of body.messages) {
    if (!isRecord(message)) {
      return {
        ok: false,
        response: jsonError("Invalid message format.", 400),
      };
    }

    if (
      message.role !== "user" &&
      message.role !== "assistant" &&
      message.role !== "system"
    ) {
      return {
        ok: false,
        response: jsonError("Invalid message role.", 400),
      };
    }

    if (!Array.isArray(message.parts)) {
      return {
        ok: false,
        response: jsonError("Invalid message parts.", 400),
      };
    }

    for (const part of message.parts) {
      if (!isRecord(part) || typeof part.type !== "string") {
        return {
          ok: false,
          response: jsonError("Invalid message part.", 400),
        };
      }

      if (
        part.type === "text" &&
        typeof part.text !== "string"
      ) {
        return {
          ok: false,
          response: jsonError("Invalid text message part.", 400),
        };
      }
    }

    const textLength = userTextLength(message);

    if (textLength > 0) {
      hasUserText = true;
    }

    if (textLength > MAX_INPUT_CHARS) {
      return {
        ok: false,
        response: jsonError("Message is too long.", 413),
      };
    }
  }

  if (!hasUserText) {
    return {
      ok: false,
      response: jsonError("A user message is required.", 400),
    };
  }

  return {
    ok: true,
    messages: body.messages as UIMessage[],
  };
}
