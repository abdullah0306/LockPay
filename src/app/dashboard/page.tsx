"use client";

import { useState, useMemo } from 'react';
import { Header } from '@/components/Header';
import { DisputeCard } from '@/components/DisputeCard';
import { DashboardTransactionCard } from '@/components/DashboardTransactionCard';
import { DashboardDispute, DashboardTransaction } from '@/types/dashboard';

export default function DashboardPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [amountFilter, setAmountFilter] = useState<string>('All');
  const [currencyFilter, setCurrencyFilter] = useState<string>('All');

  // Mock data for Active Disputes
  const activeDisputes: DashboardDispute[] = [
    {
      id: 'TXN78898',
      priority: 'High Priority',
      status: 'Under Review',
      amount: { value: 2.0, currency: 'ETH' },
      decisionExpected: 'Within 3 days',
      buyer: 'Ivan J.',
      seller: 'Kelly L.',
      lastAction: {
        type: 'Evidence submitted',
        by: 'buyer'
      }
    },
    {
      id: 'TXN78895',
      priority: 'Medium Priority',
      status: 'Awaiting Response',
      amount: { value: 750, currency: 'USDC' },
      decisionExpected: 'Within 5 days',
      buyer: 'Mike P.',
      seller: 'Sarah Q.',
      lastAction: {
        type: 'Dispute filed',
        by: 'seller'
      }
    }
  ];

  // Mock data for Active Transactions
  const activeTransactions: DashboardTransaction[] = [
    {
      id: 'TXN78901',
      amount: { value: 1.5, currency: 'ETH' },
      status: 'Funds Locked',
      buyer: 'Alice R.',
      seller: 'Bob C.'
    },
    {
      id: 'TXN78902',
      amount: { value: 500, currency: 'USDC' },
      status: 'Funds Locked',
      buyer: 'Charlie D.',
      seller: 'Diana E.'
    },
    {
      id: 'TXN78903',
      amount: { value: 0.8, currency: 'BTC' },
      status: 'Pending Review',
      buyer: 'Emma F.',
      seller: 'Frank G.'
    }
  ];

  // Mock data for Past Transactions
  const pastTransactions: DashboardTransaction[] = [
    {
      id: 'TXN78899',
      amount: { value: 0.8, currency: 'BTC' },
      status: 'Fulfilled',
      buyer: 'Frank G.',
      seller: 'Grace H.'
    },
    {
      id: 'TXN78898',
      amount: { value: 2.0, currency: 'ETH' },
      status: 'Disputed',
      buyer: 'Ivan J.',
      seller: 'Kelly L.'
    },
    {
      id: 'TXN78897',
      amount: { value: 1000, currency: 'USDT' },
      status: 'Refunded',
      buyer: 'Liam M.',
      seller: 'Nora O.'
    }
  ];

  // Get unique currencies and amounts for filters
  const allTransactions = [...activeTransactions, ...pastTransactions];
  const uniqueCurrencies = ['All', ...Array.from(new Set(allTransactions.map(t => t.amount.currency)))];
  const uniqueAmounts = ['All', ...Array.from(new Set(allTransactions.map(t => t.amount.value.toString())))];
  const uniqueStatuses = ['All', ...Array.from(new Set(allTransactions.map(t => t.status)))];

  // Debug logging
  console.log('Filter Options:', {
    currencies: uniqueCurrencies,
    amounts: uniqueAmounts,
    statuses: uniqueStatuses,
    currentFilters: { searchTerm, statusFilter, amountFilter, currencyFilter }
  });

  // Filter transactions based on search and filters
  const filteredActiveTransactions = useMemo(() => {
    return activeTransactions.filter(transaction => {
      // Search filter - case insensitive and handle special characters
      const searchLower = searchTerm.toLowerCase().trim();
      const transactionId = transaction.id.toLowerCase();
      const transactionIdWithHash = `#${transaction.id.toLowerCase()}`;
      const buyerName = transaction.buyer.toLowerCase();
      const sellerName = transaction.seller.toLowerCase();
      
      const matchesSearch = searchTerm === '' || 
        transactionId.includes(searchLower) ||
        transactionIdWithHash.includes(searchLower) ||
        buyerName.includes(searchLower) ||
        sellerName.includes(searchLower);
      
      // Status filter - exact match
      const matchesStatus = statusFilter === 'All' || transaction.status === statusFilter;
      
      // Amount filter - convert to string for comparison
      const matchesAmount = amountFilter === 'All' || transaction.amount.value.toString() === amountFilter;
      
      // Currency filter - exact match
      const matchesCurrency = currencyFilter === 'All' || transaction.amount.currency === currencyFilter;

      // Debug logging for search
      if (searchTerm !== '') {
        console.log('Search Debug:', {
          searchTerm: searchLower,
          transactionId,
          transactionIdWithHash,
          buyerName,
          sellerName,
          matchesSearch,
          matchesStatus,
          matchesAmount,
          matchesCurrency,
          finalResult: matchesSearch && matchesStatus && matchesAmount && matchesCurrency
        });
      }

      return matchesSearch && matchesStatus && matchesAmount && matchesCurrency;
    });
  }, [activeTransactions, searchTerm, statusFilter, amountFilter, currencyFilter]);

  const filteredPastTransactions = useMemo(() => {
    return pastTransactions.filter(transaction => {
      // Search filter - case insensitive and handle special characters
      const searchLower = searchTerm.toLowerCase().trim();
      const transactionId = transaction.id.toLowerCase();
      const transactionIdWithHash = `#${transaction.id.toLowerCase()}`;
      const buyerName = transaction.buyer.toLowerCase();
      const sellerName = transaction.seller.toLowerCase();
      
      const matchesSearch = searchTerm === '' || 
        transactionId.includes(searchLower) ||
        transactionIdWithHash.includes(searchLower) ||
        buyerName.includes(searchLower) ||
        sellerName.includes(searchLower);
      
      // Status filter - exact match
      const matchesStatus = statusFilter === 'All' || transaction.status === statusFilter;
      
      // Amount filter - convert to string for comparison
      const matchesAmount = amountFilter === 'All' || transaction.amount.value.toString() === amountFilter;
      
      // Currency filter - exact match
      const matchesCurrency = currencyFilter === 'All' || transaction.amount.currency === currencyFilter;

      // Debug logging for search
      if (searchTerm !== '') {
        console.log('Search Debug (Past):', {
          searchTerm: searchLower,
          transactionId,
          transactionIdWithHash,
          buyerName,
          sellerName,
          matchesSearch,
          matchesStatus,
          matchesAmount,
          matchesCurrency,
          finalResult: matchesSearch && matchesStatus && matchesAmount && matchesCurrency
        });
      }

      return matchesSearch && matchesStatus && matchesAmount && matchesCurrency;
    });
  }, [pastTransactions, searchTerm, statusFilter, amountFilter, currencyFilter]);

  // Group past transactions by status
  const groupedPastTransactions = useMemo(() => {
    const grouped = filteredPastTransactions.reduce((acc, transaction) => {
      const status = transaction.status;
      if (!acc[status]) {
        acc[status] = [];
      }
      acc[status].push(transaction);
      return acc;
    }, {} as Record<string, DashboardTransaction[]>);

    // Debug logging
    console.log('Filter Results:', {
      activeCount: filteredActiveTransactions.length,
      pastCount: filteredPastTransactions.length,
      groupedCount: Object.keys(grouped).length,
      activeTransactions: filteredActiveTransactions.map(t => ({ id: t.id, status: t.status })),
      pastTransactions: filteredPastTransactions.map(t => ({ id: t.id, status: t.status }))
    });

    return grouped;
  }, [filteredPastTransactions, filteredActiveTransactions]);

  const clearFilters = () => {
    setSearchTerm('');
    setStatusFilter('All');
    setAmountFilter('All');
    setCurrencyFilter('All');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Transaction Dashboard</h1>
          
          {/* Search and Filter Section */}
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Search & Filter Transactions</h2>
            
            {/* Search Bar */}
            <div className="mb-4">
              <input
                type="text"
                placeholder="Search by Transaction ID, Buyer, or Seller..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  searchTerm ? 'border-blue-300 bg-blue-50' : 'border-gray-300'
                }`}
              />
              {searchTerm && (
                <div className="mt-2 text-sm text-blue-600">
                  Searching for: "{searchTerm}"
                </div>
              )}
            </div>

            {/* Filter Controls */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              {/* Status Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    statusFilter !== 'All' ? 'border-blue-300 bg-blue-50' : 'border-gray-300'
                  }`}
                >
                  {uniqueStatuses.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>

              {/* Currency Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Currency</label>
                <select
                  value={currencyFilter}
                  onChange={(e) => setCurrencyFilter(e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    currencyFilter !== 'All' ? 'border-blue-300 bg-blue-50' : 'border-gray-300'
                  }`}
                >
                  {uniqueCurrencies.map(currency => (
                    <option key={currency} value={currency}>{currency}</option>
                  ))}
                </select>
              </div>

              {/* Amount Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
                <select
                  value={amountFilter}
                  onChange={(e) => setAmountFilter(e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    amountFilter !== 'All' ? 'border-blue-300 bg-blue-50' : 'border-gray-300'
                  }`}
                >
                  {uniqueAmounts.map(amount => (
                    <option key={amount} value={amount}>{amount}</option>
                  ))}
                </select>
              </div>

              {/* Clear Filters Button */}
              <div className="flex items-end">
                <button
                  onClick={clearFilters}
                  className={`w-full px-4 py-2 rounded-lg transition-colors ${
                    searchTerm || statusFilter !== 'All' || amountFilter !== 'All' || currencyFilter !== 'All'
                      ? 'bg-red-600 text-white hover:bg-red-700'
                      : 'bg-gray-400 text-white cursor-not-allowed'
                  }`}
                  disabled={!searchTerm && statusFilter === 'All' && amountFilter === 'All' && currencyFilter === 'All'}
                >
                  Clear Filters
                </button>
              </div>
            </div>

            {/* Active Filters Display */}
            {(searchTerm || statusFilter !== 'All' || amountFilter !== 'All' || currencyFilter !== 'All') && (
              <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex flex-wrap gap-2 items-center">
                  <span className="text-sm font-medium text-blue-800">Active Filters:</span>
                  {searchTerm && (
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                      Search: "{searchTerm}"
                    </span>
                  )}
                  {statusFilter !== 'All' && (
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                      Status: {statusFilter}
                    </span>
                  )}
                  {amountFilter !== 'All' && (
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                      Amount: {amountFilter}
                    </span>
                  )}
                  {currencyFilter !== 'All' && (
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                      Currency: {currencyFilter}
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Results Summary */}
            <div className="text-sm text-gray-600">
              Showing {filteredActiveTransactions.length} active and {filteredPastTransactions.length} past transactions
            </div>
          </div>
          
          {/* Active Disputes Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Active Disputes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {activeDisputes.map((dispute) => (
                <DisputeCard key={dispute.id} dispute={dispute} />
              ))}
            </div>
          </div>

          {/* Active Transactions Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Active Transactions</h2>
            <DashboardTransactionCard 
              title="Active Transactions" 
              transactions={filteredActiveTransactions} 
            />
          </div>

          {/* Past Transactions Section - Grouped by Status */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Past Transactions</h2>
            {Object.keys(groupedPastTransactions).length > 0 ? (
              <div className="space-y-6">
                {Object.entries(groupedPastTransactions).map(([status, transactions]) => (
                  <div key={status} className="bg-white rounded-lg shadow-md p-4 sm:p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 capitalize">
                      {status} Transactions ({transactions.length})
                    </h3>
                    <DashboardTransactionCard 
                      title="" 
                      transactions={transactions} 
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-md p-6 text-center">
                <p className="text-gray-500">No past transactions match your current filters.</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
} 