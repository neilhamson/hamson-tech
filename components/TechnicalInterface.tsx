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

import styles from "./TechnicalInterface.module.css";

import type { ConversationState } from "@/lib/conversationState";
import {
  productConfig,
  projectMailtoHref,
  type WorkflowMode,
} from "@/lib/productConfig";
import { MAX_CHAT_MESSAGES, MAX_INPUT_CHARS } from "@/lib/interfaceLimits";
import {
  formatProjectEnquiryText,
  prepareProjectEnquiry,
  type ProjectEnquiry,
} from "@/lib/projectEnquiry";

const prompts = productConfig.technicalInterface.prompts;

function StateList({
  title,
  items,
}: {
  title: string;
  items: string[];
}) {
  if (items.length === 0) {
    return null;
  }

  return (
    <div>
      <div className={styles.fieldLabel}>
        {title}
      </div>

      <ul className={styles.stateList}>
        {items.map((item) => (
          <li key={item} className={styles.listItem}>
            <span className={styles.blue}>›</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function TechnicalInterface() {
  const [input, setInput] = useState("");
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

  const processedAssistantRef = useRef<string | null>(null);
  const stateRequestInFlightRef = useRef<string | null>(null);
  const lastSubmittedTextRef = useRef("");

  const { messages, sendMessage, status } = useChat();

  const isBusy = status === "submitted" || status === "streaming";
  const conversationLimitReached =
    messages.length >= MAX_CHAT_MESSAGES;

  useEffect(() => {
    if (
      status === "error" &&
      !input &&
      lastSubmittedTextRef.current
    ) {
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

        const state =
          (await response.json()) as ConversationState;

        setProjectState(state);
        processedAssistantRef.current = lastMessage.id;
        setStateStatus("ready");
      } catch (error) {
        console.error("Project state update failed:", error);
        setStateStatus("error");
      } finally {
        if (
          stateRequestInFlightRef.current === lastMessage.id
        ) {
          stateRequestInFlightRef.current = null;
        }
      }
    })();
  }, [messages, status, workflowMode]);

  function selectPrompt(prompt: (typeof prompts)[number]) {
    setInput(prompt.text);
    setWorkflowMode(prompt.mode);

    if (prompt.mode !== "project_enquiry") {
      setProjectState(null);
      setPreparedEnquiry(null);
      setCopyStatus("idle");
      setStateStatus("idle");
      processedAssistantRef.current = null;
      stateRequestInFlightRef.current = null;
    }
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
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
    setInput("");

    try {
      await sendMessage({ text });
    } catch (error) {
      console.error("Chat submission failed:", error);
      setInput(text);
    }
  }

  const readinessScore = projectState
    ? Math.max(
        0,
        Math.min(100, projectState.readiness.score),
      )
    : 0;

  const canPrepareEnquiry =
    projectState !== null &&
    stateStatus === "ready" &&
    projectState.readiness.status === "ready" &&
    projectState.objective !== null;

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
    } catch (error) {
      console.error("Enquiry copy failed:", error);
      setCopyStatus("error");
    }
  }

  return (
    <section
      id="technical-interface"
      className={styles.interface}
      aria-label={productConfig.technicalInterface.ariaLabel}
    >
      <div className={styles.shell}>
        <section className={styles.content}>
          <div className={styles.fullWidth}>
            <div className={styles.compactIntro}>
              <div>
                <div className={styles.kicker}>
                  <span>TECHNICAL INTERFACE</span>
                  <span className={styles.kickerLine} aria-hidden="true" />
                </div>

                <h2 className={styles.title}>
                  {productConfig.technicalInterface.title}
                </h2>

                <p className={styles.intro}>
                  {productConfig.technicalInterface.intro}
                </p>
              </div>

              <div className={styles.online}>
                <span className={styles.onlineDot} />
                ONLINE
              </div>
            </div>

            {messages.length === 0 && (
              <div className={styles.promptGrid}>
                {prompts.map((prompt) => (
                  <button
                    key={prompt.label}
                    type="button"
                    onClick={() => selectPrompt(prompt)}
                    className={styles.promptButton}
                  >
                    <div className={styles.promptLabel}>
                      {prompt.label}
                    </div>

                    <div className={styles.promptText}>
                      {prompt.text}
                    </div>
                  </button>
                ))}
              </div>
            )}

            {messages.length > 0 && (
              <div
                className={styles.messages}
                aria-live="polite"
              >
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={
                      message.role === "user"
                        ? styles.userMessage
                        : styles.assistantMessage
                    }
                  >
                    <div className={styles.messageHeader}>
                      <span
                        className={
                          message.role === "user"
                            ? styles.userRole
                            : styles.assistantRole
                        }
                      >
                        {message.role === "user"
                          ? "VISITOR"
                          : "INTERFACE"}
                      </span>
                    </div>

                    <div className={styles.messageBody}>
                      {message.parts.map((part, index) =>
                        part.type === "text" ? (
                          message.role === "assistant" ? (
                            <div
                              key={`${message.id}-${index}`}
                              className={styles.markdown}
                            >
                              <ReactMarkdown
                                remarkPlugins={[remarkGfm]}
                                components={{
                                  a: ({
                                    node: _node,
                                    ...props
                                  }) => (
                                    <a
                                      {...props}
                                      target="_blank"
                                      rel="noreferrer"
                                      className={styles.markdownLink}
                                    />
                                  ),

                                  strong: ({
                                    node: _node,
                                    ...props
                                  }) => (
                                    <strong
                                      {...props}
                                      className={styles.markdownStrong}
                                    />
                                  ),

                                  ul: ({
                                    node: _node,
                                    ...props
                                  }) => (
                                    <ul
                                      {...props}
                                      className={styles.markdownUl}
                                    />
                                  ),

                                  ol: ({
                                    node: _node,
                                    ...props
                                  }) => (
                                    <ol
                                      {...props}
                                      className={styles.markdownOl}
                                    />
                                  ),

                                  code: ({
                                    node: _node,
                                    ...props
                                  }) => (
                                    <code
                                      {...props}
                                      className={styles.markdownCode}
                                    />
                                  ),
                                }}
                              >
                                {part.text}
                              </ReactMarkdown>
                            </div>
                          ) : (
                            <div
                              key={`${message.id}-${index}`}
                              className={styles.preWrap}
                            >
                              {part.text}
                            </div>
                          )
                        ) : null,
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {workflowMode === "project_enquiry" && (
              <section className={styles.projectState}>
                <div className={styles.panelHeader}>
                  <div className={styles.goldLabel}>
                    PROJECT STATE
                  </div>

                  <div className={styles.statusLabel}>
                    {stateStatus === "updating"
                      ? "ANALYSING"
                      : stateStatus === "error"
                        ? "UPDATE FAILED"
                        : projectState
                          ? projectState.readiness.status.toUpperCase()
                          : "AWAITING CONVERSATION"}
                  </div>
                </div>

                {stateStatus === "error" && (
                  <div
                    className={styles.stateError}
                    role="alert"
                  >
                    The latest Project State update failed. Any state shown
                    below is from the last successful update, and enquiry
                    preparation is disabled until a new update succeeds.
                  </div>
                )}

                {!projectState && (
                  <div className={styles.emptyState}>
                    The interface will build a structured
                    understanding of the project as the
                    conversation develops.
                  </div>
                )}

                {projectState && (
                  <div className={styles.panelBody}>
                    <div className={styles.stateTopGrid}>
                      <div>
                        <div className={styles.fieldLabel}>
                          OBJECTIVE
                        </div>

                        <div className={styles.objectiveText}>
                          {projectState.objective ??
                            "Not established yet."}
                        </div>
                      </div>

                      <div>
                        <div className={styles.splitRow}>
                          <span className={styles.fieldLabel}>
                            ENQUIRY READINESS
                          </span>

                          <span className={styles.blueText}>
                            {readinessScore}%
                          </span>
                        </div>

                        <div className={styles.progressTrack}>
                          <div
                            className={styles.progressBar}
                            style={{
                              width: `${readinessScore}%`,
                            }}
                          />
                        </div>
                      </div>
                    </div>

                    <div className={styles.stateGrid}>
                      <div className={styles.stack}>
                        {projectState.existingSystem.summary && (
                          <div>
                            <div className={styles.fieldLabel}>
                              EXISTING SYSTEM
                            </div>

                            <div className={styles.stateText}>
                              {
                                projectState.existingSystem
                                  .summary
                              }
                            </div>
                          </div>
                        )}

                        <StateList
                          title="TECHNOLOGIES"
                          items={
                            projectState.existingSystem
                              .technologies
                          }
                        />

                        <StateList
                          title="PROBLEMS"
                          items={projectState.problems}
                        />

                        <StateList
                          title="REQUIREMENTS"
                          items={projectState.requirements}
                        />

                        <StateList
                          title="CONSTRAINTS"
                          items={projectState.constraints}
                        />
                      </div>

                      <div className={styles.stack}>
                        <StateList
                          title="UNKNOWNS"
                          items={projectState.unknowns}
                        />

                        <StateList
                          title="TECHNICAL RISKS"
                          items={projectState.risks}
                        />

                        <StateList
                          title="ASSUMPTIONS"
                          items={projectState.assumptions}
                        />

                        <StateList
                          title="CRITICAL INFORMATION STILL NEEDED"
                          items={
                            projectState.readiness
                              .missingCriticalInformation
                          }
                        />
                      </div>
                    </div>
                  </div>
                )}
              </section>
            )}

            {workflowMode === "project_enquiry" &&
              projectState && (
                <section className={styles.enquirySection}>
                  <div className={styles.enquiryHeader}>
                    <div>
                      <div className={styles.blueLabel}>
                        PROJECT ENQUIRY
                      </div>

                      <div className={styles.enquiryDescription}>
                        Prepare a draft enquiry from the current
                        Project State. The artefact adds no new
                        project facts and is not submitted
                        automatically.
                      </div>
                    </div>

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
                  </div>

                  {preparedEnquiry && (
                    <div className={styles.panelBody}>
                      <div className={styles.metaRow}>
                        <span>DRAFT ARTEFACT</span>
                        <span>VERSION {preparedEnquiry.version}</span>
                        <span>
                          READINESS {preparedEnquiry.readiness.score}%
                        </span>
                      </div>

                      <div className={styles.enquiryGrid}>
                        <div className={styles.stack}>
                          <div>
                            <div className={styles.fieldLabel}>
                              OBJECTIVE
                            </div>
                            <div className={styles.enquiryText}>
                              {preparedEnquiry.objective ??
                                "Not established."}
                            </div>
                          </div>

                          {(preparedEnquiry.organisation.type ||
                            preparedEnquiry.organisation.sector) && (
                            <div>
                              <div className={styles.fieldLabel}>
                                ORGANISATION
                              </div>
                              <div className={styles.enquiryText}>
                                {[
                                  preparedEnquiry.organisation.type,
                                  preparedEnquiry.organisation.sector,
                                ]
                                  .filter(Boolean)
                                  .join(" · ")}
                              </div>
                            </div>
                          )}

                          {preparedEnquiry.existingSystem.summary && (
                            <div>
                              <div className={styles.fieldLabel}>
                                EXISTING SYSTEM
                              </div>
                              <div className={styles.enquiryText}>
                                {preparedEnquiry.existingSystem.summary}
                              </div>
                            </div>
                          )}

                          <StateList
                            title="TECHNOLOGIES"
                            items={
                              preparedEnquiry.existingSystem
                                .technologies
                            }
                          />

                          {preparedEnquiry.existingSystem.dataStorage && (
                            <div>
                              <div className={styles.fieldLabel}>
                                DATA STORAGE
                              </div>
                              <div className={styles.enquiryText}>
                                {preparedEnquiry.existingSystem.dataStorage}
                              </div>
                            </div>
                          )}

                          {preparedEnquiry.existingSystem
                            .deploymentEnvironment && (
                            <div>
                              <div className={styles.fieldLabel}>
                                DEPLOYMENT ENVIRONMENT
                              </div>
                              <div className={styles.enquiryText}>
                                {
                                  preparedEnquiry.existingSystem
                                    .deploymentEnvironment
                                }
                              </div>
                            </div>
                          )}

                          <StateList
                            title="CURRENT PROBLEMS"
                            items={preparedEnquiry.problems}
                          />

                          <StateList
                            title="REQUESTED CAPABILITIES"
                            items={
                              preparedEnquiry.requestedCapabilities
                            }
                          />

                          <StateList
                            title="CONSTRAINTS"
                            items={preparedEnquiry.constraints}
                          />
                        </div>

                        <div className={styles.stack}>
                          <StateList
                            title="TECHNICAL RISKS"
                            items={preparedEnquiry.technicalRisks}
                          />

                          <StateList
                            title="ASSUMPTIONS"
                            items={preparedEnquiry.assumptions}
                          />

                          <StateList
                            title="OPEN QUESTIONS"
                            items={preparedEnquiry.openQuestions}
                          />

                          <StateList
                            title="CRITICAL INFORMATION STILL NEEDED"
                            items={
                              preparedEnquiry.readiness
                                .missingCriticalInformation
                            }
                          />
                        </div>
                      </div>

                      <div className={styles.note}>
                        Prepared locally from the current structured
                        Project State. Preparing this draft does not
                        call xAI, send an enquiry, or imply project
                        acceptance.
                      </div>

                      <div className={styles.buttonRow}>
                        <button
                          type="button"
                          onClick={() => void handleCopyEnquiry()}
                          className={styles.primaryButton}
                        >
                          {copyStatus === "copied"
                            ? "ENQUIRY COPIED"
                            : "COPY ENQUIRY"}
                        </button>

                        <a
                          href={projectMailtoHref()}
                          className={styles.secondaryButton}
                        >
                          {productConfig.technicalInterface.emailLabel}
                        </a>
                      </div>

                      <div
                        className={styles.feedback}
                        aria-live="polite"
                      >
                        {copyStatus === "copied" &&
                          "Copied to your clipboard. Open your email and paste the enquiry."}
                        {copyStatus === "error" &&
                          productConfig.technicalInterface.copyBlockedMessage}
                        {copyStatus === "idle" &&
                          productConfig.technicalInterface.copyIdleMessage}
                      </div>
                    </div>
                  )}
                </section>
              )}

            <form
              onSubmit={handleSubmit}
              className={styles.queryForm}
            >
              <div className={styles.queryHeader}>
                <span className={styles.queryLabel}>
                  QUERY
                </span>

                <span className={styles.queryStatus}>
                  {status === "streaming"
                    ? "STREAMING"
                    : status === "submitted"
                      ? "PROCESSING"
                      : status === "error"
                        ? "ERROR"
                        : conversationLimitReached
                          ? "LIMIT REACHED"
                          : "READY"}
                </span>
              </div>

              <div className={styles.queryBody}>
                <textarea
                  value={input}
                  onChange={(event) =>
                    setInput(event.target.value)
                  }
                  placeholder={productConfig.technicalInterface.queryPlaceholder}
                  rows={3}
                  maxLength={MAX_INPUT_CHARS}
                  disabled={isBusy || conversationLimitReached}
                  className={styles.textarea}
                />

                <button
                  type="submit"
                  disabled={
                    !input.trim() ||
                    isBusy ||
                    conversationLimitReached
                  }
                  className={styles.runButton}
                >
                  {isBusy ? "WAIT" : "RUN"}
                </button>
              </div>
            </form>

            <div className={styles.limits}>
              <span>
                {input.length.toLocaleString()} /{" "}
                {MAX_INPUT_CHARS.toLocaleString()} characters
              </span>

              <span>
                {messages.length} / {MAX_CHAT_MESSAGES} conversation messages
              </span>
            </div>

            {status === "error" && (
              <div
                className={styles.errorAlert}
                role="alert"
              >
                The interface could not complete that request. Your text has
                been restored to the query box so you can try again.
              </div>
            )}

            {conversationLimitReached && (
              <div
                className={styles.limitAlert}
                role="status"
              >
                This conversation has reached the V1 session limit. Reload the
                interface to begin a new conversation.
              </div>
            )}

            <div className={styles.footerMeta}>
              <span>{productConfig.technicalInterface.footerStatusLabels[0]}</span>
              <span>•</span>
              <span>{productConfig.technicalInterface.footerStatusLabels[1]}</span>
              <span>•</span>
              <span>{productConfig.technicalInterface.footerStatusLabels[2]}</span>
            </div>
          </div>
        </section>

        <footer className={styles.disclaimer}>
          {productConfig.technicalInterface.disclaimer}
        </footer>
      </div>
    </section>
  );
}