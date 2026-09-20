"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const REVEAL_ASSET = "/brand/neil-hamson-reveal.svg";
const STATIC_ASSET = "/brand/neil-hamson-wordmark.svg";
const SESSION_KEY = "neil-hamson-header-reveal-seen";

export default function BrandReveal() {
  const [asset, setAsset] = useState<string | null>(null);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        setAsset(STATIC_ASSET);
        return;
      }

      try {
        if (window.sessionStorage.getItem(SESSION_KEY) === "1") {
          setAsset(STATIC_ASSET);
          return;
        }

        window.sessionStorage.setItem(SESSION_KEY, "1");
        setAsset(REVEAL_ASSET);
      } catch {
        setAsset(STATIC_ASSET);
      }
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  return (
    <span className="brand-reveal-shell" aria-hidden="true">
      {asset ? (
        <Image
          key={asset}
          className="brand-reveal"
          src={asset}
          alt=""
          width={1624}
          height={88}
          priority
          unoptimized
          onError={() => {
            if (asset !== STATIC_ASSET) setAsset(STATIC_ASSET);
          }}
        />
      ) : null}
    </span>
  );
}
