import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full border-t border-white/5 pt-20 pb-10 bg-surface-container-lowest">
      <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1">
          <div className="text-primary font-bold font-headline text-xl mb-4">
            Eventra Galactic
          </div>
          <p className="text-zinc-500 font-body text-xs uppercase tracking-widest">
            Architecting experiences beyond the horizon.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <h4 className="text-secondary font-label uppercase tracking-widest text-xs mb-2">
            Explore
          </h4>
          <Link href="/privacy" className="text-zinc-500 hover:text-primary transition-colors duration-200 font-label uppercase tracking-widest text-xs">
            Privacy Policy
          </Link>
          <Link href="/terms" className="text-zinc-500 hover:text-primary transition-colors duration-200 font-label uppercase tracking-widest text-xs">
            Terms of Service
          </Link>
        </div>

        <div className="flex flex-col gap-3">
          <h4 className="text-secondary font-label uppercase tracking-widest text-xs mb-2">
            Connect
          </h4>
          <Link href="/contact" className="text-zinc-500 hover:text-primary transition-colors duration-200 font-label uppercase tracking-widest text-xs">
            Contact
          </Link>
          <Link href="/press" className="text-zinc-500 hover:text-primary transition-colors duration-200 font-label uppercase tracking-widest text-xs">
            Press Kit
          </Link>
        </div>

        <div className="flex flex-col gap-3">
          <h4 className="text-secondary font-label uppercase tracking-widest text-xs mb-2">
            Company
          </h4>
          <Link href="/careers" className="text-zinc-500 hover:text-primary transition-colors duration-200 font-label uppercase tracking-widest text-xs">
            Careers
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-zinc-500 font-label uppercase tracking-widest text-xs">
          © 2024 Eventra Galactic. All rights reserved.
        </div>
        <div className="flex gap-6 text-zinc-500">
          <span className="hover:text-secondary cursor-pointer transition-colors">🌐</span>
          <span className="hover:text-secondary cursor-pointer transition-colors">📧</span>
        </div>
      </div>
    </footer>
  );
}
