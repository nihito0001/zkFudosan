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
      setActiveListings([]);
      setLoading(true);

      const tokenContract = new ethers.Contract(
        zkFudosanTokenAddress,
        zkFudosanAbi,
        signer
      );

      const activeListings = await tokenContract.getAllActiveListings.call();
      console.log('activeListings', activeListings)

      const output = []
      for (const listing of activeListings) {
        if (listing.owner !=='0x0000000000000000000000000000000000000000') {
          output.push({
            ...listing,
          })
        }
      }

      // listingsにidを追加
      const listingsWithId = output.map((listing: any, index: number) => {
        return {
          ...listing,
          id: index,
        };
      });

      // listingsWithIdのIDを元にソート
      const sortedListings = listingsWithId.sort((a: any, b: any) => {
        return b.id - a.id;
      });

      setActiveListings(sortedListings);
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
