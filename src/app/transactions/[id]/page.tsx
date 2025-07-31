"use client";

import { useParams, useRouter } from 'next/navigation';
import { Header } from '@/components/Header';
import { TransactionOverview } from '@/components/TransactionOverview';
import { ReleaseConditions } from '@/components/ReleaseConditions';
import { DisputeDetails } from '@/components/DisputeDetails';
import { TransactionDetails, ReleaseCondition, DisputeInfo } from '@/types/transaction-details';

export default function TransactionDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const transactionId = params.id as string;

  // Mock data - in real app, fetch from API
  const transaction: TransactionDetails = {
    id: transactionId,
    status: 'Disputed',
    amount: { value: 2.0, currency: 'ETH' },
    buyer: 'Ivan J.',
    seller: 'Kelly L.'
  };

  const conditions: ReleaseCondition[] = [
    {
      id: '1',
      description: 'Digital asset delivered to buyer',
      status: 'Disputed',
      icon: 'x'
    },
    {
      id: '2',
      description: 'Buyer confirms receipt and quality',
      status: 'Disputed',
      icon: 'x'
    },
    {
      id: '3',
      description: '7-day inspection period elapsed',
      status: 'Pending',
      icon: 'pending'
    }
  ];

  const dispute: DisputeInfo = {
    initiatedBy: 'Buyer (Ivan J.)',
    reason: 'Digital asset not as described.',
    arbitrator: 'Assigned (Arbitrator X)',
    currentStatus: 'Awaiting evidence from both parties.'
  };

  const handleProvideEvidence = () => {
    // Navigate to evidence submission page or open modal
    router.push(`/disputes/${transactionId}`);
  };

  const handleCancelDispute = () => {
    // Handle dispute cancellation
    if (confirm('Are you sure you want to cancel this dispute?')) {
      router.push('/');
    }
  };

  const handleBackToDashboard = () => {
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      <Header />
      <main className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl lg:max-w-7xl mx-auto space-y-6 sm:space-y-8">
          {/* Back to Dashboard Link */}
          <div>
            <button 
              onClick={handleBackToDashboard}
              className="flex items-center text-blue-600 hover:text-blue-800 font-medium text-sm sm:text-base"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Dashboard
            </button>
          </div>

          {/* Main Title */}
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 break-words">
              Transaction Details: #{transaction.id}
            </h1>
          </div>

          {/* Transaction Overview */}
          <TransactionOverview transaction={transaction} />

          {/* Release Conditions */}
          <ReleaseConditions conditions={conditions} />

          {/* Dispute Details */}
          <DisputeDetails 
            dispute={dispute}
            onProvideEvidence={handleProvideEvidence}
            onCancelDispute={handleCancelDispute}
          />
        </div>
      </main>
    </div>
  );
} 