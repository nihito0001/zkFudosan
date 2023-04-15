/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { ethers } from 'ethers';

import zkFudosanAbi from '../../config/abis/zkFudosan.json';

import { zkFudosanTokenAddress } from '../../config/constants';

const useGetMyListings = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [listings, setListings] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const getMyListings = async (signer: ethers.Signer) => {
    try {
      setListings([]);
      setLoading(true);

      const tokenContract = new ethers.Contract(
        zkFudosanTokenAddress,
        zkFudosanAbi,
        signer
      );

      const listings = await tokenContract.getMyListings.call();

      // listingsにidを追加
      const listingsWithId = listings.map((listing: any, index: number) => {
        return {
          ...listing,
          id: index,
        };
      });

      // listingsWithIdのIDを元にソート
      const sortedListings = listingsWithId.sort((a: any, b: any) => {
        return b.id - a.id;
      });

      console.log('sortedListings', sortedListings)

      setListings(sortedListings);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching balance:', error);
      setListings([]);
      setLoading(false);
    }
  };

  return {
    getMyListings,
    listings,
    loading,
  };
};

export default useGetMyListings;
