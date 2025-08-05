import { DisputeData } from '@/types/dispute';

interface DisputeSummaryProps {
  dispute: DisputeData;
}

const statusConfig = {
  'Under Review': {
    color: 'bg-red-100 text-red-800',
    icon: '⚠️',
    tooltip: 'Dispute is currently under review by arbitrator'
  },
  'Awaiting Evidence': {
    color: 'bg-yellow-100 text-yellow-800',
    icon: '⏳',
    tooltip: 'Waiting for evidence submission from parties'
  },
  'Evidence Submitted': {
    color: 'bg-blue-100 text-blue-800',
    icon: '📄',
    tooltip: 'Evidence has been submitted and is being reviewed'
  }
};

export const DisputeSummary = ({ dispute }: DisputeSummaryProps) => {
  const config = statusConfig[dispute.status] || statusConfig['Under Review'];

  return (
    <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
      <div className="flex items-start justify-between mb-4 sm:mb-6 gap-2 sm:gap-0">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">Dispute Summary</h2>
        <span 
          className={`px-3 py-1 text-xs font-medium rounded-full flex items-center gap-1 ${config.color}`}
          title={config.tooltip}
        >
          <span className="text-sm">{config.icon}</span>
          {dispute.status}
        </span>
      </div>

      <div className="space-y-4 sm:space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-gray-600 text-sm sm:text-base font-medium">Transaction ID:</span>
          <span className="text-gray-900 text-sm sm:text-base font-semibold">#{dispute.id}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-gray-600 text-sm sm:text-base font-medium">Amount:</span>
          <span className="font-bold text-blue-700 text-sm sm:text-base">{dispute.amount.value} {dispute.amount.currency}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-gray-600 text-sm sm:text-base font-medium">Buyer:</span>
          <span className="text-gray-900 text-sm sm:text-base font-semibold break-all sm:break-normal">{dispute.buyer.name} ({dispute.buyer.address})</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-gray-600 text-sm sm:text-base font-medium">Seller:</span>
          <span className="text-gray-900 text-sm sm:text-base font-semibold break-all sm:break-normal">{dispute.seller.name} ({dispute.seller.address})</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-gray-600 text-sm sm:text-base font-medium">Asset/Service:</span>
          <span className="text-gray-900 text-sm sm:text-base font-semibold">{dispute.asset}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-gray-600 text-sm sm:text-base font-medium">Dispute Status:</span>
          <span className="text-red-600 text-sm sm:text-base font-semibold">{dispute.status}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-gray-600 text-sm sm:text-base font-medium">Filed By:</span>
          <span className="text-gray-900 text-sm sm:text-base font-semibold">{dispute.filedBy}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-gray-600 text-sm sm:text-base font-medium">Filed On:</span>
          <span className="text-gray-900 text-sm sm:text-base font-semibold">{dispute.filedOn}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-gray-600 text-sm sm:text-base font-medium">Arbitrator:</span>
          <span className="text-gray-900 text-sm sm:text-base font-semibold">{dispute.arbitrator}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-gray-600 text-sm sm:text-base font-medium">Dispute Reason:</span>
          <span className="text-gray-900 text-sm sm:text-base font-semibold">{dispute.reason}</span>
        </div>
      </div>
    </div>
  );
}; 