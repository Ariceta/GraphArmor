import {
  BuyPriceUpdated,
  NFTTransferredAndSellerPaid,
  PushMade,
  SaleCreated,
  SaleWithdrawn,
} from "../generated/BuySell/BuySell";
import {
  NFTTransferredAndSellerPaid as NFTTransferredAndSellerPaidEntity,
  BuyPriceUpdated as BuyPriceUpdatedEntity,
  PushMade as PushMadeEntity,
  SaleCreated as SaleCreatedEntity,
  SaleWithdrawn as SaleWithdrawnEntity,
} from "../generated/schema";

export function handleBuyPriceUpdated(event: BuyPriceUpdated): void {
  const entity = new BuyPriceUpdatedEntity(event.transaction.hash.toHex());
  entity.block = event.block.number;
  entity.contract = event.address;
  entity.nftContractAddress = event.params.nftContractAddress;
  entity.tokenId = event.params.tokenId;
  entity.newBuyPrice = event.params.newBuyPrice;
  entity.save();
}

export function handleNFTTransferredAndSellerPaid(
  event: NFTTransferredAndSellerPaid
): void {
  const entity = new NFTTransferredAndSellerPaidEntity(
    event.transaction.hash.toHex()
  );
  entity.block = event.block.number;
  entity.contract = event.address;
  entity.nftContractAddress = event.params.nftContractAddress;
  entity.tokenId = event.params.tokenId;
  entity.nftSeller = event.params.nftSeller;
  entity.nftHighestPush = event.params.nftHighestPush;
  entity.nftHighestPusher = event.params.nftHighestPusher;
  entity.nftRecipient = event.params.nftRecipient;
  entity.save();
}

export function handlePushMade(event: PushMade): void {
  const entity = new PushMadeEntity(event.transaction.hash.toHex());
  entity.block = event.block.number;
  entity.contract = event.address;
  entity.nftContractAddress = event.params.nftContractAddress;
  entity.tokenId = event.params.tokenId;
  entity.pusher = event.params.Pusher;
  entity.erc20Token = event.params.erc20Token;
  entity.tokenAmount = event.params.tokenAmount;
  entity.save();
}

export function handleSaleCreated(event: SaleCreated): void {
  const entity = new SaleCreatedEntity(event.transaction.hash.toHex());
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
  const entity = new SaleWithdrawnEntity(event.transaction.hash.toHex());
  entity.block = event.block.number;
  entity.contract = event.address;
  entity.nftContractAddress = event.params.nftContractAddress;
  entity.tokenId = event.params.tokenId;
  entity.nftOwner = event.params.nftOwner;
  entity.save();
}
