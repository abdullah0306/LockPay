"use client";

import { Transaction } from '@/types/transaction';
import { useRouter } from 'next/navigation';

interface TransactionItemProps {
  transaction: Transaction;
}

const statusColors = {
  'Funds Locked': 'bg-[#0077CC] text-white',
  'Fulfilled': 'bg-[#4CAF50] text-white',
  'Disputed': 'bg-[#F44336] text-white',
  'Refunded': 'bg-[#9E9E9E] text-white',
};

export const TransactionItem = ({ transaction }: TransactionItemProps) => {
  const router = useRouter();
  const statusClass = statusColors[transaction.status] || 'bg-gray-500 text-white';

  const handleTransactionClick = () => {
    if (transaction.status === 'Disputed') {
      router.push(`/disputes/${transaction.id}`);
    }
  };

  return (
    <div 
      className={`border-b border-gray-100 py-4 last:border-b-0 ${
        transaction.status === 'Disputed' ? 'cursor-pointer hover:bg-gray-50 transition-colors' : ''
      }`}
      onClick={handleTransactionClick}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-gray-700 font-medium">#{transaction.id}</span>
        <span className={`px-3 py-1 rounded-full text-sm ${statusClass}`}>
          {transaction.status}
        </span>
      </div>
      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="text-gray-500">Amount:</span>
          <span className="text-gray-700 font-medium">
            {transaction.amount.value} {transaction.amount.currency}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Buyer:</span>
          <span className="text-gray-700">{transaction.buyer}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Seller:</span>
          <span className="text-gray-700">{transaction.seller}</span>
        </div>
      </div>
    </div>
  );
};