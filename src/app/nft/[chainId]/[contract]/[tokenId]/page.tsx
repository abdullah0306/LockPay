"use client";

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useParams, useSearchParams } from 'next/navigation';
import { Insight, type Chain, createThirdwebClient } from 'thirdweb';
import { resolveScheme } from 'thirdweb/storage';
import { Header } from '@/components/Header';
import { WalletProtected } from '@/components/WalletProtected';

const clientId = process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID || "701cc72c7c405d65d9eedc7db4c742d2";

const client = createThirdwebClient({
  clientId,
});

type RawTransfer = {
  block_timestamp?: string | number;
  transfer_type?: string;
  amount?: string;
  transaction_hash: string;
  from_address?: string;
  to_address?: string;
  nft_sale?: {
    payment?: Array<{
      amount?: string;
      token_type?: string;
      token_address?: string;
    }>;
    marketplace_name?: string;
  };
};

type TransferEntry = {
  txHash: string;
  timestamp: number;
  from: string;
  to: string;
  action: string;
  quantity: string;
  priceSummary?: string;
  marketplace?: string;
};

type DetailState = {
  isLoading: boolean;
  error?: string;
};

const shortenAddress = (value?: string | null) => {
  if (!value) {
    return '—';
  }
  return `${value.slice(0, 6)}...${value.slice(-4)}`;
};

const formatTimestamp = (timestamp?: number) => {
  if (!timestamp) {
    return '—';
  }
  try {
    return new Date(timestamp).toLocaleString();
  } catch {
    return '—';
  }
};

async function fetchTransfers(chain: Chain, contractAddress: string, tokenId: string): Promise<RawTransfer[]> {
  const url = new URL(`https://insight.thirdweb.com/v1/nfts/transfers/${contractAddress}/${tokenId}`);
  url.searchParams.append("chain_id", chain.id.toString());
  url.searchParams.append("limit", "25");
  url.searchParams.append("sales", "true");
  url.searchParams.append("include_owners", "true");

  const response = await fetch(url.toString(), {
    headers: {
      "x-client-id": clientId,
      "accept": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch NFT transfer history: ${response.statusText}`);
  }

  const body = await response.json().catch(() => undefined);
  return (body?.data ?? []) as RawTransfer[];
}

export default function NftDetailPage() {
  const params = useParams<{ chainId: string; contract: string; tokenId: string }>();
  const searchParams = useSearchParams();
  const [detailState, setDetailState] = useState<DetailState>({ isLoading: true });
  const [nftDetail, setNftDetail] = useState<Awaited<ReturnType<typeof Insight.getNFT>> | null>(null);
  const [transfers, setTransfers] = useState<TransferEntry[]>([]);

  const chainIdNumber = useMemo(() => {
    const id = Number(params?.chainId);
    return Number.isFinite(id) ? id : undefined;
  }, [params?.chainId]);

  const contractAddress = params?.contract;
  const tokenId = params?.tokenId;

  const chainName = searchParams?.get('chainName') || '';
  const nativeSymbol = searchParams?.get('chainSymbol') || '';
  const nativeDecimals = Number(searchParams?.get('chainDecimals') ?? '18') || 18;
  const isTestnet = searchParams?.get('isTestnet') === 'true';

  const chain: Chain | undefined = useMemo(() => {
    if (!chainIdNumber) {
      return undefined;
    }
    const rpcUrl = `https://rpc.thirdweb.com/${chainIdNumber}?clientId=${clientId}`;
    const baseChain: Chain = {
      id: chainIdNumber,
      rpc: rpcUrl,
      name: chainName || `Chain ${chainIdNumber}`,
      nativeCurrency: {
        name: nativeSymbol || 'Native Token',
        symbol: nativeSymbol || 'NATIVE',
        decimals: nativeDecimals,
      },
      ...(isTestnet ? { testnet: true as const } : {}),
    };
    return baseChain;
  }, [chainIdNumber, chainName, nativeSymbol, nativeDecimals, isTestnet]);

  useEffect(() => {
    let cancelled = false;

    const loadDetails = async () => {
      if (!chain || !contractAddress || !tokenId) {
        setDetailState({
          isLoading: false,
          error: 'Missing NFT identifier. Please navigate from the portfolio page.',
        });
        return;
      }

      setDetailState({ isLoading: true });

      try {
        const [nft, rawTransfers] = await Promise.all([
          Insight.getNFT({
            client,
            chain,
            contractAddress,
            tokenId,
            includeOwners: true,
          }).catch((error) => {
            console.error('Failed to load NFT metadata:', error);
            return undefined;
          }),
          fetchTransfers(chain, contractAddress, tokenId).catch((error) => {
            console.error('Failed to load NFT transfers:', error);
            return [];
          }),
        ]);

        if (cancelled) {
          return;
        }

        setNftDetail(nft ?? null);

        let normalizedTransfers: RawTransfer[] = [];
        if (Array.isArray(rawTransfers)) {
          normalizedTransfers = rawTransfers;
        } else if (rawTransfers && typeof rawTransfers === 'object') {
          const candidate = (rawTransfers as Record<string, unknown>).data;
          if (Array.isArray(candidate)) {
            normalizedTransfers = candidate as RawTransfer[];
          }
        }

        const mappedTransfers: TransferEntry[] = normalizedTransfers.map((transfer: RawTransfer) => {
          const timestamp = transfer.block_timestamp ? Number(transfer.block_timestamp) * 1000 : undefined;
          const action = transfer.transfer_type
            ? transfer.transfer_type.charAt(0).toUpperCase() + transfer.transfer_type.slice(1)
            : 'Transfer';
          const quantity = transfer.amount ?? '1';
          const fromAddress = transfer.from_address ?? '';
          const toAddress = transfer.to_address ?? '';

          const primaryPayment = transfer.nft_sale?.payment?.[0];
          const paymentAmount = primaryPayment?.amount;
          const paymentToken = primaryPayment?.token_type === 'erc20'
            ? primaryPayment.token_address
            : primaryPayment?.token_type;
          const priceSummary = paymentAmount
            ? `${paymentAmount} ${paymentToken ?? ''}`.trim()
            : undefined;

          return {
            txHash: transfer.transaction_hash,
            timestamp: timestamp ?? Date.now(),
            from: fromAddress,
            to: toAddress,
            action,
            quantity,
            priceSummary,
            marketplace: transfer.nft_sale?.marketplace_name,
          };
        });

        setTransfers(mappedTransfers);
        setDetailState({ isLoading: false });
      } catch (error) {
        console.error('Error loading NFT detail page:', error);
        if (!cancelled) {
          setDetailState({
            isLoading: false,
            error: error instanceof Error ? error.message : 'Unknown error loading NFT data',
          });
        }
      }
    };

    loadDetails();

    return () => {
      cancelled = true;
    };
  }, [chain, contractAddress, tokenId]);

  const imageUrl = useMemo(() => {
    const metadataImage =
      nftDetail?.metadata?.image ??
      nftDetail?.metadata?.image_url ??
      nftDetail?.metadata?.animation_url;
    if (!metadataImage) {
      return null;
    }
    try {
      return resolveScheme({ client, uri: metadataImage });
    } catch (error) {
      console.warn('Failed to resolve NFT media', error);
      return metadataImage;
    }
  }, [nftDetail]);

  const attributes = useMemo(() => {
    const rawAttributes = nftDetail?.metadata?.attributes;
    if (Array.isArray(rawAttributes)) {
      return rawAttributes as Array<{ trait_type?: string; value?: unknown }>;
    }
    return undefined;
  }, [nftDetail]);

  const ownerAddress = useMemo(() => {
    if (typeof nftDetail?.owner === 'string') {
      return nftDetail.owner;
    }
    const metadataOwner = (nftDetail?.metadata as Record<string, unknown> | undefined)?.owner;
    return typeof metadataOwner === 'string' ? metadataOwner : null;
  }, [nftDetail]);

  const creatorName = useMemo(() => {
    const metadataCreator = (nftDetail?.metadata as Record<string, unknown> | undefined)?.creator;
    return typeof metadataCreator === 'string' ? metadataCreator : '—';
  }, [nftDetail]);

  const descriptionText = useMemo(() => {
    const metadataDescription = (nftDetail?.metadata as Record<string, unknown> | undefined)?.description;
    return typeof metadataDescription === 'string' ? metadataDescription : 'No description available for this NFT.';
  }, [nftDetail]);

  const supplyDisplay = useMemo(() => {
    if (!nftDetail) {
      return "—";
    }
    if (nftDetail.type === "ERC1155" && "supply" in nftDetail) {
      return nftDetail.supply ? nftDetail.supply.toString() : "—";
    }
    return "1";
  }, [nftDetail]);

  return (
    <WalletProtected>
      <div className="min-h-screen bg-gray-50 text-gray-900">
        <Header />
        <main className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto space-y-8">
            <div className="flex items-center justify-between">
              <Link
                href="/profile"
                className="inline-flex items-center gap-2 text-sm font-medium text-purple-600 hover:text-purple-500 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Portfolio
              </Link>
              <div className="text-sm text-gray-500">
                Chain ID: {chainIdNumber ?? '—'}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 shadow-xl">
                <div className="absolute inset-0 bg-black/20" />
                <div className="relative p-6 lg:p-8 space-y-6 text-white">
              <div className="h-56 sm:h-64 lg:h-72 bg-white/10 border border-white/30 rounded-2xl flex items-center justify-center overflow-hidden backdrop-blur">
                    {imageUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={imageUrl}
                        alt={nftDetail?.metadata?.name ?? 'NFT preview'}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center text-white/80">
                        <svg className="w-16 h-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.5 4.5h15v15h-15z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.5 15l4.5-4.5 3 3L15 9l4.5 6" />
                        </svg>
                        <span>No media available</span>
                      </div>
                    )}
                  </div>
                  <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/20 text-xs font-semibold uppercase tracking-widest">
                    {chain?.name ?? `Chain ${chain?.id ?? ''}`}
                  </div>
                  <div className="space-y-2">
                    <h1 className="text-2xl lg:text-3xl font-bold">
                      {nftDetail?.metadata?.name ?? `Token #${tokenId ?? ''}`}
                    </h1>
                    <p className="text-sm text-white/80">
                      Contract:{' '}
                      <span className="font-mono">{contractAddress ? shortenAddress(contractAddress) : '—'}</span>
                    </p>
                    <p className="text-sm text-white/80">
                      Token ID: <span className="font-mono">{tokenId ?? '—'}</span>
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-white rounded-3xl shadow-md border border-gray-200 p-6 lg:p-8">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Details</h2>
                  <dl className="space-y-3 text-sm text-gray-600">
                    <div className="flex items-center justify-between">
                      <dt>Owner</dt>
                      <dd className="font-mono text-gray-900">{shortenAddress(ownerAddress)}</dd>
                    </div>
                    <div className="flex items-center justify-between">
                      <dt>Creator</dt>
                      <dd className="text-gray-900">{creatorName}</dd>
                    </div>
                    <div className="flex items-center justify-between">
                      <dt>Token Standard</dt>
                      <dd className="text-gray-900">{nftDetail?.type ?? '—'}</dd>
                    </div>
                    <div className="flex items-center justify-between">
                      <dt>Supply</dt>
                      <dd className="text-gray-900">{supplyDisplay}</dd>
                    </div>
                    <div className="flex items-center justify-between">
                      <dt>Chain</dt>
                      <dd className="text-gray-900">{chain?.name ?? `Chain ${chain?.id ?? ''}`}</dd>
                    </div>
                  </dl>
                </div>

                <div className="bg-white rounded-3xl shadow-md border border-gray-200 p-6 lg:p-8">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Description</h2>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {descriptionText}
                  </p>
                </div>

                {attributes && attributes.length > 0 ? (
                  <div className="bg-white rounded-3xl shadow-md border border-gray-200 p-6 lg:p-8">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Attributes</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {attributes.map((attribute, index) => (
                        <div key={`${attribute.trait_type}-${index}`} className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
                          <p className="text-xs uppercase tracking-wide text-gray-500 mb-1">
                            {attribute.trait_type ?? 'Trait'}
                          </p>
                          <p className="text-sm font-medium text-gray-900">
                            {typeof attribute.value === 'string' || typeof attribute.value === 'number'
                              ? attribute.value
                              : JSON.stringify(attribute.value)}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            </div>

            <div className="bg-white rounded-3xl shadow-md border border-gray-200 p-6 lg:p-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Item Activity</h2>
                <span className="text-xs text-gray-500">
                  Showing {transfers.length} events
                </span>
              </div>

              {detailState.isLoading ? (
                <div className="space-y-3">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <div key={index} className="h-12 rounded-xl bg-gray-100 border border-gray-200 animate-pulse" />
                  ))}
                </div>
              ) : detailState.error ? (
                <div className="p-6 rounded-2xl bg-red-50 border border-red-200 text-sm text-red-700">
                  {detailState.error}
                </div>
              ) : transfers.length === 0 ? (
                <div className="py-10 text-center text-sm text-gray-500">
                  No activity found for this NFT yet.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="text-xs uppercase tracking-wide text-gray-500 border-b border-gray-200">
                      <tr>
                        <th className="py-3 pr-4">Transaction Hash</th>
                        <th className="py-3 pr-4">Action</th>
                        <th className="py-3 pr-4">From</th>
                        <th className="py-3 pr-4">To</th>
                        <th className="py-3 pr-4">Quantity</th>
                        <th className="py-3 pr-4">Price</th>
                        <th className="py-3">Timestamp</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {transfers.map((entry) => (
                        <tr key={entry.txHash} className="hover:bg-gray-50 transition-colors">
                          <td className="py-3 pr-4 font-mono text-xs text-gray-700">
                            {shortenAddress(entry.txHash)}
                          </td>
                          <td className="py-3 pr-4">
                            <span className="px-2 py-1 text-xs rounded-full bg-purple-100 text-purple-600 font-medium">
                              {entry.action}
                            </span>
                          </td>
                          <td className="py-3 pr-4 font-mono text-xs text-gray-700">
                            {shortenAddress(entry.from)}
                          </td>
                          <td className="py-3 pr-4 font-mono text-xs text-gray-700">
                            {shortenAddress(entry.to)}
                          </td>
                          <td className="py-3 pr-4 text-gray-700">{entry.quantity}</td>
                          <td className="py-3 pr-4 text-gray-700">
                            {entry.priceSummary ?? '—'}
                            {entry.marketplace ? (
                              <span className="block text-[10px] text-gray-500 mt-1 uppercase tracking-widest">
                                {entry.marketplace}
                              </span>
                            ) : null}
                          </td>
                          <td className="py-3 text-gray-600">{formatTimestamp(entry.timestamp)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </WalletProtected>
  );
}

