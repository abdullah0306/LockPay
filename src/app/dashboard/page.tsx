"use client";

import { Header } from '@/components/Header';
import { DisputeCard } from '@/components/DisputeCard';
import { DashboardTransactionCard } from '@/components/DashboardTransactionCard';
import { DashboardDispute, DashboardTransaction } from '@/types/dashboard';

export default function DashboardPage() {
  // Mock data for Active Disputes
  const activeDisputes: DashboardDispute[] = [
    {
      id: 'TXN78898',
      priority: 'High Priority',
      status: 'Under Review',
      amount: { value: 2.0, currency: 'ETH' },
      decisionExpected: 'Within 3 days',
      buyer: 'Ivan J.',
      seller: 'Kelly L.',
      lastAction: {
        type: 'Evidence submitted',
        by: 'buyer'
      }
    },
    {
      id: 'TXN78895',
      priority: 'Medium Priority',
      status: 'Awaiting Response',
      amount: { value: 750, currency: 'USDC' },
      decisionExpected: 'Within 5 days',
      buyer: 'Mike P.',
      seller: 'Sarah Q.',
      lastAction: {
        type: 'Dispute filed',
        by: 'seller'
      }
    }
  ];

  // Mock data for Active Transactions
  const activeTransactions: DashboardTransaction[] = [
    {
      id: 'TXN78901',
      amount: { value: 1.5, currency: 'ETH' },
      status: 'Funds Locked',
      buyer: 'Alice R.',
      seller: 'Bob C.'
    },
    {
      id: 'TXN78902',
      amount: { value: 500, currency: 'USDC' },
      status: 'Funds Locked',
      buyer: 'Charlie D.',
      seller: 'Diana E.'
    },
    {
      id: 'TXN78903',
      amount: { value: 0.8, currency: 'BTC' },
      status: 'Pending Review',
      buyer: 'Emma F.',
      seller: 'Frank G.'
    }
  ];

  // Mock data for Past Transactions
  const pastTransactions: DashboardTransaction[] = [
    {
      id: 'TXN78899',
      amount: { value: 0.8, currency: 'BTC' },
      status: 'Fulfilled',
      buyer: 'Frank G.',
      seller: 'Grace H.'
    },
    {
      id: 'TXN78898',
      amount: { value: 2.0, currency: 'ETH' },
      status: 'Disputed',
      buyer: 'Ivan J.',
      seller: 'Kelly L.'
    },
    {
      id: 'TXN78897',
      amount: { value: 1000, currency: 'USDT' },
      status: 'Refunded',
      buyer: 'Liam M.',
      seller: 'Nora O.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Transaction Dashboard</h1>
          
          {/* Active Disputes Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Active Disputes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {activeDisputes.map((dispute) => (
                <DisputeCard key={dispute.id} dispute={dispute} />
              ))}
            </div>
          </div>

          {/* Active and Past Transactions Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <DashboardTransactionCard 
              title="Active Transactions" 
              transactions={activeTransactions} 
            />
            <DashboardTransactionCard 
              title="Past Transactions" 
              transactions={pastTransactions} 
            />
          </div>
        </div>
      </main>
    </div>
  );
} 