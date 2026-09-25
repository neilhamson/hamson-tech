import {
  PageShell,
  Section,
  pageMetadata,
} from "../../_components/SubpageShell";

export const metadata = pageMetadata(
  "Bitcoin Mining",
  "Bitcoin mining, proof of work and practical mining experience explained by Neil Hamson.",
  "/bitcoin/mining"
);

export default function BitcoinMiningPage() {
  return (
    <PageShell
      eyebrow="BITCOIN • MINING"
      title="SECURING THE BITCOIN NETWORK"
      lede={
        <p>
          Understand proof of work, mining hardware, pools and the practical
          reality of operating Bitcoin mining equipment.
        </p>
      }
      accent="gold"
    >
      <Section
        label="MINING • 01"
        title="WHAT DOES BITCOIN MINING ACTUALLY DO?"
        intro={
          <p>
            Bitcoin mining is the competitive process used to produce new
            blocks and secure the ordering of transactions through proof of
            work.
          </p>
        }
      >
        <p>
          Miners assemble candidate blocks and repeatedly perform cryptographic
          hashing until one finds a result that satisfies the network&apos;s
          current difficulty target.
        </p>
      </Section>
    </PageShell>
  );
}