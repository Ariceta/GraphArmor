import {
    BidMade,
    NFTTransferredAndSellerPaid,
    NftAuctionCreated} from "../generated/EnglishAuction/EnglishAuction"
  
  import {
    BidMade as BidMadeEntity,
    NFTTransferredAndSellerPaid as NFTTransferredAndSellerPaidEntity,
    NftAuctionCreated as NftAuctionCreatedEntity,
  } from "../generated/schema";
  
  export function handleBidMade(event: BidMade): void {
    const entity = new BidMadeEntity(event.transaction.hash.toHex() + '-' + event.logIndex.toString());
    entity.block = event.block.number;
    entity.contract = event.address;
    entity.nftContractAddress = event.params.nftContractAddress;
    entity.tokenId = event.params.tokenId;
    entity.bidder = event.params.bidder;
    entity.erc20Token = event.params.erc20Token;
    entity.tokenAmount = event.params.tokenAmount;
    entity.save();
  }
  
  export function handleNFTTransferredAndSellerPaid(
    event: NFTTransferredAndSellerPaid
  ): void {
    const entity = new NFTTransferredAndSellerPaidEntity(event.transaction.hash.toHex() + '-' + event.logIndex.toString());
    entity.block = event.block.number;
    entity.contract = event.address;
    entity.nftContractAddress = event.params.nftContractAddress;
    entity.tokenId = event.params.tokenId;
    entity.nftSeller = event.params.nftSeller;
    entity.nftHighestBid = event.params.nftHighestBid;
    entity.nftHighestBidder = event.params.nftHighestBidder;
    entity.save();
  }
  
  export function handleNftAuctionCreated(event: NftAuctionCreated): void {
    const entity = new NftAuctionCreatedEntity(event.transaction.hash.toHex() + '-' + event.logIndex.toString());
    entity.block = event.block.number;
    entity.contract = event.address;
    entity.nftContractAddress = event.params.nftContractAddress;
    entity.tokenId = event.params.tokenId;
    entity.nftSeller = event.params.nftSeller;
    entity.erc20Token = event.params.erc20Token;
    entity.minPrice = event.params.minPrice;
    entity.auctionBidPeriod = event.params.auctionBidPeriod;
    entity.bidIncreasePercentage = event.params.bidIncreasePercentage;
    entity.feeRecipients = event.params.feeRecipients;
    entity.feePercentages = event.params.feePercentages;
    entity.save();
  }