import React from 'react';
import { Strategy, BusinessProfile } from '../types';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { TrendingUp, Users, DollarSign, Activity, ArrowUpRight, Sparkles, Trophy } from 'lucide-react';

interface DashboardProps {
  strategy: Strategy;
  business: BusinessProfile;
}

export const Dashboard: React.FC<DashboardProps> = ({ strategy, business }) => {
  // Mock data for the chart based on the growth score
  const score = strategy.growthScore;
  const growthData = [
    { name: 'Week 1', score: score - 15 },
    { name: 'Week 2', score: score - 10 },
    { name: 'Week 3', score: score - 5 },
    { name: 'Week 4', score: score },
    { name: 'Proj. W5', score: Math.min(100, score + 5) },
    { name: 'Proj. W6', score: Math.min(100, score + 8) },
  ];

  return (
    <div className="space-y-8">
      {/* Top Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Growth Score Card */}
        <div className="bg-white p-6 rounded-3xl shadow-xl shadow-blue-100 border border-blue-50 relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-100 rounded-full blur-2xl -mr-10 -mt-10 group-hover:bg-blue-200 transition-all"></div>
          <div className="flex justify-between items-start mb-4 relative z-10">
            <div>
              <p className="text-gray-500 text-sm font-bold uppercase tracking-wider">Growth Score</p>
              <h3 className="text-4xl font-black text-gray-800 mt-2 flex items-baseline gap-1">
                {strategy.growthScore}
                <span className="text-lg text-gray-400 font-medium">/100</span>
              </h3>
            </div>
            <div className={`p-3 rounded-2xl ${strategy.growthScore > 70 ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'} shadow-sm`}>
              <span className="text-2xl">📈</span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-green-600 font-bold bg-green-50 inline-block px-3 py-1 rounded-full">
            <ArrowUpRight size={16} />
            <span>+12% vs last month</span>
          </div>
        </div>

        {/* Target Audience Card */}
        <div className="bg-white p-6 rounded-3xl shadow-xl shadow-purple-100 border border-purple-50 relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
          <div className="absolute top-0 right-0 w-32 h-32 bg-purple-100 rounded-full blur-2xl -mr-10 -mt-10 group-hover:bg-purple-200 transition-all"></div>
          <div className="flex justify-between items-start mb-4 relative z-10">
            <div>
              <p className="text-gray-500 text-sm font-bold uppercase tracking-wider">Audience</p>
              <h3 className="text-xl font-black text-gray-800 mt-2 line-clamp-2 leading-tight">
                {strategy.targetAudience.demographics[0] || 'N/A'}
              </h3>
            </div>
            <div className="p-3 rounded-2xl bg-purple-100 text-purple-600 shadow-sm">
              <span className="text-2xl">👥</span>
            </div>
          </div>
          <p className="text-sm text-gray-500 line-clamp-1 font-medium flex items-center gap-1">
            <span className="text-lg">🎯</span>
            {strategy.targetAudience.painPoints[0]}
          </p>
        </div>

        {/* Top Channel Card */}
        <div className="bg-white p-6 rounded-3xl shadow-xl shadow-pink-100 border border-pink-50 relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
          <div className="absolute top-0 right-0 w-32 h-32 bg-pink-100 rounded-full blur-2xl -mr-10 -mt-10 group-hover:bg-pink-200 transition-all"></div>
          <div className="flex justify-between items-start mb-4 relative z-10">
            <div>
              <p className="text-gray-500 text-sm font-bold uppercase tracking-wider">Top Channel</p>
              <h3 className="text-2xl font-black text-gray-800 mt-2">
                {strategy.marketingChannels[0]?.channel || 'N/A'}
              </h3>
            </div>
            <div className="p-3 rounded-2xl bg-pink-100 text-pink-600 shadow-sm">
              <span className="text-2xl">📢</span>
            </div>
          </div>
          <p className="text-sm text-gray-500 font-medium flex items-center gap-1">
            <span className="text-lg">🔥</span> High ROI potential
          </p>
        </div>

        {/* Pricing Model Card */}
        <div className="bg-white p-6 rounded-3xl shadow-xl shadow-orange-100 border border-orange-50 relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
          <div className="absolute top-0 right-0 w-32 h-32 bg-orange-100 rounded-full blur-2xl -mr-10 -mt-10 group-hover:bg-orange-200 transition-all"></div>
          <div className="flex justify-between items-start mb-4 relative z-10">
            <div>
              <p className="text-gray-500 text-sm font-bold uppercase tracking-wider">Pricing</p>
              <h3 className="text-2xl font-black text-gray-800 mt-2">
                {strategy.pricingStrategy.model}
              </h3>
            </div>
            <div className="p-3 rounded-2xl bg-orange-100 text-orange-600 shadow-sm">
              <span className="text-2xl">💰</span>
            </div>
          </div>
          <p className="text-sm text-gray-500 font-medium flex items-center gap-1">
            <span className="text-lg">💎</span> Optimized for LTV
          </p>
        </div>
      </div>

      {/* Main Chart Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white border border-gray-100 p-8 rounded-3xl shadow-xl shadow-gray-100/50">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl font-black text-gray-800 flex items-center gap-2">
                <span className="text-3xl">🚀</span> Growth Trajectory
              </h2>
              <p className="text-gray-500 text-sm font-medium mt-1">Projected performance over time</p>
            </div>
            <select className="bg-gray-50 border border-gray-200 text-sm font-bold rounded-xl px-4 py-2 text-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 cursor-pointer hover:bg-gray-100 transition-colors">
              <option>Last 30 Days</option>
              <option>Quarterly</option>
            </select>
          </div>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={growthData}>
                <defs>
                  <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
                <XAxis dataKey="name" stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} fontWeight={600} />
                <YAxis stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} fontWeight={600} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#fff', border: 'none', borderRadius: '16px', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)', fontWeight: 'bold' }}
                  itemStyle={{ color: '#6B7280' }}
                />
                <Area type="monotone" dataKey="score" stroke="#8B5CF6" strokeWidth={4} fillOpacity={1} fill="url(#colorScore)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Executive Summary Card */}
        <div className="bg-gradient-to-br from-purple-600 to-indigo-600 p-8 rounded-3xl shadow-xl shadow-purple-200 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
          <div className="relative z-10 h-full flex flex-col">
            <h2 className="text-2xl font-black mb-6 flex items-center gap-2">
              <span className="text-3xl">📝</span> Executive Summary
            </h2>
            <div className="flex-1 overflow-y-auto custom-scrollbar pr-2">
              <p className="text-purple-100 text-sm leading-relaxed font-medium">
                {strategy.summary}
              </p>
            </div>

            <div className="mt-6 pt-6 border-t border-white/20">
              <h4 className="font-bold mb-3 text-xs uppercase tracking-wider text-purple-200">Key Focus Areas</h4>
              <div className="flex flex-wrap gap-2">
                {strategy.marketingChannels.slice(0, 3).map((c, i) => (
                  <span key={i} className="px-3 py-1.5 bg-white/20 backdrop-blur-md border border-white/10 rounded-lg text-xs font-bold text-white shadow-sm">
                    {c.channel}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};