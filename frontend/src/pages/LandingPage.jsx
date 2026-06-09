import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FiTrendingUp, FiBell, FiCamera, FiMessageCircle, FiArrowRight } from 'react-icons/fi';
import LanguageToggle from '../components/LanguageToggle';

const LandingPage = () => {
  const navigate = useNavigate();
  const [language, setLanguage] = useState('english');

  const features = [
    { icon: FiMessageCircle, title: 'Daily Pulse Card', desc: 'Get AI-powered business summaries in plain English or Pidgin' },
    { icon: FiTrendingUp, title: 'Profit Insights', desc: 'Know exactly where your money goes, no accounting degree needed' },
    { icon: FiBell, title: 'Smart Alerts', desc: 'Get notified about unusual expenses and profit opportunities' },
    { icon: FiCamera, title: 'Receipt Scanner', desc: 'Snap and store receipts, let AI handle the rest' },
  ];

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(15,118,110,0.08),_transparent_35%),linear-gradient(180deg,_#f3f7f9,_#ffffff)]">
      <nav className="fixed inset-x-0 top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 lg:px-6">
          <div className="flex items-center gap-3">
            <span className="text-2xl">📈</span>
            <span className="text-lg font-semibold text-slate-900">ProfitPulse</span>
          </div>
          <div className="flex items-center gap-3">
            <LanguageToggle language={language} setLanguage={setLanguage} />
            <Link to="/login" className="rounded-2xl px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100 transition-all">Sign In</Link>
            <Link to="/signup" className="rounded-2xl bg-[#0f766e] px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#115e59] transition-all">Get Started</Link>
          </div>
        </div>
      </nav>

      <main className="pt-28 pb-24 px-4 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-[#d1fae5] px-4 py-2 text-sm font-semibold text-[#0f766e]">
                <span className="h-2 w-2 rounded-full bg-[#0f766e]" />
                AI-powered for Nigerian SMEs
              </div>
              <h1 className="mt-8 max-w-3xl text-5xl font-semibold tracking-tight text-slate-900 sm:text-6xl">Business insight that feels like a trusted message, not a spreadsheet.</h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">ProfitPulse helps traders understand cash flow, profits and spending with clear AI summaries and simple actions.</p>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <button onClick={() => navigate('/signup')} className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#0f766e] px-6 py-4 text-base font-semibold text-white shadow-lg shadow-[#0f766e]/10 transition-all hover:bg-[#115e59]">Start Free Trial <FiArrowRight /></button>
                <button className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-300 bg-white px-6 py-4 text-base font-semibold text-slate-900 transition-all hover:border-slate-400">Watch Demo</button>
              </div>
            </div>
            <div className="relative">
              <div className="rounded-[32px] border border-[#d7e2ea] bg-white p-8 shadow-[0_20px_70px_-40px_rgba(15,23,42,0.2)]">
                <div className="flex items-center gap-3 mb-6">
                  <div className="grid h-12 w-12 place-items-center rounded-3xl bg-[#ecfdf5] text-[#0f766e]">
                    <FiMessageCircle size={22} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">Today’s Pulse Card</p>
                    <p className="text-sm text-slate-500">Updated at 8:00 PM</p>
                  </div>
                </div>
                <div className="space-y-4 text-slate-700">
                  <p>Good evening! Today you made ₦63,500. Your real profit after expenses is ₦18,200 — your best day this week.</p>
                  <div className="rounded-3xl bg-[#ecfdf5] p-4 text-sm text-[#0f766e]">Top product: Indomie noodles (₦24,000 in sales)</div>
                  <div className="rounded-3xl bg-[#fffbeb] p-4 text-sm text-[#b45309]">Transport is ₦6,200 this week vs ₦2,900 last week — check delivery costs.</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <section className="mt-20 rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div key={idx} className="rounded-3xl border border-slate-100 p-6 hover:border-[#0f766e] transition-all duration-200">
                  <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-[#ecfdf5] text-[#0f766e]">
                    <Icon size={20} />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-slate-900">{feature.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{feature.desc}</p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="mt-20 rounded-[32px] bg-[#0f766e] p-12 text-white shadow-lg shadow-[#0f766e]/15">
          <h2 className="text-3xl font-semibold">Ready to know where your money goes?</h2>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-100">ProfitPulse gives you simple, mobile-friendly business intelligence for everyday trading.</p>
          <button onClick={() => navigate('/signup')} className="mt-8 inline-flex items-center gap-3 rounded-2xl bg-white px-7 py-4 text-base font-semibold text-[#0f766e] transition-all hover:bg-slate-100">Get Started Free <FiArrowRight /></button>
        </section>
      </main>
    </div>
  );
};

export default LandingPage;
