'use client';

import React, { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import { getVendorById } from '@/lib/firebase/firestore';
import { Vendor } from '@/types';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

export default function VendorProfilePage({ params }: { params: { id: string } }) {
  const [vendor, setVendor] = useState<Vendor | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const fetchVendor = async () => {
      try {
        const vendorData = await getVendorById(params.id);
        if (mounted) {
          setVendor(vendorData);
        }
      } catch (error) {
        console.error('Error fetching vendor:', error);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchVendor();

    return () => {
      mounted = false;
    };
  }, [params.id]);

  const priceDisplay = useMemo(() => {
    if (!vendor) return '0';
    return vendor.priceRange === '$' ? '15k' : vendor.priceRange === '$$' ? '35k' : '60k';
  }, [vendor]);

  const categoryIcon = useMemo(() => {
    if (!vendor) return '🎉';
    const cat = vendor.category[0];
    if (cat === 'Wedding') return '💒';
    if (cat === 'Birthday') return '🎂';
    if (cat === 'Catering') return '🍽️';
    if (cat === 'Decoration') return '🎨';
    return '🎉';
  }, [vendor]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!vendor) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🔍</div>
          <p className="text-on-surface-variant">Vendor not found</p>
        </div>
      </div>
    );
  }

  const vendorNameParts = vendor.businessName.split(' ');
  const firstName = vendorNameParts[0];
  const restName = vendorNameParts.slice(1).join(' ');

  return (
    <div className="relative">
      {/* Hero Section */}
      <header className="relative h-[600px] w-full overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-transparent to-transparent"></div>
        </div>

        <div className="relative z-10 h-full flex flex-col justify-end max-w-7xl mx-auto px-8 pb-24">
          <div className="inline-flex items-center gap-2 bg-secondary/10 border border-secondary/20 px-4 py-1 rounded-full mb-6 w-fit backdrop-blur-md">
            <span className="text-secondary text-sm">✓</span>
            <span className="font-label text-[10px] uppercase tracking-[0.1em] text-secondary font-bold">Premier Vendor</span>
          </div>

          <h1 className="font-headline text-7xl md:text-9xl font-extrabold tracking-tighter text-on-surface leading-none mb-4">
            {firstName} <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary text-glow-primary">{restName}</span>
          </h1>
          <p className="font-body text-xl md:text-2xl text-on-surface-variant max-w-2xl font-light">
            {vendor.description}
          </p>
        </div>
      </header>

      <main className="relative z-20 -mt-20 px-8 max-w-7xl mx-auto space-y-32 pb-32">
        {/* Stats Bar */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-1">
          <div className="md:col-span-3 bg-surface-container/60 glass-overlay rounded-tl-3xl rounded-bl-3xl border-l border-t border-b border-white/5 p-12 flex flex-wrap gap-16">
            <div>
              <span className="block font-label text-[10px] uppercase tracking-widest text-secondary mb-2">Rating</span>
              <span className="block font-headline text-4xl font-bold text-on-surface">{vendor.rating.toFixed(1)} ★</span>
            </div>
            <div>
              <span className="block font-label text-[10px] uppercase tracking-widest text-primary mb-2">Reviews</span>
              <span className="block font-headline text-4xl font-bold text-on-surface">{vendor.reviewCount}+</span>
            </div>
            <div>
              <span className="block font-label text-[10px] uppercase tracking-widest text-secondary mb-2">Location</span>
              <span className="block font-headline text-4xl font-bold text-on-surface">{vendor.location}</span>
            </div>
            <div>
              <span className="block font-label text-[10px] uppercase tracking-widest text-primary mb-2">Base Rate</span>
              <span className="block font-headline text-4xl font-bold text-on-surface">₹{priceDisplay}</span>
            </div>
          </div>

          <Link href="/booking" className="md:col-span-1 bg-gradient-to-br from-primary to-secondary p-12 flex flex-col items-center justify-center rounded-tr-3xl rounded-br-3xl shadow-[0_0_50px_-10px_rgba(70,245,224,0.3)] hover:scale-[1.02] transition-transform duration-500 cursor-pointer group">
            <span className="text-4xl text-on-primary mb-2 group-hover:scale-110 transition-transform">📅</span>
            <span className="font-headline font-extrabold text-on-primary text-xl uppercase tracking-widest">Book Now</span>
            <span className="text-on-primary/70 text-xs mt-2 font-medium">Available Now</span>
          </Link>
        </div>

        {/* Services */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-32 items-center">
          <div className="space-y-12">
            <div className="space-y-4">
              <span className="font-label text-xs uppercase tracking-widest text-primary">Our Expertise</span>
              <h2 className="font-headline text-5xl font-extrabold text-on-surface leading-tight">
                Beyond the <br/>Standard Frame
              </h2>
            </div>
            <div className="space-y-8">
              {vendor.services && vendor.services.length > 0 ? (
                vendor.services.map((service, index) => (
                  <div key={index} className="group cursor-default">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-full border border-secondary/30 flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-on-secondary transition-all">
                        <span className="text-2xl">✨</span>
                      </div>
                      <h4 className="font-headline text-xl font-bold text-on-surface">{service.name}</h4>
                    </div>
                    <p className="text-on-surface-variant leading-relaxed pl-16">
                      {service.description}
                    </p>
                    <p className="text-primary font-bold pl-16 mt-2">₹{service.price.toLocaleString()}</p>
                  </div>
                ))
              ) : (
                <p className="text-on-surface-variant">Contact vendor for service details</p>
              )}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-br from-primary/20 to-secondary/20 blur-3xl opacity-30 rounded-full"></div>
            <div className="aspect-square rounded-full border-2 border-white/5 p-8 relative overflow-hidden bg-surface-container/40 backdrop-blur-3xl">
              <div className="w-full h-full bg-gradient-to-br from-primary/30 to-secondary/30 rounded-full flex items-center justify-center text-9xl">
                {categoryIcon}
              </div>
            </div>
          </div>
        </section>

        {/* Testimonial */}
        <section className="bg-surface-container-low rounded-[4rem] p-24 text-center space-y-8">
          <span className="text-6xl text-secondary opacity-50">"</span>
          <p className="font-headline text-4xl md:text-5xl font-extrabold italic text-on-surface leading-tight max-w-4xl mx-auto">
            "Exceptional service and attention to detail. They transformed our vision into reality."
          </p>
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full overflow-hidden mb-4 border-2 border-primary bg-gradient-to-br from-primary/30 to-secondary/30"></div>
            <span className="font-label text-sm uppercase tracking-widest text-on-surface font-black">Happy Client</span>
            <span className="font-body text-xs text-on-surface-variant">Event Organizer</span>
          </div>
        </section>
      </main>
    </div>
  );
}
