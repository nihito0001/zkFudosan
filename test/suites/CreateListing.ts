import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { deployFixture } from "../helper";

export default function suite() {
  const getListingParameters = async () => {
    return {
      secondsUntilEndTime: 3600 * 2, // 2 hour
      reservePrice: 1234,
      detailText: "hoge",
    };
  };

  it("Should create listing", async () => {
    const { zkFudosan, fixtureData } = await loadFixture(deployFixture);

    const listings = await zkFudosan
      .connect(fixtureData.accountForListing)
      .getMyListings();

    expect(listings.length).to.equal(0);

    const listingParameters = await getListingParameters();

    await zkFudosan
      .connect(fixtureData.accountForListing)
      .createListing(listingParameters);

    const updatedListings = await zkFudosan
      .connect(fixtureData.accountForListing)
      .getMyListings();

    expect(updatedListings.length).to.equal(1);
  });

  describe("Validations", () => {});

  describe("Events", () => {});

  describe("Transfers", () => {});
}
