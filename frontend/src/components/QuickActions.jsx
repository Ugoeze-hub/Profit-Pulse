import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiCamera, FiPlus, FiTrendingUp, FiFileText } from 'react-icons/fi';

const QuickActions = () => {
  const navigate = useNavigate();
  
  const actions = [
    { icon: FiPlus, label: 'Add Transaction', color: 'green', onClick: () => {} },
    { icon: FiCamera, label: 'Scan Receipt', color: 'blue', onClick: () => navigate('/receipt-scanner') },
    { icon: FiTrendingUp, label: 'AI Insights', color: 'purple', onClick: () => navigate('/insights') },
    { icon: FiFileText, label: 'New Invoice', color: 'orange', onClick: () => {} },
  ];

  return (
    <div className="card p-5">
      <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
      <div className="grid grid-cols-2 gap-3">
        {actions.map((action, idx) => {
          const Icon = action.icon;
          const colorClasses = {
            green: 'bg-green-50 text-green-700 border-green-100 hover:bg-green-100',
            blue: 'bg-blue-50 text-blue-700 border-blue-100 hover:bg-blue-100',
            purple: 'bg-purple-50 text-purple-700 border-purple-100 hover:bg-purple-100',
            orange: 'bg-orange-50 text-orange-700 border-orange-100 hover:bg-orange-100',
          };

          return (
            <button
              key={idx}
              onClick={action.onClick}
              className={`btn justify-start w-full px-4 py-3 rounded-lg border ${colorClasses[action.color]}`}
            >
              <Icon size={18} />
              <span className="text-sm font-medium">{action.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default QuickActions;