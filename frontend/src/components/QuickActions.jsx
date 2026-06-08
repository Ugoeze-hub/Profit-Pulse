import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiCamera, FiPlus, FiTrendingUp, FiFileText, FiArrowRight } from 'react-icons/fi';

const QuickActions = () => {
  const navigate = useNavigate();
  
  const actions = [
    { 
      icon: FiPlus, 
      label: 'Add Transaction', 
      color: 'green', 
      description: 'Record a new sale or expense',
      onClick: () => {},
      badge: null
    },
    { 
      icon: FiCamera, 
      label: 'Scan Receipt', 
      color: 'blue', 
      description: 'Auto-fill from receipt',
      onClick: () => navigate('/receipt-scanner'),
      badge: 'AI'
    },
    { 
      icon: FiTrendingUp, 
      label: 'AI Insights', 
      color: 'purple', 
      description: 'Get business recommendations',
      onClick: () => navigate('/insights'),
      badge: 'New'
    },
    { 
      icon: FiFileText, 
      label: 'New Invoice', 
      color: 'orange', 
      description: 'Create and send invoice',
      onClick: () => navigate('/invoices'),
      badge: null
    },
  ];

  const colorStyles = {
    green: {
      bg: 'bg-green-50',
      bgHover: 'hover:bg-green-100',
      text: 'text-green-700',
      iconBg: 'bg-green-100',
    },
    blue: {
      bg: 'bg-blue-50',
      bgHover: 'hover:bg-blue-100',
      text: 'text-blue-700',
      iconBg: 'bg-blue-100',
    },
    purple: {
      bg: 'bg-purple-50',
      bgHover: 'hover:bg-purple-100',
      text: 'text-purple-700',
      iconBg: 'bg-purple-100',
    },
    orange: {
      bg: 'bg-orange-50',
      bgHover: 'hover:bg-orange-100',
      text: 'text-orange-700',
      iconBg: 'bg-orange-100',
    },
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="px-5 py-4 border-b border-gray-200 bg-gray-50">
        <h3 className="font-semibold text-gray-900">Quick Actions</h3>
        <p className="text-xs text-gray-500 mt-0.5">Common tasks to manage your business</p>
      </div>
      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
        {actions.map((action, idx) => {
          const Icon = action.icon;
          const styles = colorStyles[action.color];
          return (
            <button
              key={idx}
              onClick={action.onClick}
              className={`flex items-start gap-3 p-3 rounded-xl transition-all duration-200 text-left ${styles.bg} ${styles.bgHover} group`}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${styles.iconBg}`}>
                <Icon className={styles.text} size={18} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className={`font-semibold text-sm ${styles.text}`}>{action.label}</span>
                  {action.badge && (
                    <span className="text-[10px] font-medium px-1.5 py-0.5 bg-white/60 rounded-full">
                      {action.badge}
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-600 mt-0.5">{action.description}</p>
              </div>
              <FiArrowRight className={`text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 mt-2`} size={14} />
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default QuickActions;