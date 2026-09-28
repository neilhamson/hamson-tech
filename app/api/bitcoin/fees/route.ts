type RecommendedFeesResponse = {
  fastestFee?: number;
  halfHourFee?: number;
  hourFee?: number;
  economyFee?: number;
  minimumFee?: number;
};

type MempoolResponse = {
  count?: number;
  vsize?: number;
  total_fee?: number;
  fee_histogram?: Array<[number, number]>;
};

function validPositiveNumber(value: unknown): value is number {
  return (
    typeof value === "number" &&
    Number.isFinite(value) &&
    value >= 0
  );
}

export async function GET() {
  const feesUrl =
    "https://mempool.space/api/v1/fees/recommended";

  const mempoolUrl =
    "https://mempool.space/api/mempool";

  try {
    const [feesResponse, mempoolResponse] =
      await Promise.all([
        fetch(feesUrl, {
          headers: {
            Accept: "application/json",
          },
          next: {
            revalidate: 30,
          },
        }),
        fetch(mempoolUrl, {
          headers: {
            Accept: "application/json",
          },
          next: {
            revalidate: 30,
          },
        }),
      ]);

    if (!feesResponse.ok) {
      console.error(
        "mempool.space recommended-fees request failed:",
        feesResponse.status,
        feesResponse.statusText,
      );

      return Response.json(
        {
          error:
            "Bitcoin network fee data is temporarily unavailable.",
        },
        {
          status: 502,
          headers: {
            "Cache-Control": "no-store",
          },
        },
      );
    }

    if (!mempoolResponse.ok) {
      console.error(
        "mempool.space mempool request failed:",
        mempoolResponse.status,
        mempoolResponse.statusText,
      );

      return Response.json(
        {
          error:
            "Bitcoin mempool data is temporarily unavailable.",
        },
        {
          status: 502,
          headers: {
            "Cache-Control": "no-store",
          },
        },
      );
    }

    const fees =
      (await feesResponse.json()) as RecommendedFeesResponse;

    const mempool =
      (await mempoolResponse.json()) as MempoolResponse;

    const requiredFees = [
      fees.fastestFee,
      fees.halfHourFee,
      fees.hourFee,
      fees.economyFee,
      fees.minimumFee,
    ];

    if (!requiredFees.every(validPositiveNumber)) {
      throw new Error(
        "mempool.space fee response did not contain valid recommended fee rates.",
      );
    }

    if (
      !validPositiveNumber(mempool.count) ||
      !validPositiveNumber(mempool.vsize) ||
      !validPositiveNumber(mempool.total_fee)
    ) {
      throw new Error(
        "mempool.space response did not contain valid mempool statistics.",
      );
    }

    return Response.json(
      {
        fees: {
          high: fees.fastestFee,
          medium: fees.halfHourFee,
          standard: fees.hourFee,
          economy: fees.economyFee,
          minimum: fees.minimumFee,
        },
        mempool: {
          transactionCount: mempool.count,
          virtualSize: mempool.vsize,
          totalFees: mempool.total_fee,
        },
        lastUpdated: new Date().toISOString(),
        source: "mempool.space",
      },
      {
        headers: {
          "Cache-Control": "no-store",
        },
      },
    );
  } catch (error) {
    console.error(
      "Bitcoin network fee request failed:",
      error,
    );

    return Response.json(
      {
        error:
          "Bitcoin network fee data is temporarily unavailable.",
      },
      {
        status: 502,
        headers: {
          "Cache-Control": "no-store",
        },
      },
    );
  }
}