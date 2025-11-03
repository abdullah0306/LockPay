"use client";

import { useState, useEffect } from 'react';
import { ConnectButton, useActiveAccount, useActiveWallet, useDisconnect } from 'thirdweb/react';
import { createThirdwebClient } from 'thirdweb';

const client = createThirdwebClient({
  clientId: process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID || "701cc72c7c405d65d9eedc7db4c742d2"
});

export const WalletConnect = () => {
  const account = useActiveAccount();
  const wallet = useActiveWallet();
  const { disconnect } = useDisconnect();
  const [isConnected, setIsConnected] = useState(false);
  const [shortAddress, setShortAddress] = useState('');

  useEffect(() => {
    setIsConnected(!!account);
    if (account?.address) {
      const address = account.address;
      if (address.length > 10) {
        const shortAddr = `${address.slice(0, 6)}...${address.slice(-4)}`;
        setShortAddress(shortAddr);
      } else {
        setShortAddress(address);
      }
    } else {
      setShortAddress('');
    }
  }, [account]);

  const handleDisconnect = async () => {
    try {
      if (wallet) {
        // Disconnect the active wallet using thirdweb's disconnect function
        await disconnect(wallet);
      }
    } catch (error) {
      console.error('Error disconnecting wallet:', error);
      // If disconnect fails, try clearing storage as fallback
      try {
        // Clear thirdweb-related storage
        const keys = Object.keys(localStorage);
        keys.forEach(key => {
          if (key.startsWith('thirdweb') || key.includes('wallet')) {
            localStorage.removeItem(key);
          }
        });
        // Reload to reset state
        window.location.reload();
      } catch (e) {
        console.error('Error in fallback disconnect:', e);
      }
    }
  };

  if (isConnected && account?.address) {
    return (
      <div className="flex items-center space-x-1 sm:space-x-2">
        <div className="flex items-center px-2 sm:px-3 lg:px-4 py-1.5 sm:py-2 bg-green-600 rounded-md text-xs sm:text-sm font-medium text-white min-w-0">
          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-300 rounded-full mr-1.5 sm:mr-2 flex-shrink-0"></div>
          <span className="wallet-address">{shortAddress}</span>
        </div>
        <button
          onClick={handleDisconnect}
          className="p-1.5 sm:p-2 rounded-md text-red-400 hover:text-red-300 hover:bg-red-900/20 transition-colors"
          title="Disconnect Wallet"
        >
          <svg
            className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
        </button>
      </div>
    );
  }

  return (
    <div className="wallet-connect-container">
      <ConnectButton client={client} />
    </div>
  );
};
