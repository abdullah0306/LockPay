"use client";

import { useRouter } from 'next/navigation';
import { DetailDisputeInfo } from '@/types/detail-page';

interface DetailDisputeManagementProps {
  dispute: DetailDisputeInfo;
  transactionId: string;
  onArbitrateDispute: () => void;
  onProvideEvidence: () => void;
}

export const DetailDisputeManagement = ({ 
  dispute, 
  transactionId,
  onArbitrateDispute, 
  onProvideEvidence 
}: DetailDisputeManagementProps) => {
  const router = useRouter();

  const handleViewEvidence = () => {
    // Navigate to view evidence page using the transaction ID
    router.push(`/view-evidence/${transactionId}`);
  };

  const handleProvideEvidence = () => {
    // Navigate to provide evidence page using the transaction ID
    router.push(`/provide-evidence/${transactionId}`);
  };
  return (
    <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
      <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4 sm:mb-6">Dispute Management</h2>
      
      <div className="space-y-4 sm:space-y-4 mb-6">
        <div className="flex justify-between items-center">
          <span className="text-gray-500 text-sm sm:text-base font-medium">Dispute Status:</span>
          <span className="text-red-600 text-sm sm:text-base font-semibold">{dispute.status}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-gray-500 text-sm sm:text-base font-medium">Filed By:</span>
          <span className="text-gray-900 text-sm sm:text-base font-semibold">{dispute.filedBy}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-gray-500 text-sm sm:text-base font-medium">Filed On:</span>
          <span className="text-gray-900 text-sm sm:text-base font-semibold">{dispute.filedOn}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-gray-500 text-sm sm:text-base font-medium">Arbitrator:</span>
          <span className="text-gray-900 text-sm sm:text-base font-semibold">{dispute.arbitrator}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-gray-500 text-sm sm:text-base font-medium">Evidence:</span>
          <button 
            onClick={handleViewEvidence}
            className="text-blue-600 text-sm sm:text-base font-medium hover:text-blue-800 transition-colors"
          >
            {dispute.evidence}
          </button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 sm:gap-4">
        <button
          onClick={onArbitrateDispute}
          className="flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors text-sm sm:text-base"
        >
          <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
          </svg>
          Arbitrate Dispute
        </button>
        
        <button
          onClick={handleProvideEvidence}
          className="flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-blue-100 text-blue-700 font-medium rounded-lg hover:bg-blue-200 transition-colors text-sm sm:text-base"
        >
          <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
          </svg>
          Provide Evidence
        </button>
      </div>
    </div>
  );
}; 