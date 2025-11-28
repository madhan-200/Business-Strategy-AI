import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Login } from './views/Login';
import { Signup } from './views/Signup';
import { Layout } from './components/Layout';
import { Onboarding } from './views/Onboarding';
import { Dashboard } from './views/Dashboard';
import { StrategyView } from './views/StrategyView';
import { CalendarView } from './views/CalendarView';
import { Subscription } from './views/Subscription';
import { AppState, BusinessProfile, Strategy, NavigationItem } from './types';
import { apiService } from './services/apiService';

const MainApp: React.FC = () => {
  // Global State
  const [business, setBusiness] = useState<BusinessProfile | null>(null);
  const [strategy, setStrategy] = useState<Strategy | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<NavigationItem>('dashboard');
  const [error, setError] = useState<string | null>(null);

  // Load from local storage on mount (simple persistence)
  useEffect(() => {
    const savedBusiness = localStorage.getItem('stratAi_business');
    const savedStrategy = localStorage.getItem('stratAi_strategy');
    if (savedBusiness) setBusiness(JSON.parse(savedBusiness));
    if (savedStrategy) setStrategy(JSON.parse(savedStrategy));
  }, []);

  const handleGenerateStrategy = async (profile: BusinessProfile) => {
    setIsLoading(true);
    setError(null);
    try {
      const generatedStrategy = await apiService.generateStrategy(profile);

      setBusiness(profile);
      setStrategy(generatedStrategy);

      // Save to persistence
      localStorage.setItem('stratAi_business', JSON.stringify(profile));
      localStorage.setItem('stratAi_strategy', JSON.stringify(generatedStrategy));
    } catch (err: any) {
      setError(err.message || 'Failed to generate strategy. Please check backend connection.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    localStorage.removeItem('stratAi_business');
    localStorage.removeItem('stratAi_strategy');
    setBusiness(null);
    setStrategy(null);
  };

  if (!business || !strategy) {
    return (
      <div className="text-gray-100">
        {error && (
          <div className="fixed top-4 right-4 bg-red-500/90 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-bounce">
            Error: {error}
          </div>
        )}
        <Onboarding onComplete={handleGenerateStrategy} isLoading={isLoading} />
      </div>
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard strategy={strategy} business={business} />;
      case 'strategy':
        return <StrategyView strategy={strategy} business={business} />;
      case 'calendar':
        return <CalendarView strategy={strategy} />;
      case 'subscription':
        return <Subscription />;
      case 'settings':
        return (
          <div className="max-w-xl mx-auto mt-10 p-8 bg-dark-card rounded-2xl border border-dark-border text-center">
            <h3 className="text-xl font-bold text-white mb-4">Danger Zone</h3>
            <p className="text-gray-400 mb-6">Resetting will clear all current business data and strategy history.</p>
            <button
              onClick={handleReset}
              className="bg-red-500/10 hover:bg-red-500/20 text-red-500 px-6 py-2 rounded-lg transition-colors border border-red-500/20"
            >
              Reset Application Data
            </button>
          </div>
        );
      default:
        return <Dashboard strategy={strategy} business={business} />;
    }
  };

  return (
    <Layout
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      businessName={business.name}
    >
      {renderContent()}
    </Layout>
  );
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <MainApp />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </HashRouter>
  );
};

export default App;