"use client";

import { useParams, useRouter } from 'next/navigation';
import { Header } from '@/components/Header';
import { DisputeOverview } from '../../../components/DisputeOverview';
import { EvidenceSubmitted } from '../../../components/EvidenceSubmitted';
import { ArbitrationDecision } from '../../../components/ArbitrationDecision';

export default function ArbitrateDisputePage() {
  const params = useParams();
  const router = useRouter();
  const disputeId = params.id as string || 'TXN78901';

  const disputeData = {
    id: disputeId,
    status: 'Under Review',
    filedBy: 'Alice B. (Buyer)',
    filedOn: '2023-10-26',
    arbitrator: 'Admin User',
    asset: 'Digital Art Commission'
  };

  const evidenceData = [
    {
      id: '1',
      name: "Buyer's Claim Document",
      type: 'PDF',
      fullName: "Buyer's Claim Document (PDF)"
    },
    {
      id: '2',
      name: "Seller's Proof of Service",
      type: 'Image',
      fullName: "Seller's Proof of Service (Image)"
    },
    {
      id: '3',
      name: 'Communication Logs',
      type: 'TXT',
      fullName: 'Communication Logs (TXT)'
    }
  ];

  const handleViewEvidence = (evidenceId: string) => {
    console.log('Viewing evidence:', evidenceId);
    // Handle evidence viewing logic
  };

  const handleSubmitDecision = async (decisionData: {
    decisionType: string;
    customAmount: string;
    reasoning: string;
  }) => {
    console.log('Submitting decision:', decisionData);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    // Navigate back to detail page
    router.push(`/detail/${disputeId}`);
  };

  const handleCancelDecision = () => {
    // Stay on the same page
    console.log('Decision cancelled');
  };

  const handleBackToDetail = () => {
    router.push(`/detail/${disputeId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="py-8 sm:py-12 px-6 sm:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Page Title */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Arbitrate Dispute: #{disputeId}
            </h1>
          </div>

          {/* Dispute Overview */}
          <DisputeOverview dispute={disputeData} />

          {/* Evidence Submitted */}
          <EvidenceSubmitted 
            evidence={evidenceData}
            onViewEvidence={handleViewEvidence}
          />

          {/* Arbitration Decision */}
          <ArbitrationDecision 
            onSubmit={handleSubmitDecision}
            onCancel={handleCancelDecision}
          />

         
        </div>
      </main>
    </div>
  );
} 