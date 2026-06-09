import React, { useState } from 'react';
import { FiMic, FiCheckCircle, FiUpload, FiRepeat, FiDollarSign } from 'react-icons/fi';
import DashboardLayout from '../components/DashboardLayout';

const TransactionInput = () => {
  const [transaction, setTransaction] = useState({
    type: 'revenue',
    amount: '',
    category: 'Sales',
    description: '',
    date: '',
    note: '',
  });
  const [saved, setSaved] = useState(false);
  const [aiTag, setAiTag] = useState('Sales');

  const categories = ['Sales', 'Transport', 'Stock', 'Staff', 'Utilities', 'Other'];

  const handleChange = (field, value) => {
    setTransaction((prev) => ({ ...prev, [field]: value }));
    if (field === 'description') {
      if (value.toLowerCase().includes('transport')) setAiTag('Transport');
      else if (value.toLowerCase().includes('salary')) setAiTag('Staff');
      else if (value.toLowerCase().includes('rice') || value.toLowerCase().includes('stock')) setAiTag('Stock');
      else setAiTag('Sales');
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2400);
  };

  return (
    <DashboardLayout title="Add Transaction">
      <div className="space-y-6">
        <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary-600">Quick entry</p>
              <h2 className="mt-2 text-3xl font-semibold text-slate-900">Add a transaction in seconds</h2>
              <p className="mt-3 max-w-2xl text-slate-600">Voice-ready placeholder, quick manual entry, and AI categorization to keep your ledger tidy.</p>
            </div>
            <div className="rounded-3xl bg-slate-50 p-4 shadow-sm">
              <div className="flex items-center gap-3 text-slate-700">
                <div className="grid h-12 w-12 place-items-center rounded-3xl bg-primary-soft text-primary"> <FiMic size={20} /></div>
                <div>
                  <p className="text-sm font-semibold">Voice input coming soon</p>
                  <p className="text-sm text-slate-500">Type here for now and let AI suggest categories.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.35fr_0.75fr]">
          <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
            <form onSubmit={handleSave} className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Transaction type</label>
                  <div className="grid grid-cols-2 gap-2">
                    {['revenue', 'expense'].map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => handleChange('type', type)}
                        className={`rounded-2xl border px-4 py-3 text-left text-sm font-semibold transition-all ${transaction.type === type ? 'border-primary text-primary bg-primary-soft' : 'border-slate-200 text-slate-700 bg-white hover:border-slate-300'}`}
                      >
                        {type === 'revenue' ? 'Income' : 'Expense'}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Amount</label>
                  <div className="relative">
                    <span className="pointer-events-none absolute inset-y-0 left-4 inline-flex items-center text-slate-400">₦</span>
                    <input
                      type="number"
                      value={transaction.amount}
                      onChange={(e) => handleChange('amount', e.target.value)}
                      placeholder="0"
                      className="input pl-11"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">What was it for?</label>
                <input
                  type="text"
                  value={transaction.description}
                  onChange={(e) => handleChange('description', e.target.value)}
                  placeholder="Indomie sales, fuel, or staff salary"
                  className="input"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Category</label>
                  <select
                    value={transaction.category}
                    onChange={(e) => handleChange('category', e.target.value)}
                    className="input"
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Date</label>
                  <input
                    type="date"
                    value={transaction.date}
                    onChange={(e) => handleChange('date', e.target.value)}
                    className="input"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Notes</label>
                <textarea
                  value={transaction.note}
                  onChange={(e) => handleChange('note', e.target.value)}
                  rows="3"
                  placeholder="Optional details for your records"
                  className="input resize-none"
                />
              </div>

              <button type="submit" className="btn btn-primary w-full">
                {saved ? 'Saved' : 'Save transaction'}
              </button>
            </form>
          </div>

          <aside className="space-y-4">
            <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-slate-700">AI Categorization</p>
                  <p className="mt-1 text-sm text-slate-500">Suggested label based on the description.</p>
                </div>
                <div className="inline-flex items-center gap-2 rounded-full bg-primary-soft px-3 py-2 text-sm font-semibold text-primary">
                  <FiRepeat /> {aiTag}
                </div>
              </div>
              <div className="mt-5 rounded-3xl bg-slate-50 p-4 text-slate-600">
                <p className="text-sm leading-6">AI thinks this transaction looks like <span className="font-semibold text-slate-900">{aiTag}</span>. You can keep the suggestion or choose another category.</p>
              </div>
            </div>

            <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3 text-slate-700">
                <div className="grid h-12 w-12 place-items-center rounded-3xl bg-primary-soft text-primary">
                  <FiUpload size={20} />
                </div>
                <div>
                  <p className="font-semibold">Receipt uploads</p>
                  <p className="text-sm text-slate-500">Attach a receipt to keep your records in one place.</p>
                </div>
              </div>
              <button className="mt-6 inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-all">
                <FiUpload /> Upload receipt
              </button>
            </div>
          </aside>
        </section>

        <div className="rounded-[28px] border border-slate-200 bg-[#ecfdf5] p-6 shadow-sm">
          <div className="flex items-center gap-3 text-slate-900">
            <div className="grid h-12 w-12 place-items-center rounded-3xl bg-[#d1fae5] text-primary">
              <FiCheckCircle size={20} />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Your ledger stays clean</h3>
              <p className="mt-1 text-sm text-slate-600">Transactions are organized with a friendly AI review so you can focus on running your business.</p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default TransactionInput;
