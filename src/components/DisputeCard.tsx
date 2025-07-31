"use client";

import { DashboardDispute } from '@/types/dashboard';
import { useRouter } from 'next/navigation';

interface DisputeCardProps {
  dispute: DashboardDispute;
}

const priorityColors = {
  'High Priority': 'bg-pink-100 text-pink-800',
  'Medium Priority': 'bg-yellow-100 text-yellow-800',
  'Low Priority': 'bg-blue-100 text-blue-800',
};

const statusIcons = {
  'Under Review': 'yellow',
  'Awaiting Response': 'red',
  'Evidence Submitted': 'blue',
};

const getStatusIcon = (status: string) => {
  const color = statusIcons[status as keyof typeof statusIcons] || 'gray';
  return (
    <div className={`w-3 h-3 rounded-full bg-${color}-500`}></div>
  );
};

export const DisputeCard = ({ dispute }: DisputeCardProps) => {
  const router = useRouter();
  const priorityClass = priorityColors[dispute.priority];

  const handleViewDetails = () => {
    router.push(`/disputes/${dispute.id}`);
  };

  const handleTakeAction = () => {
    router.push(`/disputes/${dispute.id}`);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 border border-gray-200">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-2">
          <span className="text-lg font-semibold text-gray-900">#{dispute.id}</span>
          {getStatusIcon(dispute.status)}
        </div>
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${priorityClass}`}>
          {dispute.priority}
        </span>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex justify-between items-center">
          <span className="text-gray-500 text-sm font-medium">Status:</span>
          <span className="text-gray-900 text-sm font-semibold">{dispute.status}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-gray-500 text-sm font-medium">Amount:</span>
          <span className="font-bold text-blue-600 text-sm">{dispute.amount.value} {dispute.amount.currency}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-gray-500 text-sm font-medium">Decision Expected:</span>
          <span className="text-gray-900 text-sm font-semibold">{dispute.decisionExpected}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-gray-500 text-sm font-medium">Buyer:</span>
          <span className="text-gray-900 text-sm font-semibold">{dispute.buyer}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-gray-500 text-sm font-medium">Seller:</span>
          <span className="text-gray-900 text-sm font-semibold">{dispute.seller}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-gray-500 text-sm font-medium">Last Action:</span>
          <span className="text-gray-900 text-sm font-semibold">
            {dispute.lastAction.type} by {dispute.lastAction.by} 👤
          </span>
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={handleViewDetails}
          className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
        >
          View Details
        </button>
        <button
          onClick={handleTakeAction}
          className="flex-1 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
        >
          Take Action
        </button>
      </div>
    </div>
  );
}; 