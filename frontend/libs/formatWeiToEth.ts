import { ethers } from 'ethers';

export const formatWeiToEth = (eth: string) => {
  if (!eth) {
    console.log(eth)
    return 0
  }
  return ethers.utils.formatEther(eth)
}