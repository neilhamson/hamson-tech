import {
  PageShell,
  Section,
  pageMetadata,
} from "../../_components/SubpageShell";

export const metadata = pageMetadata(
  "Bitcoin Wallets & Use",
  "Bitcoin wallets, ownership, custody and practical use explained by Neil Hamson.",
  "/bitcoin/wallets"
);

export default function BitcoinWalletsPage() {
  return (
    <PageShell
      eyebrow="BITCOIN • WALLETS & USE"
      title="CONTROL YOUR BITCOIN"
      lede={
        <p>
          Understand wallets, private keys, custody and what it actually means
          to own and use Bitcoin.
        </p>
      }
      accent="gold"
    >
      <Section
        label="WALLETS • 01"
        title="WHAT DOES A BITCOIN WALLET ACTUALLY DO?"
        intro={
          <p>
            A Bitcoin wallet does not store coins like a physical wallet. It
            manages the keys used to control Bitcoin recorded on the network.
          </p>
        }
      >
        <p>
          The wallet provides the interface for receiving, holding and sending
          Bitcoin while managing the cryptographic keys used to authorise
          transactions.
        </p>
      </Section>
    </PageShell>
  );
}