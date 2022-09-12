import { URIGeneration, Transfer } from "../generated/ClanBadgeERC721/ClanBadgeERC721"
import { Transfer as TransferEntity, URIGeneration as URIGenerationEntity } from "../generated/schema"

export function handleTransfer(event: Transfer): void {
  const entity = new TransferEntity(event.transaction.hash.toHex() + '-' + event.logIndex.toString());
  entity.block = event.block.number;
  entity.contract = event.address;
  entity.from = event.params.from;
  entity.to = event.params.to;
  entity.tokenId = event.params.tokenId;
  entity.save();
}

export function handleURIGeneration(event: URIGeneration): void {
  const entity = new URIGenerationEntity(event.transaction.hash.toHex() + '-' + event.logIndex.toString());
  entity.block = event.block.number;
  entity.contract = event.address;
  entity.owner = event.transaction.from;
  entity.tokenId = event.params.tokenId;
  entity.tokenURI = event.params.tokenURI;
  entity.save();
}