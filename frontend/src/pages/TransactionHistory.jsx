import React, { useState } from 'react';
import { FiSearch, FiFilter, FiChevronDown } from 'react-icons/fi';
import DashboardLayout from '../components/DashboardLayout';
import TransactionCard from '../components/TransactionCard';

const TransactionHistory = () => {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  const transactions = [
    { id: 1, type: 'revenue', description: 'Indomie Noodles Sales', amount: 24500, date: 'Today • 2:30 PM', category: 'Sales' },
    { id: 2, type: 'expense', description: 'Transport - Okada to market', amount: 1800, date: 'Today • 11:00 AM', category: 'Transport' },
    { id: 3, type: 'expense', description: 'Rice Bags - Inventory', amount: 40000, date: 'Yesterday', category: 'Stock' },
    { id: 4, type: 'revenue', description: 'Pure Water Sales', amount: 8900, date: 'Yesterday', category: 'Sales' },
    { id: 5, type: 'expense', description: 'Staff Salary - Assistant', amount: 5000, date: 'Yesterday', category: 'Staff' },
    { id: 6, type: 'revenue', description: 'Soft Drinks Sales', amount: 13400, date: '2 days ago', category: 'Sales' },
  ];

  const filteredTransactions = transactions.filter((tx) => {
    if (filter === 'income' && tx.type !== 'revenue') return false;
    if (filter === 'expenses' && tx.type !== 'expense') return false;
    return search === '' || tx.description.toLowerCase().includes(search.toLowerCase()) || tx.category.toLowerCase().includes(search.toLowerCase());
  });

  const income = filteredTransactions.filter((tx) => tx.type === 'revenue');
  const expenses = filteredTransactions.filter((tx) => tx.type === 'expense');

  return (
    <DashboardLayout title="Transaction History">
      <div className="space-y-6">
        <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary-600">Financial feed</p>
              <h2 className="mt-2 text-3xl font-semibold text-slate-900">Your transactions at a glance</h2>
              <p className="mt-3 max-w-2xl text-slate-600">Search, filter, and scan your business cash flow with easy category tags.</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="relative">
                <FiSearch className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  type="search"
                  placeholder="Search transactions"
                  className="input pl-12"
                />
              </div>
              <button className="flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-1 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-all">
                <FiFilter /> {filter === 'all' ? 'All' : filter === 'income' ? 'Income' : 'Expenses'}
                <FiChevronDown />
              </button>
            </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between gap-3 mb-5">
              <div>
                <p className="text-sm font-semibold text-slate-500 uppercase tracking-[0.24em]">Income</p>
                <p className="mt-2 text-2xl font-semibold text-slate-900">₦46,800</p>
              </div>
              <span className="inline-flex items-center rounded-full bg-[#d1fae5] px-3 py-2 text-sm font-semibold text-primary">+ 4 items</span>
            </div>
            <div className="space-y-3">
              {income.length ? income.map((tx) => <TransactionCard key={tx.id} transaction={tx} />) : <p className="text-sm text-slate-500">No income transactions found.</p>}
            </div>
          </div>

          <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between gap-3 mb-5">
              <div>
                <p className="text-sm font-semibold text-slate-500 uppercase tracking-[0.24em]">Expenses</p>
                <p className="mt-2 text-2xl font-semibold text-slate-900">₦46,600</p>
              </div>
              <span className="inline-flex items-center rounded-full bg-[#ffedd5] px-3 py-2 text-sm font-semibold text-warning">- 4 items</span>
            </div>
            <div className="space-y-3">
              {expenses.length ? expenses.map((tx) => <TransactionCard key={tx.id} transaction={tx} />) : <p className="text-sm text-slate-500">No expense transactions found.</p>}
            </div>
          </div>
        </section>

        <div className="rounded-[28px] border border-slate-200 bg-primary-soft p-6 shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-primary-700">Live filter tips</p>
              <p className="mt-2 text-slate-600">Try typing “transport” or “salary” to narrow down your feed instantly.</p>
            </div>
            <div className="inline-flex items-center gap-2 rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-slate-700">Category badges help you sort faster</div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default TransactionHistory;
