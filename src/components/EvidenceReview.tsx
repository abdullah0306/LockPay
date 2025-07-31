"use client";

import { Evidence } from '@/types/dispute';

interface EvidenceReviewProps {
  evidence: Evidence[];
}

const getIcon = (icon: string) => {
  switch (icon) {
    case 'check':
      return (
        <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
      );
    case 'x':
      return (
        <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      );
    case 'pending':
      return (
        <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
        </svg>
      );
    default:
      return null;
  }
};

export const EvidenceReview = ({ evidence }: EvidenceReviewProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
      <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4 sm:mb-6">Evidence Review</h2>
      
      <div className="space-y-4 sm:space-y-4">
        {evidence.map((item) => (
          <div key={item.type} className="bg-gray-50 p-3 sm:p-4 rounded-lg">
            <div className="flex justify-between items-center gap-2 sm:gap-0">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 text-sm sm:text-base mb-1">{item.title}</h3>
                <p className="text-xs sm:text-sm text-gray-500 font-medium">Submitted on {item.submittedOn}</p>
              </div>
              <button className="text-blue-600 hover:text-blue-800 font-semibold text-sm sm:text-base">
                View Files
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}; 