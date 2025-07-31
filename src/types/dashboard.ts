export interface DashboardDispute {
  id: string;
  priority: 'High Priority' | 'Medium Priority' | 'Low Priority';
  status: 'Under Review' | 'Awaiting Response' | 'Evidence Submitted';
  amount: {
    value: number;
    currency: string;
  };
  decisionExpected: string;
  buyer: string;
  seller: string;
  lastAction: {
    type: 'Evidence submitted' | 'Dispute filed' | 'Response submitted';
    by: 'buyer' | 'seller';
  };
}

export interface DashboardTransaction {
  id: string;
  amount: {
    value: number;
    currency: string;
  };
  status: 'Funds Locked' | 'Pending Review' | 'Fulfilled' | 'Disputed' | 'Refunded';
  buyer: string;
  seller: string;
}

export type PriorityColor = 'bg-pink-100 text-pink-800' | 'bg-yellow-100 text-yellow-800' | 'bg-blue-100 text-blue-800';
export type StatusIcon = 'yellow' | 'red' | 'blue' | 'green' | 'gray'; 