import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  FiHome, FiZap, FiCamera, FiFileText, FiSettings, 
  FiMenu, FiX, FiUser, FiBell, FiLogOut 
} from 'react-icons/fi';
import { MdOutlineDashboard } from 'react-icons/md';
import LanguageToggle from './LanguageToggle';

const DashboardLayout = ({ children, title }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [language, setLanguage] = useState('english');
  const location = useLocation();

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: MdOutlineDashboard },
    { path: '/insights', label: 'AI Insights', icon: FiZap },
    { path: '/receipt-scanner', label: 'Receipt Scanner', icon: FiCamera },
    { path: '/invoices', label: 'Invoices', icon: FiFileText },
    { path: '/settings', label: 'Settings', icon: FiSettings },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-30 px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-2xl">📈</span>
            <span className="font-bold text-gray-900">ProfitPulse</span>
          </div>
          <button onClick={() => setSidebarOpen(true)} className="p-2">
            <FiMenu size={24} />
          </button>
        </div>
      </div>

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 z-40 h-full w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0
      `}>
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <span className="text-2xl">📈</span>
            <span className="font-bold text-xl text-gray-900">ProfitPulse</span>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-gray-500">
            <FiX size={20} />
          </button>
        </div>

        <nav className="flex-1 py-6">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`
                  flex items-center gap-3 px-4 py-3 mx-2 rounded-lg transition-all duration-200
                  ${isActive 
                    ? 'bg-green-50 text-green-700 border-l-4 border-green-600' 
                    : 'text-gray-700 hover:bg-gray-50'
                  }
                `}
              >
                <Icon size={20} />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-gray-200 p-4">
          <LanguageToggle language={language} setLanguage={setLanguage} />
          <button className="flex items-center gap-3 px-4 py-3 mt-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors w-full">
            <FiLogOut size={20} />
            <span className="font-medium">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:ml-64 pt-16 lg:pt-0">
        <div className="sticky top-0 z-20 bg-white border-b border-gray-200 px-6 py-4 hidden lg:block">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
            <div className="flex items-center gap-4">
              <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors relative">
                <FiBell size={20} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white font-semibold">
                  MC
                </div>
                <span className="text-sm font-medium">Mama Chioma</span>
              </div>
            </div>
          </div>
        </div>
        <div className="p-4 lg:p-6">
          {children}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;