import type { KnowledgeRecord } from "@/lib/knowledgeRecord";

const stopWords = new Set([
  "a",
  "about",
  "actually",
  "an",
  "and",
  "are",
  "can",
  "does",
  "for",
  "has",
  "have",
  "how",
  "i",
  "in",
  "is",
  "it",
  "me",
  "of",
  "on",
  "the",
  "to",
  "what",
  "where",
  "which",
  "with",
]);

function normalise(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function queryTerms(query: string): string[] {
  return [
    ...new Set(
      normalise(query)
        .split(/\s+/)
        .filter((term) => term.length > 1 && !stopWords.has(term)),
    ),
  ];
}

function scoreRecord(
  record: KnowledgeRecord,
  terms: string[],
): number {
  const title = normalise(record.title);
  const summary = normalise(record.summary);
  const tags = normalise(record.tags.join(" "));
  const facts = normalise(record.facts.join(" "));

  let score = 0;

  for (const term of terms) {
    if (title.includes(term)) score += 5;
    if (tags.includes(term)) score += 4;
    if (summary.includes(term)) score += 3;
    if (facts.includes(term)) score += 2;
  }

  if (record.status === "VERIFIED") {
    score += 1;
  }

  return score;
}

export function retrieveKnowledge(
  query: string,
  records: readonly KnowledgeRecord[],
  limit = 4,
): KnowledgeRecord[] {
  const terms = queryTerms(query);

  if (terms.length === 0) {
    return [];
  }

  return records
    .map((record) => ({
      record,
      score: scoreRecord(record, terms),
    }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ record }) => record);
}