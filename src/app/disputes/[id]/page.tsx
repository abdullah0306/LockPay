"use client";

import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { Header } from '@/components/Header';
import { WalletProtected } from '@/components/WalletProtected';
import { DisputeSummary } from '@/components/DisputeSummary';
import { EvidenceReview } from '@/components/EvidenceReview';
import { ArbitrationDecision } from '@/components/ArbitrationDecision';
import { ArbitrationActions } from '@/components/ArbitrationActions';
import { DisputeData, Evidence } from '@/types/dispute';

export default function DisputeArbitrationPage() {
  const params = useParams();
  const router = useRouter();
  const disputeId = params.id as string;
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mock data - in real app, fetch from API
  const dispute: DisputeData = {
    id: disputeId,
    amount: { value: 1.5, currency: 'ETH' },
    buyer: { name: 'Alice B.', address: '0xAbc...123' },
    seller: { name: 'Bob C.', address: '0xDef...456' },
    asset: 'Digital Art Commission',
    status: 'Under Review',
    filedBy: 'Alice B. (Buyer)',
    filedOn: '2023-10-26 09:15 AM',
    arbitrator: 'Admin User',
    reason: 'Service not delivered as described'
  };

  const evidence: Evidence[] = [
    {
      type: 'buyer',
      title: "Buyer's Evidence",
      submittedOn: '2023-10-26 01:00 PM'
    },
    {
      type: 'seller',
      title: "Seller's Evidence",
      submittedOn: '2023-10-26 03:30 PM'
    }
  ];

  const handleSubmitDecision = async (decisionData: {
    decisionType: string;
    customAmount: string;
    reasoning: string;
  }) => {
    console.log('Submitting decision:', decisionData);
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    // Navigate back to dashboard or show success message
    router.push('/');
  };

  const handleCancelDecision = () => {
    // Stay on the same page
    console.log('Decision cancelled');
  };

  return (
    <WalletProtected>
      <div className="min-h-screen bg-[#F5F5F5]">
        <Header />
        <main className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl lg:max-w-7xl mx-auto space-y-6 sm:space-y-8">
          {/* Main Title */}
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 break-words">
              Dispute Arbitration: #{dispute.id}
            </h1>
          </div>

          {/* Info Box */}
          <div className="p-3 sm:p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-start sm:items-center gap-2 sm:gap-0">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5 sm:mt-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <p className="text-blue-800 text-sm sm:text-base">Review all evidence and make a fair decision.</p>
            </div>
          </div>

          {/* Dispute Summary */}
          <DisputeSummary dispute={dispute} />

          {/* Evidence Review */}
          <EvidenceReview evidence={evidence} />

          {/* Arbitration Decision */}
          <ArbitrationDecision 
            onSubmit={handleSubmitDecision}
            onCancel={handleCancelDecision}
          />
        </div>
      </main>
      </div>
    </WalletProtected>
  );
} 