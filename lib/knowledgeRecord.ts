export type EvidenceStatus =
  | "VERIFIED"
  | "DOCUMENTED"
  | "EXPERIMENTAL"
  | "NOT_PUBLICLY_ESTABLISHED";

export type KnowledgeRecord = {
  id: string;
  title: string;
  status: EvidenceStatus;
  summary: string;
  facts: string[];
  sourceLabel: string;
  sourceUrl: string;
  verifiedDate?: string;
  tags: string[];
};
