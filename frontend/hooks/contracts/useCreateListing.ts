/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { ethers } from 'ethers';

import zkFudosanAbi from '../../config/abis/zkFudosan.json';

import { zkFudosanTokenAddress } from '../../config/constants';

export interface CreateListingRequest {
  secondsUntilEndTime: string;
  reservePrice: string;
  detailText: string;
}

export interface TxRecipt {
  blockHash: string
  blockNumber: number
  events: any
  logs: any
  to: string
  transactionHash: string
}

const useCreateListing = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [txRecipt, setTxRecipt] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const createListing = async (
    request: CreateListingRequest,
    signer: ethers.Signer
  ) => {
    try {
      setTxRecipt(null)
      setLoading(true);

      const tokenContract = new ethers.Contract(
        zkFudosanTokenAddress,
        zkFudosanAbi,
        signer
      );

      const tx = await tokenContract.createListing(request);
      const txRecipt = await tx.wait();

      setTxRecipt(txRecipt);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching balance:', error);
      setTxRecipt(null);
      setLoading(false);
    }
  };

  return {
    createListing,
    txRecipt,
    loading,
  };
};

export default useCreateListing;
