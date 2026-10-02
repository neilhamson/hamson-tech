import { NextRequest, NextResponse } from "next/server";

import { getBitcoinBuyProvider } from "@/app/lib/bitcoin/providers";

type BuySessionRequest = {
  amount?: unknown;
};

function getUserIp(request: NextRequest) {
  const cloudflareIp =
    request.headers.get("cf-connecting-ip")?.trim();

  if (cloudflareIp) {
    return cloudflareIp;
  }

  const forwardedFor =
    request.headers.get("x-forwarded-for");

  if (forwardedFor) {
    const firstForwardedIp =
      forwardedFor
        .split(",")[0]
        ?.trim();

    if (firstForwardedIp) {
      return firstForwardedIp;
    }
  }

  const realIp =
    request.headers.get("x-real-ip")?.trim();

  if (realIp) {
    return realIp;
  }

  return null;
}

function getReferrerDomain(request: NextRequest) {
  const forwardedHost =
    request.headers.get("x-forwarded-host")?.trim();

  if (forwardedHost) {
    return forwardedHost;
  }

  const host =
    request.headers.get("host")?.trim();

  if (host) {
    return host;
  }

  return null;
}

export async function POST(request: NextRequest) {
  let requestBody: BuySessionRequest;

  try {
    requestBody =
      (await request.json()) as BuySessionRequest;
  } catch {
    return NextResponse.json(
      {
        ok: false,
        stage: "request",
        error:
          "Request body must contain valid JSON.",
      },
      {
        status: 400,
      },
    );
  }

  const amount =
    typeof requestBody.amount === "number"
      ? requestBody.amount
      : Number(requestBody.amount);

  if (
    !Number.isFinite(amount) ||
    amount <= 0
  ) {
    return NextResponse.json(
      {
        ok: false,
        stage: "request",
        error:
          "A valid positive GBP amount is required.",
      },
      {
        status: 400,
      },
    );
  }

  const userIp =
    getUserIp(request);

  if (!userIp) {
    return NextResponse.json(
      {
        ok: false,
        stage: "client-ip",
        error:
          "Unable to determine end-user IP.",
      },
      {
        status: 400,
      },
    );
  }

  const referrerDomain =
    getReferrerDomain(request);

  if (!referrerDomain) {
    return NextResponse.json(
      {
        ok: false,
        stage: "referrer-domain",
        error:
          "Unable to determine request domain.",
      },
      {
        status: 400,
      },
    );
  }

  try {
    const provider =
      getBitcoinBuyProvider();

    const session =
      await provider.createSession({
        fiatAmount: amount,
        fiatCurrency: "GBP",
        cryptoCurrency: "BTC",
        network: "bitcoin",
        userIp,
        referrerDomain,
      });

    return NextResponse.json({
      ok: true,
      provider: session.provider,
      widgetUrl: session.checkoutUrl,
    });
  } catch {
    return NextResponse.json(
      {
        ok: false,
        stage: "provider",
        error:
          "Unable to create Bitcoin purchase session.",
      },
      {
        status: 502,
      },
    );
  }
}