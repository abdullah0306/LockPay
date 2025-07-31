"use client";

interface ArbitrationDecisionProps {
  decision: string;
  comments: string;
  onDecisionChange: (decision: string) => void;
  onCommentsChange: (comments: string) => void;
}

export const ArbitrationDecision = ({ 
  decision, 
  comments, 
  onDecisionChange, 
  onCommentsChange 
}: ArbitrationDecisionProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
      <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4 sm:mb-6">Arbitration Decision</h2>
      
      <div className="space-y-4 sm:space-y-6">
        {/* Decision Outcome */}
        <div>
          <h3 className="text-base sm:text-lg font-medium text-gray-800 mb-3 sm:mb-4">Decision Outcome</h3>
          <div className="space-y-2 sm:space-y-3">
            <label className="flex items-start sm:items-center gap-2 sm:gap-3">
              <input
                type="radio"
                name="decision"
                value="seller"
                checked={decision === 'seller'}
                onChange={(e) => onDecisionChange(e.target.value)}
                className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500 mt-0.5 sm:mt-0"
              />
              <span className="text-sm sm:text-base text-gray-900">Release funds to Seller</span>
            </label>
            <label className="flex items-start sm:items-center gap-2 sm:gap-3">
              <input
                type="radio"
                name="decision"
                value="buyer"
                checked={decision === 'buyer'}
                onChange={(e) => onDecisionChange(e.target.value)}
                className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500 mt-0.5 sm:mt-0"
              />
              <span className="text-sm sm:text-base text-gray-900">Refund funds to Buyer</span>
            </label>
            <label className="flex items-start sm:items-center gap-2 sm:gap-3">
              <input
                type="radio"
                name="decision"
                value="split"
                checked={decision === 'split'}
                onChange={(e) => onDecisionChange(e.target.value)}
                className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500 mt-0.5 sm:mt-0"
              />
              <span className="text-sm sm:text-base text-gray-900">Split funds (e.g., 50/50)</span>
            </label>
          </div>
        </div>

        {/* Justification / Comments */}
        <div>
          <h3 className="text-base sm:text-lg font-medium text-gray-800 mb-3 sm:mb-4">Justification / Comments</h3>
          <textarea
            value={comments}
            onChange={(e) => onCommentsChange(e.target.value)}
            placeholder="Provide a detailed explanation for your decision..."
            className="w-full h-24 sm:h-32 p-3 sm:p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none text-sm sm:text-base"
          />
        </div>
      </div>
    </div>
  );
}; 