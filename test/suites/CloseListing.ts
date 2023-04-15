import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { deployFixture } from "../helper";

export default function suite() {
  it("Should close listing", async () => {
    const { zkFudosan, fixtureData } = await loadFixture(deployFixture);

    const listings = await zkFudosan
      .connect(fixtureData.accountForCloseListing)
      .getMyListings();
    const listing = listings[0];
    expect(listing.listingStatus).to.equal(0);

    zkFudosan
      .connect(fixtureData.accountForCloseListing)
      .closeListing(listing.listingId);

    const updatedListings = await zkFudosan
      .connect(fixtureData.accountForCloseListing)
      .getMyListings();
    const updatedListing = updatedListings[0];

    expect(updatedListing.listingStatus).to.equal(2);
  });

  describe("Validations", () => {});

  describe("Events", () => {});

  describe("Transfers", () => {});
}
