"use client";

import { useEffect, useRef, useState } from "react";

import styles from "./gbp.module.css";

const SATOSHIS_PER_BTC = 100_000_000;
const MARKET_REFRESH_MS = 180_000;

const CURRENCY = {
  code: "GBP",
  symbol: "£",
  locale: "en-GB",
  name: "pounds",
} as const;

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

function formatBitcoinInput(value: number) {
  if (!Number.isFinite(value) || value <= 0) {
    return "";
  }

  return value
    .toFixed(8)
    .replace(/0+$/, "")
    .replace(/\.$/, "");
}

function formatSterlingInput(value: number) {
  if (!Number.isFinite(value) || value <= 0) {
    return "";
  }

  return value.toFixed(2);
}

function formatBitcoin(value: number) {
  if (!Number.isFinite(value) || value <= 0) {
    return "—";
  }

  return value.toLocaleString("en-GB", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 8,
  });
}

function formatSterling(value: number) {
  if (!Number.isFinite(value) || value <= 0) {
    return "—";
  }

  return new Intl.NumberFormat(CURRENCY.locale, {
    style: "currency",
    currency: CURRENCY.code,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

function formatSatoshis(value: number) {
  if (!Number.isFinite(value) || value <= 0) {
    return "—";
  }

  return Math.round(value).toLocaleString("en-GB");
}

function formatPercent(value: number | null) {
  if (value === null || !Number.isFinite(value)) {
    return "—";
  }

  const prefix = value > 0 ? "+" : "";

  return `${prefix}${value.toFixed(2)}%`;
}

function formatMarketTime(value: string | null) {
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
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZone: "Europe/London",
    timeZoneName: "short",
  }).format(date);
}

export default function BtcGbpCalculator() {
  const [referenceRate, setReferenceRate] = useState(0);

  const [sterlingAmount, setSterlingAmount] =
    useState("50");

  const [bitcoinAmount, setBitcoinAmount] =
    useState("");

  const [marketState, setMarketState] =
    useState<MarketState>("loading");

  const [percentChange24h, setPercentChange24h] =
    useState<number | null>(null);

  const [lastUpdated, setLastUpdated] =
    useState<string | null>(null);

  const hasValidRate = useRef(false);
  const lastEdited = useRef<"gbp" | "btc">("gbp");

  useEffect(() => {
    const controller = new AbortController();

    async function loadMarketData() {
      try {
        const response = await fetch(
          "/api/bitcoin/price",
          {
            method: "GET",
            cache: "no-store",
            signal: controller.signal,
          },
        );

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

        setReferenceRate(payload.price);

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

  useEffect(() => {
    if (referenceRate <= 0) {
      return;
    }

    if (lastEdited.current === "gbp") {
      const pounds = toNumber(sterlingAmount);

      setBitcoinAmount(
        pounds > 0
          ? formatBitcoinInput(
              pounds / referenceRate,
            )
          : "",
      );

      return;
    }

    const bitcoin = toNumber(bitcoinAmount);

    setSterlingAmount(
      bitcoin > 0
        ? formatSterlingInput(
            bitcoin * referenceRate,
          )
        : "",
    );
  }, [referenceRate]);

  function handleSterlingChange(value: string) {
    lastEdited.current = "gbp";

    setSterlingAmount(value);

    if (referenceRate <= 0) {
      return;
    }

    const pounds = toNumber(value);

    setBitcoinAmount(
      pounds > 0
        ? formatBitcoinInput(
            pounds / referenceRate,
          )
        : "",
    );
  }

  function handleBitcoinChange(value: string) {
    lastEdited.current = "btc";

    setBitcoinAmount(value);

    if (referenceRate <= 0) {
      return;
    }

    const bitcoin = toNumber(value);

    setSterlingAmount(
      bitcoin > 0
        ? formatSterlingInput(
            bitcoin * referenceRate,
          )
        : "",
    );
  }

  const pounds = toNumber(sterlingAmount);
  const bitcoin = toNumber(bitcoinAmount);

  const satoshis =
    bitcoin > 0
      ? bitcoin * SATOSHIS_PER_BTC
      : 0;

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
    referenceRate > 0
      ? referenceRate.toLocaleString(
          CURRENCY.locale,
          {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          },
        )
      : "";

  const hasValue =
    pounds > 0 &&
    bitcoin > 0 &&
    satoshis > 0;

  return (
    <div className={styles.calculator}>
      <div className={styles.systemHeader}>
        <div>
          <span className={styles.systemCode}>
            HAMSON SOFTWARE / BTC-GBP / UK-01
          </span>

          <strong>BITCOIN IN POUNDS</strong>
        </div>

        <span className={styles.developmentState}>
          <span />
          {marketLabel}
        </span>
      </div>

      <div className={styles.rateInput}>
        <label htmlFor="btc-reference-rate">
          <span>LIVE BITCOIN PRICE</span>
          <strong>1 BITCOIN IN POUNDS</strong>
        </label>

        <div className={styles.inputShell}>
          <span>{CURRENCY.symbol}</span>

          <input
            id="btc-reference-rate"
            type="text"
            value={displayedRate}
            readOnly
            placeholder="Loading live price"
            aria-label="Current Bitcoin price in pounds"
          />
        </div>

        <p>
          {marketState === "live" ||
          marketState === "stale" ? (
            <>
              Updated{" "}
              {formatMarketTime(lastUpdated)}.{" "}
              <a
                href="https://coinmarketcap.com/"
                target="_blank"
                rel="noreferrer"
                style={{
                  color: "inherit",
                  textDecoration: "underline",
                  textUnderlineOffset: "0.15em",
                }}
              >
                Data provided by CoinMarketCap.com
              </a>
              .
            </>
          ) : marketState === "error" ? (
            "The live Bitcoin price is currently unavailable."
          ) : (
            "Connecting to the live Bitcoin price."
          )}
        </p>
      </div>

      <div
        style={{
          padding: "clamp(28px, 4vw, 56px)",
          borderTop:
            "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <div
          style={{
            marginBottom: "2rem",
          }}
        >
          <span
            className={styles.systemCode}
            style={{
              display: "block",
              marginBottom: "0.75rem",
            }}
          >
            YOUR CONVERSION
          </span>

          <strong
            style={{
              display: "block",
              fontSize:
                "clamp(1.35rem, 2.3vw, 2.15rem)",
              lineHeight: 1.2,
            }}
          >
            POUNDS ⇄ BITCOIN ⇄ SATOSHIS
          </strong>

          <p
            style={{
              margin: "0.85rem 0 0",
              maxWidth: "760px",
              opacity: 0.76,
              lineHeight: 1.65,
            }}
          >
            Enter pounds or Bitcoin. The other
            value updates automatically.
          </p>
        </div>

        <div className={styles.conversionGrid}>
          <section className={styles.conversionPanel}>
            <div className={styles.panelHeader}>
              <span>START HERE</span>
              <strong>POUNDS</strong>
            </div>

            <label htmlFor="sterling-amount">
              HOW MUCH IN POUNDS?
            </label>

            <div className={styles.inputShell}>
              <span>{CURRENCY.symbol}</span>

              <input
                id="sterling-amount"
                type="number"
                inputMode="decimal"
                min="0"
                step="0.01"
                value={sterlingAmount}
                onChange={(event) =>
                  handleSterlingChange(
                    event.target.value,
                  )
                }
                aria-label="Amount in pounds"
              />
            </div>

            <p
              style={{
                margin: "0.9rem 0 0",
                opacity: 0.7,
                lineHeight: 1.55,
              }}
            >
              Enter an amount you want to
              understand, spend, buy or pay.
            </p>
          </section>

          <section className={styles.conversionPanel}>
            <div className={styles.panelHeader}>
              <span>LINKED VALUE</span>
              <strong>BITCOIN</strong>
            </div>

            <label htmlFor="bitcoin-amount">
              BITCOIN EQUIVALENT
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
                  handleBitcoinChange(
                    event.target.value,
                  )
                }
                aria-label="Amount in Bitcoin"
              />
            </div>

            <p
              style={{
                margin: "0.9rem 0 0",
                opacity: 0.7,
                lineHeight: 1.55,
              }}
            >
              This updates automatically. You can
              also change the Bitcoin amount and
              the pounds will update.
            </p>
          </section>
        </div>

        <div
          style={{
            marginTop: "2rem",
            padding:
              "clamp(28px, 4vw, 48px)",
            border:
              "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <span
            className={styles.systemCode}
            style={{
              display: "block",
              marginBottom: "0.9rem",
            }}
          >
            SAME VALUE
          </span>

          {hasValue ? (
            <>
              <div
                style={{
                  fontSize:
                    "clamp(1.55rem, 3vw, 2.8rem)",
                  fontWeight: 700,
                  lineHeight: 1.3,
                  letterSpacing: "-0.02em",
                }}
              >
                {formatSterling(pounds)}
                {"  ≈  "}
                {formatBitcoin(bitcoin)} BTC
                {"  ≈  "}
                {formatSatoshis(satoshis)} SATOSHIS
              </div>

              <p
                style={{
                  margin: "1rem 0 0",
                  opacity: 0.76,
                  lineHeight: 1.65,
                }}
              >
                These three figures represent
                approximately the same value at
                the current live Bitcoin price.
              </p>
            </>
          ) : (
            <p
              style={{
                margin: 0,
                opacity: 0.76,
                lineHeight: 1.65,
              }}
            >
              Enter pounds or Bitcoin to begin.
            </p>
          )}
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "1px",
            marginTop: "1px",
            background:
              "rgba(255,255,255,0.08)",
          }}
        >
          <section
            style={{
              padding:
                "clamp(24px, 3vw, 36px)",
              background: "#05070d",
            }}
          >
            <span
              className={styles.systemCode}
              style={{
                display: "block",
                marginBottom: "0.8rem",
              }}
            >
              WHAT IS A SATOSHI?
            </span>

            <p
              style={{
                margin: 0,
                lineHeight: 1.7,
                opacity: 0.82,
              }}
            >
              A satoshi is a smaller unit of
              Bitcoin.{" "}
              <strong>
                1 Bitcoin = 100,000,000
                satoshis.
              </strong>{" "}
              {hasValue
                ? `${formatSatoshis(
                    satoshis,
                  )} satoshis is the same Bitcoin amount as ${formatBitcoin(
                    bitcoin,
                  )} BTC.`
                : ""}
            </p>
          </section>

          <section
            style={{
              padding:
                "clamp(24px, 3vw, 36px)",
              background: "#05070d",
            }}
          >
            <span
              className={styles.systemCode}
              style={{
                display: "block",
                marginBottom: "0.8rem",
              }}
            >
              BUYING OR PAYING?
            </span>

            <p
              style={{
                margin: 0,
                lineHeight: 1.7,
                opacity: 0.82,
              }}
            >
              {hasValue ? (
                <>
                  At this market reference,{" "}
                  <strong>
                    {formatSterling(pounds)}
                  </strong>{" "}
                  is approximately{" "}
                  <strong>
                    {formatBitcoin(bitcoin)} BTC
                  </strong>
                  . Buying services may add fees
                  or spread. Wallets and payment
                  services may also apply fees.
                </>
              ) : (
                "Enter an amount above to see its approximate Bitcoin equivalent."
              )}
            </p>
          </section>
        </div>
      </div>

      <div className={styles.engineFooter}>
        <span>
          SYSTEM{" "}
          <strong>HAMSON SOFTWARE</strong>
        </span>

        <span>
          MARKET FEED{" "}
          <strong>{feedLabel}</strong>
        </span>

        <span>
          24H CHANGE{" "}
          <strong>
            {formatPercent(percentChange24h)}
          </strong>
        </span>

        <span>
          CALCULATION{" "}
          <strong>LINKED</strong>
        </span>
      </div>
    </div>
  );
}