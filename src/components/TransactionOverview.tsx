import { TransactionDetails } from '@/types/transaction-details';

interface TransactionOverviewProps {
  transaction: TransactionDetails;
}

const statusConfig = {
  'Active': {
    color: 'bg-blue-100 text-blue-800',
    icon: '🔄'
  },
  'Disputed': {
    color: 'bg-red-100 text-red-800',
    icon: '⚠️'
  },
  'Fulfilled': {
    color: 'bg-green-100 text-green-800',
    icon: '✅'
  },
  'Refunded': {
    color: 'bg-gray-100 text-gray-800',
    icon: '💰'
  },
};

export const TransactionOverview = ({ transaction }: TransactionOverviewProps) => {
  const config = statusConfig[transaction.status] || statusConfig['Refunded'];

  return (
    <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
      <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4 sm:mb-6">Overview</h2>

      <div className="space-y-4 sm:space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-gray-500 text-sm sm:text-base font-medium">Transaction ID:</span>
          <span className="text-gray-900 text-sm sm:text-base font-semibold">#{transaction.id}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-gray-500 text-sm sm:text-base font-medium">Status:</span>
          <span className={`px-3 py-1 text-xs font-medium rounded-full flex items-center gap-1 ${config.color}`}>
            <span className="text-sm">{config.icon}</span>
            {transaction.status}
          </span>
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