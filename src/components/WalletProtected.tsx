"use client";

import Link from 'next/link';
import { useActiveAccount } from 'thirdweb/react';
import { WalletConnect } from './WalletConnect';

interface WalletProtectedProps {
  children: React.ReactNode;
}

export const WalletProtected = ({ children }: WalletProtectedProps) => {
  const account = useActiveAccount();

  // If wallet is not connected (or disconnected), show connect prompt immediately
  // This will automatically react to wallet disconnection events
  if (!account) {
    return (
      <div className="min-h-screen bg-[#F5F5F5]">
        {/* Minimal header for wallet connection screen */}
        <header className="bg-[#121417] text-white">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="flex items-center justify-between h-16">
              {/* Logo only */}
              <div className="flex items-center">
                <Link href="/" className="flex items-center gap-2">
                  <img src="/logo.svg" alt="logo" className="h-8 md:h-10" />
                </Link>
              </div>
              {/* Connect Wallet Button */}
              <div className="flex-shrink-0">
                <WalletConnect />
              </div>
            </div>
          </div>
        </header>
        <main className="flex items-center justify-center min-h-[calc(100vh-4rem)] py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full">
            <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-10 text-center border border-gray-200">
              {/* Wallet Icon */}
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <svg 
                  className="w-10 h-10 text-white" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" 
                  />
                </svg>
              </div>

              {/* Title */}
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
                Wallet Required
              </h2>

              {/* Description */}
              <p className="text-gray-600 text-base sm:text-lg mb-8">
                Please connect your wallet to access this page and use LockPay&apos;s escrow services.
              </p>

              {/* Connect Wallet Button */}
              <div className="flex justify-center">
                <div className="transform scale-110">
                  <WalletConnect />
                </div>
              </div>

              {/* Additional Info */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-500 mb-4">
                  Need help? Learn more about connecting your wallet:
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center text-sm">
                  <a 
                    href="https://metamask.io/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Get MetaMask →
                  </a>
                  {/* <span className="hidden sm:inline text-gray-300">|</span>
                  <a 
                    href="/" 
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Back to Home →
                  </a> */}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // If wallet is connected, render the protected content
  return <>{children}</>;
};

