import { randomUUID } from "node:crypto";

import { getBitcoinBuyProvider } from "./providers";

export type CreateBitcoinBuyInput = {
  fiatAmount: number;
  userIp: string;
  referrerDomain: string;
};

export type HamsonBitcoinBuySession = {
  orderId: string;
  provider: string;
  checkoutUrl: string;
};

export async function createBitcoinBuySession(
  input: CreateBitcoinBuyInput,
): Promise<HamsonBitcoinBuySession> {
  const provider =
    getBitcoinBuyProvider();

  const providerSession =
    await provider.createSession({
      fiatAmount: input.fiatAmount,
      fiatCurrency: "GBP",
      cryptoCurrency: "BTC",
      network: "bitcoin",
      userIp: input.userIp,
      referrerDomain: input.referrerDomain,
    });

  return {
    orderId: randomUUID(),
    provider: providerSession.provider,
    checkoutUrl: providerSession.checkoutUrl,
  };
}
