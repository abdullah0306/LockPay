import { ReleaseCondition } from '@/types/transaction-details';

interface ReleaseConditionsProps {
  conditions: ReleaseCondition[];
}

const statusConfig = {
  'Completed': {
    color: 'bg-green-100 text-green-800',
    icon: '✅'
  },
  'Disputed': {
    color: 'bg-red-100 text-red-800',
    icon: '⚠️'
  },
  'Pending': {
    color: 'bg-gray-100 text-gray-800',
    icon: '⏳'
  },
};

export const ReleaseConditions = ({ conditions }: ReleaseConditionsProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
      <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4 sm:mb-6">Conditions for Release</h2>
      
      <div className="space-y-3 sm:space-y-4">
        {conditions.map((condition) => {
          const config = statusConfig[condition.status] || statusConfig['Pending'];
          
          return (
            <div key={condition.id} className="flex items-center justify-between p-3 sm:p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3 sm:gap-4">
                <span className="text-lg">{config.icon}</span>
                <span className="text-sm sm:text-base text-gray-900">{condition.description}</span>
              </div>
              <span className={`px-3 py-1 text-xs font-medium rounded-full flex items-center gap-1 ${config.color}`}>
                <span className="text-sm">{config.icon}</span>
                {condition.status}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}; 