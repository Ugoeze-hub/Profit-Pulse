import React from 'react';

const TransactionCard = ({ transaction }) => {
  const isRevenue = transaction.type === 'revenue';

  return (
    <div className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
      <div className="flex items-center gap-3 min-w-0">
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
            isRevenue ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
          }`}
          aria-hidden="true"
        >
          <span className="text-lg">{isRevenue ? '💰' : '💸'}</span>
        </div>
        <div className="min-w-0">
          <p className="font-medium text-gray-900 truncate">{transaction.description}</p>
          <p className="text-xs text-gray-500 truncate">
            {transaction.date} • {transaction.category}
          </p>
        </div>
      </div>
      <span
        className={`font-semibold tabular-nums ${
          isRevenue ? 'text-green-700' : 'text-red-700'
        }`}
      >
        {isRevenue ? '+' : '-'}{transaction.amount.toLocaleString()}
      </span>
    </div>
  );
};

export default TransactionCard;