import type {
  BitcoinBuyProvider,
  BitcoinBuyProviderAdapter,
} from "./types";

import { transakBuyProvider } from "./transak";

const providers: Record<
  BitcoinBuyProvider,
  BitcoinBuyProviderAdapter
> = {
  transak: transakBuyProvider,
};

export function getBitcoinBuyProvider(
  provider: BitcoinBuyProvider = "transak",
) {
  return providers[provider];
}
