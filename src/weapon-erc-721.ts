import {
  WeaponERC721Minted as WeaponERC721MintedEvent,
  WeaponERC721Transfer as WeaponERC721TransferEvent,
  WeaponERC721URIGeneration as WeaponERC721URIGenerationEvent,
} from "../generated/WeaponERC721/WeaponERC721"
import { Minted, Burned, Transfer, URIGeneration } from "../generated/schema"
import { log } from "@graphprotocol/graph-ts";

export function handleWeaponERC721Minted(event: WeaponERC721MintedEvent): void {
  log.warning('mint weapon {}', [event.transaction.hash.toString()]);
  const entity = new Minted(event.transaction.hash.toHex());
  entity.block = event.block.number;
  entity.contract = event.address;
  entity.owner = event.transaction.from;
  entity.tokenId = event.params.tokenId;
  entity.save();
}

export function handleWeaponERC721Transfer(
  event: WeaponERC721TransferEvent
): void {
  if (event.params.to.toHexString() != '0x0000000000000000000000000000000000000000' && event.params.from.toHexString() != '0x0000000000000000000000000000000000000000'){
    log.warning('trnasfer weapon {}', [event.transaction.hash.toString()]);
    const entity = new Transfer(event.transaction.hash.toHex());
    entity.block = event.block.number;
    entity.contract = event.address;
    entity.from = event.params.from;
    entity.to = event.params.to;
    entity.tokenId = event.params.tokenId;
    entity.save();
  } else if (event.params.to.toHexString() == '0x0000000000000000000000000000000000000000') {
    log.warning('burn weapon {}', [event.transaction.hash.toString()]);
    const entity = new Burned(event.transaction.hash.toHex());
    entity.block = event.block.number;
    entity.contract = event.address;
    entity.owner = event.params.from;
    entity.tokenId = event.params.tokenId;
    entity.save();
  }
}

export function handleWeaponERC721URIGeneration(
  event: WeaponERC721URIGenerationEvent
): void {
  log.warning('uri weapon {}', [event.transaction.hash.toString()]);
  let entity = new URIGeneration(event.transaction.hash.toHex());
  entity.block = event.block.number;
  entity.contract = event.address;
  entity.owner = event.transaction.from;
  entity.tokenId = event.params.tokenId;
  entity.tokenURI = event.params.tokenURI;
  entity.save();
}
