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

import type { ConversationState } from "@/lib/conversationState";
import { MAX_CHAT_MESSAGES, MAX_INPUT_CHARS } from "@/lib/interfaceLimits";
import {
  formatProjectEnquiryText,
  prepareProjectEnquiry,
  type ProjectEnquiry,
} from "@/lib/projectEnquiry";
import styles from "./SiteChatLauncher.module.css";

type WorkflowMode = "general" | "project_enquiry" | "contact";

const quickPrompts: {
  label: string;
  text: string;
  mode: WorkflowMode;
}[] = [
  {
    label: "MI1",
    text: "What has MI1 actually demonstrated?",
    mode: "general",
  },
  {
    label: "PROJECT",
    text: "I have a software project I would like to discuss.",
    mode: "project_enquiry",
  },
  {
    label: "CONTACT",
    text: "I would like to contact Neil about working together.",
    mode: "contact",
  },
];

export default function SiteChatLauncher() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [footerVisible, setFooterVisible] = useState(false);
  const [workflowMode, setWorkflowMode] =
    useState<WorkflowMode>("general");
  const [projectState, setProjectState] =
    useState<ConversationState | null>(null);
  const [stateStatus, setStateStatus] = useState<
    "idle" | "updating" | "ready" | "error"
  >("idle");
  const [preparedEnquiry, setPreparedEnquiry] =
    useState<ProjectEnquiry | null>(null);
  const [copyStatus, setCopyStatus] = useState<
    "idle" | "copied" | "error"
  >("idle");

  const scrollRef = useRef<HTMLDivElement | null>(null);
  const lastSubmittedTextRef = useRef("");
  const processedAssistantRef = useRef<string | null>(null);
  const stateRequestInFlightRef = useRef<string | null>(null);

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

  const readinessScore = projectState
    ? Math.max(0, Math.min(100, projectState.readiness.score))
    : 0;

  const canPrepareEnquiry =
    projectState !== null &&
    stateStatus === "ready" &&
    projectState.readiness.status === "ready" &&
    projectState.objective !== null;

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
  }, [messages, open, status, projectState, preparedEnquiry]);

  useEffect(() => {
    if (status === "error" && !input && lastSubmittedTextRef.current) {
      setInput(lastSubmittedTextRef.current);
    }
  }, [input, status]);

  useEffect(() => {
    if (workflowMode !== "project_enquiry") {
      return;
    }

    if (status !== "ready" || messages.length === 0) {
      return;
    }

    const lastMessage = messages[messages.length - 1];

    if (lastMessage.role !== "assistant") {
      return;
    }

    if (processedAssistantRef.current === lastMessage.id) {
      return;
    }

    if (stateRequestInFlightRef.current === lastMessage.id) {
      return;
    }

    stateRequestInFlightRef.current = lastMessage.id;
    setPreparedEnquiry(null);
    setCopyStatus("idle");
    setStateStatus("updating");

    void (async () => {
      try {
        const response = await fetch("/api/state", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ messages }),
        });

        if (!response.ok) {
          throw new Error(
            `State request failed with status ${response.status}`,
          );
        }

        const state = (await response.json()) as ConversationState;

        setProjectState(state);
        processedAssistantRef.current = lastMessage.id;
        setStateStatus("ready");
      } catch (stateError) {
        console.error("Project state update failed:", stateError);
        setStateStatus("error");
      } finally {
        if (stateRequestInFlightRef.current === lastMessage.id) {
          stateRequestInFlightRef.current = null;
        }
      }
    })();
  }, [messages, status, workflowMode]);

  function resetProjectWorkflow() {
    setProjectState(null);
    setPreparedEnquiry(null);
    setCopyStatus("idle");
    setStateStatus("idle");
    processedAssistantRef.current = null;
    stateRequestInFlightRef.current = null;
  }

  function selectPrompt(prompt: (typeof quickPrompts)[number]) {
    setInput(prompt.text);
    setWorkflowMode(prompt.mode);
    resetProjectWorkflow();
    clearError();
  }

  function resetChat() {
    setMessages([]);
    setInput("");
    setWorkflowMode("general");
    resetProjectWorkflow();
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

  function handlePrepareEnquiry() {
    if (!projectState || !canPrepareEnquiry) {
      return;
    }

    setPreparedEnquiry(prepareProjectEnquiry(projectState));
    setCopyStatus("idle");
  }

  async function handleCopyEnquiry() {
    if (!preparedEnquiry) {
      return;
    }

    try {
      await navigator.clipboard.writeText(
        formatProjectEnquiryText(preparedEnquiry),
      );
      setCopyStatus("copied");
    } catch (copyError) {
      console.error("Enquiry copy failed:", copyError);
      setCopyStatus("error");
    }
  }

  const missingInformation =
    projectState?.readiness.missingCriticalInformation ?? [];

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
                  : workflowMode === "project_enquiry"
                    ? "PROJECT MODE"
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
                      onClick={() => selectPrompt(prompt)}
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

            {workflowMode === "project_enquiry" && (
              <section className={styles.projectState} aria-label="Project enquiry state">
                <div className={styles.projectStateHeader}>
                  <span>PROJECT STATE</span>
                  <span>
                    {stateStatus === "updating"
                      ? "ANALYSING"
                      : stateStatus === "error"
                        ? "UPDATE FAILED"
                        : projectState
                          ? projectState.readiness.status.toUpperCase()
                          : "AWAITING CONVERSATION"}
                  </span>
                </div>

                {stateStatus === "error" && (
                  <div className={styles.projectStateError} role="alert">
                    The latest Project State update failed. Enquiry preparation
                    is disabled until a new update succeeds.
                  </div>
                )}

                {!projectState ? (
                  <div className={styles.projectStateEmpty}>
                    The interface will build a structured project summary as
                    the conversation develops.
                  </div>
                ) : (
                  <div className={styles.projectStateBody}>
                    <div className={styles.projectObjectiveLabel}>OBJECTIVE</div>
                    <div className={styles.projectObjective}>
                      {projectState.objective ?? "Not established yet."}
                    </div>

                    <div className={styles.readinessRow}>
                      <span>ENQUIRY READINESS</span>
                      <strong>{readinessScore}%</strong>
                    </div>

                    <div className={styles.readinessTrack} aria-hidden="true">
                      <div
                        className={styles.readinessFill}
                        style={{ width: `${readinessScore}%` }}
                      />
                    </div>

                    {missingInformation.length > 0 && (
                      <div className={styles.missingBlock}>
                        <div>CRITICAL INFORMATION STILL NEEDED</div>
                        <ul>
                          {missingInformation.slice(0, 3).map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                        {missingInformation.length > 3 && (
                          <span>
                            + {missingInformation.length - 3} more item
                            {missingInformation.length - 3 === 1 ? "" : "s"}
                          </span>
                        )}
                      </div>
                    )}

                    <button
                      type="button"
                      onClick={handlePrepareEnquiry}
                      disabled={!canPrepareEnquiry}
                      className={styles.prepareButton}
                    >
                      {stateStatus === "updating"
                        ? "STATE UPDATING"
                        : preparedEnquiry
                          ? "REFRESH ENQUIRY"
                          : "PREPARE ENQUIRY"}
                    </button>

                    {!canPrepareEnquiry && stateStatus !== "error" && (
                      <div className={styles.prepareNote}>
                        Continue the project conversation until the required
                        information is established.
                      </div>
                    )}

                    {preparedEnquiry && (
                      <div className={styles.enquiryDraft}>
                        <div className={styles.enquiryDraftMeta}>
                          DRAFT ARTEFACT · VERSION {preparedEnquiry.version} · {" "}
                          READINESS {preparedEnquiry.readiness.score}%
                        </div>

                        <div className={styles.enquiryDraftObjective}>
                          {preparedEnquiry.objective ?? "Objective not established."}
                        </div>

                        <div className={styles.enquiryDraftActions}>
                          <button
                            type="button"
                            onClick={() => void handleCopyEnquiry()}
                          >
                            {copyStatus === "copied"
                              ? "ENQUIRY COPIED"
                              : "COPY ENQUIRY"}
                          </button>

                          <a href="mailto:neil@hamson.tech?subject=Software%20project%20enquiry%20via%20Hamson%20Technical%20Interface">
                            EMAIL NEIL
                          </a>
                        </div>

                        <div className={styles.enquiryDraftNote}>
                          {copyStatus === "copied" &&
                            "Copied to your clipboard. Open your email and paste the enquiry."}
                          {copyStatus === "error" &&
                            "Clipboard access was blocked. You can still email Neil directly."}
                          {copyStatus === "idle" &&
                            "Nothing is sent automatically. Copy the draft, then email it to Neil."}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </section>
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
