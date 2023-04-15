import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { deployFixture } from "../helper";

export default function suite() {
  it("Should get my get all active listings", async () => {
    const { zkFudosan, fixtureData } = await loadFixture(deployFixture);

    const listings = await zkFudosan
      .connect(fixtureData.accountForOffered)
      .getAllActiveListings();

    expect(listings.length).to.equal(3);
  });

  describe("Validations", () => {});

  describe("Events", () => {});

  describe("Transfers", () => {});
}
