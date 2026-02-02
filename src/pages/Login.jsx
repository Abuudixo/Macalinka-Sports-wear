import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight, Github } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';
import Logo from '../components/layout/Logo';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, loading, error: authError } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const user = await login(email, password);
            if (user?.role === 'admin') {
                navigate('/admin');
            } else {
                navigate('/dashboard');
            }
        } catch (error) {
            console.error('Login failed', error);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center container-custom mx-auto p-4">
            <div className="w-full max-w-md">
                <div className="text-center mb-10">
                    <div className="flex justify-center mb-6">
                        <Logo className="w-16 h-16" classNameText="text-3xl" />
                    </div>
                    <h1 className="text-3xl font-black uppercase tracking-tighter mb-2">Welcome Back</h1>
                    <p className="text-gray-400">Sign in to access your orders and elite gear.</p>
                </div>

                <div className="bg-dark-800 p-8 rounded-2xl border border-white/5 shadow-2xl">
                    {authError && (
                        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-xl text-red-500 text-sm font-bold uppercase tracking-wider animate-shake">
                            {authError}
                        </div>
                    )}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-dark-700 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-primary transition-colors"
                                    placeholder="name@example.com"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between items-center ml-1">
                                <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Password</label>
                                <a href="#" className="text-xs text-primary hover:underline">Forgot?</a>
                            </div>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                <input
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-dark-700 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-primary transition-colors"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        <Button
                            type="submit"
                            size="lg"
                            className="w-full py-7 text-lg uppercase tracking-widest"
                            disabled={loading}
                        >
                            {loading ? "Authenticating..." : "Sign In"} <ArrowRight className="w-5 h-5 ml-2" />
                        </Button>
                    </form>

                    <div className="mt-8 flex items-center gap-4">
                        <div className="h-px bg-white/10 flex-grow" />
                        <span className="text-xs text-gray-500 uppercase tracking-widest">Or continue with</span>
                        <div className="h-px bg-white/10 flex-grow" />
                    </div>

                    <div className="mt-6">
                        <Button variant="outline" className="w-full py-4 border-white/10 hover:bg-white/5">
                            <Github className="w-5 h-5 mr-3" /> GitHub
                        </Button>
                    </div>
                </div>

                <p className="mt-8 text-center text-gray-400">
                    Don't have an account? <Link to="/signup" className="text-primary font-bold hover:underline">Join The Squad</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
