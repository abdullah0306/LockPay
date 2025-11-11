"use client";

import Link from 'next/link';
import { useState, useEffect, useCallback } from 'react';
import { Header } from '@/components/Header';
import { WalletProtected } from '@/components/WalletProtected';
import { useActiveAccount, useActiveWallet } from 'thirdweb/react';
import { Insight, NATIVE_TOKEN_ADDRESS, createThirdwebClient, toTokens } from 'thirdweb';
import { getWalletBalance } from 'thirdweb/wallets';
import { convertCryptoToFiat } from 'thirdweb/pay';
import { resolveScheme } from 'thirdweb/storage';

const client = createThirdwebClient({
  clientId: process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID || "701cc72c7c405d65d9eedc7db4c742d2"
});

const SUPPORTED_TOKEN_SYMBOLS_FOR_FIAT = new Set([
  'USDC',
  'USDT',
  'DAI',
  'USDP',
  'TUSD',
  'BUSD',
  'FDUSD',
  'ETH',
  'WETH',
  'WBTC',
  'MATIC',
  'WMATIC',
  'BNB',
  'WBNB',
  'AVAX',
  'WAVAX',
  'ARB',
  'OP',
  'LINK',
]);

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
  detailUrl?: string;
}

type OwnedToken = Awaited<ReturnType<typeof Insight.getOwnedTokens>>[number];
type OwnedTokenWithAddress = OwnedToken & { tokenAddress: string };
type InsightTransaction = Awaited<ReturnType<typeof Insight.getTransactions>>[number];

interface WalletActivity {
  hash: string;
  direction: 'in' | 'out' | 'self';
  counterparty: string;
  timestamp: number;
  value: number;
  valueDisplay: string;
  nativeSymbol: string;
  status?: number;
  functionName?: string;
}

export default function ProfilePage() {
  const account = useActiveAccount();
  const wallet = useActiveWallet();
  const [isLoading, setIsLoading] = useState(true);
  const [ethBalance, setEthBalance] = useState<string>('0');
  const [ethFiatValue, setEthFiatValue] = useState<number>(0);
  const [tokenBalances, setTokenBalances] = useState<TokenBalance[]>([]);
  const [nfts, setNfts] = useState<NFT[]>([]);
  const [activities, setActivities] = useState<WalletActivity[]>([]);
  const [refreshKey, setRefreshKey] = useState(0);
  const [selectedTab, setSelectedTab] = useState<'overview' | 'tokens' | 'nfts'>('overview');

  const getNftImageUrl = useCallback((uri?: string) => {
    if (!uri) {
      return '/api/placeholder/100/100';
    }

    try {
      return resolveScheme({ client, uri });
    } catch (error) {
      console.warn('Unable to resolve NFT media URI, falling back to raw value.', error);
      return uri.startsWith('http') ? uri : '/api/placeholder/100/100';
    }
  }, []);

  const loadWalletData = useCallback(async () => {
    if (!account?.address) {
      setEthBalance('0');
      setEthFiatValue(0);
      setTokenBalances([]);
      setNfts([]);
      setActivities([]);
      return;
    }

    const chain = wallet?.getChain();

    if (!chain) {
      console.warn('Active wallet does not have an associated chain.');
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    try {
      const shouldQueryInsight = !chain.testnet;

      const [
        nativeBalanceResult,
        tokenResults,
        nftResults,
        transactionResults,
      ] = await Promise.all([
        getWalletBalance({
          address: account.address,
          client,
          chain,
        }).catch((error) => {
          console.error('Error fetching native balance:', error);
          return undefined;
        }),
        shouldQueryInsight
          ? Insight.getOwnedTokens({
            client,
            chains: [chain],
            ownerAddress: account.address,
          }).catch((error) => {
            console.error('Error fetching owned tokens:', error);
            return [];
          })
          : Promise.resolve([]),
        shouldQueryInsight
          ? Insight.getOwnedNFTs({
            client,
            chains: [chain],
            ownerAddress: account.address,
            includeMetadata: true,
          }).catch((error) => {
            console.error('Error fetching owned NFTs:', error);
            return [];
          })
          : Promise.resolve([]),
        shouldQueryInsight
          ? Insight.getTransactions({
            client,
            chains: [chain],
            walletAddress: account.address,
            queryOptions: { limit: 25 },
          }).catch((error) => {
            console.error('Error fetching wallet transactions:', error);
            return [];
          })
          : Promise.resolve([]),
      ]);

      if (nativeBalanceResult) {
        const nativeDisplayValue = Number(nativeBalanceResult.displayValue);
        const normalizedNative = Number.isFinite(nativeDisplayValue) ? nativeDisplayValue : 0;
        setEthBalance(normalizedNative.toFixed(normalizedNative >= 1 ? 4 : 6));

        if (!chain.testnet && normalizedNative > 0) {
          const nativeFiat = await convertCryptoToFiat({
            client,
            chain,
            fromAmount: normalizedNative,
            fromTokenAddress: NATIVE_TOKEN_ADDRESS,
            to: "USD",
          }).then((res) => res.result).catch((error) => {
            console.warn('Unable to resolve native token fiat value.', error);
            return 0;
          });
          setEthFiatValue(nativeFiat);
        } else {
          setEthFiatValue(0);
        }
      } else {
        setEthBalance('0');
        setEthFiatValue(0);
      }

      const filteredTokens = (tokenResults ?? []).reduce<OwnedTokenWithAddress[]>((acc, token) => {
        if (token.tokenAddress && token.tokenAddress.toLowerCase() !== NATIVE_TOKEN_ADDRESS.toLowerCase()) {
          acc.push({ ...token, tokenAddress: token.tokenAddress });
        }
        return acc;
      }, []);

      const processedTokens: TokenBalance[] = await Promise.all(
        filteredTokens.map(async (token) => {
          const balanceNumber = Number(token.displayValue);
          const normalizedBalance = Number.isFinite(balanceNumber) ? balanceNumber : 0;
          let fiatValue = 0;

          const tokenSymbolUpper = token.symbol?.toUpperCase?.() ?? '';
          const canAttemptFiat =
            !chain.testnet &&
            normalizedBalance > 0 &&
            token.tokenAddress &&
            SUPPORTED_TOKEN_SYMBOLS_FOR_FIAT.has(tokenSymbolUpper);

          if (canAttemptFiat) {
            fiatValue = await convertCryptoToFiat({
              client,
              chain,
              fromAmount: normalizedBalance,
              fromTokenAddress: token.tokenAddress,
              to: "USD",
            }).then((res) => res.result).catch((error) => {
              console.warn(`Unable to resolve fiat value for token ${token.tokenAddress}.`, error);
              return 0;
            });
          }

          return {
            symbol: token.symbol || 'TOKEN',
            name: token.name || token.symbol || token.tokenAddress,
            balance: normalizedBalance.toFixed(normalizedBalance >= 1 ? 4 : 6),
            value: fiatValue,
            change24h: 0,
          };
        }),
      );

      processedTokens.sort((a, b) => b.value - a.value);

      setTokenBalances(processedTokens);

      const processedNfts: NFT[] = (nftResults ?? []).map((nft) => {
        const tokenId = nft.id.toString();
        const name = nft.metadata?.name || `NFT #${tokenId}`;
        const attributes = Array.isArray(nft.metadata?.attributes)
          ? nft.metadata?.attributes as Array<{ trait_type?: string; value?: unknown }>
          : undefined;
        const collection = attributes?.[0]?.trait_type ?? nft.tokenAddress;

        const possibleImage =
          nft.metadata?.image ||
          nft.metadata?.image_url ||
          nft.metadata?.animation_url;
        const detailUrl = `/nft/${chain.id}/${nft.tokenAddress}/${tokenId}?chainName=${encodeURIComponent(chain.name ?? '')}&chainSymbol=${encodeURIComponent(chain.nativeCurrency?.symbol ?? '')}&chainDecimals=${chain.nativeCurrency?.decimals ?? 18}&isTestnet=${chain.testnet ? 'true' : 'false'}`;

        return {
          name,
          collection,
          image: getNftImageUrl(typeof possibleImage === 'string' ? possibleImage : undefined),
          tokenId,
          floorPrice: undefined,
          detailUrl,
        };
      });

      setNfts(processedNfts);

      const walletAddressLower = account.address.toLowerCase();
      const nativeSymbol = chain.nativeCurrency?.symbol ?? 'ETH';
      const nativeDecimals = chain.nativeCurrency?.decimals ?? 18;

      const processedActivities: WalletActivity[] = (transactionResults ?? [])
        .map((tx: InsightTransaction) => {
          const from = tx.from_address?.toLowerCase?.() ?? '';
          const to = tx.to_address?.toLowerCase?.() ?? '';

          let direction: WalletActivity['direction'] = 'self';
          if (from === walletAddressLower && to === walletAddressLower) {
            direction = 'self';
          } else if (from === walletAddressLower) {
            direction = 'out';
          } else if (to === walletAddressLower) {
            direction = 'in';
          }

          const counterparty =
            direction === 'out'
              ? (tx.to_address ?? 'External')
              : direction === 'in'
                ? (tx.from_address ?? 'External')
                : (tx.to_address ?? tx.from_address ?? 'Self');

          let valueNumber = 0;
          let valueDisplay = '0';
          try {
            const tokenValue = toTokens(BigInt(tx.value ?? '0'), nativeDecimals);
            valueNumber = Number(tokenValue);
            valueDisplay = Number.isFinite(valueNumber)
              ? (valueNumber >= 1 ? valueNumber.toFixed(4) : valueNumber.toFixed(6))
              : '0';
          } catch (error) {
            console.warn('Unable to convert transaction value:', error);
          }

          const timestamp = tx.block_timestamp
            ? tx.block_timestamp * 1000
            : Date.now();

          return {
            hash: tx.hash,
            direction,
            counterparty,
            timestamp,
            value: valueNumber,
            valueDisplay,
            nativeSymbol,
            status: tx.status,
            functionName: tx.decoded?.name,
          };
        })
        .sort((a, b) => b.timestamp - a.timestamp)
        .slice(0, 10);

      setActivities(processedActivities);
    } catch (error) {
      console.error('Error loading wallet data:', error);
    } finally {
      setIsLoading(false);
    }
  }, [account?.address, wallet, getNftImageUrl]);

  useEffect(() => {
    loadWalletData();
  }, [loadWalletData, refreshKey]);

  const walletAddress = account?.address;
  const shortAddress = walletAddress ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}` : '--';
  const walletInitials = walletAddress ? walletAddress.slice(2, 4).toUpperCase() : '--';
  const hasWalletAddress = Boolean(walletAddress);

  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1);
  };

  const handleCopyAddress = () => {
    if (walletAddress) {
      navigator.clipboard.writeText(walletAddress);
      alert('Address copied to clipboard!');
    }
  };

  const totalPortfolioValue = tokenBalances.reduce((sum, token) => sum + token.value, 0) + ethFiatValue;

  return (
    <WalletProtected>
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
                        {walletInitials}
                      </span>
                    </div>
                    <div className="text-center sm:text-left">
                      <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1">Wallet Portfolio</h1>
                      <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
                        <span className="font-mono text-white/90 text-base sm:text-lg">
                          {shortAddress}
                        </span>
                        <div className="flex items-center justify-center sm:justify-start space-x-2">
                          <button
                            onClick={handleCopyAddress}
                            className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-all duration-200 backdrop-blur-lg disabled:bg-white/10 disabled:text-white/50"
                            title="Copy full address"
                            disabled={!hasWalletAddress}
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
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
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
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                        </svg>
                      </div>
                    </div>
                    <div className="text-xl sm:text-2xl font-bold text-white mb-1">
                      {isLoading ? '...' : `${ethBalance} ETH`}
                    </div>
                    <div className="text-white/80 text-xs sm:text-sm">
                      ≈ ${ethFiatValue.toLocaleString()}
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
                    className={`flex-1 flex items-center justify-center space-x-2 py-2 sm:py-3 px-3 sm:px-4 rounded-xl font-medium transition-all duration-200 text-sm sm:text-base ${selectedTab === tab.id
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
                        <Link
                          key={index}
                          href={nft.detailUrl || '#'}
                          className="flex items-center space-x-3 sm:space-x-4 p-3 sm:p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all duration-200 group"
                        >
                          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center flex-shrink-0">
                            <span className="text-white font-bold text-xs">NFT</span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-gray-900 truncate text-sm sm:text-base">{nft.name}</h3>
                            <p className="text-gray-600 text-xs sm:text-sm truncate">{nft.collection}</p>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <div className="font-semibold text-gray-900 text-sm sm:text-base">{nft.floorPrice ? `${nft.floorPrice} ETH` : '--'}</div>
                            <div className="text-gray-600 text-xs sm:text-sm">Floor</div>
                          </div>
                        </Link>
                      ))
                    )}
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white rounded-2xl shadow-md p-4 sm:p-6 border border-gray-200 xl:col-span-2">
                  <div className="flex items-center justify-between mb-4 sm:mb-6">
                    <h2 className="text-lg sm:text-xl font-bold text-gray-900">Recent Activity</h2>
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h3.75M9 15h3.75M9 9h3.75m3.75 6H15m1.5 3H15m1.5-6H15m1.5-3H15m-2.25 9H9a1.125 1.125 0 01-1.125-1.125V7.125C7.875 6.504 8.379 6 9 6h6c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125z" />
                      </svg>
                    </div>
                  </div>
                  {isLoading ? (
                    <div className="space-y-4 animate-pulse">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <div key={index} className="flex items-center justify-between bg-gray-50 rounded-xl p-4">
                          <div className="space-y-2">
                            <div className="h-4 w-24 bg-gray-200 rounded" />
                            <div className="h-3 w-32 bg-gray-200 rounded" />
                          </div>
                          <div className="h-4 w-20 bg-gray-200 rounded" />
                        </div>
                      ))}
                    </div>
                  ) : activities.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-10 text-center text-gray-500">
                      <div className="w-14 h-14 mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                        <svg className="w-7 h-7 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                        </svg>
                      </div>
                      <p className="text-sm sm:text-base">No transactions found in the last 90 days.</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {activities.map((activity) => {
                        const directionLabel =
                          activity.direction === 'in'
                            ? 'Received'
                            : activity.direction === 'out'
                              ? 'Sent'
                              : 'Self';
                        const directionStyles =
                          activity.direction === 'in'
                            ? 'bg-green-100 text-green-700'
                            : activity.direction === 'out'
                              ? 'bg-red-100 text-red-700'
                              : 'bg-blue-100 text-blue-700';
                        const statusLabel =
                          activity.status === 1
                            ? 'Success'
                            : activity.status === 0
                              ? 'Failed'
                              : 'Pending';
                        const statusStyles =
                          activity.status === 1
                            ? 'text-green-600'
                            : activity.status === 0
                              ? 'text-red-600'
                              : 'text-yellow-600';

                        return (
                          <div key={activity.hash} className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-all duration-200">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                              <div className="flex items-center gap-3">
                                <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${directionStyles}`}>
                                  {directionLabel}
                                </span>
                                <div>
                                  <div className="flex items-center gap-2 text-sm sm:text-base text-gray-900 font-semibold">
                                    {activity.valueDisplay} {activity.nativeSymbol}
                                    <span className={`text-xs font-medium ${statusStyles}`}>{statusLabel}</span>
                                  </div>
                                  <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-gray-500 mt-1">
                                    <span className="font-mono">
                                      {`${activity.hash.slice(0, 6)}...${activity.hash.slice(-4)}`}
                                    </span>
                                    <span>•</span>
                                    <span>{new Date(activity.timestamp).toLocaleString()}</span>
                                    {activity.functionName && (
                                      <>
                                        <span>•</span>
                                        <span>{activity.functionName}</span>
                                      </>
                                    )}
                                  </div>
                                </div>
                              </div>
                              <div className="text-xs sm:text-sm text-gray-600">
                                <span className="font-medium">
                                  {activity.direction === 'out' ? 'To:' : activity.direction === 'in' ? 'From:' : 'With:'}
                                </span>{' '}
                                <span className="font-mono">{`${activity.counterparty.slice(0, 6)}...${activity.counterparty.slice(-4)}`}</span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
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
                            <span className={`px-2 py-1 rounded-lg text-xs font-medium ${token.change24h && token.change24h > 0
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
                      <Link
                        key={index}
                        href={nft.detailUrl || '#'}
                        className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-all duration-200 group border border-gray-200 hover:border-gray-300 flex flex-col"
                      >
                        <div className="w-full h-32 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl mb-4 flex items-center justify-center">
                          <span className="text-white font-bold text-lg">NFT #{nft.tokenId}</span>
                        </div>
                        <div className="space-y-2 flex-1">
                          <h3 className="font-semibold text-gray-900 truncate">{nft.name}</h3>
                          <p className="text-gray-600 text-sm truncate">{nft.collection}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-green-600 font-medium">{nft.floorPrice ? `${nft.floorPrice} ETH` : '--'}</span>
                            <div className="text-purple-600 group-hover:text-purple-700 transition-colors text-sm font-medium flex items-center gap-1">
                              View
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </WalletProtected>
  );
}
