import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  FiZap,
  FiCamera,
  FiFileText,
  FiSettings,
  FiMenu,
  FiX,
  FiLogOut,
  FiPieChart,
  FiPlusCircle
} from 'react-icons/fi';
import { MdOutlineDashboard } from 'react-icons/md';
import LanguageToggle from './LanguageToggle';

const DashboardLayout = ({ children, title }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [language, setLanguage] = useState('english');
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (userMenuOpen && !e.target.closest('.user-menu')) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [userMenuOpen]);

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: MdOutlineDashboard },
    { path: '/transactions', label: 'Transactions', icon: FiPlusCircle },
    { path: '/summary', label: 'Pulse', icon: FiZap },
    { path: '/business', label: 'Business', icon: FiPieChart },
    { path: '/receipt-scanner', label: 'Scan', icon: FiCamera },
    { path: '/settings', label: 'Settings', icon: FiSettings },
  ];

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    window.location.href = '/login';
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(15,118,110,0.12),_transparent_40%),linear-gradient(180deg,_#f3f7f9,_#ffffff)]">
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-white/95 border-b border-slate-200 z-30 backdrop-blur-sm px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-2xl">📈</span>
            <span className="font-bold text-slate-900 text-lg">ProfitPulse</span>
          </div>
          <button onClick={() => setSidebarOpen(true)} className="p-2 text-slate-700 rounded-xl hover:bg-slate-100 transition-all">
            <FiMenu size={22} />
          </button>
        </div>
      </div>

      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/40 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside className={`
        fixed top-0 left-0 z-40 h-full w-72 bg-white/95 border-r border-slate-200 shadow-xl backdrop-blur-sm transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0
      `}>
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-200">
          <div className="flex items-center gap-3">
              <div className="w-11 h-11 bg-[#0f766e] rounded-2xl flex items-center justify-center text-white shadow-sm">
              <span className="text-xl">📈</span>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-900">ProfitPulse</h2>
              <p className="text-sm text-slate-500">AI business pulse</p>
            </div>
          </div>
          <button 
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 text-slate-600 rounded-xl hover:bg-slate-100 transition-all"
          >
            <FiX size={20} />
          </button>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-200
                  ${isActive 
                    ? 'bg-[#ecfdf5] text-[#0f766e] shadow-sm' 
                    : 'text-slate-700 hover:bg-slate-50'
                  }
                `}
              >
                <Icon size={20} className={isActive ? 'text-[#0f766e]' : 'text-slate-400'} />
                <span className="font-medium text-sm">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-slate-200 px-4 py-4">
          <div className="mb-4">
            <LanguageToggle language={language} setLanguage={setLanguage} />
          </div>
          <div className="rounded-3xl bg-slate-50 p-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 bg-[#0f766e] rounded-2xl flex items-center justify-center text-white font-semibold">
                MC
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900">Mama Chioma</p>
                <p className="text-xs text-slate-500">mama@profitpulse.com</p>
              </div>
            </div>
            <button 
              onClick={handleLogout}
              className="mt-4 w-full inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white py-3 text-sm font-semibold text-rose-600 hover:bg-rose-50 transition-all"
            >
              <FiLogOut size={18} /> Sign Out
            </button>
          </div>
        </div>
      </aside>

      <main className="lg:ml-72 pt-16 lg:pt-0">
        <div className="sticky top-0 z-20 bg-white/90 backdrop-blur-sm border-b border-slate-200 px-4 py-4 hidden lg:block">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-slate-500">{title}</p>
              <h1 className="text-3xl font-semibold text-slate-900">{title}</h1>
            </div>
            <div className="flex items-center gap-3">
              <button className="relative p-3 bg-slate-100 text-slate-600 rounded-2xl hover:bg-slate-200 transition-all">
                <FiZap size={18} />
                <span className="absolute top-2 right-2 inline-flex h-2.5 w-2.5 rounded-full bg-rose-500 ring-2 ring-white"></span>
              </button>
              <div className="relative user-menu">
                <button 
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-700 transition-all hover:border-slate-300"
                >
                  <div className="w-10 h-10 rounded-2xl bg-[#0f766e] grid place-items-center text-white font-semibold">MC</div>
                  <span className="text-sm font-medium">Mama Chioma</span>
                </button>
                {userMenuOpen && (
                  <div className="absolute right-0 mt-3 w-56 rounded-3xl border border-slate-200 bg-white p-2 shadow-lg">
                    <button className="w-full rounded-2xl px-4 py-3 text-left text-sm text-slate-700 hover:bg-slate-50">Profile Settings</button>
                    <button className="w-full rounded-2xl px-4 py-3 text-left text-sm text-slate-700 hover:bg-slate-50">Help Center</button>
                    <div className="my-2 h-px bg-slate-100"></div>
                    <button onClick={handleLogout} className="w-full rounded-2xl px-4 py-3 text-left text-sm text-rose-600 hover:bg-rose-50">Sign Out</button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 lg:p-6 max-w-[1600px] mx-auto page-shell">
          {children}
        </div>
      </main>

      <div className="bottom-nav lg:hidden">
        <nav>
          {navItems.slice(0, 4).map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link key={item.path} to={item.path} className={isActive ? 'active' : ''}>
                <Icon size={20} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default DashboardLayout;
