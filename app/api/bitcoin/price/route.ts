type CoinMarketCapResponse = {
  data?: Array<{
    id: number;
    name: string;
    symbol: string;
    quotes?: Array<{
      symbol: string;
      price: number;
      percent_change_24h?: number;
      last_updated?: string;
    }>;
  }>;
  status?: {
    error_code?: number | string;
    error_message?: string;
  };
};

export async function GET() {
  const apiKey = process.env.COINMARKETCAP_API_KEY;

  if (!apiKey) {
    return Response.json(
      { error: "CoinMarketCap API key is not configured." },
      {
        status: 500,
        headers: {
          "Cache-Control": "no-store",
        },
      },
    );
  }

  const url = new URL(
    "https://pro-api.coinmarketcap.com/v2/simple/price",
  );

  url.searchParams.set("id", "1");
  url.searchParams.set("convert", "GBP");
  url.searchParams.set("include_24h_change", "true");
  url.searchParams.set("include_last_updated", "true");

  try {
    const response = await fetch(url.toString(), {
      headers: {
        Accept: "application/json",
        "X-CMC_PRO_API_KEY": apiKey,
      },
      next: {
        revalidate: 180,
      },
    });

    if (!response.ok) {
      console.error(
        "CoinMarketCap request failed:",
        response.status,
        response.statusText,
      );

      return Response.json(
        { error: "Bitcoin market data is temporarily unavailable." },
        {
          status: 502,
          headers: {
            "Cache-Control": "no-store",
          },
        },
      );
    }

    const payload =
      (await response.json()) as CoinMarketCapResponse;

    const bitcoin = payload.data?.find((asset) => asset.id === 1);

    const gbpQuote = bitcoin?.quotes?.find(
      (quote) => quote.symbol === "GBP",
    );

    if (!gbpQuote || typeof gbpQuote.price !== "number") {
      throw new Error(
        "CoinMarketCap response did not contain a BTC/GBP price.",
      );
    }

    return Response.json(
      {
        symbol: "BTC",
        currency: "GBP",
        price: gbpQuote.price,
        percentChange24h:
          typeof gbpQuote.percent_change_24h === "number"
            ? gbpQuote.percent_change_24h
            : null,
        lastUpdated: gbpQuote.last_updated ?? null,
        source: "CoinMarketCap",
      },
      {
        headers: {
          "Cache-Control": "no-store",
        },
      },
    );
  } catch (error) {
    console.error("Bitcoin price request failed:", error);

    return Response.json(
      { error: "Bitcoin market data is temporarily unavailable." },
      {
        status: 502,
        headers: {
          "Cache-Control": "no-store",
        },
      },
    );
  }
}