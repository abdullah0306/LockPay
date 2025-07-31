export type TransactionStatus = 'Funds Locked' | 'Fulfilled' | 'Disputed' | 'Refunded';

export interface Transaction {
  id: string;
  amount: {
    value: number;
    currency: string;
  };
  buyer: string;
  seller: string;
  status: TransactionStatus;
}

export interface TransactionCardProps {
  title: string;
  transactions: Transaction[];
}