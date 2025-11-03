"use client";

import { useParams, useRouter } from 'next/navigation';
import { Header } from '@/components/Header';
import { WalletProtected } from '@/components/WalletProtected';
import { ProvideEvidenceDisputeSummary } from '../../../components/ProvideEvidenceDisputeSummary';
import { ProvideEvidenceUpload } from '../../../components/ProvideEvidenceUpload';
import { ProvideEvidenceMessage } from '../../../components/ProvideEvidenceMessage';

export default function ProvideEvidencePage() {
  const params = useParams();
  const router = useRouter();
  const transactionId = params.id as string || 'TXN78898';

  const disputeData = {
    transactionId: transactionId,
    disputeReason: 'Digital asset not as described.',
    disputedBy: 'Buyer (Ivan J.)',
    against: 'Seller (Kelly L.)'
  };

  const handleSubmitEvidence = async (formData: {
    files: File[];
    message: string;
  }) => {
    console.log('Submitting evidence:', formData);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    // Navigate back to detail page
    router.push(`/detail/${transactionId}`);
  };

  const handleCancel = () => {
    router.push(`/detail/${transactionId}`);
  };

  return (
    <WalletProtected>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="py-8 sm:py-12 px-6 sm:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Back Navigation */}
          <div className="mb-6">
            <button
              onClick={() => router.push(`/detail/${transactionId}`)}
              className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Dispute Details
            </button>
          </div>

          {/* Page Title */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Provide Evidence for Dispute #{transactionId}
            </h1>
          </div>

          {/* Dispute Summary */}
          <ProvideEvidenceDisputeSummary dispute={disputeData} />

          {/* Upload Evidence */}
          <ProvideEvidenceUpload />

          {/* Message Section */}
          <ProvideEvidenceMessage />

          {/* Action Buttons */}
          <div className="flex gap-4 pt-6">
            <button
              onClick={() => handleSubmitEvidence({ files: [], message: '' })}
              className="flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Submit Evidence
            </button>
            <button
              onClick={handleCancel}
              className="flex items-center px-6 py-3 bg-white border border-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-50 transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              Cancel
            </button>
          </div>
        </div>
      </main>
      </div>
    </WalletProtected>
  );
} 