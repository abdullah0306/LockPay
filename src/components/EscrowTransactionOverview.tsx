import { EscrowTransaction } from '@/types/escrow-state';

interface EscrowTransactionOverviewProps {
  transaction: EscrowTransaction;
}

const statusConfig = {
  'DISPUTED': {
    color: 'bg-red-100 text-red-800',
    icon: '⚠️',
    tooltip: 'Transaction is under review due to a dispute between parties'
  },
  'ACTIVE': {
    color: 'bg-blue-100 text-blue-800',
    icon: '🔄',
    tooltip: 'Transaction is active and funds are securely locked in escrow'
  },
  'COMPLETED': {
    color: 'bg-green-100 text-green-800',
    icon: '✅',
    tooltip: 'Transaction completed successfully and funds have been released'
  },
  'REFUNDED': {
    color: 'bg-gray-100 text-gray-800',
    icon: '💰',
    tooltip: 'Transaction was cancelled and funds have been returned'
  },
};

export const EscrowTransactionOverview = ({ transaction }: EscrowTransactionOverviewProps) => {
  const config = statusConfig[transaction.status] || statusConfig['REFUNDED'];

  return (
    <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
      <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4 sm:mb-6">Transaction Overview</h2>

      <div className="space-y-4 sm:space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-gray-600 text-sm sm:text-base font-medium">#{transaction.id}:</span>
          <span 
            className={`px-3 py-1 text-xs font-medium rounded-full flex items-center gap-1 ${config.color}`}
            title={config.tooltip}
          >
            <span className="text-sm">{config.icon}</span>
            {transaction.status}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-gray-600 text-sm sm:text-base font-medium">Amount:</span>
          <span className="font-bold text-blue-700 text-sm sm:text-base">{transaction.amount.value} {transaction.amount.currency}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-gray-600 text-sm sm:text-base font-medium">Buyer:</span>
          <span className="text-gray-900 text-sm sm:text-base font-semibold">{transaction.buyer.name} ({transaction.buyer.address})</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-gray-600 text-sm sm:text-base font-medium">Seller:</span>
          <span className="text-gray-900 text-sm sm:text-base font-semibold">{transaction.seller.name} ({transaction.seller.address})</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-gray-600 text-sm sm:text-base font-medium">Asset/Service:</span>
          <span className="text-gray-900 text-sm sm:text-base font-semibold">{transaction.asset}</span>
        </div>
      </div>
    </div>
  );
}; 