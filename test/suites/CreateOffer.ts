import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { deployFixture } from "../helper";

export default function suite() {
  it("Should create offer", async () => {
    // 事前準備
    const { zkFudosan, fixtureData } = await loadFixture(deployFixture);

    const listings = await zkFudosan
      .connect(fixtureData.accountForOffered)
      .getMyListings();
    const listingId = listings[0].listingId;

    // ここからが実際のテスト
    const offers = await zkFudosan
      .connect(fixtureData.accountForOffered)
      .getOffers(listingId);
    expect(offers.length).to.equal(0);

    await zkFudosan
      .connect(fixtureData.accountForOffer)
      .createOffer(listingId, { value: 1234 });

    const updatedOffers = await zkFudosan
      .connect(fixtureData.accountForOffered)
      .getOffers(listingId);

    expect(updatedOffers.length).to.equal(1);
  });

  describe("Validations", () => {});

  describe("Events", () => {});

  describe("Transfers", () => {
    it("Should transfer the funds to the contract", async function () {
      const { zkFudosan, fixtureData } = await loadFixture(deployFixture);

      const listings = await zkFudosan
        .connect(fixtureData.accountForOffered)
        .getMyListings();
      const listingId = listings[0].listingId;

      const price = listings[0].reservePrice;

      await expect(
        zkFudosan
          .connect(fixtureData.accountForOffer)
          .createOffer(listingId, { value: price })
      ).to.changeEtherBalances(
        [
          zkFudosan,
          fixtureData.platformFeeRecipient,
          fixtureData.accountForListing,
          fixtureData.accountForOffered,
          fixtureData.accountForOffer,
        ],
        [price, 0, 0, 0, -price]
      );
    });
  });
}
