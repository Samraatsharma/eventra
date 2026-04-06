'use client';

import React, { useEffect, useState, useMemo, memo, useCallback } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { getAllVendors, getVendorsByCategory } from '@/lib/firebase/firestore';
import { Vendor } from '@/types';
import VendorCardSkeleton from '@/components/ui/VendorCardSkeleton';

const categories = ['All', 'Wedding', 'Birthday', 'Catering', 'Decoration'];
const priceRanges = ['All', '₹10k-25k', '₹25k-50k', '₹50k+'];
const locations = ['All', 'Delhi', 'Mumbai', 'Bangalore', 'Bhopal', 'Indore', 'Pune'];

// Memoized vendor card
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
      <div className="group relative bg-surface-container-low rounded-3xl overflow-hidden hover:scale-[1.02] hover:-translate-y-2 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(218,185,255,0.15)]">
        <div className="aspect-[4/5] relative">
          <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-6xl">
            {categoryIcon}
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-transparent to-transparent"></div>

          {/* Floating Glass Panel */}
          <div className="absolute bottom-4 left-4 right-4 holographic-glass rounded-2xl p-6 border border-white/5 shadow-2xl">
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
                Starting from <span className="text-on-surface font-bold">
                  ₹{priceDisplay}
                </span>
              </span>
              <button className="p-2 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-on-primary transition-all">
                →
              </button>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
});

VendorCard.displayName = 'VendorCard';

export default function ExplorePage() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category');

  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(categoryParam || 'All');
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [minRating, setMinRating] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    let mounted = true;

    const fetchVendors = async () => {
      try {
        setLoading(true);
        const result = selectedCategory === 'All' 
          ? await getAllVendors()
          : await getVendorsByCategory(selectedCategory);
        
        if (mounted) {
          setVendors(result);
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
  }, [selectedCategory]);

  const filteredVendors = useMemo(() => {
    return vendors.filter((vendor) => {
      const matchesRating = vendor.rating >= minRating;
      const matchesLocation = selectedLocation === 'All' || vendor.location.includes(selectedLocation);
      const matchesSearch =
        searchQuery === '' ||
        vendor.businessName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        vendor.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        vendor.location.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesRating && matchesLocation && matchesSearch;
    });
  }, [vendors, minRating, selectedLocation, searchQuery]);

  const handleCategoryChange = useCallback((category: string) => {
    setSelectedCategory(category);
  }, []);

  const handleLocationChange = useCallback((location: string) => {
    setSelectedLocation(location);
  }, []);

  const handleRatingChange = useCallback((rating: number) => {
    setMinRating(rating);
  }, []);

  const clearFilters = useCallback(() => {
    setSelectedCategory('All');
    setSelectedLocation('All');
    setMinRating(0);
    setSearchQuery('');
  }, []);

  return (
    <main className="pt-32 pb-20 px-4 md:px-8 max-w-7xl mx-auto">
      {/* Header Section */}
      <header className="mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="text-secondary font-label uppercase tracking-widest text-[10px] mb-2 block">
              Curation Hub
            </span>
            <h1 className="text-5xl md:text-6xl font-headline font-extrabold tracking-tighter text-on-surface">
              Explore <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Services</span>
            </h1>
            <p className="mt-4 text-on-surface-variant max-w-xl font-body">
              Connect with elite vendors curated for extraordinary events across India. From traditional ceremonies to modern celebrations.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative group">
              <input
                className="bg-surface-container-low border-b-2 border-outline-variant focus:border-secondary transition-all outline-none py-2 px-4 w-64 text-sm font-body text-on-surface placeholder:text-outline-variant"
                placeholder="Search services..."
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <span className="absolute right-2 top-2 text-outline-variant">🔍</span>
            </div>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Filters Sidebar */}
        <aside className="lg:col-span-3 space-y-10 sticky top-32">
          {/* Category Filter */}
          <section>
            <h3 className="font-label uppercase tracking-widest text-[10px] text-on-surface mb-6">
              Event Category
            </h3>
            <div className="space-y-3">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                  className={`w-full text-left px-4 py-2 rounded-lg font-medium transition-all ${
                    selectedCategory === category
                      ? 'bg-primary/20 text-primary border border-primary/30'
                      : 'text-on-surface-variant hover:bg-surface-container'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </section>

          {/* Location Filter */}
          <section>
            <h3 className="font-label uppercase tracking-widest text-[10px] text-on-surface mb-4">
              Location
            </h3>
            <div className="space-y-3">
              {locations.map((location) => (
                <label key={location} className="flex items-center gap-3 group cursor-pointer">
                  <div className={`w-4 h-4 border rounded-sm flex items-center justify-center transition-colors ${
                    selectedLocation === location 
                      ? 'border-secondary bg-secondary' 
                      : 'border-outline-variant group-hover:border-secondary'
                  }`}>
                    {selectedLocation === location && (
                      <div className="w-2 h-2 bg-on-secondary rounded-sm"></div>
                    )}
                  </div>
                  <span 
                    className="text-sm font-body text-on-surface-variant group-hover:text-on-surface cursor-pointer"
                    onClick={() => handleLocationChange(location)}
                  >
                    {location}
                  </span>
                </label>
              ))}
            </div>
          </section>

          {/* Rating Filter */}
          <section>
            <h3 className="font-label uppercase tracking-widest text-[10px] text-on-surface mb-4">
              Stellar Rating
            </h3>
            <div className="flex gap-2">
              {[0, 3, 4, 4.5].map((rating) => (
                <button
                  key={rating}
                  onClick={() => handleRatingChange(rating)}
                  className={`px-3 py-2 rounded-lg text-xs font-bold transition-all ${
                    minRating === rating
                      ? 'bg-secondary/20 text-secondary border border-secondary shadow-[0_0_10px_rgba(70,245,224,0.3)]'
                      : 'bg-surface-container border border-outline-variant text-on-surface-variant hover:border-secondary'
                  }`}
                >
                  {rating === 0 ? 'All' : `${rating}+`}
                </button>
              ))}
            </div>
          </section>
        </aside>

        {/* Service Grid */}
        <div className="lg:col-span-9">
          <div className="mb-6">
            <p className="text-on-surface-variant">
              Showing <span className="text-on-surface font-semibold">{filteredVendors.length}</span> vendors
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[...Array(4)].map((_, i) => (
                <VendorCardSkeleton key={i} />
              ))}
            </div>
          ) : filteredVendors.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredVendors.map((vendor) => (
                <VendorCard key={vendor.id} vendor={vendor} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="text-6xl mb-6">🔍</div>
              <p className="text-on-surface-variant text-lg mb-4">
                No vendors found matching your criteria.
              </p>
              <button
                onClick={clearFilters}
                className="px-8 py-3 rounded-xl bg-primary/10 border border-primary/30 text-primary hover:bg-primary/20 transition-all"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
