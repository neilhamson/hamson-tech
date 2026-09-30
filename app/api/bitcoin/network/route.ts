const HALVING_INTERVAL = 210_000;
const INITIAL_SUBSIDY_BTC = 50;
const TARGET_BLOCK_SECONDS = 600;

type MempoolBlock = { height?: number; timestamp?: number };

function subsidyAtHeight(height: number) {
  const halvings = Math.floor(height / HALVING_INTERVAL);
  return halvings >= 64 ? 0 : INITIAL_SUBSIDY_BTC / 2 ** halvings;
}

export async function GET() {
  try {
    const [heightResponse, blocksResponse] = await Promise.all([
      fetch("https://mempool.space/api/blocks/tip/height", { next: { revalidate: 30 } }),
      fetch("https://mempool.space/api/blocks", { headers: { Accept: "application/json" }, next: { revalidate: 30 } }),
    ]);

    if (!heightResponse.ok || !blocksResponse.ok) {
      return Response.json({ error: "Bitcoin network data is temporarily unavailable." }, { status: 502, headers: { "Cache-Control": "no-store" } });
    }

    const height = Number(await heightResponse.text());
    const blocks = (await blocksResponse.json()) as MempoolBlock[];
    if (!Number.isInteger(height) || height < 0) throw new Error("Invalid block height.");

    const latestBlock = Array.isArray(blocks)
      ? blocks.find((block) => block.height === height && typeof block.timestamp === "number") ?? blocks.find((block) => typeof block.timestamp === "number")
      : undefined;
    if (!latestBlock || typeof latestBlock.timestamp !== "number") throw new Error("Invalid latest block.");

    const currentCycleStart = Math.floor(height / HALVING_INTERVAL) * HALVING_INTERVAL;
    const nextHalvingHeight = currentCycleStart + HALVING_INTERVAL;
    const blocksIntoCycle = height - currentCycleStart;
    const blocksUntilHalving = nextHalvingHeight - height;
    const halvingProgressPercent = (blocksIntoCycle / HALVING_INTERVAL) * 100;
    const blockRewardBtc = subsidyAtHeight(height);
    const estimatedHalvingTimestamp = Math.floor(Date.now() / 1000) + blocksUntilHalving * TARGET_BLOCK_SECONDS;

    return Response.json({ height, latestBlockTimestamp: latestBlock.timestamp, blockRewardBtc, nextHalvingHeight, blocksUntilHalving, halvingProgressPercent, estimatedHalvingTimestamp, source: "mempool.space" }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    console.error("Bitcoin network request failed:", error);
    return Response.json({ error: "Bitcoin network data is temporarily unavailable." }, { status: 502, headers: { "Cache-Control": "no-store" } });
  }
}
