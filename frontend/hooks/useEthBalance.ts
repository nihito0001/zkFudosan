import { useState } from 'react';
import { ethers } from 'ethers';

const useEthBalance = () => {
  const [balance, setBalance] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchEthBalance = async (address: string) => {
    try {
      setLoading(true);
      // プロバイダーの設定（ここでは、デフォルトプロバイダーを使用）
      const provider = new ethers.providers.Web3Provider(window.ethereum);

      // アドレスの ETH 残高を取得
      const balance = await provider.getBalance(address);

      // ETH 残高を wei から ether に変換
      let balanceInEther = ethers.utils.formatEther(balance);

      // 小数点第5位まで表示
      balanceInEther = parseFloat(ethers.utils.formatEther(balance)).toFixed(5);

      // ステートに残高をセット
      setBalance(balanceInEther);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching balance:', error);
      setBalance(null);
      setLoading(false);
    }
  };

  return {
    fetchEthBalance,
    balance,
    loading,
  };
};

export default useEthBalance;
