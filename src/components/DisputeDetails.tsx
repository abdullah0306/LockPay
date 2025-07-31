"use client";

import { DisputeInfo } from '@/types/transaction-details';

interface DisputeDetailsProps {
  dispute: DisputeInfo;
  onProvideEvidence: () => void;
  onCancelDispute: () => void;
}

export const DisputeDetails = ({ dispute, onProvideEvidence, onCancelDispute }: DisputeDetailsProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
      <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4 sm:mb-6">Dispute Details</h2>

      <div className="space-y-4 sm:space-y-4 mb-6 sm:mb-8">
        <div className="flex justify-between items-center">
          <span className="text-gray-500 text-sm sm:text-base font-medium">Initiated By:</span>
          <span className="text-gray-900 text-sm sm:text-base font-semibold">{dispute.initiatedBy}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-gray-500 text-sm sm:text-base font-medium">Reason:</span>
          <span className="text-gray-900 text-sm sm:text-base font-semibold">{dispute.reason}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-gray-500 text-sm sm:text-base font-medium">Arbitrator:</span>
          <span className="text-gray-900 text-sm sm:text-base font-semibold">{dispute.arbitrator}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-gray-500 text-sm sm:text-base font-medium">Current Status:</span>
          <span className="text-gray-900 text-sm sm:text-base font-semibold">{dispute.currentStatus}</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
        <button
          onClick={onProvideEvidence}
          className="flex-1 sm:flex-none flex items-center justify-center px-4 sm:px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base"
        >
          <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Provide Evidence
        </button>
        <button
          onClick={onCancelDispute}
          className="flex-1 sm:flex-none flex items-center justify-center px-4 sm:px-6 py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors text-sm sm:text-base"
        >
          <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
          Cancel Dispute
        </button>
      </div>
    </div>
  );
}; 