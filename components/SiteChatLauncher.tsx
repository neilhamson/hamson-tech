"use client";

import { useChat } from "@ai-sdk/react";
import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
} from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { MAX_CHAT_MESSAGES, MAX_INPUT_CHARS } from "@/lib/interfaceLimits";
import styles from "./SiteChatLauncher.module.css";

const quickPrompts = [
  {
    label: "MI1",
    text: "What has MI1 actually demonstrated?",
  },
  {
    label: "PROJECT",
    text: "I have a software project I would like to discuss.",
  },
  {
    label: "CONTACT",
    text: "I would like to contact Neil about working together.",
  },
];

export default function SiteChatLauncher() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [footerVisible, setFooterVisible] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const lastSubmittedTextRef = useRef("");

  const {
    messages,
    sendMessage,
    setMessages,
    status,
    error,
    clearError,
  } = useChat();

  const isBusy = status === "submitted" || status === "streaming";
  const conversationLimitReached = messages.length >= MAX_CHAT_MESSAGES;

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    const footer = document.querySelector("footer.site-footer");

    if (!footer || !("IntersectionObserver" in window)) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setFooterVisible(entry.isIntersecting),
      { threshold: 0.05 },
    );

    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!open) {
      return;
    }

    const node = scrollRef.current;
    if (!node) {
      return;
    }

    node.scrollTop = node.scrollHeight;
  }, [messages, open, status]);

  useEffect(() => {
    if (status === "error" && !input && lastSubmittedTextRef.current) {
      setInput(lastSubmittedTextRef.current);
    }
  }, [input, status]);

  function selectPrompt(text: string) {
    setInput(text);
    clearError();
  }

  function resetChat() {
    setMessages([]);
    setInput("");
    clearError();
    lastSubmittedTextRef.current = "";
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const text = input.trim();

    if (
      !text ||
      isBusy ||
      conversationLimitReached ||
      text.length > MAX_INPUT_CHARS
    ) {
      return;
    }

    lastSubmittedTextRef.current = text;
    clearError();
    setInput("");

    try {
      await sendMessage({ text });
    } catch (submissionError) {
      console.error("Site chat submission failed:", submissionError);
      setInput(text);
    }
  }

  return (
    <div
      className={`${styles.root} ${footerVisible ? styles.rootFooterVisible : ""}`}
    >
      {open && (
        <section
          id="site-technical-chat"
          className={styles.panel}
          role="dialog"
          aria-modal="false"
          aria-label="Hamson technical chat"
        >
          <div className={styles.header}>
            <div>
              <div className={styles.eyebrow}>HAMSON.TECH / TECHNICAL CHAT</div>
              <div className={styles.headerTitle}>Ask about the work.</div>
            </div>

            <button
              type="button"
              onClick={() => setOpen(false)}
              className={styles.closeButton}
              aria-label="Close technical chat"
            >
              ×
            </button>
          </div>

          <div className={styles.statusBar}>
            <span className={styles.onlineGroup}>
              <span className={styles.onlineDot} aria-hidden="true" />
              ONLINE
            </span>
            <span>
              {status === "streaming"
                ? "STREAMING"
                : status === "submitted"
                  ? "PROCESSING"
                  : "READY"}
            </span>
          </div>

          <div ref={scrollRef} className={styles.conversation} aria-live="polite">
            {messages.length === 0 ? (
              <div className={styles.emptyState}>
                <p>
                  Ask about MI1, published evidence, software engineering,
                  services, or a project.
                </p>

                <div className={styles.quickPrompts}>
                  {quickPrompts.map((prompt) => (
                    <button
                      key={prompt.label}
                      type="button"
                      onClick={() => selectPrompt(prompt.text)}
                    >
                      <span>{prompt.label}</span>
                      {prompt.text}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className={styles.messages}>
                {messages.map((message) => (
                  <article
                    key={message.id}
                    className={
                      message.role === "user"
                        ? styles.userMessage
                        : styles.assistantMessage
                    }
                  >
                    <div className={styles.roleLabel}>
                      {message.role === "user" ? "VISITOR" : "INTERFACE"}
                    </div>

                    <div className={styles.messageBody}>
                      {message.parts.map((part, index) =>
                        part.type === "text" ? (
                          message.role === "assistant" ? (
                            <div key={`${message.id}-${index}`} className={styles.markdown}>
                              <ReactMarkdown
                                remarkPlugins={[remarkGfm]}
                                components={{
                                  a: ({ node: _node, ...props }) => (
                                    <a
                                      {...props}
                                      target="_blank"
                                      rel="noreferrer"
                                    />
                                  ),
                                }}
                              >
                                {part.text}
                              </ReactMarkdown>
                            </div>
                          ) : (
                            <div key={`${message.id}-${index}`} className={styles.preWrap}>
                              {part.text}
                            </div>
                          )
                        ) : null,
                      )}
                    </div>
                  </article>
                ))}
              </div>
            )}

            {error && (
              <div className={styles.error} role="alert">
                The chat request failed. Your last message has been restored so
                you can retry it.
              </div>
            )}

            {conversationLimitReached && (
              <div className={styles.notice} role="status">
                Conversation limit reached. Start a new chat to continue.
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className={styles.form}>
            <textarea
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Ask a question or describe a project..."
              maxLength={MAX_INPUT_CHARS}
              rows={2}
              disabled={isBusy || conversationLimitReached}
              className={styles.textarea}
              aria-label="Technical chat message"
            />

            <div className={styles.formFooter}>
              <span>
                {input.length.toLocaleString()} / {MAX_INPUT_CHARS.toLocaleString()}
              </span>

              <button
                type="submit"
                disabled={
                  !input.trim() ||
                  isBusy ||
                  conversationLimitReached ||
                  input.length > MAX_INPUT_CHARS
                }
                className={styles.sendButton}
              >
                {isBusy ? "WAIT" : "SEND"}
              </button>
            </div>
          </form>

          <div className={styles.panelFooter}>
            <a href="/#technical-interface">OPEN FULL INTERFACE</a>

            {messages.length > 0 && (
              <button type="button" onClick={resetChat} disabled={isBusy}>
                NEW CHAT
              </button>
            )}
          </div>
        </section>
      )}

      <button
        type="button"
        className={styles.launcher}
        onClick={() => setOpen((current) => !current)}
        aria-expanded={open}
        aria-controls="site-technical-chat"
        aria-label={open ? "Close technical chat" : "Open technical chat"}
      >
        <span className={styles.launcherDot} aria-hidden="true" />
        <span className={styles.launcherText}>
          <strong>{open ? "CLOSE INTERFACE" : "ASK HAMSON.TECH"}</strong>
          <span>
            {open
              ? "TECHNICAL CHAT OPEN"
              : "MI1 · SOFTWARE · PROJECTS"}
          </span>
        </span>
      </button>
    </div>
  );
}
