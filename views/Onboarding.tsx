import React, { useState } from 'react';
import { BusinessProfile } from '../types';
import { ArrowRight, Sparkles, Briefcase, Users, Target, Rocket, Zap, TrendingUp } from 'lucide-react';

interface OnboardingProps {
    onComplete: (profile: BusinessProfile) => void;
    isLoading: boolean;
}

export const Onboarding: React.FC<OnboardingProps> = ({ onComplete, isLoading }) => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState<BusinessProfile>({
        name: '',
        industry: '',
        niche: '',
        audience: '',
        goals: '',
        challenges: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const nextStep = () => setStep(s => s + 1);
    const prevStep = () => setStep(s => s - 1);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onComplete(formData);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-orange-500 flex items-center justify-center p-4 relative overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-20 left-20 w-32 h-32 bg-yellow-300 rounded-full opacity-30 animate-bounce-slow"></div>
                <div className="absolute top-40 right-32 w-24 h-24 bg-blue-300 rounded-full opacity-40 animate-float-slow"></div>
                <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-green-300 rounded-full opacity-25 animate-wiggle"></div>
                <div className="absolute bottom-20 right-20 w-28 h-28 bg-pink-300 rounded-full opacity-35 animate-bounce-slower"></div>

                {/* Floating Emojis */}
                <div className="absolute top-10 left-1/3 text-6xl animate-spin-slow">🎯</div>
                <div className="absolute top-1/4 right-1/4 text-5xl animate-pulse-slow">💡</div>
                <div className="absolute bottom-1/3 left-1/4 text-4xl animate-bounce-slow">🚀</div>
            </div>

            <div className="max-w-3xl w-full relative z-10">
                {/* Header */}
                <div className="text-center mb-8 animate-slide-in-down">
                    <div className="inline-block mb-4">
                        <div className="w-24 h-24 bg-white rounded-3xl flex items-center justify-center shadow-2xl transform hover:rotate-12 transition-transform duration-300 animate-bounce-gentle">
                            <span className="text-6xl animate-wiggle-slow">🎨</span>
                        </div>
                    </div>
                    <h1 className="text-6xl font-black text-white mb-4 drop-shadow-lg">
                        Let's Build Something <span className="text-yellow-300">EPIC!</span>
                    </h1>
                    <p className="text-2xl text-white/90 font-semibold flex items-center justify-center gap-2">
                        <span>Tell us about your business</span>
                        <span className="text-3xl animate-bounce-gentle">✨</span>
                    </p>
                </div>

                {/* Progress Bar */}
                <div className="mb-8 animate-slide-in-down animation-delay-1">
                    <div className="flex justify-center gap-3 mb-4">
                        {[1, 2, 3].map((s) => (
                            <div key={s} className="flex items-center gap-2">
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg transition-all duration-300 ${step >= s
                                        ? 'bg-white text-purple-600 shadow-lg scale-110'
                                        : 'bg-white/30 text-white'
                                    }`}>
                                    {step > s ? '✓' : s}
                                </div>
                                {s < 3 && (
                                    <div className={`w-16 h-1 rounded-full transition-all duration-300 ${step > s ? 'bg-white' : 'bg-white/30'
                                        }`}></div>
                                )}
                            </div>
                        ))}
                    </div>
                    <div className="text-center">
                        <p className="text-white font-bold text-lg">
                            {step === 1 && '🏢 Basic Info'}
                            {step === 2 && '🎯 Goals & Audience'}
                            {step === 3 && '💪 Challenges'}
                        </p>
                    </div>
                </div>

                {/* Form Card */}
                <div className="bg-white rounded-3xl p-8 shadow-2xl transform hover:scale-105 transition-transform duration-300">
                    <form onSubmit={handleSubmit}>
                        {step === 1 && (
                            <div className="space-y-6 animate-fade-in">
                                {/* Business Name */}
                                <div>
                                    <label className="block text-lg font-black text-gray-800 mb-3 flex items-center gap-2">
                                        <span className="text-3xl">🏢</span>
                                        What's Your Business Called?
                                    </label>
                                    <input
                                        required
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="e.g., Awesome Innovations"
                                        className="w-full px-6 py-5 bg-gradient-to-r from-purple-50 to-pink-50 border-3 border-purple-200 rounded-2xl text-gray-800 text-lg font-semibold placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:shadow-xl transition-all duration-300"
                                    />
                                </div>

                                {/* Industry & Niche */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-lg font-black text-gray-800 mb-3 flex items-center gap-2">
                                            <span className="text-2xl">🏭</span>
                                            Industry
                                        </label>
                                        <input
                                            required
                                            name="industry"
                                            value={formData.industry}
                                            onChange={handleChange}
                                            placeholder="e.g., Tech"
                                            className="w-full px-5 py-4 bg-gradient-to-r from-purple-50 to-pink-50 border-3 border-purple-200 rounded-2xl text-gray-800 font-semibold placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:shadow-lg transition-all duration-300"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-lg font-black text-gray-800 mb-3 flex items-center gap-2">
                                            <span className="text-2xl">🎯</span>
                                            Niche
                                        </label>
                                        <input
                                            required
                                            name="niche"
                                            value={formData.niche}
                                            onChange={handleChange}
                                            placeholder="e.g., SaaS"
                                            className="w-full px-5 py-4 bg-gradient-to-r from-purple-50 to-pink-50 border-3 border-purple-200 rounded-2xl text-gray-800 font-semibold placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:shadow-lg transition-all duration-300"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {step === 2 && (
                            <div className="space-y-6 animate-fade-in">
                                {/* Target Audience */}
                                <div>
                                    <label className="block text-lg font-black text-gray-800 mb-3 flex items-center gap-2">
                                        <span className="text-3xl">👥</span>
                                        Who Are Your Dream Customers?
                                    </label>
                                    <input
                                        required
                                        name="audience"
                                        value={formData.audience}
                                        onChange={handleChange}
                                        placeholder="e.g., Small business owners aged 30-50"
                                        className="w-full px-6 py-5 bg-gradient-to-r from-purple-50 to-pink-50 border-3 border-purple-200 rounded-2xl text-gray-800 text-lg font-semibold placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:shadow-xl transition-all duration-300"
                                    />
                                </div>

                                {/* Goals */}
                                <div>
                                    <label className="block text-lg font-black text-gray-800 mb-3 flex items-center gap-2">
                                        <span className="text-3xl">🚀</span>
                                        What's Your Big Goal?
                                    </label>
                                    <input
                                        required
                                        name="goals"
                                        value={formData.goals}
                                        onChange={handleChange}
                                        placeholder="e.g., Double revenue in 12 months"
                                        className="w-full px-6 py-5 bg-gradient-to-r from-purple-50 to-pink-50 border-3 border-purple-200 rounded-2xl text-gray-800 text-lg font-semibold placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:shadow-xl transition-all duration-300"
                                    />
                                </div>
                            </div>
                        )}

                        {step === 3 && (
                            <div className="space-y-6 animate-fade-in">
                                {/* Challenges */}
                                <div>
                                    <label className="block text-lg font-black text-gray-800 mb-3 flex items-center gap-2">
                                        <span className="text-3xl">💪</span>
                                        What's Holding You Back?
                                    </label>
                                    <textarea
                                        required
                                        name="challenges"
                                        value={formData.challenges}
                                        onChange={handleChange}
                                        rows={6}
                                        placeholder="Tell us your biggest challenges... Be honest! 😊"
                                        className="w-full px-6 py-5 bg-gradient-to-r from-purple-50 to-pink-50 border-3 border-purple-200 rounded-2xl text-gray-800 text-lg font-semibold placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:shadow-xl transition-all duration-300 resize-none"
                                    />
                                </div>
                            </div>
                        )}

                        {/* Navigation Buttons */}
                        <div className="flex justify-between mt-8 pt-6 border-t-2 border-gray-100">
                            {step > 1 ? (
                                <button
                                    type="button"
                                    onClick={prevStep}
                                    className="px-8 py-4 text-lg font-bold text-gray-600 hover:text-purple-600 transition-colors flex items-center gap-2"
                                >
                                    ← Back
                                </button>
                            ) : <div></div>}

                            {step < 3 ? (
                                <button
                                    type="button"
                                    onClick={nextStep}
                                    className="group bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-black text-lg px-8 py-4 rounded-2xl transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 flex items-center gap-3"
                                >
                                    Next Step
                                    <ArrowRight className="group-hover:translate-x-2 transition-transform" size={24} />
                                </button>
                            ) : (
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="group bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 hover:from-green-600 hover:via-blue-600 hover:to-purple-600 text-white font-black text-xl px-10 py-5 rounded-2xl transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3"
                                >
                                    {isLoading ? (
                                        <>
                                            <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
                                            <span>Creating Magic...</span>
                                            <span className="text-2xl animate-spin">✨</span>
                                        </>
                                    ) : (
                                        <>
                                            <span className="text-3xl">🚀</span>
                                            Launch My Strategy!
                                            <Sparkles className="group-hover:rotate-12 transition-transform" size={24} />
                                        </>
                                    )}
                                </button>
                            )}
                        </div>
                    </form>
                </div>

                {/* Fun Footer */}
                <div className="mt-6 text-center animate-slide-in-up">
                    <p className="text-white text-lg font-semibold flex items-center justify-center gap-2">
                        <span>Powered by AI Magic</span>
                        <span className="text-2xl animate-pulse-slow">✨</span>
                        <span className="text-2xl animate-bounce-slow">🧠</span>
                        <span className="text-2xl animate-wiggle">⚡</span>
                    </p>
                </div>
            </div>

            <style>{`
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        @keyframes bounce-slower {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-30px); }
        }
        @keyframes bounce-gentle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        @keyframes float-slow {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(10px, -10px); }
        }
        @keyframes wiggle {
          0%, 100% { transform: rotate(-5deg); }
          50% { transform: rotate(5deg); }
        }
        @keyframes wiggle-slow {
          0%, 100% { transform: rotate(-3deg); }
          50% { transform: rotate(3deg); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slide-in-down {
          from { opacity: 0; transform: translateY(-30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slide-in-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-bounce-slow { animation: bounce-slow 3s infinite; }
        .animate-bounce-slower { animation: bounce-slower 4s infinite; }
        .animate-bounce-gentle { animation: bounce-gentle 2s infinite; }
        .animate-float-slow { animation: float-slow 5s infinite; }
        .animate-wiggle { animation: wiggle 2s infinite; }
        .animate-wiggle-slow { animation: wiggle-slow 3s infinite; }
        .animate-spin-slow { animation: spin-slow 10s linear infinite; }
        .animate-pulse-slow { animation: pulse-slow 3s infinite; }
        .animate-fade-in { animation: fade-in 0.5s ease-out; }
        .animate-slide-in-down { animation: slide-in-down 0.6s ease-out; }
        .animate-slide-in-up { animation: slide-in-up 0.6s ease-out; }
        
        .animation-delay-1 { animation-delay: 0.2s; }
        .animation-delay-2 { animation-delay: 0.4s; }
        .animation-delay-3 { animation-delay: 0.6s; }
        
        .border-3 { border-width: 3px; }
      `}</style>
        </div>
    );
};