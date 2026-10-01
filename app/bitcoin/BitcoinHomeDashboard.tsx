"use client";

import Link from "next/link";
import {
  useEffect,
  useMemo,
  useState,
} from "react";

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

function bitcoinAmount(
  pounds: number,
  price: number | null,
) {
  if (
    price === null ||
    !Number.isFinite(price) ||
    price <= 0 ||
    !Number.isFinite(pounds) ||
    pounds <= 0
  ) {
    return null;
  }

  return pounds / price;
}

function btcDisplay(value: number | null) {
  if (value === null) {
    return "—";
  }

  return value.toLocaleString("en-GB", {
    minimumFractionDigits: 8,
    maximumFractionDigits: 8,
  });
}

function satoshis(value: number | null) {
  if (value === null) {
    return null;
  }

  return Math.round(value * 100_000_000);
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

  const [marketAvailable, setMarketAvailable] =
    useState(true);

  const [networkAvailable, setNetworkAvailable] =
    useState(true);

  const [now, setNow] =
    useState(() => Date.now());

  const [buyOpen, setBuyOpen] =
    useState(false);

  const [gbpAmount, setGbpAmount] =
    useState("100");


  const [checkoutMessage, setCheckoutMessage] =
    useState("");

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

  useEffect(() => {
    function syncBuyHash() {
      if (window.location.hash === "#buy-bitcoin") {
        setBuyOpen(true);
      }
    }

    syncBuyHash();

    window.addEventListener(
      "hashchange",
      syncBuyHash,
    );

    return () => {
      window.removeEventListener(
        "hashchange",
        syncBuyHash,
      );
    };
  }, []);

  useEffect(() => {
    if (!buyOpen) {
      return;
    }

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow = "hidden";

    function handleKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setBuyOpen(false);
      }
    }

    window.addEventListener("keydown", handleKey);

    return () => {
      document.body.style.overflow =
        previousOverflow;

      window.removeEventListener(
        "keydown",
        handleKey,
      );
    };
  }, [buyOpen]);

  const changeClass = useMemo(() => {
    if (change24h === null) {
      return "";
    }

    return change24h >= 0
      ? styles.homeChangePositive
      : styles.homeChangeNegative;
  }, [change24h]);

  const pounds = useMemo(() => {
    const parsed = Number(gbpAmount);

    if (!Number.isFinite(parsed) || parsed <= 0) {
      return 0;
    }

    return parsed;
  }, [gbpAmount]);

  const estimatedBtc = useMemo(
    () => bitcoinAmount(pounds, price),
    [pounds, price],
  );

  const estimatedSats = useMemo(
    () => satoshis(estimatedBtc),
    [estimatedBtc],
  );

  const canContinue =
    pounds > 0 &&
    estimatedBtc !== null &&
    marketAvailable;


  function openBuy() {
    setCheckoutMessage("");
    setBuyOpen(true);

    if (window.location.hash !== "#buy-bitcoin") {
      window.history.replaceState(
        null,
        "",
        "#buy-bitcoin",
      );
    }
  }

  function closeBuy() {
    setBuyOpen(false);
    setCheckoutMessage("");

    if (window.location.hash === "#buy-bitcoin") {
      window.history.replaceState(
        null,
        "",
        window.location.pathname +
          window.location.search,
      );
    }
  }

  function continueCheckout() {
    setCheckoutMessage(
      "PURCHASE CHECKOUT IS NOT YET AVAILABLE. FINAL PROVIDER INTEGRATION IS PENDING.",
    );
  }

  return (
    <>
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

            <button
              type="button"
              className={styles.homeActionBuy}
              onClick={openBuy}
            >
              <span>BUILDING / INTERACTIVE</span>
              <strong>BUY</strong>
              <em>GBP → BTC purchase interface</em>
            </button>

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

      {buyOpen ? (
        <div
          className={styles.buyOverlay}
          role="presentation"
          onMouseDown={(event) => {
            if (event.currentTarget === event.target) {
              closeBuy();
            }
          }}
        >
          <section
            id="buy-bitcoin"
            className={styles.buyPanel}
            role="dialog"
            aria-modal="true"
            aria-labelledby="buy-panel-title"
          >
            <div className={styles.buyPanelTop}>
              <div>
                <span>HAMSON BITCOIN / BUY</span>
                <strong id="buy-panel-title">
                  BUY BITCOIN
                </strong>
              </div>

              <button
                type="button"
                onClick={closeBuy}
                aria-label="Close Buy Bitcoin"
              >
                ×
              </button>
            </div>

            <div className={styles.buyBody}>
              <div className={styles.buyAmountSection}>
                <label htmlFor="buy-gbp-amount">
                  YOU PAY
                </label>

                <div className={styles.buyAmountInput}>
                  <span>£</span>

                  <input
                    id="buy-gbp-amount"
                    type="number"
                    min="1"
                    step="1"
                    inputMode="decimal"
                    value={gbpAmount}
                    onChange={(event) => {
                      setGbpAmount(event.target.value);
                      setCheckoutMessage("");
                    }}
                  />
                </div>

                <div className={styles.buyQuickAmounts}>
                  {[25, 50, 100, 250].map((amount) => (
                    <button
                      type="button"
                      key={amount}
                      className={
                        gbpAmount === String(amount)
                          ? styles.buyQuickAmountActive
                          : ""
                      }
                      onClick={() => {
                        setGbpAmount(String(amount));
                        setCheckoutMessage("");
                      }}
                    >
                      £{amount}
                    </button>
                  ))}
                </div>
              </div>

              <div className={styles.buyQuoteGrid}>
                <div className={styles.buyReceiveBlock}>
                  <span>ESTIMATED RECEIVE</span>

                  <strong>
                    {btcDisplay(estimatedBtc)} BTC
                  </strong>

                  <small>
                    {estimatedSats === null
                      ? "— SATS"
                      : `${integer(estimatedSats)} SATS`}
                  </small>
                </div>

                <div className={styles.buyMarketBlock}>
                  <span>BTC / GBP</span>

                  <strong>
                    {sterling(price)}
                  </strong>

                  <small>
                    <i aria-hidden="true" />
                    {marketAvailable
                      ? "LIVE MARKET"
                      : "MARKET UNAVAILABLE"}
                  </small>
                </div>
              </div>

              <div className={styles.buyNotice}>
                <span>ESTIMATE ONLY</span>

                <p>
                  Final quote, fees and Bitcoin amount are shown
                  by the regulated checkout provider before purchase.
                </p>
              </div>
            </div>

            <div className={styles.buyActionArea}>
              <button
                type="button"
                className={styles.buyContinue}
                disabled={!canContinue}
                onClick={continueCheckout}
              >
                CONTINUE
              </button>

              {checkoutMessage ? (
                <div
                  className={styles.buyCheckoutMessage}
                  role="status"
                >
                  {checkoutMessage}
                </div>
              ) : null}
            </div>
          </section>
        </div>
      ) : null}
    </>
  );
}