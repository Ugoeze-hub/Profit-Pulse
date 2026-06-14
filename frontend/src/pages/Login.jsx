import React, { useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { FiMail, FiLock, FiEye, FiEyeOff, FiArrowRight, FiCheckCircle } from 'react-icons/fi';
import { toast } from 'react-hot-toast';
import LanguageToggle from '../components/LanguageToggle';

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState('english');
  const { setIsAuthenticated } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      toast.error(language === 'english' ? 'Please fill in all fields' : 'Please fill in all fields');
      return;
    }

    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      toast.success(language === 'english' ? 'Welcome back!' : 'Welcome back!');

      // Update shared auth state so routes react immediately
      setIsAuthenticated(true);

      // Replace navigation so user cannot go back to login with browser back
      navigate('/dashboard', { replace: true });
    }, 1500);
  };

  const content = {
    english: {
      title: 'Welcome back',
      subtitle: 'Sign in to your account to continue',
      email: 'Email address',
      emailPlaceholder: 'you@example.com',
      password: 'Password',
      rememberMe: 'Remember me',
      forgotPassword: 'Forgot password?',
      signIn: 'Sign in',
      signingIn: 'Signing in...',
      noAccount: "Don't have an account?",
      signUp: 'Sign up',
      demo: 'Demo credentials: demo@tally.com / any password'
    },
    pidgin: {
      title: 'Welcome back',
      subtitle: 'Sign in to your account to continue',
      email: 'Email address',
      emailPlaceholder: 'you@example.com',
      password: 'Password',
      rememberMe: 'Remember me',
      forgotPassword: 'Forgot password?',
      signIn: 'Sign in',
      signingIn: 'Signing in...',
      noAccount: "You no get account?",
      signUp: 'Sign up',
      demo: 'Demo credentials: demo@tally.com / any password'
    }
  };

  const t = content[language];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex">
      {/* Left Side - Brand Section (hidden on mobile) */}
      <div className="hidden lg:flex lg:w-1/2 bg-[linear-gradient(180deg,#047857,#059669)] relative overflow-hidden">
        <div className="absolute inset-0 bg-black/12"></div>
        <div className="relative z-10 flex flex-col justify-between p-12 text-white">
          <div className="flex items-center gap-3">
            <div className="rounded-md bg-white/10 px-3 py-1 text-sm font-semibold">TALLY</div>
          </div>

          <div className="space-y-6">
            <h2 className="text-3xl font-bold leading-tight">
              Business intelligence that fits your day
            </h2>
            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <FiCheckCircle className="text-green-200 mt-1" />
                <span>AI insights in plain English or Pidgin</span>
              </div>
              <div className="flex items-start gap-3">
                <FiCheckCircle className="text-green-200 mt-1" />
                <span>Understand cash flow without accounting jargon</span>
              </div>
              <div className="flex items-start gap-3">
                <FiCheckCircle className="text-green-200 mt-1" />
                <span>Daily summaries you can act on</span>
              </div>
            </div>
          </div>

          <div className="text-sm text-green-100">
            <p>Join thousands of Nigerian business owners</p>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="text-3xl">📈</span>
              <span className="font-bold text-2xl text-gray-900">TALLY</span>
            </div>
            <p className="text-sm text-gray-600">Business intelligence for Nigerian SMEs</p>
          </div>

          {/* Language Toggle */}
          <div className="flex justify-end mb-6">
            <LanguageToggle language={language} setLanguage={setLanguage} />
          </div>

          {/* Form Card */}
          <div className="card card-hover p-8">
            <div className="text-center mb-6">
              <h1 className="text-2xl font-semibold text-gray-900 mb-1">{t.title}</h1>
              <p className="text-sm text-gray-600">{t.subtitle}</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  {t.email}
                </label>
                <div className="relative">
                  <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder={t.emailPlaceholder}
                    className="input pl-10 pr-4 py-2.5"
                    aria-label={t.email}
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  {t.password}
                </label>
                <div className="relative">
                  <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="input pl-10 pr-12 py-2.5"
                    aria-label={t.password}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                    className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                  />
                  <span className="text-sm text-gray-700">{t.rememberMe}</span>
                </label>
                <button
                  type="button"
                  className="text-sm text-green-600 hover:text-green-700 font-medium"
                >
                  {t.forgotPassword}
                </button>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                aria-busy={loading}
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" role="status" aria-hidden="true"></div>
                    <span>{t.signingIn}</span>
                  </>
                ) : (
                  <>
                    <span>{t.signIn}</span>
                    <span className="btn-icon"><FiArrowRight /></span>
                  </>
                )}
              </button>
            </form>

            {/* Sign Up Link */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                {t.noAccount}{' '}
                <Link to="/signup" className="text-green-600 hover:text-green-700 font-semibold">
                  {t.signUp}
                </Link>
              </p>
            </div>

            {/* Demo Credentials */}
            <div className="mt-6 pt-6 border-t border-gray-100">
              <p className="text-xs text-center muted">
                {t.demo}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;