import { NextRequest, NextResponse } from "next/server";

type TransakTokenResponse = {
  data?: {
    accessToken?: string;
    expiresAt?: number;
  };
};

type TransakWidgetResponse = {
  data?: {
    widgetUrl?: string;
  };
};

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

export async function POST(request: NextRequest) {
  const apiKey =
    process.env.TRANSAK_API_KEY;

  const apiSecret =
    process.env.TRANSAK_API_SECRET;

  if (!apiKey || !apiSecret) {
    return NextResponse.json(
      {
        ok: false,
        stage: "configuration",
        error:
          "Transak credentials are not configured.",
      },
      {
        status: 500,
      },
    );
  }

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

  try {
    /*
     * STEP 1
     * Generate Transak Partner Access Token.
     */

    const tokenResponse =
      await fetch(
        "https://api-stg.transak.com/partners/api/v2/refresh-token",
        {
          method: "POST",

          headers: {
            accept: "application/json",
            "content-type": "application/json",
            "api-secret": apiSecret,
          },

          body: JSON.stringify({
            apiKey,
          }),

          cache: "no-store",
        },
      );

    const tokenData =
      (await tokenResponse.json()) as TransakTokenResponse;

    if (!tokenResponse.ok) {
      return NextResponse.json(
        {
          ok: false,
          stage: "access-token",
          status: tokenResponse.status,
          error:
            "Transak access-token request failed.",
        },
        {
          status: 502,
        },
      );
    }

    const accessToken =
      tokenData.data?.accessToken;

    if (!accessToken) {
      return NextResponse.json(
        {
          ok: false,
          stage: "access-token",
          error:
            "Transak did not return an access token.",
        },
        {
          status: 502,
        },
      );
    }

    /*
     * STEP 2
     * Create a secure Transak Staging Widget URL
     * using the GBP amount supplied by Hamson Bitcoin.
     */

    const widgetResponse =
      await fetch(
        "https://api-gateway-stg.transak.com/api/v2/auth/session",
        {
          method: "POST",

          headers: {
            accept: "application/json",
            "content-type": "application/json",
            "access-token": accessToken,
            "x-api-key": apiKey,
            "x-user-ip": userIp,
          },

          body: JSON.stringify({
            widgetParams: {
              apiKey,
              referrerDomain: "localhost",
              productsAvailed: "BUY",
              fiatAmount: amount,
              fiatCurrency: "GBP",
              cryptoCurrencyCode: "BTC",
              network: "bitcoin",
            },
          }),

          cache: "no-store",
        },
      );

    const widgetData =
      (await widgetResponse.json()) as TransakWidgetResponse;

    if (!widgetResponse.ok) {
      return NextResponse.json(
        {
          ok: false,
          stage: "widget-url",
          status: widgetResponse.status,
          error:
            "Transak widget-session request failed.",
        },
        {
          status: 502,
        },
      );
    }

    const widgetUrl =
      widgetData.data?.widgetUrl;

    if (!widgetUrl) {
      return NextResponse.json(
        {
          ok: false,
          stage: "widget-url",
          error:
            "Transak did not return a widget URL.",
        },
        {
          status: 502,
        },
      );
    }

    return NextResponse.json({
      ok: true,
      widgetUrl,
    });
  } catch {
    return NextResponse.json(
      {
        ok: false,
        stage: "transak-request",
        error:
          "Unable to complete the Transak staging request.",
      },
      {
        status: 502,
      },
    );
  }
}