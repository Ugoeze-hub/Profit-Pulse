import React from 'react';
import { FiTrendingUp, FiAlertCircle, FiBarChart2, FiZap, FiDollarSign, FiTruck } from 'react-icons/fi';
import DashboardLayout from '../components/DashboardLayout';

const AIInsights = () => {
  const insights = [
    {
      type: 'warning',
      icon: FiAlertCircle,
      title: 'Expense Anomaly Detected',
      description: 'Your transportation costs increased by 115% this week compared to last week.',
      action: 'Review transport expenses',
      color: 'orange'
    },
    {
      type: 'insight',
      icon: FiTrendingUp,
      title: 'Profit Prediction',
      description: 'Based on current trends, you\'re on track to make ₦85,000 profit this week.',
      action: 'View forecast',
      color: 'green'
    },
    {
      type: 'recommendation',
      icon: FiZap,
      title: 'Smart Recommendation',
      description: 'Your soft drinks inventory is moving 40% faster than usual. Consider restocking before Thursday.',
      action: 'Add to stock list',
      color: 'blue'
    },
    {
      type: 'trend',
      icon: FiBarChart2,
      title: 'Spending Trend',
      description: 'Inventory spending increased but revenue stayed flat. Check your pricing strategy.',
      action: 'Analyze margins',
      color: 'purple'
    },
  ];

  const getColorStyles = (color) => {
    const styles = {
      orange: 'bg-orange-50 border-orange-100 text-orange-700',
      green: 'bg-green-50 border-green-100 text-green-700',
      blue: 'bg-blue-50 border-blue-100 text-blue-700',
      purple: 'bg-purple-50 border-purple-100 text-purple-700',
    };
    return styles[color] || styles.blue;
  };

  return (
    <DashboardLayout title="AI Insights">
      <div className="space-y-6">
        {/* Header with Gemini Badge */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">✨ AI-Powered Intelligence</h2>
            <p className="text-gray-600 mt-1">Real-time insights powered by Google Gemini</p>
          </div>
          <div className="px-3 py-1 bg-gradient-to-r from-purple-50 to-pink-50 rounded-full border border-purple-200">
            <span className="text-sm font-medium text-purple-700">Gemini AI • Live</span>
          </div>
        </div>

        {/* Cash Flow Forecast Card */}
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-xl p-6 text-white">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-gray-400 text-sm mb-2">Cash Flow Forecast</p>
              <p className="text-3xl font-bold mb-2">₦127,500</p>
              <p className="text-gray-300 text-sm">Expected by end of week • +23% vs last week</p>
            </div>
            <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center">
              <FiDollarSign className="text-2xl" />
            </div>
          </div>
          <div className="mt-4 h-2 bg-white/10 rounded-full overflow-hidden">
            <div className="w-3/4 h-full bg-green-500 rounded-full"></div>
          </div>
        </div>

        {/* Insights Grid */}
        <div className="grid md:grid-cols-2 gap-4">
          {insights.map((insight, idx) => {
            const Icon = insight.icon;
            const colorClass = getColorStyles(insight.color);
            return (
              <div key={idx} className={`p-5 rounded-xl border ${colorClass}`}>
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0">
                    <Icon className="text-xl" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1">{insight.title}</h3>
                    <p className="text-sm opacity-90 mb-3">{insight.description}</p>
                    <button className="text-sm font-medium underline underline-offset-2 hover:opacity-80 transition-opacity">
                      {insight.action} →
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Expense Anomaly Detail */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <FiTruck className="text-red-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Transport Cost Analysis</h3>
              <p className="text-sm text-gray-500">Week over week comparison</p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">This week</span>
              <span className="font-semibold text-gray-900">₦12,400</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Last week</span>
              <span className="font-semibold text-gray-900">₦5,800</span>
            </div>
            <div className="pt-3 border-t border-gray-100">
              <div className="flex justify-between text-sm">
                <span className="text-red-600">Increase</span>
                <span className="font-semibold text-red-600">+113%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AIInsights;