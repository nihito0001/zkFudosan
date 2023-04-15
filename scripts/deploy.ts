import { ethers } from "hardhat";

const ADMIN_ADDRESS = "0xa7a5fd8481b4e27f5dd87c4eb9703b741a7f0000"
const PLATFORM_FEE_RECIPIENT = "0xe76ebe6edd1b54dd4267985312b504dcd1550000"
const CONTRACT_URI = "https://example.com/"

async function main() {
  const zkFudosanFactory = await ethers.getContractFactory("ZkFudosan");
  const zkFudosan = await zkFudosanFactory.deploy(ADMIN_ADDRESS, CONTRACT_URI, PLATFORM_FEE_RECIPIENT);

  await zkFudosan.deployed();

  console.log(`Deployed to ${zkFudosan.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
