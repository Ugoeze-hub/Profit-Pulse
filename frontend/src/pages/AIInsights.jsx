import React, { useState } from 'react';
import { FiAlertTriangle, FiTrendingUp, FiInfo, FiZap } from 'react-icons/fi';
import DashboardLayout from '../components/DashboardLayout';

const AIInsights = () => {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      text: 'Good evening, Mama Chioma. Today your business pulse is strong — you earned ₦124,500 and kept ₦66,300 in profit after expenses.',
      type: 'default',
    },
    {
      role: 'assistant',
      text: 'Revenue was led by Indomie noodles, which brought ₦24,000 in sales. That is your top product for today.',
      type: 'highlight',
    },
    {
      role: 'assistant',
      text: 'Expenses were healthy overall, but transport costs jumped to ₦6,200. Keep an eye on deliveries this week.',
      type: 'warning',
    },
    {
      role: 'assistant',
      text: 'Recommended action: stock soft drinks before Thursday and ask your driver to compare okada fees before each trip.',
      type: 'recommendation',
    },
  ]);

  return (
    <DashboardLayout title="Tally Summary">
      <div className="space-y-6">
        <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary-600">Daily pulse</p>
              <h2 className="mt-2 text-3xl font-semibold text-slate-900">Your business update, delivered like a trusted advisor.</h2>
            </div>
            <div className="inline-flex items-center gap-2 rounded-2xl bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-700">
              <FiZap /> AI Summary
            </div>
          </div>

          <div className="mt-8 space-y-4">
            <div className="rounded-[28px] bg-[#f8fafc] p-6">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-sm text-slate-500">Revenue</p>
                  <p className="mt-2 text-4xl font-semibold text-slate-900">₦124,500</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Profit</p>
                  <p className="mt-2 text-4xl font-semibold text-primary">₦66,300</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Expenses</p>
                  <p className="mt-2 text-4xl font-semibold text-rose-600">₦58,200</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`pulse-bubble ${message.type === 'highlight' ? 'pulse-bubble--accent' : ''} ${message.type === 'warning' ? 'pulse-bubble--alert' : ''}`}
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-1 rounded-2xl bg-slate-100 p-3 text-slate-700">
                      {message.type === 'warning' ? <FiAlertTriangle size={18} /> : message.type === 'recommendation' ? <FiInfo size={18} /> : <FiTrendingUp size={18} />}
                    </div>
                    <div>
                      <p className="text-slate-800 leading-relaxed">{message.text}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
};

export default AIInsights;
