"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import styles from "./bitcoin.module.css";

const EXAMPLE_POUNDS = 50;
const SATOSHIS_PER_BTC = 100_000_000;
const REFRESH_MS = 180_000;

type MarketData = {
  price?: number;
  lastUpdated?: string | null;
};

function formatSterling(value: number) {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

function formatBitcoin(value: number) {
  return value
    .toFixed(8)
    .replace(/0+$/, "")
    .replace(/\.$/, "");
}

function formatSatoshis(value: number) {
  return Math.round(value).toLocaleString("en-GB");
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
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Europe/London",
    timeZoneName: "short",
  }).format(date);
}

export default function BitcoinLiveStrip() {
  const [price, setPrice] = useState<number | null>(null);
  const [lastUpdated, setLastUpdated] =
    useState<string | null>(null);
  const [available, setAvailable] = useState(true);

  useEffect(() => {
    let active = true;

    async function loadPrice() {
      try {
        const response = await fetch(
          "/api/bitcoin/price",
          {
            cache: "no-store",
          },
        );

        if (!response.ok) {
          throw new Error(
            `Bitcoin price request returned ${response.status}.`,
          );
        }

        const data =
          (await response.json()) as MarketData;

        if (
          typeof data.price !== "number" ||
          !Number.isFinite(data.price) ||
          data.price <= 0
        ) {
          throw new Error(
            "Bitcoin price response was invalid.",
          );
        }

        if (!active) {
          return;
        }

        setPrice(data.price);
        setLastUpdated(
          typeof data.lastUpdated === "string"
            ? data.lastUpdated
            : null,
        );
        setAvailable(true);
      } catch (error) {
        console.error(
          "Bitcoin overview market strip failed:",
          error,
        );

        if (active) {
          setAvailable(false);
        }
      }
    }

    void loadPrice();

    const timer = window.setInterval(() => {
      void loadPrice();
    }, REFRESH_MS);

    return () => {
      active = false;
      window.clearInterval(timer);
    };
  }, []);

  const bitcoin =
    price && price > 0
      ? EXAMPLE_POUNDS / price
      : null;

  const satoshis =
    bitcoin !== null
      ? bitcoin * SATOSHIS_PER_BTC
      : null;

  return (
    <Link
      href="/bitcoin/gbp"
      className={styles.signalBar}
      aria-label="Open the live Bitcoin in Pounds calculator"
      aria-live="polite"
      style={{
        color: "inherit",
        textDecoration: "none",
      }}
    >
      <span>
        LIVE BTC / GBP{" "}
        <strong>
          {price !== null
            ? formatSterling(price)
            : available
              ? "CONNECTING"
              : "UNAVAILABLE"}
        </strong>
      </span>

      <span>
        £50 IN BITCOIN{" "}
        <strong>
          {bitcoin !== null
            ? `${formatBitcoin(bitcoin)} BTC`
            : "—"}
        </strong>
      </span>

      <span>
        £50 IN SATS{" "}
        <strong>
          {satoshis !== null
            ? `${formatSatoshis(satoshis)} SATS`
            : "—"}
        </strong>
      </span>

      <span>
        UPDATED{" "}
        <strong>
          {formatUpdated(lastUpdated)}
        </strong>
      </span>
    </Link>
  );
}