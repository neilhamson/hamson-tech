"use client";

import { useEffect, useState } from "react";

import styles from "./bitcoin.module.css";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
};

type NavigatorWithStandalone = Navigator & {
  standalone?: boolean;
};

export default function HamsonBitcoinInstall() {
  const [installPrompt, setInstallPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [installed, setInstalled] = useState(false);
  const [showHelp, setShowHelp] = useState(false);

  useEffect(() => {
    const navigatorWithStandalone =
      navigator as NavigatorWithStandalone;

    const standalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      navigatorWithStandalone.standalone === true;

    setInstalled(standalone);

    function handleBeforeInstallPrompt(event: Event) {
      event.preventDefault();
      setInstallPrompt(event as BeforeInstallPromptEvent);
    }

    function handleInstalled() {
      setInstalled(true);
      setInstallPrompt(null);
      setShowHelp(false);
    }

    window.addEventListener(
      "beforeinstallprompt",
      handleBeforeInstallPrompt,
    );
    window.addEventListener("appinstalled", handleInstalled);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt,
      );
      window.removeEventListener(
        "appinstalled",
        handleInstalled,
      );
    };
  }, []);

  async function handleInstall() {
    if (installed) {
      return;
    }

    if (installPrompt) {
      await installPrompt.prompt();

      const choice = await installPrompt.userChoice;

      if (choice.outcome === "accepted") {
        setInstalled(true);
        setShowHelp(false);
      } else {
        setShowHelp(true);
      }

      setInstallPrompt(null);
      return;
    }

    setShowHelp(true);
  }

  return (
    <>
      <button
        type="button"
        className={styles.homeInstallButton}
        onClick={() => void handleInstall()}
        aria-expanded={showHelp}
        aria-controls="hamson-bitcoin-install-help"
        disabled={installed}
      >
        {installed
          ? "HAMSON BITCOIN ADDED"
          : "ADD TO HOME SCREEN"}
      </button>

      {showHelp && !installed ? (
        <div
          id="hamson-bitcoin-install-help"
          role="dialog"
          aria-modal="true"
          aria-labelledby="hamson-bitcoin-install-title"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 10000,
            display: "grid",
            placeItems: "center",
            padding: "18px",
            background: "rgba(0, 0, 0, 0.78)",
            backdropFilter: "blur(8px)",
          }}
        >
          <div
            style={{
              width: "min(460px, 100%)",
              border: "1px solid rgba(245, 185, 66, 0.48)",
              background:
                "linear-gradient(145deg, rgba(23, 92, 255, 0.10), transparent 44%), #030710",
              boxShadow:
                "0 28px 80px rgba(0, 0, 0, 0.58), 0 0 38px rgba(0, 220, 255, 0.08)",
              padding: "20px",
              color: "#f4f6fa",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
                gap: "16px",
                paddingBottom: "14px",
                borderBottom: "1px solid rgba(255, 255, 255, 0.09)",
              }}
            >
              <div>
                <span
                  style={{
                    display: "block",
                    color: "#f5b942",
                    fontFamily: "monospace",
                    fontSize: "9px",
                    fontWeight: 800,
                    letterSpacing: "0.14em",
                  }}
                >
                  HAMSON BITCOIN / HOME SCREEN
                </span>

                <strong
                  id="hamson-bitcoin-install-title"
                  style={{
                    display: "block",
                    marginTop: "8px",
                    fontSize: "20px",
                    lineHeight: 1,
                    letterSpacing: "-0.01em",
                  }}
                >
                  ADD HAMSON BITCOIN
                </strong>
              </div>

              <button
                type="button"
                onClick={() => setShowHelp(false)}
                aria-label="Close home screen instructions"
                style={{
                  flex: "0 0 auto",
                  width: "40px",
                  height: "40px",
                  border: "1px solid rgba(0, 220, 255, 0.34)",
                  color: "#00dcff",
                  background: "rgba(0, 220, 255, 0.05)",
                  cursor: "pointer",
                  fontSize: "22px",
                  lineHeight: 1,
                }}
              >
                ×
              </button>
            </div>

            <p
              style={{
                margin: "16px 0 0",
                color: "#a5b1c5",
                fontSize: "13px",
                lineHeight: 1.55,
              }}
            >
              Open your browser menu and choose whichever of these options it provides:
            </p>

            <div
              style={{
                marginTop: "14px",
                display: "grid",
                gap: "10px",
              }}
            >
              <div
                style={{
                  minHeight: "54px",
                  padding: "12px 14px",
                  display: "grid",
                  alignContent: "center",
                  gap: "5px",
                  border: "1px solid rgba(245, 185, 66, 0.34)",
                  background: "rgba(245, 185, 66, 0.035)",
                }}
              >
                <strong
                  style={{
                    color: "#f5b942",
                    fontSize: "13px",
                    letterSpacing: "0.02em",
                  }}
                >
                  ADD TO HOME SCREEN
                </strong>

                <span
                  style={{
                    color: "#8f9caf",
                    fontSize: "11px",
                    lineHeight: 1.4,
                  }}
                >
                  Use this if your browser shows this option.
                </span>
              </div>

              <div
                style={{
                  minHeight: "54px",
                  padding: "12px 14px",
                  display: "grid",
                  alignContent: "center",
                  gap: "5px",
                  border: "1px solid rgba(0, 220, 255, 0.28)",
                  background: "rgba(0, 220, 255, 0.03)",
                }}
              >
                <strong
                  style={{
                    color: "#f4f6fa",
                    fontSize: "13px",
                    letterSpacing: "0.02em",
                  }}
                >
                  INSTALL APP
                </strong>

                <span
                  style={{
                    color: "#8f9caf",
                    fontSize: "11px",
                    lineHeight: 1.4,
                  }}
                >
                  Use this if your browser supports app installation.
                </span>
              </div>

              <div
                style={{
                  minHeight: "54px",
                  padding: "12px 14px",
                  display: "grid",
                  alignContent: "center",
                  gap: "5px",
                  border: "1px solid rgba(0, 220, 255, 0.20)",
                  background: "rgba(23, 92, 255, 0.025)",
                }}
              >
                <strong
                  style={{
                    color: "#f4f6fa",
                    fontSize: "13px",
                    letterSpacing: "0.02em",
                  }}
                >
                  CREATE SHORTCUT
                </strong>

                <span
                  style={{
                    color: "#8f9caf",
                    fontSize: "11px",
                    lineHeight: 1.4,
                  }}
                >
                  Use this if your browser offers shortcuts instead.
                </span>
              </div>
            </div>

            <p
              style={{
                margin: "14px 0 0",
                color: "#8794aa",
                fontSize: "12px",
                lineHeight: 1.5,
              }}
            >
              The exact wording depends on your browser.
            </p>

            <p
              style={{
                margin: "12px 0 0",
                color: "#a5b1c5",
                fontSize: "12px",
                lineHeight: 1.5,
              }}
            >
              Hamson Bitcoin will then open directly from the H₿ icon on your
              home screen.
            </p>
          </div>
        </div>
      ) : null}
    </>
  );
}
