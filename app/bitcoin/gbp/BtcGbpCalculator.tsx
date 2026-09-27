"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import styles from "./gbp.module.css";

const SATOSHIS_PER_BTC = 100_000_000;
const MARKET_REFRESH_MS = 180_000;

type MarketState = "loading" | "live" | "stale" | "error";

type BitcoinPriceResponse = {
  symbol?: string;
  currency?: string;
  price?: number;
  percentChange24h?: number | null;
  lastUpdated?: string | null;
  source?: string;
  error?: string;
};

function toNumber(value: string) {
  const parsed = Number(value.replace(/,/g, ""));
  return Number.isFinite(parsed) ? parsed : 0;
}

function formatBitcoin(value: number) {
  if (!Number.isFinite(value) || value <= 0) return "—";

  return value.toLocaleString("en-GB", {
    minimumFractionDigits: 8,
    maximumFractionDigits: 8,
  });
}

function formatSterling(value: number) {
  if (!Number.isFinite(value) || value <= 0) return "—";

  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

function formatSatoshis(value: number) {
  if (!Number.isFinite(value) || value <= 0) return "—";

  return Math.round(value).toLocaleString("en-GB");
}

function formatPercent(value: number | null) {
  if (value === null || !Number.isFinite(value)) return "—";

  const prefix = value > 0 ? "+" : "";
  return `${prefix}${value.toFixed(2)}%`;
}

function formatMarketTime(value: string | null) {
  if (!value) return "—";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "—";

  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZone: "Europe/London",
    timeZoneName: "short",
  }).format(date);
}

export default function BtcGbpCalculator() {
  const [referenceRate, setReferenceRate] = useState("");
  const [sterlingAmount, setSterlingAmount] = useState("50");
  const [bitcoinAmount, setBitcoinAmount] = useState("0.001");

  const [marketState, setMarketState] =
    useState<MarketState>("loading");

  const [percentChange24h, setPercentChange24h] =
    useState<number | null>(null);

  const [lastUpdated, setLastUpdated] =
    useState<string | null>(null);

  const [rateSource, setRateSource] =
    useState("CoinMarketCap");

  const hasValidRate = useRef(false);

  useEffect(() => {
    const controller = new AbortController();

    async function loadMarketData() {
      try {
        const response = await fetch("/api/bitcoin/price", {
          method: "GET",
          cache: "no-store",
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(
            `Bitcoin price request failed with status ${response.status}.`,
          );
        }

        const payload =
          (await response.json()) as BitcoinPriceResponse;

        if (
          typeof payload.price !== "number" ||
          !Number.isFinite(payload.price) ||
          payload.price <= 0
        ) {
          throw new Error(
            "Bitcoin price response did not contain a valid GBP price.",
          );
        }

        setReferenceRate(String(payload.price));

        setPercentChange24h(
          typeof payload.percentChange24h === "number"
            ? payload.percentChange24h
            : null,
        );

        setLastUpdated(
          typeof payload.lastUpdated === "string"
            ? payload.lastUpdated
            : null,
        );

        setRateSource(
          typeof payload.source === "string" &&
            payload.source.trim().length > 0
            ? payload.source
            : "CoinMarketCap",
        );

        hasValidRate.current = true;
        setMarketState("live");
      } catch (error) {
        if (controller.signal.aborted) {
          return;
        }

        console.error(
          "Bitcoin market data request failed:",
          error,
        );

        setMarketState(
          hasValidRate.current ? "stale" : "error",
        );
      }
    }

    void loadMarketData();

    const refreshTimer = window.setInterval(() => {
      void loadMarketData();
    }, MARKET_REFRESH_MS);

    return () => {
      controller.abort();
      window.clearInterval(refreshTimer);
    };
  }, []);

  const rate = toNumber(referenceRate);
  const pounds = toNumber(sterlingAmount);
  const bitcoin = toNumber(bitcoinAmount);

  const sterlingToBitcoin = useMemo(() => {
    if (rate <= 0 || pounds <= 0) {
      return {
        btc: 0,
        sats: 0,
      };
    }

    const btc = pounds / rate;

    return {
      btc,
      sats: btc * SATOSHIS_PER_BTC,
    };
  }, [rate, pounds]);

  const bitcoinToSterling = useMemo(() => {
    if (rate <= 0 || bitcoin <= 0) {
      return 0;
    }

    return bitcoin * rate;
  }, [rate, bitcoin]);

  const marketLabel =
    marketState === "live"
      ? "LIVE MARKET DATA"
      : marketState === "stale"
        ? "LAST VALID MARKET RATE"
        : marketState === "error"
          ? "MARKET DATA UNAVAILABLE"
          : "CONNECTING MARKET FEED";

  const feedLabel =
    marketState === "live"
      ? "CONNECTED"
      : marketState === "stale"
        ? "STALE"
        : marketState === "error"
          ? "UNAVAILABLE"
          : "CONNECTING";

  const displayedRate =
    rate > 0
      ? rate.toLocaleString("en-GB", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })
      : "";

  return (
    <div className={styles.calculator}>
      <div className={styles.systemHeader}>
        <div>
          <span className={styles.systemCode}>
            NH / BTC-GBP / LIVE-01
          </span>
          <strong>CONVERSION ENGINE</strong>
        </div>

        <span className={styles.developmentState}>
          <span />
          {marketLabel}
        </span>
      </div>

      <div className={styles.rateInput}>
        <label htmlFor="btc-reference-rate">
          <span>MARKET RATE</span>
          <strong>GBP PER 1 BTC</strong>
        </label>

        <div className={styles.inputShell}>
          <span>£</span>
          <input
            id="btc-reference-rate"
            type="text"
            inputMode="decimal"
            value={displayedRate}
            readOnly
            placeholder="Loading market rate"
            aria-label="Current Bitcoin price in pounds sterling"
          />
        </div>

        <p>
          {marketState === "live" ||
          marketState === "stale"
            ? `Market reference supplied by ${rateSource}. Last market update: ${formatMarketTime(
                lastUpdated,
              )}.`
            : marketState === "error"
              ? "Live Bitcoin market data is currently unavailable."
              : "Connecting to the Bitcoin market data feed."}
        </p>
      </div>

      <div className={styles.conversionGrid}>
        <section className={styles.conversionPanel}>
          <div className={styles.panelHeader}>
            <span>CHANNEL / 01</span>
            <strong>GBP → BTC</strong>
          </div>

          <label htmlFor="sterling-amount">
            STERLING INPUT
          </label>

          <div className={styles.inputShell}>
            <span>£</span>
            <input
              id="sterling-amount"
              type="number"
              inputMode="decimal"
              min="0"
              step="0.01"
              value={sterlingAmount}
              onChange={(event) =>
                setSterlingAmount(event.target.value)
              }
            />
          </div>

          <div className={styles.outputBlock}>
            <span>BITCOIN OUTPUT</span>
            <strong>
              {formatBitcoin(sterlingToBitcoin.btc)} BTC
            </strong>
          </div>

          <div className={styles.outputBlock}>
            <span>SATOSHI OUTPUT</span>
            <strong>
              {formatSatoshis(sterlingToBitcoin.sats)} SATS
            </strong>
          </div>
        </section>

        <section className={styles.conversionPanel}>
          <div className={styles.panelHeader}>
            <span>CHANNEL / 02</span>
            <strong>BTC → GBP</strong>
          </div>

          <label htmlFor="bitcoin-amount">
            BITCOIN INPUT
          </label>

          <div className={styles.inputShell}>
            <span>₿</span>
            <input
              id="bitcoin-amount"
              type="number"
              inputMode="decimal"
              min="0"
              step="0.00000001"
              value={bitcoinAmount}
              onChange={(event) =>
                setBitcoinAmount(event.target.value)
              }
            />
          </div>

          <div className={styles.outputBlock}>
            <span>STERLING OUTPUT</span>
            <strong>
              {formatSterling(bitcoinToSterling)}
            </strong>
          </div>

          <div className={styles.outputBlock}>
            <span>SATOSHI VALUE</span>
            <strong>
              {formatSatoshis(
                bitcoin * SATOSHIS_PER_BTC,
              )}{" "}
              SATS
            </strong>
          </div>
        </section>
      </div>

      <div className={styles.engineFooter}>
        <span>
          RATE SOURCE{" "}
          <strong>
            {marketState === "live" ||
            marketState === "stale"
              ? rateSource.toUpperCase()
              : "WAITING"}
          </strong>
        </span>

        <span>
          MARKET FEED <strong>{feedLabel}</strong>
        </span>

        <span>
          24H CHANGE{" "}
          <strong>
            {formatPercent(percentChange24h)}
          </strong>
        </span>

        <span>
          CALCULATION <strong>LOCAL</strong>
        </span>
      </div>
    </div>
  );
}