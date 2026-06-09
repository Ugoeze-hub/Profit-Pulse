import React from 'react';
import { FiTrendingUp, FiChevronRight, FiPieChart, FiTrendingDown } from 'react-icons/fi';
import DashboardLayout from '../components/DashboardLayout';

const BusinessDashboard = () => {
  const trendData = [
    { label: 'Mon', value: 40 },
    { label: 'Tue', value: 55 },
    { label: 'Wed', value: 70 },
    { label: 'Thu', value: 62 },
    { label: 'Fri', value: 84 },
    { label: 'Sat', value: 90 },
    { label: 'Sun', value: 76 },
  ];

  const breakdown = [
    { name: 'Stock', value: 38, color: 'bg-[#f97316]' },
    { name: 'Transport', value: 18, color: 'bg-[#fcd34d]' },
    { name: 'Staff', value: 14, color: 'bg-[#22c55e]' },
    { name: 'Other', value: 30, color: 'bg-[#38bdf8]' },
  ];

  return (
    <DashboardLayout title="Business Dashboard">
      <div className="space-y-6">
        <section className="grid gap-6 lg:grid-cols-[1.4fr_0.9fr]">
          <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between gap-4 mb-6">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary-600">Revenue trends</p>
                <h2 className="mt-2 text-3xl font-semibold text-slate-900">Weekly cash flow</h2>
              </div>
              <button className="inline-flex items-center gap-2 rounded-2xl bg-slate-100 px-4 py-3 text-sm text-slate-700 hover:bg-slate-200 transition-all">
                View report <FiChevronRight />
              </button>
            </div>
            <div className="space-y-4">
              {trendData.map((item) => (
                <div key={item.label} className="space-y-2">
                  <div className="flex items-center justify-between text-sm text-slate-500">
                    <span>{item.label}</span>
                    <span>{item.value}%</span>
                  </div>
                  <div className="h-3 rounded-full bg-slate-100 overflow-hidden">
                    <div className="h-full rounded-full bg-primary" style={{ width: `${item.value}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-5 text-slate-900">
              <div className="grid h-12 w-12 place-items-center rounded-3xl bg-[#eff6ff] text-[#2563eb]">
                <FiPieChart size={20} />
              </div>
              <div>
                <p className="text-sm font-semibold">Expense breakdown</p>
                <p className="text-sm text-slate-500">Where your money went this week.</p>
              </div>
            </div>
            <div className="space-y-4">
              {breakdown.map((item) => (
                <div key={item.name} className="space-y-3">
                  <div className="flex items-center justify-between text-sm text-slate-700">
                    <span>{item.name}</span>
                    <span>{item.value}%</span>
                  </div>
                  <div className="h-3 rounded-full bg-slate-100 overflow-hidden">
                    <div className={`${item.color} h-full rounded-full`} style={{ width: `${item.value}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="rounded-3xl bg-[#ecfdf5] p-5">
              <p className="text-sm font-semibold text-primary-700 uppercase tracking-[0.24em]">Profit overview</p>
              <p className="mt-4 text-3xl font-semibold text-slate-900">₦82,400</p>
              <p className="mt-2 text-sm text-slate-600">Net profit this week after all costs.</p>
            </div>
            <div className="rounded-3xl bg-[#eff6ff] p-5">
              <p className="text-sm font-semibold text-[#2563eb] uppercase tracking-[0.24em]">Revenue</p>
              <p className="mt-4 text-3xl font-semibold text-slate-900">₦128,700</p>
              <p className="mt-2 text-sm text-slate-600">Sales and service income.</p>
            </div>
            <div className="rounded-3xl bg-[#ffedd5] p-5">
              <p className="text-sm font-semibold text-warning uppercase tracking-[0.24em]">Expenses</p>
              <p className="mt-4 text-3xl font-semibold text-slate-900">₦46,300</p>
              <p className="mt-2 text-sm text-slate-600">Costs across stock, transport, and staff.</p>
            </div>
          </div>
        </section>

        <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary-600">Personal vs business</p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-900">Keep your spending separate</h2>
            </div>
            <button className="inline-flex items-center gap-2 rounded-2xl bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-200 transition-all">
              Update rules <FiChevronRight />
            </button>
          </div>
          <div className="mt-6 space-y-4">
            <div>
              <div className="flex justify-between text-sm text-slate-500">
                <span>Business</span>
                <span>74%</span>
              </div>
              <div className="mt-2 h-3 rounded-full bg-slate-100 overflow-hidden">
                <div className="h-full rounded-full bg-[#2563eb]" style={{ width: '74%' }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm text-slate-500">
                <span>Personal</span>
                <span>26%</span>
              </div>
              <div className="mt-2 h-3 rounded-full bg-slate-100 overflow-hidden">
                <div className="h-full rounded-full bg-[#f97316]" style={{ width: '26%' }} />
              </div>
            </div>
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
};

export default BusinessDashboard;
