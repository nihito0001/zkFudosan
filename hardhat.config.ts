import type { HardhatUserConfig } from "hardhat/config";
import type { NetworkUserConfig } from "hardhat/types";
import { config as dotenvConfig } from "dotenv";
import { resolve } from "path";
dotenvConfig({ path: resolve(__dirname, "./.env") });

import "@nomicfoundation/hardhat-toolbox";

const DEPLOYER_PRIVATE_KEY = process.env.DEPLOYER_PRIVATE_KEY || "";

const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;
const ALLTHATNODE_API_KEY = process.env.ALLTHATNODE_API_KEY;

const chainIds = {
  mainnet: 1,
  goerli: 5,
  sepolia: 0,
  scroll: 534353,
  taiko: 167002,
};

const setNetworkConfig = (
  network: keyof typeof chainIds
): NetworkUserConfig => {
  let url = "";
  if (network === "scroll") {
    url = "https://alpha-rpc.scroll.io/l2";
  } else if (network === "taiko") {
    url = "https://l2rpc.hackathon.taiko.xyz";
  } else {
    url = `https://ethereum-${network}-rpc.allthatnode.com/${ALLTHATNODE_API_KEY}`;
  }

  return {
    accounts: [DEPLOYER_PRIVATE_KEY],
    chainId: chainIds[network],
    url,
  };
};

const config: HardhatUserConfig = {
  defaultNetwork: "goerli",
  networks: Object.keys(chainIds).reduce((acc: any, network: any) => {
    acc[network] = setNetworkConfig(network as keyof typeof chainIds);
    return acc;
  }, {} as Record<keyof typeof chainIds, NetworkUserConfig>),
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },
  solidity: "0.8.17",
};

export default config;
