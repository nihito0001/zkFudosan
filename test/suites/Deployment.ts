import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
// import { ethers } from "hardhat";
import { deployFixture } from "../helper";

export default function suite() {
  it("Should set the right platform fee recipient", async function () {
    const { zkFudosan, fixtureData } = await loadFixture(deployFixture);

    const platformFeeRecipient = await zkFudosan.getPlatformFeeRecipient();

    expect(platformFeeRecipient).to.equal(
      fixtureData.platformFeeRecipient.address
    );
  });

  it("Should set the right contract URI", async function () {
    const { zkFudosan, fixtureData } = await loadFixture(deployFixture);

    expect(await zkFudosan.contractURI()).to.equal(fixtureData.contractURI);
  });

  // it("Should get balance", async function () {
  //   const { zkFudosan, fixtureData } = await loadFixture(deployFixture);

  //   expect(await ethers.provider.getBalance(zkFudosan.address)).to.equal(
  //     fixtureData.depositAmount
  //   );
  // });
}
