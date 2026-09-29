"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { PointerEvent } from "react";

import styles from "./bitcoin.module.css";

const REFRESH_MS = 180_000;
const VIEWBOX_WIDTH = 1000;
const VIEWBOX_HEIGHT = 320;
const PLOT_LEFT = 22;
const PLOT_RIGHT = 895;
const AXIS_LABEL_X = 914;
const CURRENT_TAG_X = 902;
const CURRENT_TAG_WIDTH = 95;
const PLOT_TOP = 22;
const PLOT_BOTTOM = 282;

type HistoricalPoint = {
  timestamp: string;
  price: number;
};

type RangeKey = "24H" | "7D" | "30D" | "1Y";

type HistoryResponse = {
  range?: RangeKey;
  interval?: string;
  points?: HistoricalPoint[];
  low?: number;
  high?: number;
  latest?: number;
  changePercent?: number;
  lastUpdated?: string;
};

type LivePriceResponse = {
  price?: number;
  lastUpdated?: string;
};

const RANGE_OPTIONS: Array<{
  key: RangeKey;
  intervalLabel: string;
}> = [
  { key: "24H", intervalLabel: "1 HOUR" },
  { key: "7D", intervalLabel: "6 HOURS" },
  { key: "30D", intervalLabel: "1 DAY" },
  { key: "1Y", intervalLabel: "7 DAYS" },
];

const RANGE_INTERVAL_MS: Record<RangeKey, number> = {
  "24H": 60 * 60 * 1000,
  "7D": 6 * 60 * 60 * 1000,
  "30D": 24 * 60 * 60 * 1000,
  "1Y": 7 * 24 * 60 * 60 * 1000,
};

function formatSterling(value: number | null) {
  if (value === null || !Number.isFinite(value)) {
    return "—";
  }

  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

function formatAxisSterling(value: number) {
  if (!Number.isFinite(value)) {
    return "—";
  }

  if (Math.abs(value) >= 1000) {
    return `£${(value / 1000).toFixed(1)}K`;
  }

  return `£${Math.round(value).toLocaleString("en-GB")}`;
}

function formatPercent(value: number | null) {
  if (value === null || !Number.isFinite(value)) {
    return "—";
  }

  const prefix = value > 0 ? "+" : "";
  return `${prefix}${value.toFixed(2)}%`;
}

function formatTime(value: string | null) {
  if (!value) {
    return "—";
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "—";
  }

  return new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Europe/London",
  }).format(date);
}

function formatAxisTime(value: string | null, range: RangeKey) {
  if (!value) {
    return "—";
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "—";
  }

  if (range === "24H") {
    return formatTime(value);
  }

  if (range === "1Y") {
    return new Intl.DateTimeFormat("en-GB", {
      month: "short",
      year: "2-digit",
      timeZone: "Europe/London",
    }).format(date);
  }

  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    timeZone: "Europe/London",
  }).format(date);
}

function formatUpdated(value: string | null) {
  if (!value) {
    return "—";
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "—";
  }

  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Europe/London",
    timeZoneName: "short",
  }).format(date);
}

export default function BitcoinPriceChart() {
  const [points, setPoints] = useState<HistoricalPoint[]>([]);
  const [low, setLow] = useState<number | null>(null);
  const [high, setHigh] = useState<number | null>(null);
  const [latest, setLatest] = useState<number | null>(null);
  const [changePercent, setChangePercent] = useState<number | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const [available, setAvailable] = useState(true);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [range, setRange] = useState<RangeKey>("24H");

  const rangeConfig =
    RANGE_OPTIONS.find((option) => option.key === range) ?? RANGE_OPTIONS[0];

  useEffect(() => {
    let active = true;

    async function load() {
      try {
        const [historyResponse, liveResponse] = await Promise.all([
          fetch(`/api/bitcoin/history?range=${range}`, {
            cache: "no-store",
          }),
          fetch("/api/bitcoin/price", {
            cache: "no-store",
          }),
        ]);

        if (!historyResponse.ok) {
          throw new Error(
            `Bitcoin history request returned ${historyResponse.status}.`,
          );
        }

        if (!liveResponse.ok) {
          throw new Error(
            `Bitcoin live price request returned ${liveResponse.status}.`,
          );
        }

        const payload = (await historyResponse.json()) as HistoryResponse;
        const livePayload = (await liveResponse.json()) as LivePriceResponse;
        const validPoints = Array.isArray(payload.points)
          ? payload.points.filter(
              (point) =>
                typeof point.timestamp === "string" &&
                typeof point.price === "number" &&
                Number.isFinite(point.price) &&
                point.price > 0,
            )
          : [];

        if (validPoints.length < 2) {
          throw new Error("Bitcoin history response was invalid.");
        }

        if (payload.range && payload.range !== range) {
          throw new Error("Bitcoin history response range did not match request.");
        }

        if (
          typeof livePayload.price !== "number" ||
          !Number.isFinite(livePayload.price) ||
          livePayload.price <= 0 ||
          typeof livePayload.lastUpdated !== "string"
        ) {
          throw new Error("Bitcoin live price response was invalid.");
        }

        const liveTime = new Date(livePayload.lastUpdated).getTime();

        if (!Number.isFinite(liveTime)) {
          throw new Error("Bitcoin live price timestamp was invalid.");
        }

        const sortedHistory = [...validPoints].sort(
          (a, b) =>
            new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime(),
        );
        const previousPoint = sortedHistory[sortedHistory.length - 1];
        const previousTime = new Date(previousPoint.timestamp).getTime();
        const intervalMs = RANGE_INTERVAL_MS[range];
        const replaceLastPoint =
          Number.isFinite(previousTime) &&
          liveTime > previousTime &&
          liveTime - previousTime < intervalMs / 2;

        const historicalPoints = replaceLastPoint
          ? sortedHistory.slice(0, -1)
          : sortedHistory.filter(
              (point) => new Date(point.timestamp).getTime() < liveTime,
            );

        const mergedPoints = [
          ...historicalPoints,
          {
            timestamp: livePayload.lastUpdated,
            price: livePayload.price,
          },
        ];

        if (mergedPoints.length < 2) {
          throw new Error("Bitcoin chart did not contain enough merged points.");
        }

        const prices = mergedPoints.map((point) => point.price);
        const first = mergedPoints[0].price;
        const current = livePayload.price;
        const mergedLow = Math.min(...prices);
        const mergedHigh = Math.max(...prices);
        const mergedChangePercent = ((current - first) / first) * 100;

        if (!active) {
          return;
        }

        setPoints(mergedPoints);
        setLow(mergedLow);
        setHigh(mergedHigh);
        setLatest(current);
        setChangePercent(mergedChangePercent);
        setLastUpdated(livePayload.lastUpdated);
        setAvailable(true);
      } catch (error) {
        console.error(`Bitcoin ${range} chart failed:`, error);
        if (active) {
          setAvailable(false);
        }
      }
    }

    void load();
    const timer = window.setInterval(() => void load(), REFRESH_MS);

    return () => {
      active = false;
      window.clearInterval(timer);
    };
  }, [range]);

  const chart = useMemo(() => {
    if (points.length < 2) {
      return null;
    }

    const prices = points.map((point) => point.price);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    const rawRange = maxPrice - minPrice;
    const padding = rawRange > 0 ? rawRange * 0.12 : Math.max(maxPrice * 0.0025, 1);
    const minY = minPrice - padding;
    const maxY = maxPrice + padding;
    const yRange = maxY - minY;

    const coordinates = points.map((point, index) => {
      const progress = index / (points.length - 1);
      const x = PLOT_LEFT + progress * (PLOT_RIGHT - PLOT_LEFT);
      const y =
        PLOT_BOTTOM -
        ((point.price - minY) / yRange) * (PLOT_BOTTOM - PLOT_TOP);

      return { ...point, x, y };
    });

    const linePath = coordinates
      .map(
        (point, index) =>
          `${index === 0 ? "M" : "L"} ${point.x.toFixed(2)} ${point.y.toFixed(2)}`,
      )
      .join(" ");

    const areaPath = `${linePath} L ${PLOT_RIGHT} ${PLOT_BOTTOM} L ${PLOT_LEFT} ${PLOT_BOTTOM} Z`;
    const yTicks = [0, 1, 2, 3, 4].map((line) => {
      const progress = line / 4;
      return {
        y: PLOT_TOP + progress * (PLOT_BOTTOM - PLOT_TOP),
        price: maxY - progress * yRange,
      };
    });

    return { coordinates, linePath, areaPath, yTicks };
  }, [points]);

  function handlePointerMove(event: PointerEvent<SVGSVGElement>) {
    if (!chart || points.length < 2) {
      return;
    }

    const bounds = event.currentTarget.getBoundingClientRect();
    const localX = event.clientX - bounds.left;
    const svgX = (localX / bounds.width) * VIEWBOX_WIDTH;
    const progress = Math.min(
      1,
      Math.max(0, (svgX - PLOT_LEFT) / (PLOT_RIGHT - PLOT_LEFT)),
    );
    const index = Math.round(progress * (points.length - 1));
    setHoverIndex(index);
  }

  const activePoint =
    hoverIndex !== null ? chart?.coordinates[hoverIndex] ?? null : null;
  const latestPoint =
    chart && chart.coordinates.length > 0
      ? chart.coordinates[chart.coordinates.length - 1]
      : null;

  const tickIndexes = useMemo(() => {
    if (points.length < 2) {
      return [];
    }

    return [0, 0.25, 0.5, 0.75, 1].map((position) =>
      Math.round(position * (points.length - 1)),
    );
  }, [points]);

  const changeClass =
    changePercent !== null && changePercent < 0
      ? styles.marketChangeNegative
      : styles.marketChangePositive;

  const rangePosition = useMemo(() => {
    if (
      low === null ||
      high === null ||
      latest === null ||
      !Number.isFinite(low) ||
      !Number.isFinite(high) ||
      !Number.isFinite(latest)
    ) {
      return 50;
    }

    const range = high - low;

    if (range <= 0) {
      return 50;
    }

    return Math.min(
      100,
      Math.max(0, ((latest - low) / range) * 100),
    );
  }, [high, latest, low]);

  function selectRange(nextRange: RangeKey) {
    if (nextRange === range) {
      return;
    }

    setHoverIndex(null);
    setPoints([]);
    setLow(null);
    setHigh(null);
    setLatest(null);
    setChangePercent(null);
    setLastUpdated(null);
    setAvailable(true);
    setRange(nextRange);
  }

  return (
    <div className={styles.marketTerminal}>
      <div className={styles.marketTopline}>
        <div>
          <span className={styles.marketCode}>HAMSON SOFTWARE / BTC-GBP / {range}</span>
          <strong>BITCOIN / GBP</strong>
        </div>

        <div className={styles.marketTopControls}>
          <div className={styles.marketRangeSelector} aria-label="Bitcoin chart range">
            {RANGE_OPTIONS.map((option) => (
              <button
                key={option.key}
                type="button"
                className={option.key === range ? styles.marketRangeActive : ""}
                aria-pressed={option.key === range}
                onClick={() => selectRange(option.key)}
              >
                {option.key}
              </button>
            ))}
          </div>

          <span
            className={`${styles.marketStatus} ${
              available ? "" : styles.marketStatusError
            }`}
          >
            <i aria-hidden="true" />
            {available
              ? points.length > 0
                ? "LIVE MARKET DATA"
                : "CONNECTING"
              : "DATA UNAVAILABLE"}
          </span>
        </div>
      </div>

      <div className={styles.marketSummary}>
        <div className={styles.marketPriceBlock}>
          <span>CURRENT MARKET PRICE</span>
          <strong>{formatSterling(latest)}</strong>
          <em className={changeClass}>{formatPercent(changePercent)} / {range}</em>
        </div>

        <div className={styles.marketRangeBlock}>
          <div>
            <span>{range} LOW</span>
            <strong>{formatSterling(low)}</strong>
          </div>

          <div className={styles.marketRangeTrack}>
            <span
              style={{
                left: `${rangePosition}%`,
                transform: `translate(-${rangePosition}%, -50%)`,
              }}
            />
          </div>

          <div>
            <span>{range} HIGH</span>
            <strong>{formatSterling(high)}</strong>
          </div>
        </div>
      </div>

      <div className={styles.marketChartShell}>
        {chart ? (
          <>
            <svg
              className={styles.marketChart}
              viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}
              preserveAspectRatio="none"
              role="img"
              aria-label={`Bitcoin price in British pounds over ${range}`}
              onPointerMove={handlePointerMove}
              onPointerLeave={() => setHoverIndex(null)}
            >
              <defs>
                <linearGradient id="btc-market-area" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="rgba(0, 220, 255, 0.22)" />
                  <stop offset="100%" stopColor="rgba(0, 220, 255, 0)" />
                </linearGradient>
              </defs>

              {chart.yTicks.map((tick, index) => (
                <g key={index}>
                  <line
                    x1={PLOT_LEFT}
                    x2={PLOT_RIGHT}
                    y1={tick.y}
                    y2={tick.y}
                    className={styles.marketGridLine}
                    vectorEffect="non-scaling-stroke"
                  />
                  <text
                    x={AXIS_LABEL_X}
                    y={tick.y + 3}
                    fill="#718096"
                    fontFamily="monospace"
                    fontSize="9"
                    fontWeight="700"
                    letterSpacing="0.04em"
                  >
                    {formatAxisSterling(tick.price)}
                  </text>
                </g>
              ))}

              <path
                d={chart.areaPath}
                className={styles.marketArea}
                vectorEffect="non-scaling-stroke"
              />
              <path
                d={chart.linePath}
                className={styles.marketLine}
                vectorEffect="non-scaling-stroke"
              />

              {latestPoint ? (
                <g aria-hidden="true">
                  <line
                    x1={latestPoint.x}
                    x2={CURRENT_TAG_X}
                    y1={latestPoint.y}
                    y2={latestPoint.y}
                    stroke="#00dcff"
                    strokeOpacity="0.55"
                    strokeDasharray="3 4"
                    vectorEffect="non-scaling-stroke"
                  />
                  <circle
                    cx={latestPoint.x}
                    cy={latestPoint.y}
                    r="3.5"
                    fill="#00dcff"
                    stroke="#02040a"
                    strokeWidth="2"
                    vectorEffect="non-scaling-stroke"
                  />
                  <rect
                    x={CURRENT_TAG_X}
                    y={latestPoint.y - 13}
                    width={CURRENT_TAG_WIDTH}
                    height="26"
                    fill="#030811"
                    stroke="#00dcff"
                    strokeOpacity="0.5"
                    vectorEffect="non-scaling-stroke"
                  />
                  <text
                    x={CURRENT_TAG_X + 7}
                    y={latestPoint.y + 4}
                    fill="#f4f6fa"
                    fontFamily="monospace"
                    fontSize="10"
                    fontWeight="800"
                  >
                    {formatSterling(latestPoint.price)}
                  </text>
                </g>
              ) : null}

              {activePoint ? (
                <>
                  <line
                    x1={activePoint.x}
                    x2={activePoint.x}
                    y1={PLOT_TOP}
                    y2={PLOT_BOTTOM}
                    className={styles.marketCursorLine}
                    vectorEffect="non-scaling-stroke"
                  />
                  <circle
                    cx={activePoint.x}
                    cy={activePoint.y}
                    r="5"
                    className={styles.marketCursorPoint}
                    vectorEffect="non-scaling-stroke"
                  />
                </>
              ) : null}
            </svg>

            {activePoint ? (
              <div
                className={styles.marketTooltip}
                style={{
                  left: `${((activePoint.x / VIEWBOX_WIDTH) * 100).toFixed(2)}%`,
                }}
              >
                <strong>{formatSterling(activePoint.price)}</strong>
                <span>{formatTime(activePoint.timestamp)}</span>
              </div>
            ) : null}

            <div className={styles.marketTimeAxis} aria-hidden="true">
              {tickIndexes.map((index) => (
                <span key={index}>{formatAxisTime(points[index]?.timestamp ?? null, range)}</span>
              ))}
            </div>
          </>
        ) : (
          <div className={styles.marketChartEmpty}>
            {available
              ? "CONNECTING TO BTC / GBP HISTORY..."
              : "BTC / GBP HISTORY IS TEMPORARILY UNAVAILABLE"}
          </div>
        )}
      </div>

      <div className={styles.marketFooter}>
        <span>
          RANGE <strong>{range}</strong>
        </span>
        <span>
          INTERVAL <strong>{rangeConfig.intervalLabel}</strong>
        </span>
        <span>
          UPDATED <strong>{formatUpdated(lastUpdated)}</strong>
        </span>
        <span>
          SOURCE <strong>COINMARKETCAP</strong>
        </span>
        <Link href="/bitcoin/gbp">OPEN BITCOIN IN POUNDS →</Link>
      </div>
    </div>
  );
}
