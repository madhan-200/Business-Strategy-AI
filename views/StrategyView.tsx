import React from 'react';
import { Strategy, BusinessProfile } from '../types';
import { Layers, Users, TrendingUp, DollarSign, Target, ShieldAlert, BarChart3, Download, Sparkles, Rocket, Brain, Zap } from 'lucide-react';
import { exportStrategyToPDF } from '../services/pdfExport';

interface SectionProps {
  title: string;
  icon: string;
  children: React.ReactNode;
  color: string;
}

const Section = ({ title, icon, children, color }: SectionProps) => (
  <div className={`bg-white border-2 border-${color}-100 rounded-3xl overflow-hidden mb-8 shadow-xl shadow-${color}-100/50 hover:shadow-2xl transition-shadow duration-300`}>
    <div className={`p-6 border-b border-${color}-100 flex items-center gap-4 bg-gradient-to-r from-${color}-50 to-white`}>
      <div className="text-4xl animate-bounce-gentle">{icon}</div>
      <h3 className={`text-2xl font-black text-gray-800`}>{title}</h3>
    </div>
    <div className="p-8">
      {children}
    </div>
  </div>
);

interface StrategyViewProps {
  strategy: Strategy;
  business: BusinessProfile;
}

export const StrategyView: React.FC<StrategyViewProps> = ({ strategy, business }) => {

  return (
    <div className="max-w-6xl mx-auto pb-12 space-y-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-black text-gray-800 mb-2 flex items-center gap-3">
            <span className="text-5xl animate-spin-slow">🗺️</span>
            Your Master Plan
          </h1>
          <p className="text-gray-500 font-medium text-lg">Ready to conquer the world? 🌍</p>
        </div>
        <button
          onClick={() => exportStrategyToPDF(strategy, business)}
          className="group flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-2xl transition-all font-bold shadow-lg hover:shadow-xl hover:-translate-y-1"
        >
          <Download size={20} />
          Export PDF
          <span className="text-xl group-hover:animate-bounce">📄</span>
        </button>
      </div>

      <Section title="Target Audience Analysis" icon="👥" color="purple">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-purple-50 p-6 rounded-2xl border border-purple-100 hover:scale-105 transition-transform">
            <h4 className="flex items-center gap-2 text-sm font-black text-purple-400 uppercase tracking-wider mb-4">
              <span className="text-xl">📊</span> Demographics
            </h4>
            <ul className="space-y-3">
              {strategy.targetAudience.demographics.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-700 font-medium">
                  <span className="mt-1 w-2 h-2 rounded-full bg-purple-500 flex-shrink-0"></span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-pink-50 p-6 rounded-2xl border border-pink-100 hover:scale-105 transition-transform">
            <h4 className="flex items-center gap-2 text-sm font-black text-pink-400 uppercase tracking-wider mb-4">
              <span className="text-xl">🧠</span> Psychographics
            </h4>
            <ul className="space-y-3">
              {strategy.targetAudience.psychographics.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-700 font-medium">
                  <span className="mt-1 w-2 h-2 rounded-full bg-pink-500 flex-shrink-0"></span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-red-50 p-6 rounded-2xl border border-red-100 hover:scale-105 transition-transform">
            <h4 className="flex items-center gap-2 text-sm font-black text-red-400 uppercase tracking-wider mb-4">
              <span className="text-xl">😣</span> Pain Points
            </h4>
            <ul className="space-y-3">
              {strategy.targetAudience.painPoints.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-700 font-medium">
                  <span className="mt-1 w-2 h-2 rounded-full bg-red-500 flex-shrink-0"></span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section title="Marketing Channels & ROI" icon="📢" color="blue">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {strategy.marketingChannels.map((channel, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl border-2 border-blue-50 hover:border-blue-200 transition-colors shadow-sm group">
              <div className="flex justify-between items-start mb-3">
                <h4 className="font-black text-gray-800 text-xl flex items-center gap-2">
                  {i === 0 ? '🥇' : i === 1 ? '🥈' : '🥉'} {channel.channel}
                </h4>
                <span className="bg-green-100 text-green-700 text-sm px-3 py-1 rounded-full font-bold border border-green-200 flex items-center gap-1">
                  <TrendingUp size={14} />
                  {channel.roi} ROI
                </span>
              </div>
              <p className="text-gray-600 font-medium leading-relaxed">{channel.rationale}</p>
            </div>
          ))}
        </div>
      </Section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Section title="Sales Funnel" icon="🌪️" color="orange">
          <div className="space-y-6 relative pl-4">
            {/* Visual Connector Line */}
            <div className="absolute left-9 top-4 bottom-4 w-1 bg-orange-100 rounded-full"></div>

            {strategy.salesFunnel.map((step, i) => (
              <div key={i} className="relative flex gap-6 group">
                <div className="w-12 h-12 rounded-2xl bg-white border-4 border-orange-100 flex items-center justify-center shrink-0 z-10 text-orange-500 font-black text-xl shadow-lg group-hover:scale-110 transition-transform bg-orange-50">
                  {i + 1}
                </div>
                <div className="flex-1 bg-orange-50/50 p-4 rounded-xl border border-orange-100 hover:bg-orange-50 transition-colors">
                  <h4 className="text-gray-800 font-bold text-lg mb-1 flex items-center gap-2">
                    {step.stage}
                    {i === 0 && '👀'}
                    {i === 1 && '🤔'}
                    {i === 2 && '🤝'}
                    {i === 3 && '💰'}
                  </h4>
                  <p className="text-sm text-gray-600 font-medium mb-3">{step.tactic}</p>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white rounded-lg text-xs font-bold text-orange-400 shadow-sm border border-orange-100">
                    <Target size={14} />
                    Metric: <span className="text-gray-600">{step.metric}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section title="KPIs & Metrics" icon="📊" color="green">
          <div className="space-y-4 mb-8">
            {strategy.kpis.map((kpi, i) => (
              <div key={i} className="flex justify-between items-center p-4 bg-green-50/50 rounded-xl border border-green-100 hover:bg-green-50 transition-colors">
                <span className="text-gray-700 font-bold flex items-center gap-2">
                  <span className="text-xl">🎯</span> {kpi.metric}
                </span>
                <span className="font-mono font-black text-green-600 bg-white px-3 py-1 rounded-lg shadow-sm border border-green-100">
                  {kpi.target}
                </span>
              </div>
            ))}
          </div>

          <div className="pt-6 border-t-2 border-dashed border-green-100">
            <h4 className="flex items-center gap-2 text-sm font-black text-gray-400 uppercase tracking-wider mb-6">
              <ShieldAlert size={18} /> Competitor Intel
            </h4>
            <div className="space-y-4">
              {strategy.competitors.map((comp, i) => (
                <div key={i} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                  <div className="flex justify-between mb-3">
                    <span className="text-gray-800 font-black text-lg flex items-center gap-2">
                      🦹 {comp.name}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-red-50 p-3 rounded-lg border border-red-100">
                      <p className="text-red-400 text-xs font-bold uppercase mb-1">Weakness 👎</p>
                      <p className="text-gray-700 text-sm font-medium">{comp.weakness}</p>
                    </div>
                    <div className="bg-green-50 p-3 rounded-lg border border-green-100">
                      <p className="text-green-500 text-xs font-bold uppercase mb-1">Strength 💪</p>
                      <p className="text-gray-700 text-sm font-medium">{comp.strength}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Section>
      </div>

      <Section title="Pricing Strategy" icon="💎" color="pink">
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="w-full md:w-1/3 text-center p-8 bg-gradient-to-br from-pink-500 to-purple-600 rounded-3xl text-white shadow-xl shadow-pink-200 transform rotate-2 hover:rotate-0 transition-transform duration-300">
            <h4 className="text-pink-100 text-sm font-bold uppercase tracking-wide mb-2">Recommended Model</h4>
            <p className="text-3xl font-black mb-4">{strategy.pricingStrategy.model}</p>
            <div className="text-6xl animate-bounce-slow">💰</div>
          </div>
          <div className="flex-1">
            <h4 className="text-gray-800 font-black text-xl mb-3 flex items-center gap-2">
              <span className="text-2xl">💡</span> Strategic Analysis
            </h4>
            <p className="text-gray-600 font-medium text-lg leading-relaxed bg-pink-50 p-6 rounded-2xl border border-pink-100">
              {strategy.pricingStrategy.recommendation}
            </p>
          </div>
        </div>
      </Section>
    </div>
  );
};