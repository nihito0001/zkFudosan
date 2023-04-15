/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { ethers } from 'ethers';

import zkFudosanAbi from '../../config/abis/zkFudosan.json';

import { zkFudosanTokenAddress } from '../../config/constants';

export interface CreateOfferRequest {
  listingId: string;
  price: string;
}

export interface TxReceipt {
  blockHash: string;
  blockNumber: number;
  events: any;
  logs: any;
  to: string;
  transactionHash: string;
}

const useCreateOffer = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [txReceipt, setTxReceipt] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const createOffer = async (
    request: CreateOfferRequest,
    signer: ethers.Signer
  ) => {
    try {
      setTxReceipt(null);
      setLoading(true);

      const tokenContract = new ethers.Contract(
        zkFudosanTokenAddress,
        zkFudosanAbi,
        signer
      );

      // const value = ethers.utils.parseEther(request.price.toString());
      // console.log(value.toString())
      const tx = await tokenContract.createOffer(request.listingId, { value: request.price.toString() });
      const txReceipt = await tx.wait();

      setTxReceipt(txReceipt);
      setLoading(false);

      return txReceipt
    } catch (error) {
      console.error('Error fetching balance:', error);
      setTxReceipt(null);
      setLoading(false);
    }
  };

  return {
    createOffer,
    txReceipt,
    loading,
  };
};

export default useCreateOffer;
