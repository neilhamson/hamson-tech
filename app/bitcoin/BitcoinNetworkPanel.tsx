"use client";

import { useEffect, useMemo, useState } from "react";

import styles from "./bitcoin.module.css";

const REFRESH_MS = 60_000;

type NetworkResponse = {
  height?: number;
  latestBlockTimestamp?: number;
  blockRewardBtc?: number;
  nextHalvingHeight?: number;
  blocksUntilHalving?: number;
  halvingProgressPercent?: number;
  estimatedHalvingTimestamp?: number;
};

function formatInteger(value: number | null) {
  if (value === null || !Number.isFinite(value)) return "—";
  return Math.round(value).toLocaleString("en-GB");
}

function formatBtc(value: number | null) {
  if (value === null || !Number.isFinite(value)) return "—";
  return `${value.toLocaleString("en-GB", { maximumFractionDigits: 8 })} BTC`;
}

function formatAge(timestamp: number | null, now: number) {
  if (timestamp === null || !Number.isFinite(timestamp)) return "—";
  const seconds = Math.max(0, Math.floor(now / 1000 - timestamp));
  if (seconds < 60) return `${seconds}s ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  return rest ? `${hours}h ${rest}m ago` : `${hours}h ago`;
}

function formatDate(timestamp: number | null) {
  if (timestamp === null || !Number.isFinite(timestamp)) return "—";
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit", month: "short", year: "numeric", timeZone: "Europe/London",
  }).format(new Date(timestamp * 1000));
}

export default function BitcoinNetworkPanel() {
  const [height, setHeight] = useState<number | null>(null);
  const [latestBlockTimestamp, setLatestBlockTimestamp] = useState<number | null>(null);
  const [blockRewardBtc, setBlockRewardBtc] = useState<number | null>(null);
  const [nextHalvingHeight, setNextHalvingHeight] = useState<number | null>(null);
  const [blocksUntilHalving, setBlocksUntilHalving] = useState<number | null>(null);
  const [halvingProgressPercent, setHalvingProgressPercent] = useState<number | null>(null);
  const [estimatedHalvingTimestamp, setEstimatedHalvingTimestamp] = useState<number | null>(null);
  const [available, setAvailable] = useState(true);
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    let active = true;
    async function load() {
      try {
        const response = await fetch("/api/bitcoin/network", { cache: "no-store" });
        if (!response.ok) throw new Error(`Bitcoin network request returned ${response.status}.`);
        const payload = (await response.json()) as NetworkResponse;
        if ([payload.height, payload.latestBlockTimestamp, payload.blockRewardBtc, payload.nextHalvingHeight, payload.blocksUntilHalving, payload.halvingProgressPercent, payload.estimatedHalvingTimestamp].some((v) => typeof v !== "number")) {
          throw new Error("Bitcoin network response was invalid.");
        }
        if (!active) return;
        setHeight(payload.height!);
        setLatestBlockTimestamp(payload.latestBlockTimestamp!);
        setBlockRewardBtc(payload.blockRewardBtc!);
        setNextHalvingHeight(payload.nextHalvingHeight!);
        setBlocksUntilHalving(payload.blocksUntilHalving!);
        setHalvingProgressPercent(payload.halvingProgressPercent!);
        setEstimatedHalvingTimestamp(payload.estimatedHalvingTimestamp!);
        setAvailable(true);
        setNow(Date.now());
      } catch (error) {
        console.error("Bitcoin network panel failed:", error);
        if (active) setAvailable(false);
      }
    }
    void load();
    const refreshTimer = window.setInterval(() => void load(), REFRESH_MS);
    const clockTimer = window.setInterval(() => setNow(Date.now()), 30_000);
    return () => { active = false; window.clearInterval(refreshTimer); window.clearInterval(clockTimer); };
  }, []);

  const progress = useMemo(() => {
    if (halvingProgressPercent === null || !Number.isFinite(halvingProgressPercent)) return 0;
    return Math.min(100, Math.max(0, halvingProgressPercent));
  }, [halvingProgressPercent]);

  return (
    <div className={styles.networkTerminal}>
      <div className={styles.networkTopline}>
        <div><span className={styles.networkCode}>HAMSON SOFTWARE / BITCOIN NETWORK</span><strong>NETWORK STATE</strong></div>
        <span className={`${styles.networkStatus} ${available ? "" : styles.networkStatusError}`}>
          <i aria-hidden="true" />{available ? (height !== null ? "LIVE BLOCKCHAIN DATA" : "CONNECTING") : "DATA UNAVAILABLE"}
        </span>
      </div>

      <div className={styles.networkMetrics}>
        <article className={styles.networkMetricPrimary}><span>CURRENT BLOCK HEIGHT</span><strong>{formatInteger(height)}</strong><em>Bitcoin blockchain tip</em></article>
        <article className={styles.networkMetric}><span>LATEST BLOCK</span><strong>{formatAge(latestBlockTimestamp, now)}</strong><em>{latestBlockTimestamp ? new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: "Europe/London", timeZoneName: "short" }).format(new Date(latestBlockTimestamp * 1000)) : "—"}</em></article>
        <article className={styles.networkMetric}><span>BLOCK SUBSIDY</span><strong>{formatBtc(blockRewardBtc)}</strong><em>New BTC before transaction fees</em></article>
      </div>

      <div className={styles.halvingPanel}>
        <div className={styles.halvingCopy}><span>NEXT HALVING</span><strong>{formatInteger(nextHalvingHeight)}</strong><em>Estimated {formatDate(estimatedHalvingTimestamp)}</em></div>
        <div className={styles.halvingProgress}>
          <div className={styles.halvingProgressLabels}><span>CYCLE <strong>{halvingProgressPercent !== null ? `${halvingProgressPercent.toFixed(2)}%` : "—"}</strong></span><span>REMAINING <strong>{formatInteger(blocksUntilHalving)} BLOCKS</strong></span></div>
          <div className={styles.halvingTrack} aria-label="Progress towards the next Bitcoin halving"><span style={{ width: `${progress}%` }} /></div>
          <div className={styles.halvingScale} aria-hidden="true"><span>LAST HALVING</span><span>NEXT HALVING</span></div>
        </div>
      </div>

      <div className={styles.networkFooter}><span>REFRESH <strong>60 SECONDS</strong></span><span>BLOCK TARGET <strong>~10 MINUTES</strong></span><span>HALVING ESTIMATE <strong>10-MINUTE BLOCK MODEL</strong></span><span>SOURCE <strong>MEMPOOL.SPACE</strong></span></div>
    </div>
  );
}
