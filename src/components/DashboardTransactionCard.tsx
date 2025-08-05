"use client";

import { DashboardTransaction } from '@/types/dashboard';
import { useRouter } from 'next/navigation';

interface DashboardTransactionCardProps {
  title: string;
  transactions: DashboardTransaction[];
}

const statusConfig = {
  'Funds Locked': {
    color: 'bg-blue-100 text-blue-800',
    icon: '🔄',
    isActive: true,
    tooltip: 'Transaction is active and funds are securely locked in escrow'
  },
  'Pending Review': {
    color: 'bg-yellow-100 text-yellow-800',
    icon: '⏳',
    isActive: true,
    tooltip: 'Transaction is being reviewed for completion or dispute resolution'
  },
  'Fulfilled': {
    color: 'bg-green-100 text-green-800',
    icon: '✅',
    isActive: false,
    tooltip: 'Transaction completed successfully and funds have been released'
  },
  'Disputed': {
    color: 'bg-red-100 text-red-800',
    icon: '⚠️',
    isActive: false,
    tooltip: 'Transaction is under review due to a dispute between parties'
  },
  'Refunded': {
    color: 'bg-gray-100 text-gray-800',
    icon: '💰',
    isActive: false,
    tooltip: 'Transaction was cancelled and funds have been returned'
  },
};

// Enhanced status details for disputed and refunded transactions
const getStatusDetails = (transaction: DashboardTransaction) => {
  if (transaction.status === 'Disputed') {
    return {
      alert: ' Under Investigation',
      description: 'This transaction is currently being reviewed by our arbitration team.',
      progress: {
        current: 2,
        total: 4,
        steps: ['Dispute Filed', 'Evidence Review', 'Arbitration Decision', 'Resolution']
      },
      alertStyle: 'bg-red-50 border-red-200 text-red-800',
      progressStyle: 'bg-red-200 text-red-600',
      barStyle: 'bg-red-600'
    };
  }
  
  if (transaction.status === 'Refunded') {
    return {
      alert: '✅ Refund Processed',
      description: 'Funds have been successfully returned to the buyer.',
      progress: {
        current: 4,
        total: 4,
        steps: ['Refund Requested', 'Processing', 'Approved', 'Completed']
      },
      alertStyle: 'bg-green-50 border-green-200 text-green-800',
      progressStyle: 'bg-green-200 text-green-600',
      barStyle: 'bg-green-600'
    };
  }
  
  return null;
};

export const DashboardTransactionCard = ({ title, transactions }: DashboardTransactionCardProps) => {
  const router = useRouter();

  const handleTransactionClick = (transactionId: string) => {
    router.push(`/transactions/${transactionId}`);
  };

  // Sort transactions: active ones first, then by status
  const sortedTransactions = [...transactions].sort((a, b) => {
    const aConfig = statusConfig[a.status] || statusConfig['Refunded'];
    const bConfig = statusConfig[b.status] || statusConfig['Refunded'];
    
    // Active transactions first
    if (aConfig.isActive && !bConfig.isActive) return -1;
    if (!aConfig.isActive && bConfig.isActive) return 1;
    
    // Then sort by status priority
    const statusPriority = ['Funds Locked', 'Pending Review', 'Fulfilled', 'Disputed', 'Refunded'];
    return statusPriority.indexOf(a.status) - statusPriority.indexOf(b.status);
  });

  return (
    <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">{title}</h2>
      <div className="space-y-4">
        {sortedTransactions.map((transaction) => {
          const config = statusConfig[transaction.status] || statusConfig['Refunded'];
          const isActive = config.isActive;
          const isDisputed = transaction.status === 'Disputed';
          const statusDetails = getStatusDetails(transaction);
          
          return (
            <div
              key={transaction.id}
              className={`border-b border-gray-100 py-4 px-4 last:border-b-0 cursor-pointer hover:bg-gray-50 transition-colors ${
                isActive ? 'bg-blue-50 border-l-4 border-l-blue-400' : ''
              }`}
              onClick={() => handleTransactionClick(transaction.id)}
            >
              <div className="flex justify-between items-center mb-2">
                <span className={`font-medium ${isActive ? 'text-blue-900 text-lg' : 'text-gray-700'}`}>
                  #{transaction.id}
                </span>
                <div className="flex items-center gap-2">
                  {/* Real-time update indicator for active transactions */}
                  {isActive && (
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-xs text-green-600 font-medium">Live</span>
                    </div>
                  )}
                  <span 
                    className={`px-3 py-1 text-xs font-medium rounded-full flex items-center gap-1 ${config.color}`}
                    title={config.tooltip}
                  >
                    <span className="text-sm">{config.icon}</span>
                    {transaction.status}
                  </span>
                </div>
              </div>
              
                              {/* Status Alert for Disputed/Refunded Transactions */}
                {statusDetails && (
                  <div className={`mb-3 p-3 border rounded-lg ${statusDetails.alertStyle}`}>
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`text-sm font-semibold ${statusDetails.alertStyle.includes('text-red') ? 'text-red-800' : 'text-green-800'}`}>
                        {statusDetails.alert}
                      </span>
                    </div>
                    <p className={`text-sm mb-3 ${statusDetails.alertStyle.includes('text-red') ? 'text-red-700' : 'text-green-700'}`}>
                      {statusDetails.description}
                    </p>
                    
                    {/* Progress Tracking */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className={`text-xs font-medium ${statusDetails.progressStyle}`}>Progress</span>
                        <span className={`text-xs ${statusDetails.progressStyle}`}>
                          Step {statusDetails.progress.current} of {statusDetails.progress.total}
                        </span>
                      </div>
                      <div className={`w-full rounded-full h-2 ${statusDetails.progressStyle.replace('text-', 'bg-').replace('-600', '-200')}`}>
                        <div 
                          className={`h-2 rounded-full transition-all duration-300 ${statusDetails.barStyle}`}
                          style={{ width: `${(statusDetails.progress.current / statusDetails.progress.total) * 100}%` }}
                        ></div>
                      </div>
                      <div className={`flex justify-between text-xs ${statusDetails.progressStyle}`}>
                        {statusDetails.progress.steps.map((step, index) => (
                          <span 
                            key={step}
                            className={`${index < statusDetails.progress.current ? 'font-semibold' : 'opacity-50'}`}
                          >
                            {step}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 text-sm font-medium">Amount:</span>
                  <span className={`font-bold text-sm ${isActive ? 'text-blue-600 text-base' : 'text-blue-600'}`}>
                    {transaction.amount.value} {transaction.amount.currency}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 text-sm font-medium">Buyer:</span>
                  <span className={`text-sm font-semibold ${isActive ? 'text-gray-900 text-base' : 'text-gray-900'}`}>
                    {transaction.buyer}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 text-sm font-medium">Seller:</span>
                  <span className={`text-sm font-semibold ${isActive ? 'text-gray-900 text-base' : 'text-gray-900'}`}>
                    {transaction.seller}
                  </span>
                </div>
              </div>
              
              {/* Enhanced Click indicator for all transactions */}
              <div className="mt-3 p-2 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex items-center gap-2 text-gray-700 hover:text-gray-900">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                  <span className="text-sm font-semibold">Click to view details</span>
                </div>
              </div>
              
              {/* Special indicator for disputed transactions */}
              {isDisputed && (
                <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 transition-colors">
                  <div className="flex items-center gap-2 text-red-700 hover:text-red-900">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                    <span className="text-sm font-semibold"> Dispute in progress</span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}; 