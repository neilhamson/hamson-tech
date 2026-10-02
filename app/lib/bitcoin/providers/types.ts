export type BitcoinBuyProvider =
  | "transak";

export type CreateBitcoinBuySessionInput = {
  fiatAmount: number;
  fiatCurrency: "GBP";
  cryptoCurrency: "BTC";
  network: "bitcoin";
  userIp: string;
  referrerDomain: string;
};

export type BitcoinBuySession = {
  provider: BitcoinBuyProvider;
  checkoutUrl: string;
};

export interface BitcoinBuyProviderAdapter {
  readonly provider: BitcoinBuyProvider;

  createSession(
    input: CreateBitcoinBuySessionInput,
  ): Promise<BitcoinBuySession>;
}
