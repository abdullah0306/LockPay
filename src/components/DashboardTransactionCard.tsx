"use client";

import { DashboardTransaction } from '@/types/dashboard';
import { useRouter } from 'next/navigation';

interface DashboardTransactionCardProps {
  title: string;
  transactions: DashboardTransaction[];
}

const statusColors = {
  'Funds Locked': 'bg-blue-100 text-blue-800',
  'Pending Review': 'bg-yellow-100 text-yellow-800',
  'Fulfilled': 'bg-green-100 text-green-800',
  'Disputed': 'bg-red-100 text-red-800',
  'Refunded': 'bg-gray-100 text-gray-800',
};

export const DashboardTransactionCard = ({ title, transactions }: DashboardTransactionCardProps) => {
  const router = useRouter();

  const handleTransactionClick = (transactionId: string) => {
    router.push(`/transactions/${transactionId}`);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">{title}</h2>
      <div className="space-y-4">
        {transactions.map((transaction) => {
          const statusClass = statusColors[transaction.status] || 'bg-gray-100 text-gray-800';
          
          return (
            <div
              key={transaction.id}
              className="border-b border-gray-100 py-4 last:border-b-0 cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={() => handleTransactionClick(transaction.id)}
            >
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-700 font-medium">#{transaction.id}</span>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusClass}`}>
                  {transaction.status}
                </span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 text-sm font-medium">Amount:</span>
                  <span className="font-bold text-blue-600 text-sm">{transaction.amount.value} {transaction.amount.currency}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 text-sm font-medium">Buyer:</span>
                  <span className="text-gray-900 text-sm font-semibold">{transaction.buyer}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 text-sm font-medium">Seller:</span>
                  <span className="text-gray-900 text-sm font-semibold">{transaction.seller}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}; 