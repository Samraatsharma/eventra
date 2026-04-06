'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignup, setIsSignup] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, signup } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isSignup) {
        await signup(email, password);
      } else {
        await login(email, password);
      }
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center p-6 md:p-12">
      {/* Deep Space Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="orb w-[500px] h-[500px] bg-primary top-[-10%] left-[-5%]"></div>
        <div className="orb w-[600px] h-[600px] bg-secondary bottom-[-10%] right-[-5%]"></div>
        <div className="orb w-[300px] h-[300px] bg-tertiary-container top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10"></div>
      </div>

      {/* Main Auth Container */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 max-w-6xl w-full min-h-[720px] rounded-3xl overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.8)] border border-white/5 relative z-10">
        
        {/* Left Side: Visual/Branding */}
        <div className="hidden lg:flex flex-col justify-between p-16 relative bg-surface-container-lowest overflow-hidden">
          <div className="relative z-10">
            <h1 className="font-headline text-4xl font-black tracking-tighter text-primary mb-2">
              Eventra
            </h1>
            <p className="font-label text-xs uppercase tracking-[0.3em] text-secondary">
              The Celestial Architect
            </p>
          </div>

          <div className="relative z-10 space-y-8">
            <div className="space-y-4">
              <h2 className="font-headline text-5xl font-extrabold tracking-tight text-on-surface leading-tight">
                Design the <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-tertiary">
                  Extraordinary.
                </span>
              </h2>
              <p className="text-lg text-on-surface-variant max-w-md leading-relaxed">
                Join the network for high-end events, venues, and experiences across India.
              </p>
            </div>

            <div className="flex items-center gap-6 pt-8">
              <div className="flex -space-x-4">
                <div className="w-12 h-12 rounded-full border-2 border-surface-container bg-gradient-to-br from-primary/30 to-secondary/30"></div>
                <div className="w-12 h-12 rounded-full border-2 border-surface-container bg-gradient-to-br from-secondary/30 to-tertiary/30"></div>
                <div className="w-12 h-12 rounded-full border-2 border-surface-container bg-gradient-to-br from-tertiary/30 to-primary/30"></div>
              </div>
              <p className="font-label text-xs uppercase tracking-widest text-on-surface-variant">
                Trusted by 12k+ Planners
              </p>
            </div>
          </div>

          {/* Abstract Background */}
          <div className="absolute inset-0 z-0">
            <div className="w-full h-full bg-gradient-to-br from-primary/5 to-secondary/5"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-transparent to-transparent"></div>
          </div>
        </div>

        {/* Right Side: Auth Forms */}
        <div className="flex flex-col justify-center p-8 md:p-16 bg-surface-container relative">
          {/* Form Switcher */}
          <div className="absolute top-12 right-8 md:right-16 flex items-center gap-2">
            <span className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant">
              Access Node:
            </span>
            <div className="flex bg-surface-container-low p-1 rounded-full border border-outline-variant/20">
              <button
                onClick={() => setIsSignup(false)}
                className={`px-4 py-1.5 rounded-full text-[11px] font-label uppercase tracking-widest transition-all ${
                  !isSignup
                    ? 'bg-primary text-on-primary shadow-[0_0_15px_rgba(218,185,255,0.3)]'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                Login
              </button>
              <button
                onClick={() => setIsSignup(true)}
                className={`px-4 py-1.5 rounded-full text-[11px] font-label uppercase tracking-widest transition-all ${
                  isSignup
                    ? 'bg-primary text-on-primary shadow-[0_0_15px_rgba(218,185,255,0.3)]'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                Sign Up
              </button>
            </div>
          </div>

          <div className="w-full max-w-sm mx-auto">
            <div className="mb-10">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-surface-container-high border border-outline-variant/30 mb-6 group">
                <span className="text-primary text-2xl group-hover:scale-110 transition-transform duration-300">
                  🔓
                </span>
              </div>
              <h3 className="font-headline text-3xl font-bold text-on-surface mb-2">
                {isSignup ? 'Create Account' : 'Welcome Back'}
              </h3>
              <p className="text-on-surface-variant">
                {isSignup 
                  ? 'Join the celestial network of event creators.' 
                  : 'Secure access to your celestial dashboard.'}
              </p>
            </div>

            {error && (
              <div className="mb-6 p-4 rounded-xl bg-error-container/20 border border-error/30 text-error text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Input */}
              <div className="space-y-1 group">
                <label 
                  className="font-label text-[10px] uppercase tracking-[0.2em] text-on-surface-variant group-focus-within:text-secondary transition-colors"
                  htmlFor="email"
                >
                  Neural Identifier
                </label>
                <div className="relative">
                  <input
                    className="w-full bg-transparent border-0 border-b border-outline/30 py-3 text-on-surface focus:ring-0 focus:border-secondary transition-all placeholder:text-outline/40"
                    id="email"
                    type="email"
                    placeholder="email@eventra.in"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <div className="absolute bottom-0 left-0 h-[1px] w-0 bg-secondary group-focus-within:w-full transition-all duration-500 shadow-[0_0_10px_#46f5e0]"></div>
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-1 group">
                <div className="flex justify-between items-center">
                  <label 
                    className="font-label text-[10px] uppercase tracking-[0.2em] text-on-surface-variant group-focus-within:text-secondary transition-colors"
                    htmlFor="password"
                  >
                    Access Protocol
                  </label>
                  {!isSignup && (
                    <a className="font-label text-[10px] uppercase tracking-widest text-primary hover:text-secondary transition-colors" href="#">
                      Reset Key
                    </a>
                  )}
                </div>
                <div className="relative">
                  <input
                    className="w-full bg-transparent border-0 border-b border-outline/30 py-3 text-on-surface focus:ring-0 focus:border-secondary transition-all placeholder:text-outline/40"
                    id="password"
                    type="password"
                    placeholder="••••••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <div className="absolute bottom-0 left-0 h-[1px] w-0 bg-secondary group-focus-within:w-full transition-all duration-500 shadow-[0_0_10px_#46f5e0]"></div>
                </div>
              </div>

              {!isSignup && (
                <div className="flex items-center gap-3 pt-2">
                  <input
                    className="w-4 h-4 rounded border-outline-variant/40 bg-surface-container-high text-primary focus:ring-primary focus:ring-offset-surface-container"
                    id="remember"
                    type="checkbox"
                  />
                  <label 
                    className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant cursor-pointer"
                    htmlFor="remember"
                  >
                    Stay Authenticated
                  </label>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full relative overflow-hidden group py-4 rounded-xl bg-gradient-to-r from-primary to-secondary text-on-primary font-label text-[11px] uppercase tracking-[0.3em] font-bold shadow-[0_8px_32px_rgba(218,185,255,0.2)] hover:shadow-[0_8px_40px_rgba(70,245,224,0.3)] hover:scale-[1.02] transition-all duration-300 disabled:opacity-50"
              >
                <span className="relative z-10">
                  {loading ? 'Processing...' : (isSignup ? 'Create Account' : 'Initialize Session')}
                </span>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              </button>
            </form>

            <div className="relative my-10">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-outline-variant/10"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="bg-surface-container px-4 font-label text-[10px] uppercase tracking-widest text-outline">
                  Alternative Uplinks
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center gap-3 py-3 rounded-xl border border-outline-variant/20 bg-surface-container-high hover:bg-surface-bright transition-all group">
                <span className="text-on-surface group-hover:text-primary transition-colors">G</span>
                <span className="font-label text-[10px] uppercase tracking-widest">Google</span>
              </button>
              <button className="flex items-center justify-center gap-3 py-3 rounded-xl border border-outline-variant/20 bg-surface-container-high hover:bg-surface-bright transition-all group">
                <span className="text-on-surface group-hover:text-primary transition-colors">⌘</span>
                <span className="font-label text-[10px] uppercase tracking-widest">Github</span>
              </button>
            </div>
          </div>

          {/* Footer */}
          <div className="absolute bottom-8 left-0 right-0 text-center">
            <p className="font-label text-[9px] uppercase tracking-[0.4em] text-outline/40">
              © 2024 Eventra Galactic. Encrypted Access Only.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
