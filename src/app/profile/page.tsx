"use client";

import { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { useActiveAccount } from 'thirdweb/react';
import { createThirdwebClient } from 'thirdweb';

const client = createThirdwebClient({
  clientId: process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID || "701cc72c7c405d65d9eedc7db4c742d2"
});

interface TokenBalance {
  symbol: string;
  name: string;
  balance: string;
  value: number;
  icon?: string;
  change24h?: number;
}

interface NFT {
  name: string;
  collection: string;
  image: string;
  tokenId: string;
  floorPrice?: number;
}

export default function ProfilePage() {
  const account = useActiveAccount();
  const [isLoading, setIsLoading] = useState(true);
  const [ethBalance, setEthBalance] = useState<string>('0');
  const [tokenBalances, setTokenBalances] = useState<TokenBalance[]>([]);
  const [nfts, setNfts] = useState<NFT[]>([]);
  const [refreshKey, setRefreshKey] = useState(0);
  const [selectedTab, setSelectedTab] = useState<'overview' | 'tokens' | 'nfts'>('overview');

  const loadWalletData = async () => {
    if (!account) return;
    
    setIsLoading(true);
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock data with more realistic values and 24h changes
      setEthBalance((Math.random() * 5 + 0.1).toFixed(3));
      setTokenBalances([
        { 
          symbol: 'USDC', 
          name: 'USD Coin', 
          balance: (Math.random() * 2000 + 100).toFixed(2), 
          value: Math.random() * 2000 + 100,
          change24h: Math.random() * 10 - 5
        },
        { 
          symbol: 'USDT', 
          name: 'Tether', 
          balance: (Math.random() * 1000 + 50).toFixed(2), 
          value: Math.random() * 1000 + 50,
          change24h: Math.random() * 8 - 4
        },
        { 
          symbol: 'DAI', 
          name: 'Dai', 
          balance: (Math.random() * 1500 + 200).toFixed(2), 
          value: Math.random() * 1500 + 200,
          change24h: Math.random() * 6 - 3
        },
        { 
          symbol: 'LINK', 
          name: 'Chainlink', 
          balance: (Math.random() * 50 + 5).toFixed(1), 
          value: Math.random() * 50 + 5,
          change24h: Math.random() * 15 - 7.5
        }
      ]);
      setNfts([
        { 
          name: 'Bored Ape #1234', 
          collection: 'Bored Ape Yacht Club', 
          image: '/api/placeholder/100/100', 
          tokenId: '1234',
          floorPrice: 25.5
        },
        { 
          name: 'CryptoPunk #5678', 
          collection: 'CryptoPunks', 
          image: '/api/placeholder/100/100', 
          tokenId: '5678',
          floorPrice: 45.2
        },
        { 
          name: 'Doodle #9012', 
          collection: 'Doodles', 
          image: '/api/placeholder/100/100', 
          tokenId: '9012',
          floorPrice: 8.9
        }
      ]);
    } catch (error) {
      console.error('Error loading wallet data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadWalletData();
  }, [account, refreshKey]);

  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1);
  };

  const handleCopyAddress = () => {
    if (account?.address) {
      navigator.clipboard.writeText(account.address);
      alert('Address copied to clipboard!');
    }
  };

  const totalPortfolioValue = tokenBalances.reduce((sum, token) => sum + token.value, 0) + (parseFloat(ethBalance) * 2000);

  if (!account) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center border border-gray-200">
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Wallet Not Connected</h2>
              <p className="text-gray-600 text-lg">Connect your wallet to view your portfolio</p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  const shortAddress = `${account.address.slice(0, 6)}...${account.address.slice(-4)}`;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl shadow-xl p-8 mb-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative z-10">
                             <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 space-y-4 sm:space-y-0">
                 <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
                   <div className="w-16 h-16 bg-white/20 backdrop-blur-lg rounded-2xl flex items-center justify-center border border-white/30 mx-auto sm:mx-0">
                     <span className="text-2xl font-bold text-white">
                       {account.address.slice(2, 4).toUpperCase()}
                     </span>
                   </div>
                   <div className="text-center sm:text-left">
                     <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1">Wallet Portfolio</h1>
                     <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
                       <span className="font-mono text-white/90 text-base sm:text-lg">{shortAddress}</span>
                       <div className="flex items-center justify-center sm:justify-start space-x-2">
                         <button
                           onClick={handleCopyAddress}
                           className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-all duration-200 backdrop-blur-lg"
                           title="Copy full address"
                         >
                           <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                           </svg>
                         </button>
                         <div className="flex items-center space-x-2 px-3 py-1 bg-green-500/20 backdrop-blur-lg rounded-full border border-green-400/30">
                           <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                           <span className="text-green-100 text-xs sm:text-sm font-medium">Connected</span>
                         </div>
                       </div>
                     </div>
                   </div>
                 </div>
                 <button
                   onClick={handleRefresh}
                   disabled={isLoading}
                   className="p-3 bg-white/20 hover:bg-white/30 disabled:bg-white/10 disabled:cursor-not-allowed rounded-xl transition-all duration-200 backdrop-blur-lg border border-white/30 mx-auto sm:mx-0"
                   title="Refresh portfolio data"
                 >
                   <svg className={`w-5 h-5 sm:w-6 sm:h-6 text-white ${isLoading ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                   </svg>
                 </button>
               </div>
              
                             {/* Portfolio Summary */}
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                 <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-4 sm:p-6 border border-white/30">
                   <div className="flex items-center justify-between mb-3">
                     <h3 className="text-white/90 text-xs sm:text-sm font-medium">Total Portfolio</h3>
                     <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center">
                       <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                         <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                       </svg>
                     </div>
                   </div>
                   <div className="text-xl sm:text-2xl font-bold text-white mb-1">
                     ${isLoading ? '...' : totalPortfolioValue.toLocaleString()}
                   </div>
                   <div className="text-green-100 text-xs sm:text-sm">+2.4% today</div>
                 </div>

                 <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-4 sm:p-6 border border-white/30">
                   <div className="flex items-center justify-between mb-3">
                     <h3 className="text-white/90 text-xs sm:text-sm font-medium">ETH Balance</h3>
                     <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-orange-400 to-red-500 rounded-lg flex items-center justify-center">
                       <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                         <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                       </svg>
                     </div>
                   </div>
                   <div className="text-xl sm:text-2xl font-bold text-white mb-1">
                     {isLoading ? '...' : `${ethBalance} ETH`}
                   </div>
                   <div className="text-white/80 text-xs sm:text-sm">
                     ≈ ${(parseFloat(ethBalance) * 2000).toLocaleString()}
                   </div>
                 </div>

                 <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-4 sm:p-6 border border-white/30 sm:col-span-2 lg:col-span-1">
                   <div className="flex items-center justify-between mb-3">
                     <h3 className="text-white/90 text-xs sm:text-sm font-medium">Active Tokens</h3>
                     <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg flex items-center justify-center">
                       <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                       </svg>
                     </div>
                   </div>
                   <div className="text-xl sm:text-2xl font-bold text-white mb-1">
                     {tokenBalances.length}
                   </div>
                   <div className="text-white/80 text-xs sm:text-sm">Different tokens</div>
                 </div>
               </div>
            </div>
          </div>

                     {/* Navigation Tabs */}
           <div className="bg-white rounded-2xl shadow-md p-2 mb-8 border border-gray-200">
             <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
               {[
                 { id: 'overview', label: 'Overview', icon: '📊' },
                 { id: 'tokens', label: 'Tokens', icon: '🪙' },
                 { id: 'nfts', label: 'NFTs', icon: '🖼️' }
               ].map((tab) => (
                 <button
                   key={tab.id}
                   onClick={() => setSelectedTab(tab.id as any)}
                   className={`flex-1 flex items-center justify-center space-x-2 py-2 sm:py-3 px-3 sm:px-4 rounded-xl font-medium transition-all duration-200 text-sm sm:text-base ${
                     selectedTab === tab.id
                       ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                       : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                   }`}
                 >
                   <span className="text-base sm:text-lg">{tab.icon}</span>
                   <span>{tab.label}</span>
                 </button>
               ))}
             </div>
           </div>

                     {/* Content Sections */}
           {selectedTab === 'overview' && (
             <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8">
               {/* Top Tokens */}
               <div className="bg-white rounded-2xl shadow-md p-4 sm:p-6 border border-gray-200">
                 <div className="flex items-center justify-between mb-4 sm:mb-6">
                   <h2 className="text-lg sm:text-xl font-bold text-gray-900">Top Tokens</h2>
                   <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                     <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                     </svg>
                   </div>
                 </div>
                <div className="space-y-4">
                  {isLoading ? (
                    <div className="animate-pulse space-y-4">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-gray-300 rounded-xl"></div>
                          <div className="flex-1">
                            <div className="h-4 bg-gray-300 rounded w-24 mb-2"></div>
                            <div className="h-3 bg-gray-300 rounded w-16"></div>
                          </div>
                          <div className="text-right">
                            <div className="h-4 bg-gray-300 rounded w-20 mb-2"></div>
                            <div className="h-3 bg-gray-300 rounded w-12"></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                                         tokenBalances.slice(0, 3).map((token, index) => (
                       <div key={index} className="flex items-center space-x-3 sm:space-x-4 p-3 sm:p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all duration-200 cursor-pointer group">
                         <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                           <span className="text-white font-bold text-sm sm:text-lg">{token.symbol[0]}</span>
                         </div>
                         <div className="flex-1 min-w-0">
                           <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2">
                             <h3 className="font-semibold text-gray-900 text-sm sm:text-base">{token.symbol}</h3>
                             <span className="text-gray-600 text-xs sm:text-sm hidden sm:inline">{token.name}</span>
                           </div>
                           <div className="flex items-center space-x-2 mt-1">
                             <span className={`text-xs sm:text-sm font-medium ${token.change24h && token.change24h > 0 ? 'text-green-600' : 'text-red-600'}`}>
                               {token.change24h && token.change24h > 0 ? '+' : ''}{token.change24h?.toFixed(2)}%
                             </span>
                             <span className="text-gray-500 text-xs">24h</span>
                           </div>
                         </div>
                         <div className="text-right flex-shrink-0">
                           <div className="font-semibold text-gray-900 text-sm sm:text-base">{token.balance}</div>
                           <div className="text-gray-600 text-xs sm:text-sm">${token.value.toLocaleString()}</div>
                         </div>
                       </div>
                     ))
                  )}
                </div>
              </div>

                             {/* Recent NFTs */}
               <div className="bg-white rounded-2xl shadow-md p-4 sm:p-6 border border-gray-200">
                 <div className="flex items-center justify-between mb-4 sm:mb-6">
                   <h2 className="text-lg sm:text-xl font-bold text-gray-900">Recent NFTs</h2>
                   <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
                     <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                     </svg>
                   </div>
                 </div>
                <div className="space-y-4">
                  {isLoading ? (
                    <div className="animate-pulse space-y-4">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-gray-300 rounded-xl"></div>
                          <div className="flex-1">
                            <div className="h-4 bg-gray-300 rounded w-32 mb-2"></div>
                            <div className="h-3 bg-gray-300 rounded w-24"></div>
                          </div>
                          <div className="text-right">
                            <div className="h-4 bg-gray-300 rounded w-16 mb-2"></div>
                            <div className="h-3 bg-gray-300 rounded w-12"></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                                         nfts.slice(0, 3).map((nft, index) => (
                       <div key={index} className="flex items-center space-x-3 sm:space-x-4 p-3 sm:p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all duration-200 cursor-pointer group">
                         <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center flex-shrink-0">
                           <span className="text-white font-bold text-xs">NFT</span>
                         </div>
                         <div className="flex-1 min-w-0">
                           <h3 className="font-semibold text-gray-900 truncate text-sm sm:text-base">{nft.name}</h3>
                           <p className="text-gray-600 text-xs sm:text-sm truncate">{nft.collection}</p>
                         </div>
                         <div className="text-right flex-shrink-0">
                           <div className="font-semibold text-gray-900 text-sm sm:text-base">{nft.floorPrice} ETH</div>
                           <div className="text-gray-600 text-xs sm:text-sm">Floor</div>
                         </div>
                       </div>
                     ))
                  )}
                </div>
              </div>
            </div>
          )}

                     {selectedTab === 'tokens' && (
             <div className="bg-white rounded-2xl shadow-md p-4 sm:p-6 border border-gray-200">
               <div className="flex items-center justify-between mb-4 sm:mb-6">
                 <h2 className="text-lg sm:text-xl font-bold text-gray-900">All Tokens</h2>
                 <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                   <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                   </svg>
                 </div>
               </div>
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {isLoading ? (
                  Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="animate-pulse">
                      <div className="bg-gray-50 rounded-xl p-4">
                        <div className="flex items-center space-x-4 mb-4">
                          <div className="w-12 h-12 bg-gray-300 rounded-xl"></div>
                          <div className="flex-1">
                            <div className="h-4 bg-gray-300 rounded w-20 mb-2"></div>
                            <div className="h-3 bg-gray-300 rounded w-16"></div>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="h-6 bg-gray-300 rounded w-24"></div>
                          <div className="h-4 bg-gray-300 rounded w-16"></div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  tokenBalances.map((token, index) => (
                    <div key={index} className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-all duration-200 cursor-pointer group border border-gray-200 hover:border-gray-300">
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                          <span className="text-white font-bold text-lg">{token.symbol[0]}</span>
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">{token.symbol}</h3>
                          <p className="text-gray-600 text-sm">{token.name}</p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-2xl font-bold text-gray-900">{token.balance}</span>
                          <span className={`px-2 py-1 rounded-lg text-xs font-medium ${
                            token.change24h && token.change24h > 0 
                              ? 'bg-green-100 text-green-700' 
                              : 'bg-red-100 text-red-700'
                          }`}>
                            {token.change24h && token.change24h > 0 ? '+' : ''}{token.change24h?.toFixed(2)}%
                          </span>
                        </div>
                        <div className="text-gray-600 text-sm">≈ ${token.value.toLocaleString()}</div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

                     {selectedTab === 'nfts' && (
             <div className="bg-white rounded-2xl shadow-md p-4 sm:p-6 border border-gray-200">
               <div className="flex items-center justify-between mb-4 sm:mb-6">
                 <h2 className="text-lg sm:text-xl font-bold text-gray-900">NFT Collection</h2>
                 <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
                   <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                   </svg>
                 </div>
               </div>
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {isLoading ? (
                  Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="animate-pulse">
                      <div className="bg-gray-50 rounded-xl p-4">
                        <div className="w-full h-32 bg-gray-300 rounded-xl mb-4"></div>
                        <div className="space-y-2">
                          <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                          <div className="h-3 bg-gray-300 rounded w-1/2"></div>
                          <div className="h-4 bg-gray-300 rounded w-1/3"></div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  nfts.map((nft, index) => (
                    <div key={index} className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-all duration-200 cursor-pointer group border border-gray-200 hover:border-gray-300">
                      <div className="w-full h-32 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl mb-4 flex items-center justify-center">
                        <span className="text-white font-bold text-lg">NFT #{nft.tokenId}</span>
                      </div>
                      <div className="space-y-2">
                        <h3 className="font-semibold text-gray-900 truncate">{nft.name}</h3>
                        <p className="text-gray-600 text-sm truncate">{nft.collection}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-green-600 font-medium">{nft.floorPrice} ETH</span>
                          <button
                            onClick={() => alert(`Viewing ${nft.name} from ${nft.collection}`)}
                            className="text-purple-600 hover:text-purple-700 transition-colors"
                            title="View NFT details"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
