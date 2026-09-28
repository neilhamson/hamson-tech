"use client";

import { useEffect, useMemo, useState } from "react";

import styles from "./fees.module.css";

const SATOSHIS_PER_BTC = 100_000_000;
const REFRESH_MS = 60_000;

type FeedState =
  | "loading"
  | "live"
  | "partial"
  | "error";

type FeeResponse = {
  fees?: {
    high?: number;
    medium?: number;
    standard?: number;
    economy?: number;
    minimum?: number;
  };
  mempool?: {
    transactionCount?: number;
    virtualSize?: number;
    totalFees?: number;
  };
  lastUpdated?: string;
  source?: string;
  error?: string;
};

type PriceResponse = {
  price?: number;
  lastUpdated?: string | null;
};

function formatSterling(value: number | null) {
  if (
    value === null ||
    !Number.isFinite(value) ||
    value < 0
  ) {
    return "—";
  }

  if (value < 0.01 && value > 0) {
    return "< £0.01";
  }

  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

function formatNumber(value: number | null) {
  if (
    value === null ||
    !Number.isFinite(value)
  ) {
    return "—";
  }

  return Math.round(value).toLocaleString("en-GB");
}

function formatFeeRate(value: number | null) {
  if (
    value === null ||
    !Number.isFinite(value)
  ) {
    return "—";
  }

  return `${value.toLocaleString("en-GB", {
    maximumFractionDigits: 3,
  })} sat/vB`;
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
    second: "2-digit",
    timeZone: "Europe/London",
    timeZoneName: "short",
  }).format(date);
}

export default function BitcoinFeeMonitor() {
  const [feeState, setFeeState] =
    useState<FeedState>("loading");

  const [fees, setFees] =
    useState<NonNullable<FeeResponse["fees"]> | null>(
      null,
    );

  const [mempool, setMempool] =
    useState<
      NonNullable<FeeResponse["mempool"]> | null
    >(null);

  const [networkUpdated, setNetworkUpdated] =
    useState<string | null>(null);

  const [btcGbp, setBtcGbp] =
    useState<number | null>(null);

  const [priceUpdated, setPriceUpdated] =
    useState<string | null>(null);

  const [transactionSize, setTransactionSize] =
    useState("140");

  const [selectedTier, setSelectedTier] =
    useState<
      "high" | "medium" | "standard" | "economy"
    >("medium");

  useEffect(() => {
    let active = true;

    async function load() {
      const [feeResult, priceResult] =
        await Promise.allSettled([
          fetch("/api/bitcoin/fees", {
            cache: "no-store",
          }),
          fetch("/api/bitcoin/price", {
            cache: "no-store",
          }),
        ]);

      if (!active) {
        return;
      }

      let feeAvailable = false;
      let priceAvailable = false;

      if (
        feeResult.status === "fulfilled" &&
        feeResult.value.ok
      ) {
        const payload =
          (await feeResult.value.json()) as FeeResponse;

        const nextFees = payload.fees;
        const nextMempool = payload.mempool;

        if (
          nextFees &&
          typeof nextFees.high === "number" &&
          typeof nextFees.medium === "number" &&
          typeof nextFees.standard === "number" &&
          typeof nextFees.economy === "number" &&
          nextMempool &&
          typeof nextMempool.transactionCount ===
            "number" &&
          typeof nextMempool.virtualSize === "number"
        ) {
          setFees(nextFees);
          setMempool(nextMempool);
          setNetworkUpdated(
            typeof payload.lastUpdated === "string"
              ? payload.lastUpdated
              : null,
          );

          feeAvailable = true;
        }
      }

      if (
        priceResult.status === "fulfilled" &&
        priceResult.value.ok
      ) {
        const payload =
          (await priceResult.value.json()) as PriceResponse;

        if (
          typeof payload.price === "number" &&
          Number.isFinite(payload.price) &&
          payload.price > 0
        ) {
          setBtcGbp(payload.price);

          setPriceUpdated(
            typeof payload.lastUpdated === "string"
              ? payload.lastUpdated
              : null,
          );

          priceAvailable = true;
        }
      }

      if (feeAvailable && priceAvailable) {
        setFeeState("live");
      } else if (feeAvailable) {
        setFeeState("partial");
      } else {
        setFeeState("error");
      }
    }

    void load();

    const timer = window.setInterval(() => {
      void load();
    }, REFRESH_MS);

    return () => {
      active = false;
      window.clearInterval(timer);
    };
  }, []);

  const virtualBytes = useMemo(() => {
    const parsed = Number(transactionSize);

    if (
      !Number.isFinite(parsed) ||
      parsed <= 0
    ) {
      return 0;
    }

    return Math.min(
      Math.round(parsed),
      100_000,
    );
  }, [transactionSize]);

  const selectedRate =
    fees?.[selectedTier] ?? null;

  const estimatedSats =
    selectedRate !== null &&
    virtualBytes > 0
      ? Math.ceil(
          selectedRate * virtualBytes,
        )
      : null;

  const estimatedGbp =
    estimatedSats !== null &&
    btcGbp !== null
      ? (estimatedSats /
          SATOSHIS_PER_BTC) *
        btcGbp
      : null;

  const tiers = [
    {
      key: "high" as const,
      label: "HIGH PRIORITY",
      description:
        "mempool.space fastest recommended fee rate.",
      value: fees?.high ?? null,
    },
    {
      key: "medium" as const,
      label: "MEDIUM",
      description:
        "mempool.space half-hour recommendation.",
      value: fees?.medium ?? null,
    },
    {
      key: "standard" as const,
      label: "STANDARD",
      description:
        "mempool.space hour recommendation.",
      value: fees?.standard ?? null,
    },
    {
      key: "economy" as const,
      label: "ECONOMY",
      description:
        "Lower-priority recommended fee rate.",
      value: fees?.economy ?? null,
    },
  ];

  const stateLabel =
    feeState === "live"
      ? "LIVE NETWORK + GBP"
      : feeState === "partial"
        ? "LIVE NETWORK / GBP UNAVAILABLE"
        : feeState === "error"
          ? "NETWORK DATA UNAVAILABLE"
          : "CONNECTING";

  return (
    <div className={styles.monitor}>
      <div className={styles.systemHeader}>
        <div>
          <span className={styles.systemCode}>
            HAMSON SOFTWARE / BTC-FEES / UK-02
          </span>

          <strong>BITCOIN NETWORK FEES</strong>
        </div>

        <span
          className={`${styles.feedState} ${
            feeState === "error"
              ? styles.feedError
              : ""
          }`}
        >
          <i aria-hidden="true" />
          {stateLabel}
        </span>
      </div>

      <div className={styles.networkSummary}>
        <div>
          <span>MEMPOOL TRANSACTIONS</span>
          <strong>
            {formatNumber(
              mempool?.transactionCount ??
                null,
            )}
          </strong>
        </div>

        <div>
          <span>MEMPOOL VIRTUAL SIZE</span>
          <strong>
            {typeof mempool?.virtualSize === "number"
              ? `${(
                  mempool.virtualSize /
                  1_000_000
                ).toLocaleString(
                  "en-GB",
                  {
                    maximumFractionDigits: 2,
                  },
                )} MvB`
              : "—"}
          </strong>
        </div>

        <div>
          <span>NETWORK UPDATED</span>
          <strong>
            {formatTime(networkUpdated)}
          </strong>
        </div>

        <div>
          <span>GBP REFERENCE</span>
          <strong>
            {btcGbp !== null
              ? formatSterling(btcGbp)
              : "UNAVAILABLE"}
          </strong>
        </div>
      </div>

      <div className={styles.tierGrid}>
        {tiers.map((tier) => (
          <button
            type="button"
            key={tier.key}
            className={`${styles.tier} ${
              selectedTier === tier.key
                ? styles.tierSelected
                : ""
            }`}
            onClick={() =>
              setSelectedTier(tier.key)
            }
            aria-pressed={
              selectedTier === tier.key
            }
          >
            <span>{tier.label}</span>

            <strong>
              {formatFeeRate(tier.value)}
            </strong>

            <small>{tier.description}</small>
          </button>
        ))}
      </div>

      <div className={styles.calculator}>
        <div className={styles.calculatorIntro}>
          <span className={styles.systemCode}>
            ESTIMATE / TRANSACTION
          </span>

          <h3>
            FEE RATE × TRANSACTION SIZE
          </h3>

          <p>
            sat/vB is a fee rate, not the
            total fee. The total depends on
            the transaction&apos;s virtual size.
          </p>
        </div>

        <div className={styles.controls}>
          <label htmlFor="transaction-vbytes">
            <span>
              ESTIMATED TRANSACTION SIZE
            </span>

            <div className={styles.inputShell}>
              <input
                id="transaction-vbytes"
                type="number"
                min="1"
                max="100000"
                step="1"
                inputMode="numeric"
                value={transactionSize}
                onChange={(event) =>
                  setTransactionSize(
                    event.target.value,
                  )
                }
              />

              <strong>vB</strong>
            </div>
          </label>

          <div className={styles.selectedReadout}>
            <span>SELECTED RATE</span>

            <strong>
              {formatFeeRate(
                selectedRate,
              )}
            </strong>

            <small>
              {
                tiers.find(
                  (tier) =>
                    tier.key ===
                    selectedTier,
                )?.label
              }
            </small>
          </div>
        </div>

        <div className={styles.result}>
          <div>
            <span>ESTIMATED NETWORK FEE</span>

            <strong>
              {estimatedSats !== null
                ? `${formatNumber(
                    estimatedSats,
                  )} sats`
                : "—"}
            </strong>
          </div>

          <div>
            <span>APPROXIMATE GBP</span>

            <strong>
              {formatSterling(
                estimatedGbp,
              )}
            </strong>
          </div>
        </div>

        <div className={styles.examples}>
          <button
            type="button"
            onClick={() =>
              setTransactionSize("110")
            }
          >
            SIMPLE / 110 vB
          </button>

          <button
            type="button"
            onClick={() =>
              setTransactionSize("140")
            }
          >
            EXAMPLE / 140 vB
          </button>

          <button
            type="button"
            onClick={() =>
              setTransactionSize("225")
            }
          >
            LARGER / 225 vB
          </button>
        </div>
      </div>

      <div className={styles.engineFooter}>
        <span>
          SOURCE{" "}
          <strong>MEMPOOL.SPACE</strong>
        </span>

        <span>
          PRICE{" "}
          <strong>
            {btcGbp !== null
              ? "COINMARKETCAP"
              : "UNAVAILABLE"}
          </strong>
        </span>

        <span>
          PRICE UPDATED{" "}
          <strong>
            {formatTime(priceUpdated)}
          </strong>
        </span>

        <span>
          REFRESH <strong>60 SEC</strong>
        </span>
      </div>
    </div>
  );
}