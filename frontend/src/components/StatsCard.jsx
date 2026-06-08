import React from 'react';
import { FiTrendingUp, FiTrendingDown } from 'react-icons/fi';

const StatsCard = ({ label, value, change, changeType, icon }) => {
  const isPositive = changeType === 'positive';
  const numericChange = parseFloat(change) || 0;
  
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start justify-between mb-3">
        <div className="w-11 h-11 bg-green-50 rounded-xl flex items-center justify-center text-2xl">
          {icon}
        </div>
        <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
          isPositive ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
        }`}>
          {isPositive ? <FiTrendingUp size={12} /> : <FiTrendingDown size={12} />}
          <span>{change}</span>
        </div>
      </div>
      <div>
        <p className="text-2xl font-bold text-gray-900 mb-1">{value}</p>
        <p className="text-sm text-gray-600 font-medium">{label}</p>
      </div>
    </div>
  );
};

export default StatsCard;