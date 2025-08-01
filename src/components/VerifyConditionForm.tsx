"use client";

import { useState } from 'react';
import { VerifyConditionFormProps, VerifyConditionFormData } from '@/types/verify-condition';

export const VerifyConditionForm = ({ onSubmit, onCancel }: VerifyConditionFormProps) => {
  const [selectedCondition, setSelectedCondition] = useState('');
  const [proofDetails, setProofDetails] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const conditions = [
    'Asset Delivered',
    'Service Completed',
    'Inspection Period Ended',
    'Payment Confirmed',
    'Quality Check Passed'
  ];

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await onSubmit({
        selectedCondition,
        proofDetails,
        selectedFile
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 sm:p-8">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">
        Condition Verification Details
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Select Condition */}
        <div>
          <label htmlFor="condition" className="block text-sm font-medium text-gray-700 mb-2">
            Select Condition to Verify:
          </label>
          <select
            id="condition"
            value={selectedCondition}
            onChange={(e) => setSelectedCondition(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option value="">Select a condition...</option>
            {conditions.map((condition) => (
              <option key={condition} value={condition}>
                {condition}
              </option>
            ))}
          </select>
        </div>

        {/* Proof/Details */}
        <div>
          <label htmlFor="proof" className="block text-sm font-medium text-gray-700 mb-2">
            Proof/Details:
          </label>
          <textarea
            id="proof"
            value={proofDetails}
            onChange={(e) => setProofDetails(e.target.value)}
            placeholder="Provide details or links to proof (e.g., tracking number, completion report link)"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
            rows={4}
            required
          />
        </div>

        {/* Attach Evidence */}
        <div>
          <label htmlFor="evidence" className="block text-sm font-medium text-gray-700 mb-2">
            Attach Evidence (Optional):
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
            <input
              type="file"
              id="evidence"
              onChange={handleFileChange}
              className="hidden"
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
            />
            <label htmlFor="evidence" className="cursor-pointer">
              <div className="flex flex-col items-center">
                <svg className="w-8 h-8 text-blue-500 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <span className="text-blue-600 font-medium">Upload File</span>
              </div>
            </label>
            <p className="text-sm text-gray-500 mt-2">
              {selectedFile ? selectedFile.name : 'No file chosen'}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <button
            type="submit"
            disabled={isSubmitting || !selectedCondition || !proofDetails}
            className="flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            {isSubmitting ? 'Submitting...' : 'Submit Verification'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            disabled={isSubmitting}
            className="flex items-center justify-center px-6 py-3 bg-white border border-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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