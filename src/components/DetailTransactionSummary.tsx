import { DetailTransaction } from '@/types/detail-page';

interface DetailTransactionSummaryProps {
  transaction: DetailTransaction;
}

const statusConfig = {
  'FUNDS LOCKED': {
    color: 'bg-blue-600 text-white',
    icon: '🔄'
  },
  'FULFILLED': {
    color: 'bg-green-600 text-white',
    icon: '✅'
  },
  'DISPUTED': {
    color: 'bg-red-600 text-white',
    icon: '⚠️'
  },
  'REFUNDED': {
    color: 'bg-gray-600 text-white',
    icon: '💰'
  },
};

export const DetailTransactionSummary = ({ transaction }: DetailTransactionSummaryProps) => {
  const config = statusConfig[transaction.status] || statusConfig['REFUNDED'];

  return (
    <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
      <div className="flex items-start justify-between mb-4 sm:mb-6">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">Transaction Summary</h2>
        <span className={`px-3 py-1 text-xs font-medium rounded-full flex items-center gap-1 ${config.color}`}>
          <span className="text-sm">{config.icon}</span>
          {transaction.status}
        </span>
      </div>

      <div className="space-y-4 sm:space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-gray-500 text-sm sm:text-base font-medium">Transaction ID:</span>
          <span className="text-gray-900 text-sm sm:text-base font-semibold">#{transaction.id}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-gray-500 text-sm sm:text-base font-medium">Amount:</span>
          <span className="font-bold text-blue-600 text-sm sm:text-base">{transaction.amount.value} {transaction.amount.currency}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-gray-500 text-sm sm:text-base font-medium">Buyer:</span>
          <span className="text-gray-900 text-sm sm:text-base font-semibold">{transaction.buyer}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-gray-500 text-sm sm:text-base font-medium">Seller:</span>
          <span className="text-gray-900 text-sm sm:text-base font-semibold">{transaction.seller}</span>
        </div>
      </div>
    </div>
  );
}; 