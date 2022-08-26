import { Minted, URIGeneration, Transfer } from "../generated/ArmorERC721/ArmorERC721"
import { Burned, Minted as MintedEntity, Transfer as TransferEntity, URIGeneration as URIGenerationEntity } from "../generated/schema"

export function handleTransfer(event: Transfer): void {
  if (event.params.to.toHexString() != '0x0000000000000000000000000000000000000000' && event.params.from.toHexString() != '0x0000000000000000000000000000000000000000'){
    const entity = new TransferEntity(event.transaction.hash.toHex());
    entity.block = event.block.number;
    entity.contract = event.address;
    entity.from = event.params.from;
    entity.to = event.params.to;
    entity.tokenId = event.params.tokenId;
    entity.save();
  } else if (event.params.to.toHexString() == '0x0000000000000000000000000000000000000000') {
    const entity = new Burned(event.transaction.hash.toHex());
    entity.block = event.block.number;
    entity.contract = event.address;
    entity.owner = event.params.from;
    entity.tokenId = event.params.tokenId;
    entity.save();
  }
}

export function handleMinted(event: Minted): void {
  const entity = new MintedEntity(event.transaction.hash.toHex());
  entity.block = event.block.number;
  entity.contract = event.address;
  entity.owner = event.transaction.from;
  entity.tokenId = event.params.tokenId;
  entity.save();
}

export function handleURIGeneration(event: URIGeneration): void {
  const entity = new URIGenerationEntity(event.transaction.hash.toHex());
  entity.block = event.block.number;
  entity.contract = event.address;
  entity.owner = event.transaction.from;
  entity.tokenId = event.params.tokenId;
  entity.tokenURI = event.params.tokenURI;
  entity.save();
}