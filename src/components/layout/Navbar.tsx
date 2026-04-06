'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

export default function Navbar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-7xl rounded-full border border-white/10 bg-zinc-900/70 backdrop-blur-xl flex justify-between items-center px-8 py-3 z-50 shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
      <Link href="/" className="text-2xl font-black tracking-tighter text-primary drop-shadow-[0_0_8px_rgba(218,185,255,0.4)] font-headline">
        Eventra
      </Link>

      <div className="hidden md:flex items-center gap-8">
        <Link 
          href="/" 
          className={`font-body tracking-tight text-sm transition-all ${
            isActive('/') 
              ? 'text-secondary border-b border-secondary pb-1' 
              : 'text-zinc-400 hover:text-zinc-100'
          }`}
        >
          Discover
        </Link>
        <Link 
          href="/explore" 
          className={`font-body tracking-tight text-sm transition-all ${
            isActive('/explore') 
              ? 'text-secondary border-b border-secondary pb-1' 
              : 'text-zinc-400 hover:text-zinc-100'
          }`}
        >
          Services
        </Link>
        <Link 
          href="/booking" 
          className={`font-body tracking-tight text-sm transition-all ${
            isActive('/booking') 
              ? 'text-secondary border-b border-secondary pb-1' 
              : 'text-zinc-400 hover:text-zinc-100'
          }`}
        >
          Book Event
        </Link>
        {user && (
          <Link 
            href="/dashboard" 
            className={`font-body tracking-tight text-sm transition-all ${
              isActive('/dashboard') 
                ? 'text-secondary border-b border-secondary pb-1' 
                : 'text-zinc-400 hover:text-zinc-100'
            }`}
          >
            Dashboard
          </Link>
        )}
      </div>

      <div className="flex items-center gap-4">
        {user ? (
          <>
            <span className="hidden md:block text-sm text-on-surface-variant">
              {user.email}
            </span>
            <button
              onClick={logout}
              className="text-primary hover:text-secondary font-bold text-sm transition-colors"
            >
              Logout
            </button>
          </>
        ) : (
          <Link 
            href="/login"
            className="bg-primary text-on-primary-container px-6 py-2 rounded-full font-headline font-bold text-sm hover:scale-105 transition-transform duration-300"
          >
            Get Started
          </Link>
        )}
      </div>
    </nav>
  );
}
