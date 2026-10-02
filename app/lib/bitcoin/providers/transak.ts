import type {
  BitcoinBuyProviderAdapter,
  BitcoinBuySession,
  CreateBitcoinBuySessionInput,
} from "./types";

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

type CachedAccessToken = {
  token: string;
  expiresAt: number;
};

let cachedAccessToken: CachedAccessToken | null = null;

async function getAccessToken(
  apiKey: string,
  apiSecret: string,
) {
  const nowSeconds = Math.floor(Date.now() / 1000);

  if (
    cachedAccessToken &&
    cachedAccessToken.expiresAt > nowSeconds + 60
  ) {
    return cachedAccessToken.token;
  }

  const response = await fetch(
    "https://api-stg.transak.com/partners/api/v2/refresh-token",
    {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        "api-secret": apiSecret,
        "x-api-key": apiKey,
      },
      body: JSON.stringify({
        apiKey,
      }),
      cache: "no-store",
    },
  );

  const data =
    (await response.json()) as TransakTokenResponse;

  if (!response.ok) {
    throw new Error(
      `Transak access-token request failed with status ${response.status}.`,
    );
  }

  const accessToken =
    data.data?.accessToken;

  const expiresAt =
    data.data?.expiresAt;

  if (
    !accessToken ||
    typeof expiresAt !== "number"
  ) {
    throw new Error(
      "Transak did not return a valid access token and expiry.",
    );
  }

  cachedAccessToken = {
    token: accessToken,
    expiresAt,
  };

  return accessToken;
}

class TransakBuyProvider
  implements BitcoinBuyProviderAdapter
{
  readonly provider = "transak" as const;

  async createSession(
    input: CreateBitcoinBuySessionInput,
  ): Promise<BitcoinBuySession> {
    const apiKey =
      process.env.TRANSAK_API_KEY;

    const apiSecret =
      process.env.TRANSAK_API_SECRET;

    if (!apiKey || !apiSecret) {
      throw new Error(
        "Transak credentials are not configured.",
      );
    }

    const accessToken =
      await getAccessToken(
        apiKey,
        apiSecret,
      );

    const response = await fetch(
      "https://api-gateway-stg.transak.com/api/v2/auth/session",
      {
        method: "POST",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
          "access-token": accessToken,
          "x-api-key": apiKey,
          "x-user-ip": input.userIp,
        },
        body: JSON.stringify({
          widgetParams: {
            apiKey,
            referrerDomain: input.referrerDomain,
            productsAvailed: "BUY",
            fiatAmount: input.fiatAmount,
            fiatCurrency: input.fiatCurrency,
            cryptoCurrencyCode: input.cryptoCurrency,
            network: input.network,
          },
        }),
        cache: "no-store",
      },
    );

    const data =
      (await response.json()) as TransakWidgetResponse;

    if (!response.ok) {
      throw new Error(
        `Transak widget-session request failed with status ${response.status}.`,
      );
    }

    const widgetUrl =
      data.data?.widgetUrl;

    if (!widgetUrl) {
      throw new Error(
        "Transak did not return a widget URL.",
      );
    }

    return {
      provider: this.provider,
      checkoutUrl: widgetUrl,
    };
  }
}

export const transakBuyProvider =
  new TransakBuyProvider();