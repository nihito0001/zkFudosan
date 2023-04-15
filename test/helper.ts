import { time } from "@nomicfoundation/hardhat-network-helpers";
import { ethers } from "hardhat";

// We define a fixture to reuse the same setup in every test.
// We use loadFixture to run this setup once, snapshot that state,
// and reset Hardhat Network to that snapshot in every test.
export async function deployFixture() {
  // Contracts are deployed using the first signer/account by default
  const [
    owner, // contract admin
    platformFeeRecipient,
    accountForListing,
    accountForOffered,
    accountForOffer,
    accountForCloseListing,
  ] = await ethers.getSigners();
  const contractURI = "https://example.com";

  const ZkFudosan = await ethers.getContractFactory("ZkFudosan");
  const zkFudosan = await ZkFudosan.deploy(
    owner.address,
    contractURI,
    platformFeeRecipient.address,
    {
      value: 0,
    }
  );

  const fixtureData = {
    contractURI,
    owner,
    platformFeeRecipient,
    accountForListing,
    accountForOffered,
    accountForOffer,
    accountForCloseListing,
  };

  // Prepare for create offer
  await zkFudosan.connect(fixtureData.accountForOffered).createListing({
    secondsUntilEndTime: 3600 * 2, // 2 hour
    reservePrice: 1234,
    detailText: "hogehoge",
  });

  // Prepare for close listing
  await zkFudosan.connect(fixtureData.accountForCloseListing).createListing({
    secondsUntilEndTime: 3600 * 2, // 2 hour
    reservePrice: 1234,
    detailText: "hogehoge",
  });

  const listings = await zkFudosan
    .connect(fixtureData.accountForCloseListing)
    .getMyListings();
  const listingId = listings[0].listingId;

  await zkFudosan
    .connect(fixtureData.accountForOffer)
    .createOffer(listingId, { value: 1234 });

  return {
    zkFudosan,
    fixtureData,
  };
}
