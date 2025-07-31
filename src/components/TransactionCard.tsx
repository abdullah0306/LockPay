import { TransactionCardProps } from '@/types/transaction';
import { TransactionItem } from './TransactionItem';

export const TransactionCard = ({ title, transactions }: TransactionCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold text-[#121417] mb-6">{title}</h2>
      <div className="divide-y divide-gray-100">
        {transactions.map((transaction) => (
          <TransactionItem key={transaction.id} transaction={transaction} />
        ))}
      </div>
    </div>
  );
};