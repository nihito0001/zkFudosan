import { useState } from 'react';
import { ethers } from 'ethers';

import zkFudosanAbi from '../../config/abis/zkFudosan.json';

import { zkFudosanTokenAddress } from '../../config/constants';

export interface CreateListingRequest {
  secondsUntilEndTime: string;
  reservePrice: string;
  detailText: string;
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
      setLoading(true);

      const tokenContract = new ethers.Contract(
        zkFudosanTokenAddress,
        zkFudosanAbi,
        signer
      );

      const tx = await tokenContract.createListing(request);
      console.log('tx: ', tx)

      const txRecipt = await tx.wait();
      console.log('txRecipt', txRecipt)

      setLoading(false);
      setTxRecipt(txRecipt);
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
