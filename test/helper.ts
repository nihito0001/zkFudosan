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
    owner,
    platformFeeRecipient,
    accountForListing,
    accountForOffered,
    accountForOffer,
    activeListingId: 0,
    offeredListingId: 1,
    contractURI,
  };

  // Create a listing for accountForOffered
  await zkFudosan.connect(fixtureData.accountForOffered).createListing({
    secondsUntilEndTime: 3600 * 2, // 2 hour
    reservePrice: 1234,
  });

  return {
    zkFudosan,
    fixtureData,
  };
}
