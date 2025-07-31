"use client";

import { DetailReleaseCondition } from '@/types/detail-page';

interface DetailReleaseConditionsProps {
  conditions: DetailReleaseCondition[];
  onVerifyCondition: () => void;
  onReleaseFunds: () => void;
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
        <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
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

export const DetailReleaseConditions = ({ conditions, onVerifyCondition, onReleaseFunds }: DetailReleaseConditionsProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
      <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4 sm:mb-6">Release Conditions</h2>

      <div className="space-y-3 sm:space-y-4 mb-6">
        {conditions.map((condition) => (
          <div key={condition.id} className="flex items-center justify-between">
            <div className="flex items-center gap-3 sm:gap-4">
              {getIcon(condition.icon)}
              <span className="text-sm sm:text-base text-gray-900">{condition.title}</span>
            </div>
            <span className="text-xs sm:text-sm text-gray-500 font-medium">
              {condition.status}
            </span>
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 sm:gap-4">
        <button
          onClick={onVerifyCondition}
          className="flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-blue-100 text-blue-700 font-medium rounded-lg hover:bg-blue-200 transition-colors text-sm sm:text-base"
        >
          <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
          </svg>
          Verify Condition
        </button>
        <button
          onClick={onReleaseFunds}
          className="flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base"
        >
          Release Funds
        </button>
      </div>
    </div>
  );
}; 