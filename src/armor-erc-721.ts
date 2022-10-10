import { Transfer, ArmorERC721, Minted } from "../generated/ArmorERC721/ArmorERC721"
import { Transfer as TransferEntity, UsersInventory, Armor } from "../generated/schema"
import { Address, BigInt, log, } from '@graphprotocol/graph-ts'

export function handleTransfer(event: Transfer): void {
  const entity = new TransferEntity(event.transaction.hash.toHex() + '-' + event.logIndex.toString());
  entity.block = event.block.number;
  entity.contract = event.address;
  entity.from = event.params.from;
  entity.to = event.params.to;
  entity.tokenId = event.params.tokenId;
  entity.save();

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
    let armorReceived = Armor.load(
      tokenId.toHex()
    );
    if(armorReceived == null) {
      armorReceived = new Armor(tokenId.toHex());
    }
    let armors = receiversInventory.armors!;
    armors.push(armorReceived.id);
    receiversInventory.armors = armors;
    receiversInventory.save();
  }
}

export function handleMinted(event: Minted): void {
  let tokenId = event.params.tokenId;
  log.info("Address of armor: {}", [event.address.toHexString()])
  let contract = ArmorERC721.bind(event.address);
  let newArmor = Armor.load(
    tokenId.toHex()
  );
  if(newArmor == null) {
    newArmor = new Armor(tokenId.toHex());
  }

  /*I have tried with different variables and functions, but nothing works. */
  let ownerOfContract = contract.owner();
  newArmor.tier = contract.armorsInfoMap(tokenId).getTier();
  newArmor.rarityId = contract.armorsInfoMap(tokenId).getRarityId();
  newArmor.rarityName = contract.armorsInfoMap(tokenId).getRarityName();
  newArmor.collectionId = contract.armorsInfoMap(tokenId).getCollectionId();
  newArmor.collectionName = contract.armorsInfoMap(tokenId).getCollectionName();
  newArmor.firstOwner = contract.armorsInfoMap(tokenId).getFirstOwner();
  newArmor.piece = contract.armorsInfoMap(tokenId).getPiece();
  newArmor.save();
}