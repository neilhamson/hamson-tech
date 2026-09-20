import { Card, Cards, MediaBlock, PageShell, Section, pageMetadata } from "../_components/SubpageShell";

export const metadata = pageMetadata(
  "Bitcoin Explained for Beginners",
  "Bitcoin explained for beginners: what Bitcoin is, how transactions and mining work, plus Dr Neil Hamson’s experience running Antminer S9 units at Perth College UHI.",
  "/bitcoin",
);

export default function BitcoinPage() {
  return (
    <PageShell
      eyebrow="BITCOIN • A BEGINNER’S GUIDE"
      title="BITCOIN EXPLAINED FOR BEGINNERS"
      lede={<p>A plain-English introduction based on real experience—from spending 18 months as part of a Bitcoin mining team at Perth College UHI to owning, investing in and using Bitcoin today.</p>}
      heroImage="/migration/bitcoin-hero.png"
      heroAlt="Bitcoin represented within a digital network"
      accent="gold"
    >
      <Section label="BITCOIN BASICS • 01" title="WHAT IS BITCOIN?" intro={<><p>At its simplest, Bitcoin is a way of storing and transferring digital value without requiring a bank or other central organisation to operate the underlying network.</p><p>Bitcoin describes a computer network, the rules that allow that network to operate, and a digital asset—BTC—that can be transferred through it. Computers participating in the network maintain and verify a shared record of transactions known as the blockchain.</p></>}>
        <Cards columns={3}>
          <Card label="01" title="THE NETWORK"><p>Computers around the world communicate and help maintain the Bitcoin system.</p></Card>
          <Card label="02" title="THE BLOCKCHAIN"><p>A shared historical record of Bitcoin transactions maintained across the network.</p></Card>
          <Card label="03" title="BTC"><p>The digital asset transferred through the network. One bitcoin can be divided into much smaller units.</p></Card>
        </Cards>
      </Section>

      <Section label="BITCOIN BASICS • 02" title="HOW DOES BITCOIN WORK?" intro={<><p>When you send Bitcoin, you create a transaction that tells the network that control of a certain amount is being transferred to someone else. Participating computers check that the transaction follows Bitcoin’s rules and that the Bitcoin can legitimately be spent.</p><p>Valid transactions are gathered into blocks and added to the blockchain, creating a shared history that computers across the network can independently verify.</p></>}>
        <Cards columns={4}>
          <Card label="01" title="CREATE"><p>A wallet creates and digitally signs a transaction specifying where the Bitcoin should be sent.</p></Card>
          <Card label="02" title="BROADCAST"><p>The transaction is shared across the peer-to-peer network rather than sent to one central server.</p></Card>
          <Card label="03" title="VERIFY"><p>Computers check the transaction follows the rules and does not spend the same Bitcoin twice.</p></Card>
          <Card label="04" title="RECORD"><p>A valid transaction can be included in a block and become part of the blockchain’s permanent history.</p></Card>
        </Cards>
      </Section>

      <Section label="BITCOIN BASICS • 03" title="WHAT IS BITCOIN MINING?" intro={<><p>Bitcoin mining is the process in which specialised computers compete to perform the computational work required to add new blocks of transactions to the blockchain.</p><p>Miners assemble valid transactions, then repeatedly perform cryptographic calculations. A miner that finds a valid result can propose the next block. Other computers independently verify it before accepting it.</p></>}>
        <Cards columns={4}>
          <Card label="01" title="TRANSACTIONS"><p>Miners assemble valid transactions waiting to be recorded into a candidate block.</p></Card>
          <Card label="02" title="COMPUTE"><p>Specialised hardware performs enormous numbers of calculations in search of a valid result.</p></Card>
          <Card label="03" title="BLOCK"><p>A successful miner proposes a new block containing the selected transactions.</p></Card>
          <Card label="04" title="REWARD"><p>If accepted, the miner can receive newly issued Bitcoin and transaction fees.</p></Card>
        </Cards>
      </Section>

      <Section label="MY BITCOIN EXPERIENCE • 2018" title="18 MONTHS MINING BITCOIN AT PERTH COLLEGE UHI" intro={<><p>In 2018, while studying HND Computer Science at Perth College UHI, I became part of a four-student team running a real Bitcoin mining operation. I acted as data centre manager.</p><p>Our setup consisted of ten Bitmain Antminer S9 units operating continuously. We also joined a mining pool in which 30 machines were contributing in total. Configuration and coding issues required frequent attention, making the operation as much a computing and infrastructure exercise as a Bitcoin experiment.</p></>}>
        <MediaBlock src="/migration/bitcoin-mining.png" alt="Bitcoin mining hardware and infrastructure" portrait />
        <Cards columns={3}>
          <Card label="TEAM" title="4 STUDENTS"><p>Studying HND Computer Science and maintaining the operation together.</p></Card>
          <Card label="HARDWARE" title="10 × ANTMINER S9"><p>Our machines ran 24 hours a day, seven days a week.</p></Card>
          <Card label="POOL" title="30 MACHINES"><p>The wider mining pool included machines beyond our own ten-unit setup.</p></Card>
          <Card label="ROLE" title="DATA CENTRE MANAGER"><p>Responsible for day-to-day operation and technical upkeep.</p></Card>
          <Card label="RESULT" title="≈ 0.5 BTC"><p>At one point, the operation mined approximately half a Bitcoin in one month.</p></Card>
          <Card label="REALITY" title="HEAT, NOISE, POWER"><p>Cooling, electricity consumption and constant maintenance were impossible to ignore.</p></Card>
        </Cards>
      </Section>

      <Section label="WHAT MINING WAS ACTUALLY LIKE" title="PHYSICAL INFRASTRUCTURE AND CONSTANT ATTENTION" intro={<p>The experience is why I see Bitcoin as more than an investment. I have seen some of the physical computing infrastructure behind the network and the practical work required to keep mining hardware operating.</p>}>
        <Cards columns={4}>
          <Card label="01" title="HEAT"><p>Ten Antminer S9 units produced substantial heat, making cooling essential.</p></Card>
          <Card label="02" title="NOISE"><p>The miners and cooling systems created a very noisy working environment.</p></Card>
          <Card label="03" title="ELECTRICITY"><p>Continuous mining required substantial electrical power.</p></Card>
          <Card label="04" title="MAINTENANCE"><p>Configuration, coding and technical problems required regular attention.</p></Card>
        </Cards>
      </Section>

      <Section label="BITCOIN OWNERSHIP • 01" title="HOW DO YOU BUY BITCOIN?" intro={<><p>You do not need mining equipment or enough money to buy one whole Bitcoin. Most people buy Bitcoin through a cryptocurrency exchange, financial app or another supported service.</p><p>The amount spent is converted into BTC at the available market price. Because Bitcoin is divisible into 100 million smaller units called satoshis, it is possible to own a fraction of one Bitcoin.</p></>}>
        <Cards columns={4}>
          <Card label="01" title="CHOOSE"><p>Choose a reputable service or platform that supports Bitcoin.</p></Card>
          <Card label="02" title="FUND"><p>Add conventional currency using a supported payment method.</p></Card>
          <Card label="03" title="BUY"><p>Select Bitcoin, choose how much to spend and review the purchase.</p></Card>
          <Card label="04" title="OWN"><p>The Bitcoin is held by the service or may be transferred to a wallet you control.</p></Card>
        </Cards>
      </Section>

      <Section label="IMPORTANT DISTINCTION" title="BUYING AND MINING ARE DIFFERENT" intro={<><p>Mining uses specialised computing hardware to help secure the network and add new blocks. Buying Bitcoin means acquiring BTC that already exists through another participant or service.</p><p>I currently own and invest in Bitcoin and use it through Revolut for real-world purchases. Buying, holding and using Bitcoin are related but distinct activities.</p></>}>
        <div />
      </Section>
    </PageShell>
  );
}
