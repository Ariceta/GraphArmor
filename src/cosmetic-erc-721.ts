import { Transfer } from "../generated/CosmeticERC721/CosmeticERC721"
import { Transfer as TransferEntity, URIGeneration as URIGenerationEntity } from "../generated/schema"

export function handleTransfer(event: Transfer): void {
  const entity = new TransferEntity(event.transaction.hash.toHex());
  entity.block = event.block.number;
  entity.contract = event.address;
  entity.from = event.params.from;
  entity.to = event.params.to;
  entity.tokenId = event.params.tokenId;
  entity.save();
}
