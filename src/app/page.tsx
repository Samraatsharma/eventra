'use client';

import React, { useEffect, useState, useMemo, memo } from 'react';
import Link from 'next/link';
import { getAllVendors } from '@/lib/firebase/firestore';
import { Vendor } from '@/types';
import VendorCardSkeleton from '@/components/ui/VendorCardSkeleton';

const categories = [
  { name: 'Wedding', icon: '💒', color: 'from-pink-500 to-rose-500', desc: 'Celestial ceremonies designed with astronomical precision' },
  { name: 'Birthday', icon: '🎂', color: 'from-purple-500 to-indigo-500', desc: 'Intimate gatherings with personalized curation' },
  { name: 'Catering', icon: '🍽️', color: 'from-orange-500 to-red-500', desc: 'Molecular gastronomy and culinary excellence' },
  { name: 'Decoration', icon: '🎨', color: 'from-cyan-500 to-blue-500', desc: 'Floral artistry and spatial design' },
];

// Memoized category card component
const CategoryCard = memo(({ category, index }: { category: typeof categories[0]; index: number }) => (
  <Link key={category.name} href={`/explore?category=${category.name}`}>
    <div className={`group relative bg-surface-container/40 backdrop-blur-xl border border-white/5 rounded-[2rem] p-8 hover:translate-y-[-10px] transition-all duration-500 hover:border-primary/40 overflow-hidden ${index % 2 === 0 ? 'lg:mt-12' : 'lg:mt-0'}`}>
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
      
      <div className="relative z-10">
        <div className="text-4xl mb-6">{category.icon}</div>
        <h3 className="font-headline text-2xl font-bold mb-4 text-on-surface">{category.name}</h3>
        <p className="text-on-surface-variant text-sm mb-8 leading-relaxed">
          {category.desc}
        </p>
        
        <div className="h-[120px] rounded-xl bg-surface-container-high overflow-hidden">
          <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20"></div>
        </div>
      </div>
    </div>
  </Link>
));

CategoryCard.displayName = 'CategoryCard';

// Memoized vendor card component
const VendorCard = memo(({ vendor }: { vendor: Vendor }) => {
  const priceDisplay = useMemo(() => {
    return vendor.priceRange === '$' ? '15,000' : vendor.priceRange === '$$' ? '35,000' : '60,000';
  }, [vendor.priceRange]);

  const categoryIcon = useMemo(() => {
    const cat = vendor.category[0];
    if (cat === 'Wedding') return '💒';
    if (cat === 'Birthday') return '🎂';
    if (cat === 'Catering') return '🍽️';
    if (cat === 'Decoration') return '🎨';
    return '🎉';
  }, [vendor.category]);

  return (
    <Link href={`/vendor/${vendor.id}`}>
      <div className="group relative bg-surface-container/40 backdrop-blur-xl border border-white/5 rounded-3xl overflow-hidden hover:scale-[1.02] hover:-translate-y-2 transition-all duration-500">
        <div className="aspect-[4/5] relative">
          <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-6xl">
            {categoryIcon}
          </div>
          
          <div className="absolute bottom-4 left-4 right-4 holographic-glass rounded-2xl p-6 border border-white/5">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h4 className="font-headline font-bold text-xl text-on-surface">
                  {vendor.businessName}
                </h4>
                <p className="text-xs font-label uppercase tracking-wider text-secondary">
                  {vendor.category[0]}
                </p>
              </div>
              <div className="bg-secondary/10 px-2 py-1 rounded-md">
                <span className="text-[10px] font-bold text-secondary">
                  {vendor.rating.toFixed(1)} ★
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-body text-on-surface-variant">
                Starting from <span className="text-on-surface font-bold">₹{priceDisplay}</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
});

VendorCard.displayName = 'VendorCard';

export default function HomePage() {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const fetchVendors = async () => {
      try {
        const allVendors = await getAllVendors();
        if (mounted) {
          setVendors(allVendors.slice(0, 4));
        }
      } catch (error) {
        console.error('Error fetching vendors:', error);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchVendors();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="relative min-h-screen">
      {/* Deep Space Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="orb w-[500px] h-[500px] bg-primary top-[-10%] left-[-5%]"></div>
        <div className="orb w-[600px] h-[600px] bg-secondary bottom-[-10%] right-[-5%]"></div>
        <div className="orb w-[300px] h-[300px] bg-tertiary-container top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10"></div>
      </div>

      {/* Hero Section */}
      <main className="relative min-h-screen flex flex-col justify-center items-center px-6 pt-32 pb-20 max-w-7xl mx-auto overflow-hidden">
        <div className="text-center z-10 max-w-4xl">
          <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-label uppercase tracking-[0.2em] mb-8">
            The Next Generation of Curation
          </div>

          <h1 className="text-6xl md:text-8xl font-headline font-extrabold tracking-[-0.04em] text-on-surface mb-8 leading-[0.95]">
            Plan Your Perfect Event — <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary drop-shadow-[0_0_15px_rgba(70,245,224,0.3)]">Without the Chaos</span>
          </h1>

          <p className="text-on-surface-variant text-lg md:text-xl max-w-2xl mx-auto mb-12 font-body">
            The future of event curation is here. Connect with world-class planners, decorators, and caterers across India in one seamless, high-definition experience.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link href="/explore">
              <button className="mesh-gradient-btn px-10 py-4 rounded-full font-bold text-on-primary-container text-lg">
                Explore Services
              </button>
            </Link>
            <Link href="/booking">
              <button className="group px-10 py-4 rounded-full font-bold border border-outline-variant/30 hover:bg-white/5 transition-all text-on-surface flex items-center gap-2">
                Book Event
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </button>
            </Link>
          </div>
        </div>

        {/* Floating Category Cards */}
        <div className="relative w-full mt-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category, index) => (
            <CategoryCard key={category.name} category={category} index={index} />
          ))}
        </div>
      </main>

      {/* Bento Section */}
      <section className="max-w-7xl mx-auto px-6 py-32">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 bg-surface-container-low rounded-[2.5rem] p-12 relative overflow-hidden flex flex-col justify-end min-h-[400px]">
            <div className="absolute top-0 right-0 p-8">
              <span className="text-6xl text-secondary opacity-20">∞</span>
            </div>
            <h2 className="font-headline text-4xl font-extrabold mb-6 text-on-surface">
              Seamless Vendor Synergy
            </h2>
            <p className="text-on-surface-variant max-w-md">
              Our algorithm pairs your vision with the perfect cluster of vendors across India, ensuring a cohesive aesthetic across every touchpoint.
            </p>
          </div>

          <div className="bg-surface-container-high rounded-[2.5rem] p-12 flex flex-col justify-between hover:bg-surface-bright transition-colors duration-300">
            <span className="text-5xl text-primary">👁️</span>
            <div>
              <h3 className="font-headline text-2xl font-bold mb-4 text-on-surface">
                Real-time Visualization
              </h3>
              <p className="text-on-surface-variant text-sm">
                Experience your event layout in 3D before a single decoration is placed.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Vendors */}
      {!loading && vendors.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 py-20">
          <div className="text-center mb-16">
            <h2 className="font-headline text-5xl font-extrabold mb-4 text-on-surface">
              <span className="gradient-text">Featured Vendors</span>
            </h2>
            <p className="text-on-surface-variant text-lg">
              Top-rated service providers trusted across India
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {vendors.map((vendor) => (
              <VendorCard key={vendor.id} vendor={vendor} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/explore">
              <button className="px-10 py-4 rounded-full font-bold border border-outline-variant/30 hover:bg-white/5 transition-all text-on-surface">
                View All Vendors
              </button>
            </Link>
          </div>
        </section>
      )}

      {loading && (
        <section className="max-w-7xl mx-auto px-6 py-20">
          <div className="text-center mb-16">
            <h2 className="font-headline text-5xl font-extrabold mb-4 text-on-surface">
              <span className="gradient-text">Featured Vendors</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(4)].map((_, i) => (
              <VendorCardSkeleton key={i} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
