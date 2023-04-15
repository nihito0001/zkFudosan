/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { ethers } from 'ethers';

import zkFudosanAbi from '../../config/abis/zkFudosan.json';

import { zkFudosanTokenAddress } from '../../config/constants';

const useGetAllActiveListings = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [activeListings, setActiveListings] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const getAllActiveListings = async (signer: ethers.Signer) => {
    try {
      setActiveListings([])
      setLoading(true);

      const tokenContract = new ethers.Contract(
        zkFudosanTokenAddress,
        zkFudosanAbi,
        signer
      );

      const activeListings = await tokenContract.getAllActiveListings.call()
      console.log('activeListings', activeListings)
      setActiveListings(activeListings);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching balance:', error);
      setActiveListings([]);
      setLoading(false);
    }
  };

  return {
    getAllActiveListings,
    activeListings,
    loading,
  };
};

export default useGetAllActiveListings;
