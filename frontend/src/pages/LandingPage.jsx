import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiTrendingUp, FiBell, FiCamera, FiMessageCircle, FiArrowRight, FiCheck } from 'react-icons/fi';
import { MdOutlineDashboard } from 'react-icons/md';
import LanguageToggle from '../components/LanguageToggle';
import { Link } from 'react-router-dom';

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
    <div className="min-h-screen bg-gray-50 w-full">
      {/* Navigation */}
      <nav className="fixed top-0 left-5 w-full bg-white/95 backdrop-blur-sm border-b border-gray-200 z-50">
        <div className="max-w-5xl mx-auto px-2 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <span className="text-2xl">📈</span>
              <span className="font-bold text-xl text-gray-900">ProfitPulse</span>
            </div>
            <div className="flex items-center gap-4">
              <LanguageToggle language={language} setLanguage={setLanguage} />
              <Link
                to="/login"
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition-all duration-200 shadow-sm hover:shadow-md"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section - clean, no oversized nonsense */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-50 rounded-full mb-6">
                <span className="w-2 h-2 bg-green-600 rounded-full animate-pulse"></span>
                <span className="text-sm font-medium text-green-700">AI-Powered for Nigerian SMEs</span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Your daily business intelligence, 
                <span className="text-green-600"> delivered like a WhatsApp message</span>
              </h1>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                No dashboards to decode. No charts to interpret. Just clear, actionable insights 
                about your business, in the language you speak.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => navigate('/signup')}
                  className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-all duration-200 shadow-sm hover:shadow-md flex items-center justify-center gap-2"
                >
                  Start Free Trial <FiArrowRight />
                </button>
                <button className="px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-all duration-200">
                  Watch Demo
                </button>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 border border-green-100">
                <div className="bg-white rounded-xl shadow-lg p-6 mb-4">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-lg">📱</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Today's Pulse Card</p>
                      <p className="text-xs text-gray-500">8:00 PM • Just now</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <p className="text-gray-800">🌙 Good evening! Today you made ₦63,500. Your real profit after expenses na ₦18,200 — your best day this week.</p>
                    <p className="text-sm text-green-700 bg-green-50 p-3 rounded-lg">⭐ Your top earner: Indomie noodles (₦24,000 in sales)</p>
                    <p className="text-sm text-orange-700 bg-orange-50 p-3 rounded-lg">⚠️ Transport: ₦6,200 this week vs ₦2,900 last week — that's more than double.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Everything you need to grow</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">No complex accounting. No confusing charts. Just the insights that matter.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div key={idx} className="p-6 bg-gray-50 rounded-xl hover:shadow-md transition-all duration-200 group">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-green-200 transition-colors">
                    <Icon className="text-green-700 text-xl" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-12 text-white">
            <h2 className="text-3xl font-bold mb-4">Ready to know where your money goes?</h2>
            <p className="text-green-100 mb-8">Join thousands of Nigerian business owners using ProfitPulse daily</p>
            <button 
              onClick={() => navigate('/signup')}
              className="px-8 py-3 bg-white text-green-700 font-semibold rounded-lg hover:bg-gray-100 transition-all duration-200 inline-flex items-center gap-2"
            >
              Get Started Free <FiArrowRight />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;