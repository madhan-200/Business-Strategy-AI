import React from 'react';
import { AppState, NavigationItem } from '../types';
import {
  LayoutDashboard,
  Target,
  CalendarDays,
  Settings,
  LogOut,
  Zap,
  Sparkles
} from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: NavigationItem;
  setActiveTab: (tab: NavigationItem) => void;
  businessName?: string;
}

export const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab, businessName }) => {
  const navItems: { id: NavigationItem; label: string; icon: string }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: '🚀' },
    { id: 'strategy', label: 'Strategy Map', icon: '🗺️' },
    { id: 'calendar', label: 'Content Plan', icon: '📅' },
    { id: 'subscription', label: 'Upgrade', icon: '💎' },
    { id: 'settings', label: 'Settings', icon: '⚙️' },
  ];

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 text-gray-800 font-sans overflow-hidden">
      {/* Fun Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-200/30 rounded-full blur-[100px] animate-pulse-slow"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-pink-200/30 rounded-full blur-[100px] animate-pulse-slow animation-delay-2000"></div>
      </div>

      {/* Sidebar */}
      <aside className="w-72 bg-white/80 backdrop-blur-xl border-r border-white/20 flex flex-col fixed h-full z-20 shadow-2xl transition-all duration-300">
        <div className="p-8 flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform duration-300">
            <span className="text-2xl text-white">🧠</span>
          </div>
          <div>
            <span className="text-2xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">StratAI</span>
            <p className="text-xs text-purple-500 font-bold tracking-wider">AGI ENGINE ⚡</p>
          </div>
        </div>

        <div className="px-6 flex-1 overflow-y-auto custom-scrollbar">
          <div className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4 px-4 flex items-center gap-2">
            <span>Menu</span>
            <span className="text-lg">🍔</span>
          </div>
          <nav className="space-y-3">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 group relative overflow-hidden ${activeTab === item.id
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/30 scale-105'
                  : 'text-gray-500 hover:bg-white hover:shadow-md hover:text-purple-600 hover:scale-102'
                  }`}
              >
                <span className={`text-2xl transition-transform duration-300 ${activeTab === item.id ? 'animate-bounce-gentle' : 'group-hover:scale-125'}`}>
                  {item.icon}
                </span>
                <span className="font-bold text-lg">{item.label}</span>
                {activeTab === item.id && (
                  <div className="absolute right-4 top-1/2 -translate-y-1/2">
                    <Sparkles size={16} className="animate-spin-slow" />
                  </div>
                )}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6 mt-auto">
          <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-3xl p-5 mb-4 border border-white shadow-inner relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-16 h-16 bg-white/40 rounded-full blur-xl -mr-8 -mt-8 transition-all group-hover:scale-150"></div>
            <p className="text-xs font-bold text-purple-400 uppercase tracking-wider mb-1">Current Business</p>
            <p className="text-lg font-black text-gray-800 truncate flex items-center gap-2">
              {businessName || 'Select Business'}
              <span className="text-xl">🏢</span>
            </p>
          </div>
          <button className="w-full flex items-center justify-center gap-2 text-gray-500 hover:text-red-500 transition-colors py-2 font-bold group">
            <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-72 p-8 overflow-y-auto h-screen custom-scrollbar relative z-10">
        <header className="flex justify-between items-center mb-10">
          <div className="animate-slide-in-down">
            <h1 className="text-4xl font-black text-gray-800 capitalize flex items-center gap-3">
              {activeTab === 'dashboard' && '🚀 Mission Control'}
              {activeTab === 'strategy' && '🗺️ Strategy Map'}
              {activeTab === 'calendar' && '📅 Content Plan'}
              {activeTab === 'subscription' && '💎 Upgrade'}
              {activeTab === 'settings' && '⚙️ Settings'}
            </h1>
            <p className="text-gray-500 font-medium mt-2 flex items-center gap-2">
              <span className="text-xl">🗓️</span>
              {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
          <div className="flex items-center gap-6 animate-slide-in-down animation-delay-1">
            <div className="flex items-center gap-3 bg-white/80 backdrop-blur-md border border-white/50 px-4 py-2 rounded-full shadow-sm hover:shadow-md transition-shadow cursor-pointer">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
              <span className="text-sm font-bold text-gray-600">All Systems Go</span>
            </div>
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 border-4 border-white shadow-lg flex items-center justify-center text-xl text-white font-bold cursor-pointer hover:scale-110 transition-transform">
              👤
            </div>
          </div>
        </header>

        <div className="animate-fade-in-up">
          {children}
        </div>
      </main>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #E2E8F0;
          border-radius: 20px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #CBD5E1;
        }
        @keyframes wiggle-slow {
            0%, 100% { transform: rotate(-3deg); }
            50% { transform: rotate(3deg); }
        }
        @keyframes bounce-gentle {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-3px); }
        }
        @keyframes spin-slow {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
        @keyframes pulse-slow {
            0%, 100% { opacity: 0.3; }
            50% { opacity: 0.1; }
        }
        @keyframes slide-in-down {
            from { opacity: 0; transform: translateY(-20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in-up {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .animate-wiggle-slow { animation: wiggle-slow 3s infinite; }
        .animate-bounce-gentle { animation: bounce-gentle 2s infinite; }
        .animate-spin-slow { animation: spin-slow 8s linear infinite; }
        .animate-pulse-slow { animation: pulse-slow 4s infinite; }
        .animate-slide-in-down { animation: slide-in-down 0.5s ease-out; }
        .animate-fade-in-up { animation: fade-in-up 0.5s ease-out; }
        .animation-delay-2000 { animation-delay: 2s; }
      `}</style>
    </div>
  );
};