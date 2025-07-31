"use client";

interface ArbitrationActionsProps {
  onSubmit: () => void;
  onCancel: () => void;
  isSubmitting?: boolean;
}

export const ArbitrationActions = ({ onSubmit, onCancel, isSubmitting = false }: ArbitrationActionsProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
      <button 
        onClick={onSubmit}
        disabled={isSubmitting}
        className="flex-1 sm:flex-none flex items-center justify-center px-4 sm:px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
      >
        <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
        {isSubmitting ? 'Submitting...' : 'Submit Decision'}
      </button>
      <button 
        onClick={onCancel}
        disabled={isSubmitting}
        className="flex-1 sm:flex-none flex items-center justify-center px-4 sm:px-6 py-3 bg-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
      >
        <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
        Cancel
      </button>
    </div>
  );
}; 