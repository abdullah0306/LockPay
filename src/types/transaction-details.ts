export interface TransactionDetails {
  id: string;
  status: 'Active' | 'Disputed' | 'Fulfilled' | 'Refunded';
  amount: {
    value: number;
    currency: string;
  };
  buyer: string;
  seller: string;
}

export interface ReleaseCondition {
  id: string;
  description: string;
  status: 'Completed' | 'Disputed' | 'Pending';
  icon: 'check' | 'x' | 'pending';
}

export interface DisputeInfo {
  initiatedBy: string;
  reason: string;
  arbitrator: string;
  currentStatus: string;
} 