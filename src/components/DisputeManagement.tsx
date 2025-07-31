"use client";

import { DisputeManagementData } from '@/types/escrow-state';

interface DisputeManagementProps {
  dispute: DisputeManagementData;
  onArbitrateDispute: () => void;
  onProvideEvidence: () => void;
  onContactSupport: () => void;
}

export const DisputeManagement = ({ 
  dispute, 
  onArbitrateDispute, 
  onProvideEvidence, 
  onContactSupport 
}: DisputeManagementProps) => {
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
          <button className="text-blue-600 text-sm sm:text-base font-medium hover:text-blue-800 transition-colors">
            {dispute.evidence}
          </button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
        <button
          onClick={onArbitrateDispute}
          className="flex items-center justify-center px-4 sm:px-6 py-2 sm:py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors text-sm sm:text-base"
        >
          <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
          Arbitrate Dispute
        </button>
        
        <button
          onClick={onProvideEvidence}
          className="flex items-center justify-center px-4 sm:px-6 py-2 sm:py-3 bg-blue-100 text-blue-700 font-medium rounded-lg hover:bg-blue-200 transition-colors text-sm sm:text-base"
        >
          <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
          </svg>
          Provide Evidence
        </button>
        
        <button
          onClick={onContactSupport}
          className="flex items-center justify-center px-4 sm:px-6 py-2 sm:py-3 bg-blue-100 text-blue-700 font-medium rounded-lg hover:bg-blue-200 transition-colors text-sm sm:text-base"
        >
          <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
          </svg>
          Contact Support
        </button>
      </div>
    </div>
  );
}; 