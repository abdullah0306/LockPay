"use client";

import { Transaction } from '@/types/transaction';
import { TransactionCard } from '@/components/TransactionCard';
import { Header } from '@/components/Header';
import { WalletProtected } from '@/components/WalletProtected';

const activeTransactions: Transaction[] = [
  {
    id: 'TXN78901',
    amount: { value: 1.5, currency: 'ETH' },
    buyer: 'Alice B.',
    seller: 'Bob C.',
    status: 'Funds Locked',
  },
  {
    id: 'TXN78902',
    amount: { value: 500, currency: 'USDC' },
    buyer: 'Charlie D.',
    seller: 'Diana E.',
    status: 'Funds Locked',
  },
];

const pastTransactions: Transaction[] = [
  {
    id: 'TXN78899',
    amount: { value: 0.8, currency: 'BTC' },
    buyer: 'Frank G.',
    seller: 'Grace H.',
    status: 'Fulfilled',
  },
  {
    id: 'TXN78898',
    amount: { value: 2.0, currency: 'ETH' },
    buyer: 'Ivan I.',
    seller: 'Kelly L.',
    status: 'Disputed',
  },
  {
    id: 'TXN78897',
    amount: { value: 1000, currency: 'USDT' },
    buyer: 'Liam M.',
    seller: 'Nora O.',
    status: 'Refunded',
  },
];

export default function Home() {
  return (
    <WalletProtected>
      <div className="min-h-screen bg-[#F5F5F5]">
        <Header />
        <main className="py-12 px-6 sm:px-8 lg:px-12">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-[#121417] mb-8">Transaction Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <TransactionCard title="Active Transactions" transactions={activeTransactions} />
              <TransactionCard title="Past Transactions" transactions={pastTransactions} />
            </div>
          </div>
        </main>
      </div>
    </WalletProtected>
  );
}