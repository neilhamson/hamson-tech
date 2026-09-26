"use client";

import { useMemo, useState } from "react";

import styles from "./gbp.module.css";

const SATOSHIS_PER_BTC = 100_000_000;

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

export default function BtcGbpCalculator() {
  const [referenceRate, setReferenceRate] = useState("");
  const [sterlingAmount, setSterlingAmount] = useState("50");
  const [bitcoinAmount, setBitcoinAmount] = useState("0.001");

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

  return (
    <div className={styles.calculator}>
      <div className={styles.systemHeader}>
        <div>
          <span className={styles.systemCode}>NH / BTC-GBP / DEV-01</span>
          <strong>CONVERSION ENGINE</strong>
        </div>

        <span className={styles.developmentState}>
          <span />
          MANUAL TEST MODE
        </span>
      </div>

      <div className={styles.rateInput}>
        <label htmlFor="btc-reference-rate">
          <span>REFERENCE RATE</span>
          <strong>GBP PER 1 BTC</strong>
        </label>

        <div className={styles.inputShell}>
          <span>£</span>
          <input
            id="btc-reference-rate"
            type="number"
            inputMode="decimal"
            min="0"
            step="0.01"
            placeholder="Enter test rate"
            value={referenceRate}
            onChange={(event) => setReferenceRate(event.target.value)}
          />
        </div>

        <p>
          Manual development input only. This is not a live Bitcoin market
          price.
        </p>
      </div>

      <div className={styles.conversionGrid}>
        <section className={styles.conversionPanel}>
          <div className={styles.panelHeader}>
            <span>CHANNEL / 01</span>
            <strong>GBP → BTC</strong>
          </div>

          <label htmlFor="sterling-amount">STERLING INPUT</label>

          <div className={styles.inputShell}>
            <span>£</span>
            <input
              id="sterling-amount"
              type="number"
              inputMode="decimal"
              min="0"
              step="0.01"
              value={sterlingAmount}
              onChange={(event) => setSterlingAmount(event.target.value)}
            />
          </div>

          <div className={styles.outputBlock}>
            <span>BITCOIN OUTPUT</span>
            <strong>{formatBitcoin(sterlingToBitcoin.btc)} BTC</strong>
          </div>

          <div className={styles.outputBlock}>
            <span>SATOSHI OUTPUT</span>
            <strong>{formatSatoshis(sterlingToBitcoin.sats)} SATS</strong>
          </div>
        </section>

        <section className={styles.conversionPanel}>
          <div className={styles.panelHeader}>
            <span>CHANNEL / 02</span>
            <strong>BTC → GBP</strong>
          </div>

          <label htmlFor="bitcoin-amount">BITCOIN INPUT</label>

          <div className={styles.inputShell}>
            <span>₿</span>
            <input
              id="bitcoin-amount"
              type="number"
              inputMode="decimal"
              min="0"
              step="0.00000001"
              value={bitcoinAmount}
              onChange={(event) => setBitcoinAmount(event.target.value)}
            />
          </div>

          <div className={styles.outputBlock}>
            <span>STERLING OUTPUT</span>
            <strong>{formatSterling(bitcoinToSterling)}</strong>
          </div>

          <div className={styles.outputBlock}>
            <span>SATOSHI VALUE</span>
            <strong>
              {formatSatoshis(bitcoin * SATOSHIS_PER_BTC)} SATS
            </strong>
          </div>
        </section>
      </div>

      <div className={styles.engineFooter}>
        <span>
          RATE SOURCE <strong>MANUAL</strong>
        </span>
        <span>
          MARKET FEED <strong>DISCONNECTED</strong>
        </span>
        <span>
          CALCULATION <strong>LOCAL</strong>
        </span>
        <span>
          STATUS <strong>DEVELOPMENT</strong>
        </span>
      </div>
    </div>
  );
}
