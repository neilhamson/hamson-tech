"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import BitcoinPriceChart from "./BitcoinPriceChart";
import styles from "./bitcoin.module.css";

type PriceResponse = {
  price?: number;
  percentChange24h?: number;
  lastUpdated?: string;
};

type NetworkResponse = {
  height?: number;
  latestBlockTimestamp?: number;
  blocksUntilHalving?: number;
  halvingProgressPercent?: number;
};

const REFRESH_MS = 60_000;

function sterling(value: number | null) {
  if (value === null || !Number.isFinite(value)) {
    return "—";
  }

  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    maximumFractionDigits: 2,
  }).format(value);
}

function integer(value: number | null) {
  if (value === null || !Number.isFinite(value)) {
    return "—";
  }

  return Math.round(value).toLocaleString("en-GB");
}

function blockAge(timestamp: number | null, now: number) {
  if (timestamp === null || !Number.isFinite(timestamp)) {
    return "—";
  }

  const seconds = Math.max(
    0,
    Math.floor(now / 1000 - timestamp),
  );

  if (seconds < 60) {
    return `${seconds}s`;
  }

  const minutes = Math.floor(seconds / 60);

  if (minutes < 60) {
    return `${minutes}m`;
  }

  const hours = Math.floor(minutes / 60);
  const remaining = minutes % 60;

  return remaining
    ? `${hours}h ${remaining}m`
    : `${hours}h`;
}

export default function BitcoinHomeDashboard() {
  const [price, setPrice] = useState<number | null>(null);
  const [change24h, setChange24h] = useState<number | null>(null);
  const [height, setHeight] = useState<number | null>(null);

  const [latestBlockTimestamp, setLatestBlockTimestamp] =
    useState<number | null>(null);

  const [blocksUntilHalving, setBlocksUntilHalving] =
    useState<number | null>(null);

  const [halvingProgress, setHalvingProgress] =
    useState<number | null>(null);

  const [marketAvailable, setMarketAvailable] = useState(true);
  const [networkAvailable, setNetworkAvailable] = useState(true);
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    let active = true;

    async function load() {
      const [priceResult, networkResult] =
        await Promise.allSettled([
          fetch("/api/bitcoin/price", {
            cache: "no-store",
          }),
          fetch("/api/bitcoin/network", {
            cache: "no-store",
          }),
        ]);

      if (!active) {
        return;
      }

      if (
        priceResult.status === "fulfilled" &&
        priceResult.value.ok
      ) {
        try {
          const payload =
            (await priceResult.value.json()) as PriceResponse;

          if (typeof payload.price === "number") {
            setPrice(payload.price);

            setChange24h(
              typeof payload.percentChange24h === "number"
                ? payload.percentChange24h
                : null,
            );

            setMarketAvailable(true);
          } else {
            setMarketAvailable(false);
          }
        } catch {
          setMarketAvailable(false);
        }
      } else {
        setMarketAvailable(false);
      }

      if (
        networkResult.status === "fulfilled" &&
        networkResult.value.ok
      ) {
        try {
          const payload =
            (await networkResult.value.json()) as NetworkResponse;

          if (typeof payload.height === "number") {
            setHeight(payload.height);

            setLatestBlockTimestamp(
              typeof payload.latestBlockTimestamp === "number"
                ? payload.latestBlockTimestamp
                : null,
            );

            setBlocksUntilHalving(
              typeof payload.blocksUntilHalving === "number"
                ? payload.blocksUntilHalving
                : null,
            );

            setHalvingProgress(
              typeof payload.halvingProgressPercent === "number"
                ? payload.halvingProgressPercent
                : null,
            );

            setNetworkAvailable(true);
          } else {
            setNetworkAvailable(false);
          }
        } catch {
          setNetworkAvailable(false);
        }
      } else {
        setNetworkAvailable(false);
      }

      setNow(Date.now());
    }

    void load();

    const refreshTimer =
      window.setInterval(
        () => void load(),
        REFRESH_MS,
      );

    const clockTimer =
      window.setInterval(
        () => setNow(Date.now()),
        30_000,
      );

    return () => {
      active = false;
      window.clearInterval(refreshTimer);
      window.clearInterval(clockTimer);
    };
  }, []);

  const changeClass = useMemo(() => {
    if (change24h === null) {
      return "";
    }

    return change24h >= 0
      ? styles.homeChangePositive
      : styles.homeChangeNegative;
  }, [change24h]);

  return (
    <section
      className={styles.homeDashboard}
      aria-label="Hamson Bitcoin live interface"
    >
      <div className={styles.homeDashboardTop}>
        <div>
          <span className={styles.homeSystemCode}>
            HAMSON BITCOIN / LIVE SYSTEM
          </span>

          <strong>
            BITCOIN. WITHOUT THE NOISE.
          </strong>
        </div>

        <span className={styles.homeSystemStatus}>
          <i aria-hidden="true" />

          {marketAvailable && networkAvailable
            ? "LIVE DATA"
            : "PARTIAL DATA"}
        </span>
      </div>

      <div className={styles.homePrimary}>
        <div className={styles.homePrice}>
          <span>BTC / GBP</span>

          <strong>
            {sterling(price)}
          </strong>

          <em className={changeClass}>
            {change24h === null
              ? "24H —"
              : `${change24h >= 0 ? "+" : ""}${change24h.toFixed(2)}% / 24H`}
          </em>
        </div>

        <div className={styles.homeActionGrid}>
          <Link href="/bitcoin/gbp">
            <span>LIVE</span>
            <strong>MARKET</strong>
            <em>Price · chart · convert</em>
          </Link>

          <Link href="/bitcoin/fees">
            <span>LIVE</span>
            <strong>NETWORK</strong>
            <em>Blocks · fees · halving</em>
          </Link>

          <a href="#buy-development">
            <span>IN DEVELOPMENT</span>
            <strong>BUY</strong>
            <em>Product development state</em>
          </a>

          <Link href="/bitcoin/wallets">
            <span>GUIDE / CURRENT</span>
            <strong>WALLET</strong>
            <em>Storage · custody · choosing a wallet</em>
          </Link>
        </div>
      </div>

      <div
        className={styles.homeEmbeddedChart}
        aria-label="Live Bitcoin market chart"
      >
        <div className={styles.homeEmbeddedChartHeader}>
          <div>
            <span>MARKET / BTC · GBP</span>
            <strong>LIVE PRICE HISTORY</strong>
          </div>

          <Link href="/bitcoin/gbp">
            FULL MARKET →
          </Link>
        </div>

        <BitcoinPriceChart />
      </div>

      <div className={styles.homeLearnBar}>
        <Link href="/bitcoin/fractions-satoshis">
          <span>LEARN</span>
          <strong>NEW TO BITCOIN?</strong>
          <em>
            Fractions · wallets · mining · use →
          </em>
        </Link>
      </div>

      <div className={styles.homeNetworkRail}>
        <span>
          BLOCK HEIGHT{" "}
          <strong>
            {integer(height)}
          </strong>
        </span>

        <span>
          LATEST BLOCK{" "}
          <strong>
            {blockAge(latestBlockTimestamp, now)}
          </strong>
        </span>

        <span>
          HALVING{" "}
          <strong>
            {halvingProgress === null
              ? "—"
              : `${halvingProgress.toFixed(2)}%`}
          </strong>
        </span>

        <span>
          BLOCKS REMAINING{" "}
          <strong>
            {integer(blocksUntilHalving)}
          </strong>
        </span>

        <span>
          DATA{" "}
          <strong>
            LIVE / 60S
          </strong>
        </span>
      </div>
    </section>
  );
}