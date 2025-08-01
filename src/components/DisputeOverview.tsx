import { DisputeOverviewProps } from '@/types/arbitrate-dispute';

export const DisputeOverview = ({ dispute }: DisputeOverviewProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Dispute Overview</h2>
      
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-gray-600 font-medium">Dispute Status:</span>
          <span className="text-red-600 font-semibold">{dispute.status}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-gray-600 font-medium">Filed By:</span>
          <span className="text-gray-900 font-semibold">{dispute.filedBy}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-gray-600 font-medium">Filed On:</span>
          <span className="text-gray-900 font-semibold">{dispute.filedOn}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-gray-600 font-medium">Arbitrator:</span>
          <span className="text-gray-900 font-semibold">{dispute.arbitrator}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-gray-600 font-medium">Asset/Service:</span>
          <span className="text-gray-900 font-semibold">{dispute.asset}</span>
        </div>
      </div>
    </div>
  );
}; 