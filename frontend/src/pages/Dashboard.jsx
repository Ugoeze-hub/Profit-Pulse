import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiCalendar, FiTrendingUp, FiTrendingDown, FiHeart } from 'react-icons/fi';
import DashboardLayout from '../components/DashboardLayout';
import StatsCard from '../components/StatsCard';
import TransactionCard from '../components/TransactionCard';
import PulseCard from '../components/PulseCard';
import QuickActions from '../components/QuickActions';

const Dashboard = () => {
  const navigate = useNavigate();
  const [transactions] = useState([
    { id: 1, type: 'revenue', description: 'Indomie Noodles Sales', amount: 24500, date: 'Today • 2:30 PM', category: 'Sales' },
    { id: 2, type: 'expense', description: 'Transport - Okada to market', amount: 1800, date: 'Today • 11:00 AM', category: 'Transport' },
    { id: 3, type: 'expense', description: 'Rice Bags - Inventory', amount: 40000, date: 'Yesterday', category: 'Stock' },
    { id: 4, type: 'revenue', description: 'Pure Water Sales', amount: 8900, date: 'Yesterday', category: 'Sales' },
    { id: 5, type: 'expense', description: 'Staff Salary - Assistant', amount: 5000, date: 'Yesterday', category: 'Staff' },
  ]);

  const stats = [
    { label: 'Revenue', value: '₦124,500', change: '+12%', changeType: 'positive', icon: <FiTrendingUp size={20} /> },
    { label: 'Expenses', value: '₦58,200', change: '+8%', changeType: 'negative', icon: <FiTrendingDown size={20} /> },
    { label: 'Profit', value: '₦66,300', change: '+15%', changeType: 'positive', icon: <FiHeart size={20} /> },
    { label: 'Health', value: 'Strong', change: 'Stable', changeType: 'positive', icon: <FiHeart size={20} /> },
  ];

  return (
    <DashboardLayout title="Dashboard">
      <div className="space-y-6">
        <section className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-3xl font-semibold text-slate-900">Welcome back, Mama Chioma</h2>
              <p className="mt-2 text-slate-600">Your daily business pulse is ready. Start with the summary, then take action.</p>
            </div>
            <button className="inline-flex items-center gap-2 rounded-2xl bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-200 transition-all">
              <FiCalendar size={18} /> This week
            </button>
          </div>
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.65fr_0.95fr]">
          <div className="space-y-6">
            <PulseCard />

            <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between gap-3 mb-5">
                <div>
                  <h3 className="text-xl font-semibold text-slate-900">Recent activity</h3>
                  <p className="text-sm text-slate-500">Quick look at the latest transactions.</p>
                </div>
              </div>
              <div className="divide-y divide-slate-200">
                {transactions.map((tx) => (
                  <TransactionCard key={tx.id} transaction={tx} />
                ))}
              </div>
                <button
                  onClick={() => navigate('/transactions')}
                  className="mt-5 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-all"
                >
                  View full transaction history
              </button>
            </div>
          </div>

          <aside className="space-y-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-1">
              {stats.map((stat, idx) => (
                <StatsCard key={idx} {...stat} />
              ))}
            </div>
            <QuickActions />
          </aside>
        </section>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
