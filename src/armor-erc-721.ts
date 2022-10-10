import { URIGeneration, Transfer, ArmorERC721, Minted } from "../generated/ArmorERC721/ArmorERC721"
import { Transfer as TransferEntity, URIGeneration as URIGenerationEntity, UsersInventory, Armor } from "../generated/schema"
import { Address, BigInt, log, Bytes, dataSource } from '@graphprotocol/graph-ts'

export function handleTransfer(event: Transfer): void {
  const entity = new TransferEntity(event.transaction.hash.toHex() + '-' + event.logIndex.toString());
  entity.block = event.block.number;
  entity.contract = event.address;
  entity.from = event.params.from;
  entity.to = event.params.to;
  entity.tokenId = event.params.tokenId;
  entity.save();
/*
  if(event.params.from == Address.fromString("0x0000000000000000000000000000000000000000")) {
    let tokenId = event.params.tokenId;
    let contract = ArmorERC721.bind(event.address);
    let newArmor = new Armor(tokenId.toHex());
    log.info('Tier con el value: {}', [contract.armorsInfoMap(tokenId).value0.toString()])
    log.info('Tier con el metodo: {}', [contract.armorsInfoMap(tokenId).getTier().toString()])
    newArmor.tier = contract.armorsInfoMap(tokenId).getTier();
    log.info('AQUI LLEGO3', []);
    newArmor.rarityId = contract.armorsInfoMap(tokenId).getRarityId();
    newArmor.rarityName = contract.armorsInfoMap(tokenId).getRarityName();
    newArmor.collectionId = contract.armorsInfoMap(tokenId).getCollectionId();
    newArmor.collectionName = contract.armorsInfoMap(tokenId).getCollectionName();
    newArmor.firstOwner = contract.armorsInfoMap(tokenId).getFirstOwner();
    newArmor.piece = contract.armorsInfoMap(tokenId).getPiece();
    newArmor.save();
  }}
*/
  if(event.params.to != Address.fromString("0x0000000000000000000000000000000000000000")) {
    let receiversInventory = UsersInventory.load(
      event.params.to.toHex()
    );

    if(receiversInventory == null) {
      receiversInventory = new UsersInventory(event.params.to.toHex());
      receiversInventory.armors = new Array<string>(0);
      receiversInventory.clanBadges = new Array<BigInt>(0);
    }
    const tokenId = event.params.tokenId;
    /*
    let armors = receiversInventory.armors!;
    armors.push(tokenId);
    receiversInventory.armors = armors;
    */
    log.info("AQUI LLEGO 47", []);
    let armorReceived = Armor.load(
      tokenId.toHex()
    );
    if(armorReceived == null) {
      armorReceived = new Armor(tokenId.toHex());
    }
    let armors = receiversInventory.armors!;
    armors.push(armorReceived.id);
    receiversInventory.armors = armors;
    log.info("AQUI LLEGO 57", []);
    receiversInventory.save();
  }
}
/*
  if(event.params.from != Address.fromString("0x0000000000000000000000000000000000000000")) {
    let sendersInventory = UsersInventory.load(
      event.params.from.toHex()
    );
    if(sendersInventory == null) {
      sendersInventory = new UsersInventory(event.params.from.toHex());
    }
    const index = sendersInventory.armors!.indexOf(event.params.tokenId);
    let armors = sendersInventory.armors!;
    armors.splice(index, 1);
    sendersInventory.armors = armors;
    sendersInventory.save();
  }
}
/*
export function handleURIGeneration(event: URIGeneration): void {
  const entity = new URIGenerationEntity(event.transaction.hash.toHex() + '-' + event.logIndex.toString());
  entity.block = event.block.number;
  entity.contract = event.address;
  entity.owner = event.transaction.from;
  entity.tokenId = event.params.tokenId;
  entity.tokenURI = event.params.tokenURI;
  entity.save();

  let tokenId = event.params.tokenId;
  let contract = ArmorERC721.bind(event.address);
  let newArmor =  Armor.load(
    tokenId.toHex()
  )!;
  log.info('Tier con el value: {}', [contract.armorsInfoMap(tokenId).value0.toString()])
  log.info('Tier con el metodo: {}', [contract.armorsInfoMap(tokenId).getTier().toString()])
  newArmor.tier = contract.armorsInfoMap(tokenId).getTier();
  log.info('AQUI LLEGO3', []);
  newArmor.rarityId = contract.armorsInfoMap(tokenId).getRarityId();
  newArmor.rarityName = contract.armorsInfoMap(tokenId).getRarityName();
  newArmor.collectionId = contract.armorsInfoMap(tokenId).getCollectionId();
  newArmor.collectionName = contract.armorsInfoMap(tokenId).getCollectionName();
  newArmor.firstOwner = contract.armorsInfoMap(tokenId).getFirstOwner();
  newArmor.piece = contract.armorsInfoMap(tokenId).getPiece();
  newArmor.save();
}
*/
export function handleMinted(event: Minted): void {
  let tokenId = event.params.tokenId;
  log.info("Address de la armor: {}", [event.address.toHexString()])
  let contract = ArmorERC721.bind(event.address);
  let newArmor = Armor.load(
    tokenId.toHex()
  );
  if(newArmor == null) {
    newArmor = new Armor(tokenId.toHex());
  }

  log.info("AQUI LLEGO 112", []);
  let ownerOfContract = contract.owner();
  //let rol = contract.PAUSER_ROLE();
  log.info("AQUI LLEGO 115", []);
  //log.info('ROL MANAGER: {}', [rol.toString()]);
  log.info('ROL MANAGER: {}', [contract.PAUSER_ROLE().toString()])
  //log.info('Tier con el metodo: {}', [contract.armorsInfoMap(tokenId).getTier().toString()])
  newArmor.tier = contract.armorsInfoMap(tokenId).getTier();
  log.info('AQUI LLEGO3', []);
  newArmor.rarityId = contract.armorsInfoMap(tokenId).getRarityId();
  newArmor.rarityName = contract.armorsInfoMap(tokenId).getRarityName();
  newArmor.collectionId = contract.armorsInfoMap(tokenId).getCollectionId();
  newArmor.collectionName = contract.armorsInfoMap(tokenId).getCollectionName();
  newArmor.firstOwner = contract.armorsInfoMap(tokenId).getFirstOwner();
  newArmor.piece = contract.armorsInfoMap(tokenId).getPiece();
  newArmor.save();
}