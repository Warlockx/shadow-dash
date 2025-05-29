import { ethers, getAddress } from 'ethers';
import * as constants from './constants';
import SHADOW_NFT_ABI from '@/abi/nft.json';


// Initialize provider (client-side or server-side)
export const getProvider = () => {
  const infuraUrl = `https://rpc.soniclabs.com/`;
  return new ethers.JsonRpcProvider(infuraUrl);
};

// Connect to user's wallet (e.g., MetaMask)
export const getSigner = async () => {
  if (typeof window !== 'undefined' && window.ethereum) {
    const provider = new ethers.BrowserProvider(window.ethereum);
    await provider.send('eth_requestAccounts', []); // Request wallet connection
    return provider.getSigner();
  }
  throw new Error('No wallet detected');
};

export const checkWalletConnection = async () => {
  if (typeof window === 'undefined' || !window.ethereum) {
    return { isInstalled: false, isConnected: false, address: null, signer: null };
  }

  try {
    const provider = new ethers.BrowserProvider(window.ethereum);
    // Check for existing connected accounts without prompting
    const accounts = await provider.listAccounts();

    if (accounts.length > 0) {
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      return { isInstalled: true, isConnected: true, address, signer };
    }

    return { isInstalled: true, isConnected: false, address: null, signer: null };
  } catch (error) {
    console.error('Error checking wallet connection:', error);
    return { isInstalled: true, isConnected: false, address: null, signer: null };
  }
};


export const getShadowNFTContract = async () => {
  const provider = getProvider(); // Ensure the provider is initialized
  if (!provider) {
    throw new Error('Provider not initialized');
  }
  const contractAddress = constants.SHADOW_NFT_ADDRESS;
  return new ethers.Contract(contractAddress, SHADOW_NFT_ABI, provider);
}

export const getWalletBalance = async (address) => {
  const nft = await getShadowNFTContract(); // Ensure the contract is initialized
  if (!nft) {
    throw new Error('NFT contract not initialized');
  }
  const balance = await nft.balanceOf(address);
  // Convert BigNumber to a regular number
  return parseInt(balance.toString(), 10);
}

export const getNFTTokenByIndex = async (address, index) => {
  const nft = await getShadowNFTContract(); // Ensure the contract is initialized
  if (!nft) {
    throw new Error('NFT contract not initialized');
  }
  const data = await nft.tokenOfOwnerByIndex(address, index);
  return parseInt(data.toString(), 10);
}