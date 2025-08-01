"use client";

import { useState } from 'react';

interface ArbitrationDecisionProps {
  onSubmit: (decisionData: {
    decisionType: string;
    customAmount: string;
    reasoning: string;
  }) => void;
  onCancel: () => void;
}

export const ArbitrationDecision = ({ onSubmit, onCancel }: ArbitrationDecisionProps) => {
  const [decisionType, setDecisionType] = useState('');
  const [customAmount, setCustomAmount] = useState('');
  const [reasoning, setReasoning] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await onSubmit({
        decisionType,
        customAmount,
        reasoning
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Arbitration Decision</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Decision Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Decision Type:
          </label>
          <div className="space-y-3">
            <label className="flex items-center">
              <input
                type="radio"
                name="decisionType"
                value="release-to-seller"
                checked={decisionType === 'release-to-seller'}
                onChange={(e) => setDecisionType(e.target.value)}
                className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
              <span className="ml-3 text-gray-900">Release Funds to Seller</span>
            </label>
            
            <label className="flex items-center">
              <input
                type="radio"
                name="decisionType"
                value="refund-to-buyer"
                checked={decisionType === 'refund-to-buyer'}
                onChange={(e) => setDecisionType(e.target.value)}
                className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
              <span className="ml-3 text-gray-900">Refund Funds to Buyer</span>
            </label>
            
            <label className="flex items-center">
              <input
                type="radio"
                name="decisionType"
                value="custom-resolution"
                checked={decisionType === 'custom-resolution'}
                onChange={(e) => setDecisionType(e.target.value)}
                className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
              <span className="ml-3 text-gray-900">Custom Resolution (e.g., Split Funds)</span>
            </label>
          </div>
        </div>

        {/* Custom Amount */}
        <div>
          <label htmlFor="customAmount" className="block text-sm font-medium text-gray-700 mb-2">
            Custom Amount (if applicable):
          </label>
          <input
            type="text"
            id="customAmount"
            value={customAmount}
            onChange={(e) => setCustomAmount(e.target.value)}
            placeholder="e.g., 0.75 ETH"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Arbitrator's Notes */}
        <div>
          <label htmlFor="reasoning" className="block text-sm font-medium text-gray-700 mb-2">
            Arbitrator&apos;s Notes/Reasoning:
          </label>
          <textarea
            id="reasoning"
            value={reasoning}
            onChange={(e) => setReasoning(e.target.value)}
            placeholder="Provide detailed reasoning for your decision..."
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <button
            type="submit"
            disabled={isSubmitting || !decisionType || !reasoning}
            className="flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            {isSubmitting ? 'Submitting...' : 'Submit Decision'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            disabled={isSubmitting}
            className="flex items-center justify-center px-6 py-3 bg-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}; 