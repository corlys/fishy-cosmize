import { BigInt } from "@graphprotocol/graph-ts";
import { Exchange } from "../generated/schema";
import { buyEvent } from "../generated/Marketplace/MarketPlace";

const BI_ONE = BigInt.fromI32(1);
export function handleBuyEvent(event: buyEvent): void {
  let exchange = Exchange.load(event.transaction.hash.toHex());
  if (!exchange) {
    exchange = new Exchange(event.transaction.hash.toHex());
  }
  exchange.buyer = event.params.buyer.toHex();
  exchange.seller = event.params.seller.toHex();
  exchange.block = event.block.number;
  exchange.tokenId = event.params.tokenId;
  exchange.price = event.params.price;
  exchange.timestamp = event.params.timestamp;

  exchange.save();
}
