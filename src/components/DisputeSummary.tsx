import { DisputeData } from '@/types/dispute';

interface DisputeSummaryProps {
  dispute: DisputeData;
}

export const DisputeSummary = ({ dispute }: DisputeSummaryProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4 sm:mb-6 gap-2 sm:gap-0">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">Dispute Summary</h2>
        <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded-full self-start sm:self-auto">
          DISPUTED
        </span>
      </div>
      
      <div className="space-y-3 sm:space-y-4">
        <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-0">
          <span className="text-gray-600 text-sm sm:text-base">Transaction ID:</span>
          <span className="font-medium text-gray-900 text-sm sm:text-base">#{dispute.id}</span>
        </div>
        
        <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-0">
          <span className="text-gray-600 text-sm sm:text-base">Amount:</span>
          <span className="font-medium text-blue-600 text-sm sm:text-base">{dispute.amount.value} {dispute.amount.currency}</span>
        </div>

        <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-0">
          <span className="text-gray-600 text-sm sm:text-base">Buyer:</span>
          <span className="font-medium text-gray-900 text-sm sm:text-base break-all sm:break-normal">{dispute.buyer.name} ({dispute.buyer.address})</span>
        </div>

        <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-0">
          <span className="text-gray-600 text-sm sm:text-base">Seller:</span>
          <span className="font-medium text-gray-900 text-sm sm:text-base break-all sm:break-normal">{dispute.seller.name} ({dispute.seller.address})</span>
        </div>

        <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-0">
          <span className="text-gray-600 text-sm sm:text-base">Asset/Service:</span>
          <span className="font-medium text-gray-900 text-sm sm:text-base">{dispute.asset}</span>
        </div>

        <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-0">
          <span className="text-gray-600 text-sm sm:text-base">Dispute Status:</span>
          <span className="text-red-600 font-medium text-sm sm:text-base">{dispute.status}</span>
        </div>

        <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-0">
          <span className="text-gray-600 text-sm sm:text-base">Filed By:</span>
          <span className="font-medium text-gray-900 text-sm sm:text-base">{dispute.filedBy}</span>
        </div>

        <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-0">
          <span className="text-gray-600 text-sm sm:text-base">Filed On:</span>
          <span className="font-medium text-gray-900 text-sm sm:text-base">{dispute.filedOn}</span>
        </div>

        <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-0">
          <span className="text-gray-600 text-sm sm:text-base">Arbitrator:</span>
          <span className="font-medium text-gray-900 text-sm sm:text-base">{dispute.arbitrator}</span>
        </div>

        <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-0">
          <span className="text-gray-600 text-sm sm:text-base">Dispute Reason:</span>
          <span className="font-medium text-gray-900 text-sm sm:text-base">{dispute.reason}</span>
        </div>
      </div>
    </div>
  );
}; 