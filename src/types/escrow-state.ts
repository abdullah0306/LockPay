export interface EscrowTransaction {
  id: string;
  status: 'DISPUTED' | 'ACTIVE' | 'COMPLETED' | 'REFUNDED';
  amount: {
    value: number;
    currency: string;
  };
  buyer: {
    name: string;
    address: string;
  };
  seller: {
    name: string;
    address: string;
  };
  asset: string;
  disputeInfo?: {
    filedBy: 'buyer' | 'seller';
    message: string;
  };
}

export interface EscrowStatusIndicator {
  id: string;
  title: string;
  status: 'completed' | 'pending' | 'disputed';
  icon: 'check' | 'pending' | 'x';
}

export interface EscrowReleaseCondition {
  id: string;
  title: string;
  status: 'met' | 'pending' | 'disputed';
  action?: string;
  icon: 'check' | 'pending' | 'x';
}

export interface DisputeManagement {
  status: string;
  filedBy: string;
  filedOn: string;
  arbitrator: string;
  evidence: string;
}

export interface EscrowFundsHistory {
  id: string;
  event: string;
  timestamp: string;
} 