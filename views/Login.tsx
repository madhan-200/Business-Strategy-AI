import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { LogIn, Mail, Lock, Chrome, ArrowRight, Sparkles, Zap, Rocket } from 'lucide-react';

export const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login, loginWithGoogle } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await login(email, password);
            navigate('/');
        } catch (err: any) {
            setError(err.message || 'Failed to login');
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        setError('');
        setLoading(true);

        try {
            await loginWithGoogle();
            navigate('/');
        } catch (err: any) {
            setError(err.message || 'Failed to login with Google');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center p-4 relative overflow-hidden">
            {/* Animated Background Shapes */}
            <div className="absolute inset-0 overflow-hidden">
                {/* Floating Circles */}
                <div className="absolute top-20 left-20 w-32 h-32 bg-yellow-300 rounded-full opacity-30 animate-bounce-slow"></div>
                <div className="absolute top-40 right-32 w-24 h-24 bg-pink-300 rounded-full opacity-40 animate-bounce-slower"></div>
                <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-blue-300 rounded-full opacity-25 animate-float-slow"></div>
                <div className="absolute bottom-20 right-20 w-28 h-28 bg-green-300 rounded-full opacity-35 animate-wiggle"></div>

                {/* Stars */}
                <div className="absolute top-10 left-1/3 text-6xl animate-spin-slow">⭐</div>
                <div className="absolute top-1/4 right-1/4 text-5xl animate-pulse-slow">✨</div>
                <div className="absolute bottom-1/3 left-1/4 text-4xl animate-bounce-slow">💫</div>
            </div>

            <div className="max-w-6xl w-full grid md:grid-cols-2 gap-12 relative z-10">
                {/* Left Side - Fun Branding */}
                <div className="hidden md:flex flex-col justify-center text-white space-y-8 animate-slide-in-left">
                    {/* Animated Logo */}
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-3xl flex items-center justify-center shadow-2xl transform hover:rotate-12 transition-transform duration-300 animate-bounce-gentle">
                                <span className="text-5xl animate-wiggle-slow">🚀</span>
                            </div>
                            <div className="absolute -top-2 -right-2 text-3xl animate-spin-slow">✨</div>
                        </div>
                        <div>
                            <h1 className="text-5xl font-black bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 bg-clip-text text-transparent">
                                StratAI
                            </h1>
                            <p className="text-sm text-purple-200 font-medium">Powered by Magic ✨</p>
                        </div>
                    </div>

                    {/* Welcome Message */}
                    <div className="space-y-4">
                        <h2 className="text-6xl font-black leading-tight">
                            <span className="inline-block animate-wave">👋</span> Hey There!
                        </h2>
                        <p className="text-3xl font-bold text-yellow-300 animate-pulse-slow">
                            Ready to Rock? 🎸
                        </p>
                        <p className="text-xl text-purple-100">
                            Let's build something <span className="text-yellow-300 font-bold">AMAZING</span> together!
                        </p>
                    </div>

                    {/* Feature Pills */}
                    <div className="flex flex-wrap gap-3">
                        <div className="bg-white/20 backdrop-blur-sm px-5 py-3 rounded-full flex items-center gap-2 animate-bounce-gentle animation-delay-1">
                            <span className="text-2xl">🧠</span>
                            <span className="font-semibold">AI Powered</span>
                        </div>
                        <div className="bg-white/20 backdrop-blur-sm px-5 py-3 rounded-full flex items-center gap-2 animate-bounce-gentle animation-delay-2">
                            <span className="text-2xl">⚡</span>
                            <span className="font-semibold">Super Fast</span>
                        </div>
                        <div className="bg-white/20 backdrop-blur-sm px-5 py-3 rounded-full flex items-center gap-2 animate-bounce-gentle animation-delay-3">
                            <span className="text-2xl">🎯</span>
                            <span className="font-semibold">Smart Goals</span>
                        </div>
                    </div>

                    {/* Animated Characters */}
                    <div className="flex gap-4 pt-4">
                        <span className="text-6xl animate-bounce-slow">🎨</span>
                        <span className="text-6xl animate-wiggle animation-delay-1">💡</span>
                        <span className="text-6xl animate-bounce-slow animation-delay-2">📊</span>
                    </div>
                </div>

                {/* Right Side - Login Form */}
                <div className="flex items-center justify-center animate-slide-in-right">
                    <div className="w-full max-w-md">
                        {/* Error Message */}
                        {error && (
                            <div className="mb-6 p-4 bg-red-400/90 backdrop-blur-sm rounded-2xl text-white text-sm font-semibold flex items-center gap-2 animate-shake-horizontal">
                                <span className="text-2xl">😢</span>
                                {error}
                            </div>
                        )}

                        {/* Login Card */}
                        <div className="bg-white rounded-3xl p-8 shadow-2xl transform hover:scale-105 transition-transform duration-300">
                            {/* Header */}
                            <div className="text-center mb-8">
                                <div className="inline-block mb-4">
                                    <span className="text-7xl animate-wave">👋</span>
                                </div>
                                <h3 className="text-4xl font-black text-gray-800 mb-2">
                                    Welcome Back!
                                </h3>
                                <p className="text-gray-600 font-medium flex items-center justify-center gap-2">
                                    <span>Let's get you in</span>
                                    <span className="text-2xl animate-bounce-gentle">🔑</span>
                                </p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-5">
                                {/* Email Input */}
                                <div className="group">
                                    <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                                        <span className="text-xl">📧</span>
                                        Email Address
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                            autoComplete="off"
                                            className="w-full px-5 py-4 bg-gradient-to-r from-purple-50 to-pink-50 border-3 border-purple-200 rounded-2xl text-gray-800 font-medium placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:shadow-lg transition-all duration-300"
                                            placeholder="your@email.com"
                                        />
                                    </div>
                                </div>

                                {/* Password Input */}
                                <div className="group">
                                    <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                                        <span className="text-xl">🔒</span>
                                        Password
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                            autoComplete="new-password"
                                            className="w-full px-5 py-4 bg-gradient-to-r from-purple-50 to-pink-50 border-3 border-purple-200 rounded-2xl text-gray-800 font-medium placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:shadow-lg transition-all duration-300"
                                            placeholder="Enter your password"
                                        />
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="group w-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 hover:from-purple-600 hover:via-pink-600 hover:to-orange-600 text-white font-black text-lg py-5 rounded-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-xl hover:shadow-2xl transform hover:-translate-y-1 flex items-center justify-center gap-3"
                                >
                                    {loading ? (
                                        <>
                                            <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
                                            <span>Loading Magic...</span>
                                            <span className="text-2xl animate-spin">✨</span>
                                        </>
                                    ) : (
                                        <>
                                            <span className="text-2xl">🚀</span>
                                            Let's Go!
                                            <ArrowRight className="group-hover:translate-x-2 transition-transform" size={24} />
                                        </>
                                    )}
                                </button>
                            </form>

                            {/* Divider */}
                            <div className="relative my-6">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t-2 border-gray-200"></div>
                                </div>
                                <div className="relative flex justify-center">
                                    <span className="px-4 bg-white text-gray-500 font-semibold">or</span>
                                </div>
                            </div>

                            {/* Google Login */}
                            <button
                                onClick={handleGoogleLogin}
                                disabled={loading}
                                className="w-full flex items-center justify-center gap-3 bg-white border-3 border-gray-200 hover:border-purple-300 hover:bg-purple-50 text-gray-700 font-bold py-4 rounded-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
                            >
                                <Chrome size={24} className="text-purple-500" />
                                Continue with Google
                                <span className="text-xl">🎉</span>
                            </button>

                            {/* Sign Up Link */}
                            <p className="mt-6 text-center text-gray-600 font-medium">
                                New here?{' '}
                                <a href="/signup" className="text-purple-600 hover:text-pink-600 font-black transition-colors">
                                    Join the Fun! 🎊
                                </a>
                            </p>
                        </div>
                    </div>
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
                @keyframes wave {
                    0%, 100% { transform: rotate(0deg); }
                    25% { transform: rotate(20deg); }
                    75% { transform: rotate(-20deg); }
                }
                @keyframes slide-in-left {
                    from { opacity: 0; transform: translateX(-50px); }
                    to { opacity: 1; transform: translateX(0); }
                }
                @keyframes slide-in-right {
                    from { opacity: 0; transform: translateX(50px); }
                    to { opacity: 1; transform: translateX(0); }
                }
                @keyframes shake-horizontal {
                    0%, 100% { transform: translateX(0); }
                    25% { transform: translateX(-10px); }
                    75% { transform: translateX(10px); }
                }
                
                .animate-bounce-slow { animation: bounce-slow 3s infinite; }
                .animate-bounce-slower { animation: bounce-slower 4s infinite; }
                .animate-bounce-gentle { animation: bounce-gentle 2s infinite; }
                .animate-float-slow { animation: float-slow 5s infinite; }
                .animate-wiggle { animation: wiggle 2s infinite; }
                .animate-wiggle-slow { animation: wiggle-slow 3s infinite; }
                .animate-spin-slow { animation: spin-slow 10s linear infinite; }
                .animate-pulse-slow { animation: pulse-slow 3s infinite; }
                .animate-wave { animation: wave 2s infinite; }
                .animate-slide-in-left { animation: slide-in-left 0.6s ease-out; }
                .animate-slide-in-right { animation: slide-in-right 0.6s ease-out; }
                .animate-shake-horizontal { animation: shake-horizontal 0.5s ease-in-out; }
                
                .animation-delay-1 { animation-delay: 0.2s; }
                .animation-delay-2 { animation-delay: 0.4s; }
                .animation-delay-3 { animation-delay: 0.6s; }
                
                .border-3 { border-width: 3px; }
            `}</style>
        </div>
    );
};
