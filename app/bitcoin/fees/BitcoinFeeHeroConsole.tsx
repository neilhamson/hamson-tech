"use client";

import { useEffect, useState } from "react";

import bitcoinStyles from "../bitcoin.module.css";

const REFRESH_MS = 60_000;

type FeeResponse = {
  fees?: {
    medium?: number;
  };
  mempool?: {
    transactionCount?: number;
  };
  lastUpdated?: string;
};

function formatTransactions(value: number | null) {
  if (
    value === null ||
    !Number.isFinite(value)
  ) {
    return "—";
  }

  return Math.round(value).toLocaleString("en-GB");
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
    timeZoneName: "short",
  }).format(date);
}

export default function BitcoinFeeHeroConsole() {
  const [mediumFee, setMediumFee] =
    useState<number | null>(null);

  const [transactionCount, setTransactionCount] =
    useState<number | null>(null);

  const [lastUpdated, setLastUpdated] =
    useState<string | null>(null);

  const [available, setAvailable] =
    useState(true);

  useEffect(() => {
    let active = true;

    async function load() {
      try {
        const response = await fetch(
          "/api/bitcoin/fees",
          {
            cache: "no-store",
          },
        );

        if (!response.ok) {
          throw new Error(
            `Bitcoin fee request returned ${response.status}.`,
          );
        }

        const payload =
          (await response.json()) as FeeResponse;

        const nextFee =
          payload.fees?.medium;

        const nextCount =
          payload.mempool?.transactionCount;

        if (
          typeof nextFee !== "number" ||
          !Number.isFinite(nextFee) ||
          typeof nextCount !== "number" ||
          !Number.isFinite(nextCount)
        ) {
          throw new Error(
            "Bitcoin fee response was invalid.",
          );
        }

        if (!active) {
          return;
        }

        setMediumFee(nextFee);
        setTransactionCount(nextCount);

        setLastUpdated(
          typeof payload.lastUpdated === "string"
            ? payload.lastUpdated
            : null,
        );

        setAvailable(true);
      } catch (error) {
        console.error(
          "Bitcoin fee hero console failed:",
          error,
        );

        if (active) {
          setAvailable(false);
        }
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

  return (
    <aside
      className={bitcoinStyles.console}
      aria-label="Live Bitcoin network fee status"
      aria-live="polite"
    >
      <div className={bitcoinStyles.consoleTop}>
        <span className={bitcoinStyles.consoleName}>
          NETWORK // FEE SYSTEM
        </span>

        <span className={bitcoinStyles.consoleStatus}>
          <span className={bitcoinStyles.statusDot} />
          {available ? "LIVE DATA" : "DATA UNAVAILABLE"}
        </span>
      </div>

      <div className={bitcoinStyles.readout}>
        <div className={bitcoinStyles.readoutBlock}>
          <span className={bitcoinStyles.readoutLabel}>
            MEDIUM FEE
          </span>

          <span className={bitcoinStyles.readoutValue}>
            {mediumFee !== null
              ? `${mediumFee} SAT/VB`
              : available
                ? "CONNECT"
                : "—"}
          </span>
        </div>

        <span
          className={bitcoinStyles.readoutArrow}
          aria-hidden="true"
        >
          →
        </span>

        <div className={bitcoinStyles.readoutBlock}>
          <span className={bitcoinStyles.readoutLabel}>
            MEMPOOL
          </span>

          <span className={bitcoinStyles.readoutValue}>
            {transactionCount !== null
              ? formatTransactions(transactionCount)
              : "—"}
          </span>
        </div>
      </div>

      <div className={bitcoinStyles.sats}>
        <span className={bitcoinStyles.readoutLabel}>
          CURRENT NETWORK STATE
        </span>

        <strong>
          {mediumFee !== null
            ? `${mediumFee} SAT/VB MEDIUM`
            : available
              ? "CONNECTING..."
              : "NETWORK DATA UNAVAILABLE"}
        </strong>
      </div>

      <div className={bitcoinStyles.consoleMeta}>
        <div className={bitcoinStyles.consoleRow}>
          <span>NETWORK</span>
          <strong>BITCOIN</strong>
        </div>

        <div className={bitcoinStyles.consoleRow}>
          <span>SOURCE</span>
          <strong>MEMPOOL.SPACE</strong>
        </div>

        <div className={bitcoinStyles.consoleRow}>
          <span>TRANSACTIONS</span>
          <strong>
            {formatTransactions(transactionCount)}
          </strong>
        </div>

        <div className={bitcoinStyles.consoleRow}>
          <span>UPDATED</span>
          <strong>
            {formatTime(lastUpdated)}
          </strong>
        </div>
      </div>
    </aside>
  );
}