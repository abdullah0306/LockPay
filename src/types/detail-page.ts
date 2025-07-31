export interface DetailTransaction {
  id: string;
  amount: {
    value: number;
    currency: string;
  };
  buyer: string;
  seller: string;
  status: 'FUNDS LOCKED' | 'FULFILLED' | 'DISPUTED' | 'REFUNDED';
}

export interface DetailReleaseCondition {
  id: string;
  title: string;
  status: 'Met' | 'Pending' | 'Disputed';
  icon: 'check' | 'x' | 'pending';
}

export interface DetailDisputeInfo {
  status: string;
  filedBy: string;
  filedOn: string;
  arbitrator: string;
  evidence: string;
}

export interface DetailTransactionHistoryItem {
  id: string;
  event: string;
  timestamp: string;
} 