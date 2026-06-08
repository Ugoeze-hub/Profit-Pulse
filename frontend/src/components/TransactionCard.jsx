import React from 'react';
import { FiTrendingUp, FiTrendingDown } from 'react-icons/fi';

const TransactionCard = ({ transaction }) => {
  const isRevenue = transaction.type === 'revenue';
  
  const formatAmount = (amount) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };
  
  return (
    <div className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors cursor-pointer group">
      <div className="flex items-center gap-3 min-w-0 flex-1">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
          isRevenue ? 'bg-green-100' : 'bg-red-100'
        }`}>
          {isRevenue ? (
            <FiTrendingUp className={`${isRevenue ? 'text-green-600' : 'text-red-600'}`} size={18} />
          ) : (
            <FiTrendingDown className="text-red-600" size={18} />
          )}
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-medium text-gray-900 truncate">{transaction.description}</p>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="text-xs text-gray-500">{transaction.date}</span>
            <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
            <span className="text-xs text-gray-500">{transaction.category}</span>
          </div>
        </div>
      </div>
      <div className="flex-shrink-0">
        <span className={`font-semibold ${isRevenue ? 'text-green-600' : 'text-red-600'}`}>
          {isRevenue ? '+' : '-'}{formatAmount(transaction.amount)}
        </span>
      </div>
    </div>
  );
};

export default TransactionCard;