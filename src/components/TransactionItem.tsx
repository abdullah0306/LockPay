"use client";

import { Transaction } from '@/types/transaction';
import { useRouter } from 'next/navigation';

interface TransactionItemProps {
  transaction: Transaction;
}

const statusConfig = {
  'Funds Locked': {
    color: 'bg-blue-600 text-white',
    icon: '🔄',
    tooltip: 'Transaction is active and funds are securely locked in escrow'
  },
  'Fulfilled': {
    color: 'bg-green-600 text-white',
    icon: '✅',
    tooltip: 'Transaction completed successfully and funds have been released'
  },
  'Disputed': {
    color: 'bg-red-600 text-white',
    icon: '⚠️',
    tooltip: 'Transaction is under review due to a dispute between parties'
  },
  'Refunded': {
    color: 'bg-gray-600 text-white',
    icon: '💰',
    tooltip: 'Transaction was cancelled and funds have been returned'
  },
};

export const TransactionItem = ({ transaction }: TransactionItemProps) => {
  const router = useRouter();
  const config = statusConfig[transaction.status] || statusConfig['Refunded'];
  const isActive = transaction.status === 'Funds Locked';
  const isEnhancedDashboard = transaction.id === 'TXN78901';
  const isDisputed = transaction.status === 'Disputed';

  const handleTransactionClick = () => {
    // Special case: TXN78901 navigates to the enhanced dashboard
    if (isEnhancedDashboard) {
      router.push('/dashboard');
    } 
    // Special case: Disputed transactions navigate to disputes page
    else if (isDisputed) {
      router.push(`/disputes/${transaction.id}`);
    } 
    else {
      router.push(`/transactions/${transaction.id}`);
    }
  };

  return (
    <div 
      className="border-b border-gray-100 py-4 last:border-b-0 cursor-pointer hover:bg-gray-50 transition-colors"
      onClick={handleTransactionClick}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-gray-700 font-medium">#{transaction.id}</span>
        <div className="flex items-center gap-2">
          {/* Real-time update indicator for active transactions */}
          {isActive && (
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs text-green-600 font-medium">Live</span>
            </div>
          )}
          <span 
            className={`px-3 py-1 rounded-full text-sm flex items-center gap-1 ${config.color}`}
            title={config.tooltip}
          >
            <span className="text-sm">{config.icon}</span>
            {transaction.status}
          </span>
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="text-gray-600">Amount:</span>
          <span className="text-gray-800 font-medium">
            {transaction.amount.value} {transaction.amount.currency}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Buyer:</span>
          <span className="text-gray-800">{transaction.buyer}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Seller:</span>
          <span className="text-gray-800">{transaction.seller}</span>
        </div>
      </div>
      
      {/* Enhanced Dashboard Link Indicator */}
      {isEnhancedDashboard && (
        <div className="mt-3 p-2 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors">
          <div className="flex items-center gap-2 text-blue-700 hover:text-blue-900">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
            <span className="text-sm font-semibold">Click to view Enhanced Dashboard</span>
            {/* <svg className="w-4 h-4 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg> */}
          </div>
        </div>
      )}
      
      {/* Dispute Link Indicator */}
      {isDisputed && (
        <div className="mt-3 p-2 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 transition-colors">
          <div className="flex items-center gap-2 text-red-700 hover:text-red-900">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
            <span className="text-sm font-semibold">Click to view Dispute Details</span>
            {/* <svg className="w-4 h-4 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg> */}
          </div>
        </div>
      )}
    </div>
  );
};