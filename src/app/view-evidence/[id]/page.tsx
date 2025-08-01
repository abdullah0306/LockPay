"use client";

import { useParams, useRouter } from 'next/navigation';
import { Header } from '../../../components/Header';
import { ViewEvidenceDetails } from '../../../components/ViewEvidenceDetails';
import { ViewEvidenceDocument } from '../../../components/ViewEvidenceDocument';

export default function ViewEvidencePage() {
  const params = useParams();
  const router = useRouter();
  const evidenceId = params.id as string || '1';

  const evidenceData = {
    id: evidenceId,
    title: "Buyer's Claim Document",
    type: 'PDF Document',
    uploadedBy: 'Alice B. (Buyer)',
    uploadDate: '2023-10-26',
    description: 'Detailed claim regarding service non-delivery.'
  };

  const handleDownloadEvidence = () => {
    console.log('Downloading evidence:', evidenceId);
    // Handle download logic
  };

  const handleClose = () => {
    router.push(`/detail/${evidenceId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="py-8 sm:py-12 px-6 sm:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Page Title */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              View Evidence: {evidenceData.title}
            </h1>
          </div>

          {/* Evidence Details */}
          <ViewEvidenceDetails evidence={evidenceData} />

          {/* Document Preview */}
          <ViewEvidenceDocument />

          {/* Action Buttons */}
          <div className="flex gap-4 pt-6">
            <button
              onClick={handleDownloadEvidence}
              className="flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download Evidence
            </button>
            <button
              onClick={handleClose}
              className="flex items-center px-6 py-3 bg-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-400 transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              Close
            </button>
          </div>
        </div>
      </main>
    </div>
  );
} 