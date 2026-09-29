type CoinMarketCapHistoricalResponse = {
  data?: Record<
    string,
    {
      id?: number;
      name?: string;
      symbol?: string;
      quotes?: Array<{
        timestamp?: string;
        quote?: {
          GBP?: {
            price?: number;
          };
        };
      }>;
    }
  >;
  status?: {
    error_code?: number | string;
    error_message?: string | null;
  };
};

type HistoricalPoint = {
  timestamp: string;
  price: number;
};

function isFinitePositiveNumber(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value) && value > 0;
}

type RangeKey = "24H" | "7D" | "30D" | "1Y";

type RangeConfig = {
  count: string;
  interval: string;
};

const RANGE_CONFIG: Record<RangeKey, RangeConfig> = {
  "24H": { count: "24", interval: "1h" },
  "7D": { count: "28", interval: "6h" },
  "30D": { count: "30", interval: "24h" },
  "1Y": { count: "52", interval: "7d" },
};

function parseRange(value: string | null): RangeKey {
  if (value && Object.prototype.hasOwnProperty.call(RANGE_CONFIG, value)) {
    return value as RangeKey;
  }

  return "24H";
}

export async function GET(request: Request) {
  const apiKey = process.env.COINMARKETCAP_API_KEY;
  const requestUrl = new URL(request.url);
  const range = parseRange(requestUrl.searchParams.get("range"));
  const config = RANGE_CONFIG[range];

  if (!apiKey) {
    return Response.json(
      { error: "CoinMarketCap API key is not configured." },
      { status: 500, headers: { "Cache-Control": "no-store" } },
    );
  }

  const url = new URL(
    "https://pro-api.coinmarketcap.com/v3/cryptocurrency/quotes/historical",
  );

  url.searchParams.set("id", "1");
  url.searchParams.set("convert", "GBP");
  url.searchParams.set("count", config.count);
  url.searchParams.set("interval", config.interval);

  try {
    const response = await fetch(url.toString(), {
      headers: {
        Accept: "application/json",
        "X-CMC_PRO_API_KEY": apiKey,
      },
      next: { revalidate: 300 },
    });

    if (!response.ok) {
      console.error(
        "CoinMarketCap historical request failed:",
        response.status,
        response.statusText,
      );

      return Response.json(
        { error: "Bitcoin historical market data is temporarily unavailable." },
        { status: 502, headers: { "Cache-Control": "no-store" } },
      );
    }

    const payload =
      (await response.json()) as CoinMarketCapHistoricalResponse;

    const asset =
      payload.data?.["1"] ??
      Object.values(payload.data ?? {}).find((candidate) => candidate.id === 1);

    const points: HistoricalPoint[] = (asset?.quotes ?? [])
      .map((entry) => {
        const timestamp = entry.timestamp;
        const price = entry.quote?.GBP?.price;

        if (typeof timestamp !== "string" || !isFinitePositiveNumber(price)) {
          return null;
        }

        return { timestamp, price };
      })
      .filter((point): point is HistoricalPoint => point !== null)
      .sort(
        (a, b) =>
          new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime(),
      );

    if (points.length < 2) {
      throw new Error(
        "CoinMarketCap historical response did not contain enough valid BTC/GBP points.",
      );
    }

    const prices = points.map((point) => point.price);
    const first = points[0].price;
    const latest = points[points.length - 1].price;
    const low = Math.min(...prices);
    const high = Math.max(...prices);
    const changePercent = ((latest - first) / first) * 100;

    return Response.json(
      {
        symbol: "BTC",
        currency: "GBP",
        range,
        interval: config.interval,
        points,
        low,
        high,
        first,
        latest,
        changePercent,
        lastUpdated: points[points.length - 1].timestamp,
        source: "CoinMarketCap",
      },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch (error) {
    console.error("Bitcoin historical market request failed:", error);

    return Response.json(
      { error: "Bitcoin historical market data is temporarily unavailable." },
      { status: 502, headers: { "Cache-Control": "no-store" } },
    );
  }
}
