import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import { Toaster } from 'react-hot-toast';
import { AuthProvider, AuthContext } from './contexts/AuthContext';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import AIInsights from './pages/AIInsights';
import ReceiptScanner from './pages/ReceiptScanner';
import InvoiceDetails from './pages/InvoiceDetails';
import Settings from './pages/Settings';
import Login from './pages/Login';
import Signup from './pages/Signup';
import TransactionInput from './pages/TransactionInput';
import TransactionHistory from './pages/TransactionHistory';
import BusinessDashboard from './pages/BusinessDashboard';
import Inventory from './pages/Inventory';


const globalStyles = `
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Inter', system-ui, -apple-system, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  *:focus {
    outline: none;
  }

  *:focus-visible {
    outline: 2px solid #0f766e;
    outline-offset: 2px;
    border-radius: 4px;
  }

  html {
    scroll-behavior: smooth;
  }

  input[type="number"] {
    -moz-appearance: textfield;
  }

  input[type="number"]::-webkit-inner-spin-button,
  input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-track {
    background: #f3f7f9;
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb {
    background: #94a3b8;
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #64748b;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  .animate-spin-slow {
    animation: spin 1s linear infinite;
  }
`;

function AppRoutes() {
  const { isAuthenticated } = React.useContext(AuthContext);

  return (
    <>
      <style>{globalStyles}</style>
      <div className="min-h-screen bg-[#f3f7f9]">
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#111827',
              color: '#ffffff',
              fontFamily: 'Inter, system-ui, sans-serif',
              fontSize: '14px',
              borderRadius: '16px',
              padding: '12px 16px',
            },
            success: {
              iconTheme: {
                primary: '#0f766e',
                secondary: '#ffffff',
              },
            },
            error: {
              iconTheme: {
                primary: '#dc2626',
                secondary: '#ffffff',
              },
              duration: 5000,
            },
          }}
        />

        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />} />
          <Route path="/signup" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Signup />} />
          <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
          <Route path="/transactions" element={isAuthenticated ? <TransactionHistory /> : <Navigate to="/login" />} />
          <Route path="/add-transaction" element={isAuthenticated ? <TransactionInput /> : <Navigate to="/login" />} />
          <Route path="/summary" element={isAuthenticated ? <AIInsights /> : <Navigate to="/login" />} />
          <Route path="/business" element={isAuthenticated ? <BusinessDashboard /> : <Navigate to="/login" />} />
          <Route path="/receipt-scanner" element={isAuthenticated ? <ReceiptScanner /> : <Navigate to="/login" />} />
          <Route path="/invoices" element={isAuthenticated ? <InvoiceDetails /> : <Navigate to="/login" />} />
          <Route path="/settings" element={isAuthenticated ? <Settings /> : <Navigate to="/login" />} />
          <Route path="/inventory" element={isAuthenticated ? <Inventory /> : <Navigate to="/login" />} />
        </Routes>

      </div>
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;
