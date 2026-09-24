/**
 * Compatibility export for the original knowledge module path.
 *
 * The reusable retrieval engine no longer imports this dataset directly.
 * Product/customer knowledge now lives in productKnowledge.ts and is supplied
 * explicitly by the server route.
 */
export { productKnowledge as knowledge } from "@/data/productKnowledge";
export type {
  EvidenceStatus,
  KnowledgeRecord,
} from "@/lib/knowledgeRecord";
