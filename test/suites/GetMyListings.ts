import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { deployFixture } from "../helper";

export default function suite() {
  it("Should get my listings", async () => {
    const { zkFudosan, fixtureData } = await loadFixture(deployFixture);

    const listings = await zkFudosan
      .connect(fixtureData.accountForOffered)
      .getMyListings();

    expect(listings.length).to.equal(1);
  });

  describe("Validations", () => {});

  describe("Events", () => {});

  describe("Transfers", () => {});
}
