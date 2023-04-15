/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { ethers } from 'ethers';

import zkFudosanAbi from '../../config/abis/zkFudosan.json';

import { zkFudosanTokenAddress } from '../../config/constants';

const useGetOffers = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [offers, setOffers] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const getOffers = async (listingId: string, signer: ethers.Signer) => {
    try {
      setOffers([]);
      setLoading(true);

      const tokenContract = new ethers.Contract(
        zkFudosanTokenAddress,
        zkFudosanAbi,
        signer
      );

      const offers = await tokenContract.getOffers(listingId);

      setOffers(offers);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching balance:', error);
      setOffers([]);
      setLoading(false);
    }
  };

  return {
    getOffers,
    offers,
    loading,
  };
};

export default useGetOffers;
