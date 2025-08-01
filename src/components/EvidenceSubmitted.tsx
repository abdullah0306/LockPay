import { EvidenceSubmittedProps } from '@/types/arbitrate-dispute';

export const EvidenceSubmitted = ({ evidence, onViewEvidence }: EvidenceSubmittedProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Evidence Submitted</h2>
      
      <div className="space-y-4">
        {evidence.map((item) => (
          <div key={item.id} className="flex justify-between items-center py-3 border-b border-gray-100 last:border-b-0">
            <span className="text-gray-900 font-medium">{item.fullName}</span>
            <button
              onClick={() => onViewEvidence(item.id)}
              className="px-4 py-2 bg-blue-100 text-blue-700 font-medium rounded-md hover:bg-blue-200 transition-colors"
            >
              View
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}; 