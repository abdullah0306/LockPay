"use client";

import { useParams, useRouter } from 'next/navigation';
import { Header } from '@/components/Header';
import { EscrowTransactionOverview } from '@/components/EscrowTransactionOverview';
import { EscrowStatusIndicators } from '@/components/EscrowStatusIndicators';
import { EscrowReleaseConditions } from '@/components/EscrowReleaseConditions';
import { DisputeManagement } from '@/components/DisputeManagement';
import { EscrowFundsHistory } from '@/components/EscrowFundsHistory';
import { 
  EscrowTransaction, 
  EscrowStatusIndicator, 
  EscrowReleaseCondition,
  DisputeManagementData,
  EscrowFundsHistory as EscrowFundsHistoryType
} from '@/types/escrow-state';

export default function StatePage() {
  const params = useParams();
  const router = useRouter();
  const transactionId = params.id as string || 'TXN78901';

  // Mock data for the escrow state
  const transaction: EscrowTransaction = {
    id: transactionId,
    status: 'DISPUTED',
    amount: { value: 1.5, currency: 'ETH' },
    buyer: { name: 'Alice B.', address: '0xAbc...123' },
    seller: { name: 'Bob C.', address: '0xDef...456' },
    asset: 'Digital Art Commission',
    disputeInfo: {
      filedBy: 'buyer',
      message: 'Dispute Filed by Buyer. Action required!'
    }
  };

  const escrowIndicators: EscrowStatusIndicator[] = [
    {
      id: '1',
      title: 'Funds Locked in Escrow',
      status: 'completed',
      icon: 'check'
    },
    {
      id: '2',
      title: 'Asset Delivered Condition Met',
      status: 'completed',
      icon: 'check'
    },
    {
      id: '3',
      title: 'Inspection Period Ended Condition Met',
      status: 'completed',
      icon: 'check'
    },
    {
      id: '4',
      title: 'Dispute Filed - Under Review',
      status: 'disputed',
      icon: 'x'
    },
    {
      id: '5',
      title: 'Arbitration/Resolution',
      status: 'pending',
      icon: 'pending'
    },
    {
      id: '6',
      title: 'Funds Released/Refunded',
      status: 'pending',
      icon: 'pending'
    }
  ];

  const releaseConditions: EscrowReleaseCondition[] = [
    {
      id: '1',
      title: 'Asset Delivered:',
      status: 'met',
      action: 'View Proof',
      icon: 'check'
    },
    {
      id: '2',
      title: 'Service Completed:',
      status: 'met',
      action: 'View Report',
      icon: 'check'
    },
    {
      id: '3',
      title: 'Inspection Period Ended:',
      status: 'met',
      icon: 'check'
    }
  ];

  const disputeManagement: DisputeManagementData = {
    status: 'Under Review',
    filedBy: 'Alice B. (Buyer)',
    filedOn: '2023-10-26 09:15 AM',
    arbitrator: 'Admin User',
    evidence: 'View Attached Files'
  };

  const escrowFundsHistory: EscrowFundsHistoryType[] = [
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
      timestamp: '2023-10-26 10:00 AM'
    },
    {
      id: '6',
      event: 'Evidence Submitted by Buyer',
      timestamp: '2023-10-26 01:00 PM'
    }
  ];

  const handleVerifyCondition = (conditionId: string) => {
    console.log('Verifying condition:', conditionId);
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

  const handleContactSupport = () => {
    console.log('Contacting support');
    // Handle support contact logic
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl lg:max-w-7xl mx-auto space-y-6 sm:space-y-8">
          {/* Main Title */}
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 break-words">
              Escrow State Dashboard: #{transaction.id}
            </h1>
          </div>

          {/* Info Bar */}
          {transaction.disputeInfo && (
            <div className="p-3 sm:p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-start sm:items-center gap-2 sm:gap-0">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5 sm:mt-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                <p className="text-blue-800 text-sm sm:text-base">{transaction.disputeInfo.message}</p>
              </div>
            </div>
          )}

          {/* Transaction Overview */}
          <EscrowTransactionOverview transaction={transaction} />

          {/* Escrow Status Indicators */}
          <EscrowStatusIndicators indicators={escrowIndicators} />

          {/* Release Conditions */}
          <EscrowReleaseConditions 
            conditions={releaseConditions}
            onVerifyCondition={handleVerifyCondition}
            onReleaseFunds={handleReleaseFunds}
          />

          {/* Dispute Management */}
          <DisputeManagement 
            dispute={disputeManagement}
            onArbitrateDispute={handleArbitrateDispute}
            onProvideEvidence={handleProvideEvidence}
            onContactSupport={handleContactSupport}
          />

          {/* Escrow Funds History */}
          <EscrowFundsHistory history={escrowFundsHistory} />
        </div>
      </main>
    </div>
  );
} 