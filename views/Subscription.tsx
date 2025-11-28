import React from 'react';
import { Check, Zap, Star, Shield, Crown, Sparkles, Rocket } from 'lucide-react';

export const Subscription: React.FC = () => {
    const plans = [
        {
            name: 'Starter',
            price: '$0',
            period: '/month',
            description: 'Perfect for small businesses just getting started.',
            features: [
                '1 Business Profile',
                'Basic Strategy Generation',
                '7-Day Content Calendar',
                'PDF Export',
                'Email Support'
            ],
            cta: 'Current Plan',
            popular: false,
            color: 'blue',
            emoji: '🌱'
        },
        {
            name: 'Pro',
            price: '$29',
            period: '/month',
            description: 'Advanced tools for growing businesses.',
            features: [
                '3 Business Profiles',
                'Advanced AI Strategy',
                '30-Day Content Calendar',
                'Competitor Analysis',
                'Weekly Auto-Updates',
                'Priority Support'
            ],
            cta: 'Upgrade to Pro',
            popular: true,
            color: 'purple',
            emoji: '🚀'
        },
        {
            name: 'Agency',
            price: '$99',
            period: '/month',
            description: 'For marketing agencies managing multiple clients.',
            features: [
                'Unlimited Profiles',
                'White-label Reports',
                'API Access',
                'Team Collaboration',
                'Custom Integrations',
                'Dedicated Account Manager'
            ],
            cta: 'Contact Sales',
            popular: false,
            color: 'pink',
            emoji: '👑'
        }
    ];

    return (
        <div className="max-w-6xl mx-auto pb-12">
            <div className="text-center mb-16 relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-200 rounded-full blur-[100px] -z-10"></div>
                <h2 className="text-5xl font-black text-gray-800 mb-6 flex items-center justify-center gap-4">
                    <span className="text-6xl animate-bounce-gentle">💎</span>
                    Choose Your Power-Up
                </h2>
                <p className="text-xl text-gray-500 max-w-2xl mx-auto font-medium leading-relaxed">
                    Unlock the full potential of your business with our premium tools.
                    <br />Scale faster, smarter, and easier! ✨
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
                {plans.map((plan, index) => (
                    <div
                        key={index}
                        className={`relative bg-white rounded-[2rem] p-8 flex flex-col transition-all duration-300 ${plan.popular
                                ? 'border-4 border-purple-500 shadow-2xl shadow-purple-200 scale-105 z-10'
                                : 'border border-gray-100 shadow-xl hover:-translate-y-2'
                            }`}
                    >
                        {plan.popular && (
                            <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-black px-6 py-2 rounded-full uppercase tracking-wide shadow-lg flex items-center gap-2">
                                <Sparkles size={16} className="animate-spin-slow" />
                                Most Popular
                            </div>
                        )}

                        <div className="mb-8 text-center">
                            <div className="text-6xl mb-4 animate-bounce-gentle">{plan.emoji}</div>
                            <h3 className="text-2xl font-black text-gray-800 mb-2">{plan.name}</h3>
                            <div className="flex items-baseline justify-center gap-1">
                                <span className={`text-5xl font-black ${plan.popular ? 'text-purple-600' : 'text-gray-800'}`}>
                                    {plan.price}
                                </span>
                                <span className="text-gray-400 font-bold">{plan.period}</span>
                            </div>
                            <p className="text-gray-500 font-medium mt-4 leading-relaxed">{plan.description}</p>
                        </div>

                        <div className="flex-1 mb-8 bg-gray-50 rounded-2xl p-6">
                            <ul className="space-y-4">
                                {plan.features.map((feature, i) => (
                                    <li key={i} className="flex items-start gap-3 text-sm font-bold text-gray-600">
                                        <div className={`mt-0.5 p-1 rounded-full ${plan.popular ? 'bg-purple-100 text-purple-600' : 'bg-green-100 text-green-600'}`}>
                                            <Check size={12} strokeWidth={4} />
                                        </div>
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <button
                            className={`w-full py-4 rounded-xl font-black text-lg transition-all transform hover:scale-105 active:scale-95 ${plan.popular
                                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg shadow-purple-500/30'
                                    : 'bg-gray-900 hover:bg-gray-800 text-white shadow-lg'
                                }`}
                        >
                            {plan.cta}
                        </button>
                    </div>
                ))}
            </div>

            <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-blue-50 border border-blue-100 p-8 rounded-3xl flex items-start gap-4 hover:scale-105 transition-transform">
                    <div className="p-4 bg-white rounded-2xl text-blue-500 shadow-sm">
                        <Zap size={32} />
                    </div>
                    <div>
                        <h4 className="text-gray-800 font-black text-lg mb-2">Instant Setup ⚡</h4>
                        <p className="text-gray-600 font-medium">Get started in seconds. No credit card required for the free plan.</p>
                    </div>
                </div>
                <div className="bg-purple-50 border border-purple-100 p-8 rounded-3xl flex items-start gap-4 hover:scale-105 transition-transform">
                    <div className="p-4 bg-white rounded-2xl text-purple-500 shadow-sm">
                        <Shield size={32} />
                    </div>
                    <div>
                        <h4 className="text-gray-800 font-black text-lg mb-2">Secure & Private 🔒</h4>
                        <p className="text-gray-600 font-medium">Your business data is encrypted and never shared with third parties.</p>
                    </div>
                </div>
                <div className="bg-pink-50 border border-pink-100 p-8 rounded-3xl flex items-start gap-4 hover:scale-105 transition-transform">
                    <div className="p-4 bg-white rounded-2xl text-pink-500 shadow-sm">
                        <Star size={32} />
                    </div>
                    <div>
                        <h4 className="text-gray-800 font-black text-lg mb-2">Satisfaction Guarantee 💖</h4>
                        <p className="text-gray-600 font-medium">Not happy with Pro? Get a full refund within 14 days, no questions asked.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
