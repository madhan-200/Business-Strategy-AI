import React from 'react';
import { Strategy } from '../types';
import { Calendar as CalendarIcon, Youtube, Mail, Instagram, Twitter, Linkedin, FileText, CheckCircle2, Clock, Plus, Sparkles } from 'lucide-react';

interface CalendarViewProps {
  strategy: Strategy;
}

export const CalendarView: React.FC<CalendarViewProps> = ({ strategy }) => {
  const [expandedCard, setExpandedCard] = React.useState<number | null>(null);

  const toggleCard = (index: number) => {
    setExpandedCard(expandedCard === index ? null : index);
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'twitter': return <Twitter size={20} />;
      case 'linkedin': return <Linkedin size={20} />;
      case 'instagram': return <Instagram size={20} />;
      case 'youtube': return <Youtube size={20} />;
      case 'email': return <Mail size={20} />;
      default: return <FileText size={20} />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'educational': return 'bg-blue-100 text-blue-600 border-blue-200';
      case 'promotional': return 'bg-green-100 text-green-600 border-green-200';
      case 'engagement': return 'bg-purple-100 text-purple-600 border-purple-200';
      default: return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };

  const getTypeEmoji = (type: string) => {
    switch (type.toLowerCase()) {
      case 'educational': return '🧠';
      case 'promotional': return '📣';
      case 'engagement': return '💬';
      default: return '📝';
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white p-6 rounded-3xl shadow-lg border border-purple-50">
        <div>
          <h2 className="text-3xl font-black text-gray-800 flex items-center gap-3">
            <span className="text-4xl animate-bounce-gentle">📅</span> Content Calendar
          </h2>
          <p className="text-gray-500 font-medium mt-1">Your 30-day roadmap to viral success! 🚀</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <span className="px-4 py-2 rounded-xl bg-blue-50 text-blue-600 border border-blue-100 font-bold flex items-center gap-2 shadow-sm">
            <span className="text-xl">🧠</span> Educational
          </span>
          <span className="px-4 py-2 rounded-xl bg-green-50 text-green-600 border border-green-100 font-bold flex items-center gap-2 shadow-sm">
            <span className="text-xl">📣</span> Promotional
          </span>
          <span className="px-4 py-2 rounded-xl bg-purple-50 text-purple-600 border border-purple-100 font-bold flex items-center gap-2 shadow-sm">
            <span className="text-xl">💬</span> Engagement
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
        {strategy.contentCalendar.map((item, i) => {
          const isExpanded = expandedCard === i;
          return (
            <div
              key={i}
              onClick={() => toggleCard(i)}
              className="bg-white border-2 border-gray-100 rounded-3xl p-6 hover:border-purple-300 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group relative overflow-hidden cursor-pointer"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-purple-100 to-pink-100 rounded-bl-full -mr-4 -mt-4 opacity-50 group-hover:scale-110 transition-transform"></div>

              <div className="flex justify-between items-start mb-4 relative z-10">
                <span className="px-3 py-1 bg-gray-900 text-white text-xs font-black rounded-lg uppercase tracking-wider">
                  Day {item.day}
                </span>
                <div className={`p-2 rounded-xl bg-white shadow-md text-gray-600 group-hover:text-purple-600 group-hover:scale-110 transition-all`}>
                  {getPlatformIcon(item.platform)}
                </div>
              </div>

              <h4 className={`text-gray-800 font-bold text-lg mb-3 leading-tight group-hover:text-purple-600 transition-colors ${isExpanded ? '' : 'line-clamp-2 min-h-[56px]'}`}>
                {item.title}
              </h4>

              <p className={`text-gray-500 text-sm mb-6 leading-relaxed font-medium bg-gray-50 p-3 rounded-xl border border-gray-100 ${isExpanded ? '' : 'line-clamp-3'}`}>
                {item.description}
              </p>

              <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100 relative z-10">
                <span className={`text-xs font-bold px-3 py-1.5 rounded-lg border flex items-center gap-1.5 ${getTypeColor(item.type)}`}>
                  <span className="text-sm">{getTypeEmoji(item.type)}</span>
                  {item.type}
                </span>
                <button
                  className="text-gray-400 hover:text-green-500 transition-colors hover:scale-110 transform"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  {item.status === 'completed' ? <CheckCircle2 size={24} className="text-green-500" /> : <Clock size={24} />}
                </button>
              </div>

              {isExpanded && (
                <div className="mt-3 text-center text-xs text-purple-600 font-bold">
                  Click to collapse ↑
                </div>
              )}
            </div>
          );
        })}

        {/* Add New Placeholder */}
        <div className="border-3 border-dashed border-gray-200 rounded-3xl p-6 flex flex-col items-center justify-center text-gray-400 hover:text-purple-500 hover:border-purple-300 hover:bg-purple-50 transition-all cursor-pointer min-h-[300px] group">
          <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4 group-hover:bg-white group-hover:shadow-lg transition-all">
            <Plus size={32} className="group-hover:rotate-90 transition-transform duration-300" />
          </div>
          <span className="text-lg font-bold">Add Content Item</span>
          <span className="text-sm font-medium opacity-70 mt-1">Keep the momentum going!</span>
        </div>
      </div>
    </div>
  );
};