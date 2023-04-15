/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { ethers } from 'ethers';

import zkFudosanAbi from '../../config/abis/zkFudosan.json';

import { zkFudosanTokenAddress } from '../../config/constants';

export interface TxRecipt {
  blockHash: string;
  blockNumber: number;
  events: any;
  logs: any;
  to: string;
  transactionHash: string;
}

const useCloseListing = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [txRecipt, setTxRecipt] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const closeListing = async (
    listingId: string,
    signer: ethers.Signer
  ) => {
    try {
      setTxRecipt(null);
      setLoading(true);

      const tokenContract = new ethers.Contract(
        zkFudosanTokenAddress,
        zkFudosanAbi,
        signer
      );

      const tx = await tokenContract.closeListing(listingId);
      const txRecipt = await tx.wait();
      console.log('txRecipt', txRecipt)

      setTxRecipt(txRecipt);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching balance:', error);
      setTxRecipt(null);
      setLoading(false);
    }
  };

  return {
    closeListing,
    txRecipt,
    loading,
  };
};

export default useCloseListing;
