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

  const handleTransactionClick = () => {
    // Special case: TXN78901 navigates to the enhanced dashboard
    if (transaction.id === 'TXN78901') {
      router.push('/dashboard');
    } 
    // Special case: Disputed transactions navigate to disputes page
    else if (transaction.status === 'Disputed') {
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
        <span 
          className={`px-3 py-1 rounded-full text-sm flex items-center gap-1 ${config.color}`}
          title={config.tooltip}
        >
          <span className="text-sm">{config.icon}</span>
          {transaction.status}
        </span>
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
    </div>
  );
};