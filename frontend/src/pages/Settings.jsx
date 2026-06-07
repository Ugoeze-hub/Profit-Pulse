import React, { useState } from 'react';
import { FiUser, FiGlobe, FiUsers, FiBell, FiShield, FiSave } from 'react-icons/fi';
import DashboardLayout from '../components/DashboardLayout';
import LanguageToggle from '../components/LanguageToggle';
import toast from 'react-hot-toast';

const Settings = () => {
  const [businessProfile, setBusinessProfile] = useState({
    name: 'Mama Chioma Provisions',
    email: 'mama.chioma@profitpulse.com',
    phone: '+234 801 234 5678',
    currency: 'NGN',
    timezone: 'Africa/Lagos'
  });

  const [notifications, setNotifications] = useState({
    dailyPulse: true,
    profitAlerts: true,
    expenseWarnings: true,
    marketingEmails: false
  });

  const [language, setLanguage] = useState('english');

  const saveSettings = () => {
    toast.success('Settings saved successfully!');
  };

  return (
    <DashboardLayout title="Settings">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Business Profile */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="p-5 border-b border-gray-200 bg-gray-50">
            <div className="flex items-center gap-2">
              <FiUser className="text-gray-600" />
              <h3 className="font-semibold text-gray-900">Business Profile</h3>
            </div>
          </div>
          <div className="p-5 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Business Name</label>
              <input
                type="text"
                value={businessProfile.name}
                onChange={(e) => setBusinessProfile({ ...businessProfile, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
              />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={businessProfile.email}
                  onChange={(e) => setBusinessProfile({ ...businessProfile, email: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input
                  type="tel"
                  value={businessProfile.phone}
                  onChange={(e) => setBusinessProfile({ ...businessProfile, phone: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Currency</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none">
                  <option>NGN - Nigerian Naira</option>
                  <option>USD - US Dollar</option>
                  <option>GHS - Ghana Cedi</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
                <LanguageToggle language={language} setLanguage={setLanguage} />
              </div>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="p-5 border-b border-gray-200 bg-gray-50">
            <div className="flex items-center gap-2">
              <FiBell className="text-gray-600" />
              <h3 className="font-semibold text-gray-900">Notification Preferences</h3>
            </div>
          </div>
          <div className="p-5 space-y-4">
            {Object.entries(notifications).map(([key, value]) => (
              <label key={key} className="flex items-center justify-between cursor-pointer">
                <div>
                  <p className="font-medium text-gray-900 capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </p>
                  <p className="text-sm text-gray-500">
                    Receive {key.replace(/([A-Z])/g, ' $1').toLowerCase()} notifications
                  </p>
                </div>
                <div className="relative inline-block w-10 mr-2 align-middle select-none">
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={() => setNotifications({ ...notifications, [key]: !value })}
                    className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer"
                  />
                  <label className={`toggle-label block overflow-hidden h-5 rounded-full cursor-pointer ${value ? 'bg-green-500' : 'bg-gray-300'}`}></label>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Team Members */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="p-5 border-b border-gray-200 bg-gray-50">
            <div className="flex items-center gap-2">
              <FiUsers className="text-gray-600" />
              <h3 className="font-semibold text-gray-900">Team Members</h3>
            </div>
          </div>
          <div className="p-5">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white font-semibold">
                  MC
                </div>
                <div>
                  <p className="font-medium text-gray-900">Mama Chioma</p>
                  <p className="text-xs text-gray-500">Owner • Admin</p>
                </div>
              </div>
              <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">Owner</span>
            </div>
            <button className="mt-4 w-full px-4 py-2 border border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-green-400 hover:text-green-600 transition-colors">
              + Invite Team Member
            </button>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            onClick={saveSettings}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
          >
            <FiSave size={18} /> Save Changes
          </button>
        </div>
      </div>

      <style jsx>{`
        .toggle-checkbox:checked {
          right: 0;
          border-color: #10b981;
        }
        .toggle-checkbox:checked + .toggle-label {
          background-color: #10b981;
        }
        .toggle-checkbox {
          right: 0;
          transition: all 0.3s ease;
        }
        .toggle-checkbox:checked {
          right: 1rem;
        }
      `}</style>
    </DashboardLayout>
  );
};

export default Settings;