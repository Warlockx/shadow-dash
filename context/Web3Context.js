'use client'; // Ensure client-side rendering
import { createContext, useContext, useEffect, useState } from 'react';
import { getProvider, getSigner, checkWalletConnection } from '@/lib/ether';
import { usePathname } from 'next/navigation';
import toast from 'react-hot-toast';

const Web3Context = createContext();

export function Web3Provider({ children }) {
  const [signer, setSigner] = useState(null);
  const [address, setAddress] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  // const path = usePathname();
  const connect = async () => {
    try {
      const signer = await getSigner();
      const address = await signer.getAddress();
      setSigner(signer);
      setAddress(address);
    } catch (error) {
      console.error('Failed to connect wallet:', error);
    }
  };

  const disconnect = () => {
    setSigner(null);
    setAddress(null);
  };

  // const init = async () => {
  //   try {
  //     const signer = await getSigner();
  //     const address = await signer.getAddress();
  //     setSigner(signer);
  //     setAddress(address);
  //   } catch (error) {
  //     console.error('Web3 initialization failed:', error);
  //   }
  // };

  useEffect(() => {
    checkWalletConnection().then(({ isInstalled, isConnected, address, signer }) => {
      if (isInstalled) {
        if (isConnected) {
          setSigner(signer);
          setAddress(address);
        }
        setIsLoading(false);
      } else {
        toast.error('Wallet not installed');
      }
    })
  }, []);

  return (
    <Web3Context.Provider value={{ signer, address, provider: getProvider(), connect, disconnect, isLoading }}>
      {children}
    </Web3Context.Provider>
  );
}

export const useWeb3 = () => useContext(Web3Context);
