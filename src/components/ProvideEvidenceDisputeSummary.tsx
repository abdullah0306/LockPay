import { ProvideEvidenceDisputeSummaryProps } from '@/types/provide-evidence';

export const ProvideEvidenceDisputeSummary = ({ dispute }: ProvideEvidenceDisputeSummaryProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Dispute Summary</h2>
      
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-gray-600 font-medium">Transaction ID:</span>
          <span className="text-gray-900 font-semibold">#{dispute.transactionId}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-gray-600 font-medium">Dispute Reason:</span>
          <span className="text-gray-900 font-semibold">{dispute.disputeReason}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-gray-600 font-medium">Disputed By:</span>
          <span className="text-gray-900 font-semibold">{dispute.disputedBy}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-gray-600 font-medium">Against:</span>
          <span className="text-gray-900 font-semibold">{dispute.against}</span>
        </div>
      </div>
    </div>
  );
}; 