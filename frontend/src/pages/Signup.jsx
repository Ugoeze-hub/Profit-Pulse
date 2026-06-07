import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  FiMail, FiLock, FiEye, FiEyeOff, FiArrowRight, FiCheckCircle, 
  FiUser, FiBriefcase, FiPhone, FiAlertCircle 
} from 'react-icons/fi';
import { toast } from 'react-hot-toast';
import LanguageToggle from '../components/LanguageToggle';

const Signup = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState('english');
  const [formData, setFormData] = useState({
    fullName: '',
    businessName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    
    if (!formData.businessName.trim()) {
      newErrors.businessName = 'Business name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (!formData.agreeTerms) {
      newErrors.agreeTerms = 'You must agree to the terms';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please fix the errors before continuing');
      return;
    }

    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      toast.success('Account created successfully! Redirecting to dashboard...');
      setTimeout(() => navigate('/dashboard'), 1500);
    }, 1500);
  };

  const content = {
    english: {
      title: 'Create an account',
      subtitle: 'Start your 14-day free trial. No credit card required.',
      fullName: 'Full name',
      fullNamePlaceholder: 'Mama Chioma',
      businessName: 'Business name',
      businessNamePlaceholder: 'Mama Chioma Provisions',
      email: 'Email address',
      emailPlaceholder: 'you@example.com',
      phone: 'Phone number (optional)',
      phonePlaceholder: '+234 801 234 5678',
      password: 'Password',
      confirmPassword: 'Confirm password',
      agreeTerms: 'I agree to the',
      terms: 'Terms of Service',
      and: 'and',
      privacy: 'Privacy Policy',
      createAccount: 'Create account',
      creating: 'Creating account...',
      haveAccount: 'Already have an account?',
      signIn: 'Sign in',
      passwordHint: 'At least 6 characters'
    },
    pidgin: {
      title: 'Create an account',
      subtitle: 'Start your 14-day free trial. No credit card required.',
      fullName: 'Your full name',
      fullNamePlaceholder: 'Mama Chioma',
      businessName: 'Business name',
      businessNamePlaceholder: 'Mama Chioma Provisions',
      email: 'Email address',
      emailPlaceholder: 'you@example.com',
      phone: 'Phone number (optional)',
      phonePlaceholder: '+234 801 234 5678',
      password: 'Password',
      confirmPassword: 'Confirm password',
      agreeTerms: 'I agree to the',
      terms: 'Terms of Service',
      and: 'and',
      privacy: 'Privacy Policy',
      createAccount: 'Create account',
      creating: 'Creating account...',
      haveAccount: 'Already get account?',
      signIn: 'Sign in',
      passwordHint: 'At least 6 characters'
    }
  };

  const t = content[language];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex">
      {/* Left Side - Brand Section */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-green-700 to-emerald-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 flex flex-col justify-between p-12 text-white">
          <div className="flex items-center gap-2">
            <span className="text-3xl">📈</span>
            <span className="font-bold text-2xl">ProfitPulse</span>
          </div>
          
          <div className="space-y-6">
            <h2 className="text-3xl font-bold leading-tight">
              Join thousands of Nigerian business owners already growing with ProfitPulse
            </h2>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <FiCheckCircle className="text-green-300" />
                <span>Get daily AI-powered business summaries</span>
              </div>
              <div className="flex items-center gap-3">
                <FiCheckCircle className="text-green-300" />
                <span>Track expenses and profits effortlessly</span>
              </div>
              <div className="flex items-center gap-3">
                <FiCheckCircle className="text-green-300" />
                <span>Receive insights in English or Pidgin</span>
              </div>
              <div className="flex items-center gap-3">
                <FiCheckCircle className="text-green-300" />
                <span>14-day free trial, no commitment</span>
              </div>
            </div>
          </div>
          
          <div className="text-sm text-green-200">
            <p>Trusted by 10,000+ business owners</p>
          </div>
        </div>
        
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-500 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-emerald-500 rounded-full opacity-20 blur-3xl"></div>
      </div>

      {/* Right Side - Signup Form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12 overflow-y-auto">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="text-3xl">📈</span>
              <span className="font-bold text-2xl text-gray-900">ProfitPulse</span>
            </div>
            <p className="text-sm text-gray-600">Business intelligence for Nigerian SMEs</p>
          </div>

          {/* Language Toggle */}
          <div className="flex justify-end mb-6">
            <LanguageToggle language={language} setLanguage={setLanguage} />
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">{t.title}</h1>
              <p className="text-gray-600 text-sm">{t.subtitle}</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t.fullName}
                </label>
                <div className="relative">
                  <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder={t.fullNamePlaceholder}
                    className={`w-full pl-10 pr-4 py-2 border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all ${
                      errors.fullName ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                </div>
                {errors.fullName && (
                  <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                    <FiAlertCircle size={12} /> {errors.fullName}
                  </p>
                )}
              </div>

              {/* Business Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t.businessName}
                </label>
                <div className="relative">
                  <FiBriefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="text"
                    name="businessName"
                    value={formData.businessName}
                    onChange={handleChange}
                    placeholder={t.businessNamePlaceholder}
                    className={`w-full pl-10 pr-4 py-2 border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all ${
                      errors.businessName ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                </div>
                {errors.businessName && (
                  <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                    <FiAlertCircle size={12} /> {errors.businessName}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t.email}
                </label>
                <div className="relative">
                  <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder={t.emailPlaceholder}
                    className={`w-full pl-10 pr-4 py-2 border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                </div>
                {errors.email && (
                  <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                    <FiAlertCircle size={12} /> {errors.email}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t.phone}
                </label>
                <div className="relative">
                  <FiPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder={t.phonePlaceholder}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t.password}
                </label>
                <div className="relative">
                  <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className={`w-full pl-10 pr-12 py-2 border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all ${
                      errors.password ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                  </button>
                </div>
                {errors.password ? (
                  <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                    <FiAlertCircle size={12} /> {errors.password}
                  </p>
                ) : (
                  <p className="text-xs text-gray-500 mt-1">{t.passwordHint}</p>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t.confirmPassword}
                </label>
                <div className="relative">
                  <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className={`w-full pl-10 pr-12 py-2 border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all ${
                      errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                    <FiAlertCircle size={12} /> {errors.confirmPassword}
                  </p>
                )}
              </div>

              {/* Terms Agreement */}
              <div className="flex items-start gap-2">
                <input
                  type="checkbox"
                  name="agreeTerms"
                  checked={formData.agreeTerms}
                  onChange={handleChange}
                  className="mt-1 w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                />
                <label className="text-sm text-gray-700">
                  {t.agreeTerms}{' '}
                  <a href="#" className="text-green-600 hover:text-green-700 font-medium">
                    {t.terms}
                  </a>{' '}
                  {t.and}{' '}
                  <a href="#" className="text-green-600 hover:text-green-700 font-medium">
                    {t.privacy}
                  </a>
                </label>
              </div>
              {errors.agreeTerms && (
                <p className="text-xs text-red-500 flex items-center gap-1">
                  <FiAlertCircle size={12} /> {errors.agreeTerms}
                </p>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-sm hover:shadow-md disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    {t.creating}
                  </>
                ) : (
                  <>
                    {t.createAccount} <FiArrowRight />
                  </>
                )}
              </button>
            </form>

            {/* Sign In Link */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                {t.haveAccount}{' '}
                <Link to="/login" className="text-green-600 hover:text-green-700 font-semibold">
                  {t.signIn}
                </Link>
              </p>
            </div>

            {/* Trust Badge */}
            <div className="mt-6 pt-6 border-t border-gray-100">
              <div className="flex justify-center gap-6 text-xs text-gray-500">
                <span>🔒 256-bit SSL</span>
                <span>💳 No card required</span>
                <span>⭐ 14-day trial</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;