/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { ethers } from 'ethers';

import zkFudosanAbi from '../../config/abis/zkFudosan.json';

import { zkFudosanTokenAddress } from '../../config/constants';

export interface TxReceipt {
  blockHash: string;
  blockNumber: number;
  events: any;
  logs: any;
  to: string;
  transactionHash: string;
}

const useApproveOffer = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [txReceipt, setTxReceipt] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const approveOffer = async (
    offerId: string,
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

      const tx = await tokenContract.approveOffer(offerId);
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
    approveOffer,
    txReceipt,
    loading,
  };
};

export default useApproveOffer;
