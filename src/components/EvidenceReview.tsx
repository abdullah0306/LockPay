"use client";

interface Evidence {
  type: 'buyer' | 'seller';
  title: string;
  submittedOn: string;
}

interface EvidenceReviewProps {
  evidence: Evidence[];
}

export const EvidenceReview = ({ evidence }: EvidenceReviewProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
      <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4 sm:mb-6">Evidence Review</h2>
      
      <div className="space-y-3 sm:space-y-4">
        {evidence.map((item) => (
          <div key={item.type} className="bg-gray-50 p-3 sm:p-4 rounded-lg">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-0">
              <div className="flex-1">
                <h3 className="font-medium text-gray-900 text-sm sm:text-base">{item.title}</h3>
                <p className="text-xs sm:text-sm text-gray-600">Submitted on {item.submittedOn}</p>
              </div>
              <button className="text-blue-600 hover:text-blue-800 font-medium text-sm sm:text-base self-start sm:self-auto">
                View Files
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}; 