import React, { useState } from 'react';
import { FiPlus, FiSearch, FiFilter, FiDownload, FiCalendar } from 'react-icons/fi';
import DashboardLayout from '../components/DashboardLayout';
import StatsCard from '../components/StatsCard';
import TransactionCard from '../components/TransactionCard';
import PulseCard from '../components/PulseCard';
import QuickActions from '../components/QuickActions';

const Dashboard = () => {
  const [transactions] = useState([
    { id: 1, type: 'revenue', description: 'Indomie Noodles Sales', amount: 24500, date: 'Today, 2:30 PM', category: 'Sales' },
    { id: 2, type: 'expense', description: 'Transport - Okada to market', amount: 1800, date: 'Today, 11:00 AM', category: 'Transport' },
    { id: 3, type: 'expense', description: 'Rice Bags - Inventory', amount: 40000, date: 'Yesterday', category: 'Stock' },
    { id: 4, type: 'revenue', description: 'Pure Water Sales', amount: 8900, date: 'Yesterday', category: 'Sales' },
    { id: 5, type: 'expense', description: 'Staff Salary - Assistant', amount: 5000, date: 'Yesterday', category: 'Staff' },
  ]);

  const stats = [
    { label: 'Total Revenue', value: '₦124,500', change: '+12%', changeType: 'positive', icon: '📈' },
    { label: 'Total Expenses', value: '₦58,200', change: '+8%', changeType: 'negative', icon: '📉' },
    { label: 'Net Profit', value: '₦66,300', change: '+15%', changeType: 'positive', icon: '💰' },
    { label: 'Outstanding', value: '₦23,500', change: '-5%', changeType: 'positive', icon: '📄' },
  ];

  return (
    <DashboardLayout title="Dashboard">
      <div className="space-y-6">
        {/* Date Range Selector */}
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Welcome back, Mama Chioma</h2>
            <p className="text-sm text-gray-500">Here's what's happening with your business today</p>
          </div>
          <button className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <FiCalendar size={16} />
            <span>This Week</span>
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, idx) => (
            <StatsCard key={idx} {...stat} />
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Transactions */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="px-5 py-4 border-b border-gray-200 flex justify-between items-center">
                <div>
                  <h3 className="font-semibold text-gray-900">Recent Transactions</h3>
                  <p className="text-xs text-gray-500 mt-0.5">Your latest 5 transactions</p>
                </div>
                <div className="flex gap-1">
                  <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors">
                    <FiSearch size={18} />
                  </button>
                  <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors">
                    <FiFilter size={18} />
                  </button>
                  <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors">
                    <FiDownload size={18} />
                  </button>
                </div>
              </div>
              <div className="divide-y divide-gray-100">
                {transactions.map((tx) => (
                  <TransactionCard key={tx.id} transaction={tx} />
                ))}
              </div>
              <button className="w-full p-3.5 text-center text-green-600 hover:bg-green-50 transition-colors text-sm font-medium border-t border-gray-100">
                View all transactions →
              </button>
            </div>

            <QuickActions />
          </div>

          {/* Right Column - Pulse Card */}
          <div className="space-y-6">
            <PulseCard />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;