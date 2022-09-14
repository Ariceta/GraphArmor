import {
  BuyPriceUpdated,
  TokenBought,
  SaleCreated,
  SaleWithdrawn,
} from "../generated/BuySell/BuySell";
import {
  BuyPriceUpdated as BuyPriceUpdatedEntity,
  TokenBought as TokenBoughtEntity,
  SaleCreated as SaleCreatedEntity,
  SaleWithdrawn as SaleWithdrawnEntity,
} from "../generated/schema";

export function handleBuyPriceUpdated(event: BuyPriceUpdated): void {
  const entity = new BuyPriceUpdatedEntity(event.transaction.hash.toHex() + '-' + event.logIndex.toString());
  entity.block = event.block.number;
  entity.contract = event.address;
  entity.nftContractAddress = event.params.nftContractAddress;
  entity.tokenId = event.params.tokenId;
  entity.newBuyPrice = event.params.newBuyPrice;
  entity.save();
}

export function handleTokenBought(event: TokenBought): void {
  const entity = new TokenBoughtEntity(event.transaction.hash.toHex() + '-' + event.logIndex.toString());
  entity.block = event.block.number;
  entity.contract = event.address;
  entity.nftContractAddress = event.params.nftContractAddress;
  entity.tokenId = event.params.tokenId;
  entity.pusher = event.params.nftRecipient;
  // entity.erc20Token = event.params.erc20Token;
  // entity.tokenAmount = event.params.tokenAmount;
  entity.save();
}

export function handleSaleCreated(event: SaleCreated): void {
  const entity = new SaleCreatedEntity(event.transaction.hash.toHex() + '-' + event.logIndex.toString());
  entity.block = event.block.number;
  entity.contract = event.address;
  entity.nftContractAddress = event.params.nftContractAddress;
  entity.tokenId = event.params.tokenId;
  entity.nftSeller = event.params.nftSeller;
  entity.erc20Token = event.params.erc20Token;
  entity.buyPrice = event.params.buyPrice;
  entity.save();
}

export function handleSaleWithdrawn(event: SaleWithdrawn): void {
  const entity = new SaleWithdrawnEntity(event.transaction.hash.toHex() + '-' + event.logIndex.toString());
  entity.block = event.block.number;
  entity.contract = event.address;
  entity.nftContractAddress = event.params.nftContractAddress;
  entity.tokenId = event.params.tokenId;
  entity.nftOwner = event.params.nftOwner;
  entity.save();
}
