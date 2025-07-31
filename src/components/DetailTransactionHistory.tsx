import { DetailTransactionHistory } from '@/types/detail-page';

interface DetailTransactionHistoryProps {
  history: DetailTransactionHistory[];
}

export const DetailTransactionHistory = ({ history }: DetailTransactionHistoryProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
      <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4 sm:mb-6">Transaction History</h2>
      
      <div className="space-y-3 sm:space-y-4">
        {history.map((item) => (
          <div key={item.id} className="flex justify-between items-center py-2 sm:py-3 border-b border-gray-100 last:border-b-0">
            <span className="text-gray-900 text-sm sm:text-base font-medium">{item.event}</span>
            <span className="text-gray-500 text-sm sm:text-base">{item.timestamp}</span>
          </div>
        ))}
      </div>
    </div>
  );
}; 