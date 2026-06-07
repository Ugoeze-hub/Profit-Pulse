import React from 'react';

const StatsCard = ({ label, value, change, changeType, icon }) => {
  const isPositive = changeType === 'positive';

  return (
    <div className="card p-5 card-hover">
      <div className="flex justify-between items-start mb-3">
        <span className="text-2xl leading-none" aria-hidden="true">
          {icon}
        </span>
        <span
          className={`text-xs font-medium px-2 py-1 rounded-full border ${
            isPositive
              ? 'bg-green-50 text-green-700 border-green-100'
              : 'bg-red-50 text-red-700 border-red-100'
          }`}
        >
          {change}
        </span>
      </div>
      <p className="text-2xl font-bold text-gray-900 mb-1">{value}</p>
      <p className="text-sm text-gray-600">{label}</p>
    </div>
  );
};

export default StatsCard;