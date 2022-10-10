import { URIGeneration, Transfer } from "../generated/ClanBadgeERC721/ClanBadgeERC721"
import { Transfer as TransferEntity, URIGeneration as URIGenerationEntity, UsersInventory, Armor } from "../generated/schema"
import { Address, BigInt } from '@graphprotocol/graph-ts'

export function handleTransfer(event: Transfer): void {
  const entity = new TransferEntity(event.transaction.hash.toHex() + '-' + event.logIndex.toString());
  entity.block = event.block.number;
  entity.contract = event.address;
  entity.from = event.params.from;
  entity.to = event.params.to;
  entity.tokenId = event.params.tokenId;
  entity.save();
/*
  if(event.params.to != Address.fromString("0x0000000000000000000000000000000000000000")) {
    let receiversInventory = UsersInventory.load(
      event.params.to.toHex()
    );
    if(receiversInventory == null) {
      receiversInventory = new UsersInventory(event.params.to.toHex());
      receiversInventory.armors = new Array<Armor>(0);
      receiversInventory.clanBadges = new Array<BigInt>(0);
    }
    const tokenId = event.params.tokenId;
    let clanBadges = receiversInventory.clanBadges!;
    clanBadges.push(tokenId);
    receiversInventory.clanBadges = clanBadges;
    receiversInventory.save();
  }

  if(event.params.from != Address.fromString("0x0000000000000000000000000000000000000000")) {
    let sendersInventory = UsersInventory.load(
      event.params.from.toHex()
    );
    if(sendersInventory == null) {
      sendersInventory = new UsersInventory(event.params.from.toHex());
    }
    const index = sendersInventory.clanBadges!.indexOf(event.params.tokenId);
    let clanBadges = sendersInventory.clanBadges!;
    clanBadges.splice(index, 1);
    //sendersInventory.clanBadges!.splice(index, 1);
    sendersInventory.clanBadges = clanBadges;
    sendersInventory.save();
  }*/
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