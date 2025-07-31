"use client";

import { useParams } from 'next/navigation';
import { Header } from '@/components/Header';
import { DetailTransactionSummary } from '@/components/DetailTransactionSummary';
import { DetailReleaseConditions } from '@/components/DetailReleaseConditions';
import { DetailDisputeManagement } from '@/components/DetailDisputeManagement';
import { DetailTransactionHistory } from '@/components/DetailTransactionHistory';
import { 
  DetailTransaction, 
  DetailReleaseCondition, 
  DetailDisputeInfo,
  DetailTransactionHistoryItem
} from '@/types/detail-page';

export default function DetailPage() {
  const params = useParams();
  const transactionId = params.id as string || 'TXN78901';

  // Mock data for the detail page
  const transaction: DetailTransaction = {
    id: transactionId,
    amount: { value: 1.5, currency: 'ETH' },
    buyer: 'Alice B.',
    seller: 'Bob C.',
    status: 'FUNDS LOCKED'
  };

  const releaseConditions: DetailReleaseCondition[] = [
    {
      id: '1',
      title: 'Asset Delivered:',
      status: 'Met',
      icon: 'check'
    },
    {
      id: '2',
      title: 'Service Completed:',
      status: 'Pending',
      icon: 'x'
    },
    {
      id: '3',
      title: 'Inspection Period Ended:',
      status: 'Met',
      icon: 'check'
    }
  ];

  const disputeInfo: DetailDisputeInfo = {
    status: 'Under Review',
    filedBy: 'Alice B. (Buyer)',
    filedOn: '2023-10-26',
    arbitrator: 'Admin User',
    evidence: 'View Attached Files'
  };

  const transactionHistory: DetailTransactionHistoryItem[] = [
    {
      id: '1',
      event: 'Funds Locked in Escrow',
      timestamp: '2023-10-20 10:00 AM'
    },
    {
      id: '2',
      event: 'Asset Delivered Condition Met',
      timestamp: '2023-10-22 02:30 PM'
    },
    {
      id: '3',
      event: 'Inspection Period Ended Condition Met',
      timestamp: '2023-10-25 05:00 PM'
    },
    {
      id: '4',
      event: 'Dispute Filed by Buyer',
      timestamp: '2023-10-26 09:15 AM'
    },
    {
      id: '5',
      event: 'Arbitrator Assigned: Admin User',
      timestamp: '2023-10-26 11:00 AM'
    }
  ];

  const handleVerifyCondition = () => {
    console.log('Verifying condition');
    // Handle condition verification logic
  };

  const handleReleaseFunds = () => {
    console.log('Releasing funds');
    // Handle fund release logic
  };

  const handleArbitrateDispute = () => {
    console.log('Arbitrating dispute');
    // Handle dispute arbitration logic
  };

  const handleProvideEvidence = () => {
    console.log('Providing evidence');
    // Handle evidence submission logic
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl lg:max-w-7xl mx-auto space-y-6 sm:space-y-8">
          {/* Main Title */}
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 break-words">
              Transaction Details: #{transaction.id}
            </h1>
          </div>

          {/* Transaction Summary */}
          <DetailTransactionSummary transaction={transaction} />

          {/* Release Conditions */}
          <DetailReleaseConditions 
            conditions={releaseConditions}
            onVerifyCondition={handleVerifyCondition}
            onReleaseFunds={handleReleaseFunds}
          />

          {/* Dispute Management */}
          <DetailDisputeManagement 
            dispute={disputeInfo}
            onArbitrateDispute={handleArbitrateDispute}
            onProvideEvidence={handleProvideEvidence}
          />

          {/* Transaction History */}
          <DetailTransactionHistory history={transactionHistory} />
        </div>
      </main>
    </div>
  );
} 