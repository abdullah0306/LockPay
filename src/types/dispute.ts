export interface DisputeData {
  id: string;
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
  status: string;
  filedBy: string;
  filedOn: string;
  arbitrator: string;
  reason: string;
}

export interface Evidence {
  type: 'buyer' | 'seller';
  title: string;
  submittedOn: string;
}

export type ArbitrationDecision = 'seller' | 'buyer' | 'split'; 