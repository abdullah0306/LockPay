import { ViewEvidenceDetailsProps } from '@/types/view-evidence-page';

export const ViewEvidenceDetails = ({ evidence }: ViewEvidenceDetailsProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Evidence Details</h2>
      
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-gray-600 font-medium">Evidence Type:</span>
          <span className="text-gray-900 font-semibold">{evidence.type}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-gray-600 font-medium">Uploaded By:</span>
          <span className="text-gray-900 font-semibold">{evidence.uploadedBy}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-gray-600 font-medium">Upload Date:</span>
          <span className="text-gray-900 font-semibold">{evidence.uploadDate}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-gray-600 font-medium">Description:</span>
          <span className="text-gray-900 font-semibold">{evidence.description}</span>
        </div>
      </div>
    </div>
  );
}; 