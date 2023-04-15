import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { deployFixture } from "../helper";

export default function suite() {
  it("Should approve offer", async () => {
    // 事前準備
    const { zkFudosan, fixtureData } = await loadFixture(deployFixture);

    const offers = await zkFudosan
      .connect(fixtureData.accountForApprove)
      .getMyOffers();
    const offer = offers[0];
    expect(offer.offerStatus).to.equal(0);

    // ここからが実際のテスト
    await zkFudosan
      .connect(fixtureData.accountForApprove)
      .approveOffer(offer.offerId);

    const updatedOffers = await zkFudosan
      .connect(fixtureData.accountForApprove)
      .getMyOffers();
    const updatedOffer = updatedOffers[0];

    expect(updatedOffer.offerStatus).to.equal(2);
  });

  describe("Validations", () => {});

  describe("Events", () => {});

  describe("Transfers", () => {
    it("Should transfer the funds to the contract", async function () {
      const { zkFudosan, fixtureData } = await loadFixture(deployFixture);

      const offers = await zkFudosan
        .connect(fixtureData.accountForApprove)
        .getMyOffers();
      const offer = offers[0];
      expect(offer.offerStatus).to.equal(0);

      // ここからが実際のテスト

      await expect(
        zkFudosan
          .connect(fixtureData.accountForApprove)
          .approveOffer(offer.offerId)
      ).to.changeEtherBalances(
        [
          zkFudosan,
          fixtureData.platformFeeRecipient,
          fixtureData.accountForApproved,
          fixtureData.accountForRefunded1,
          fixtureData.accountForRefunded2,
          fixtureData.accountForApprove,
        ],
        [-(300 + 400 + 500), 0, 500, 300, 400, 0]
      );
    });
  });
}
