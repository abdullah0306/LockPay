"use client";

import { useState, useEffect } from 'react';
import { ConnectButton, useActiveAccount } from 'thirdweb/react';
import { createThirdwebClient } from 'thirdweb';

const client = createThirdwebClient({
  clientId: process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID || "701cc72c7c405d65d9eedc7db4c742d2"
});

export const WalletConnect = () => {
  const account = useActiveAccount();
  const [isConnected, setIsConnected] = useState(false);
  const [shortAddress, setShortAddress] = useState('');

  useEffect(() => {
    setIsConnected(!!account);
    if (account?.address) {
      setShortAddress(`${account.address.slice(0, 6)}...${account.address.slice(-4)}`);
    }
  }, [account]);

  const handleDisconnect = () => {
    try {
      // Clear any stored wallet data
      localStorage.removeItem('thirdweb:wallet');
      localStorage.removeItem('thirdweb:connected');
      sessionStorage.removeItem('thirdweb:wallet');
      sessionStorage.removeItem('thirdweb:connected');
      
      // Clear any other thirdweb related storage
      Object.keys(localStorage).forEach(key => {
        if (key.startsWith('thirdweb')) {
          localStorage.removeItem(key);
        }
      });
      
      Object.keys(sessionStorage).forEach(key => {
        if (key.startsWith('thirdweb')) {
          sessionStorage.removeItem(key);
        }
      });
    } catch (error) {
      console.error('Error clearing wallet data:', error);
    }
    
    // Reload the page to reset the connection state
    window.location.reload();
  };

  if (isConnected) {
    return (
      <div className="flex items-center space-x-2">
        <div className="flex items-center px-3 lg:px-4 py-2 bg-green-600 rounded-md text-sm font-medium text-white">
          <div className="w-2 h-2 bg-green-300 rounded-full mr-2"></div>
          <span className="hidden sm:inline">{shortAddress}</span>
          <span className="sm:hidden">Connected</span>
        </div>
        <button
          onClick={handleDisconnect}
          className="p-2 rounded-md text-red-400 hover:text-red-300 hover:bg-red-900/20 transition-colors"
          title="Disconnect Wallet"
        >
          <svg
            className="w-4 h-4 lg:w-5 lg:h-5"
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

  return <ConnectButton client={client} />;
};
