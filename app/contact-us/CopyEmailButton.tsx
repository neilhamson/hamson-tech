"use client";

import { useState } from "react";

import styles from "./contact.module.css";

const email = "neil@hamson.tech";

export default function CopyEmailButton() {
  const [copied, setCopied] = useState(false);

  async function copyEmail() {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(email);
      } else {
        const textarea = document.createElement("textarea");

        textarea.value = email;
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";

        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();

        const successful = document.execCommand("copy");

        document.body.removeChild(textarea);

        if (!successful) {
          throw new Error("Copy command failed");
        }
      }

      setCopied(true);

      window.setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <button
      className={styles.primaryButton}
      type="button"
      onClick={copyEmail}
      aria-label="Copy Dr Neil Hamson's email address"
    >
      {copied ? "COPIED" : "COPY EMAIL"}
    </button>
  );
}
