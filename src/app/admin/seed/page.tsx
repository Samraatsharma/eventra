'use client';

import React, { useState } from 'react';
import { collection, addDoc, getDocs, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';

const seedVendors = [
  {
    businessName: 'Aether Studios Delhi',
    email: 'contact@aetherstudios.in',
    category: ['Wedding', 'Decoration'],
    description: 'Architecting immersive digital environments and sensory-rich gala experiences for the next generation of events across India.',
    location: 'Delhi, India',
    priceRange: '$$$',
    rating: 4.9,
    reviewCount: 450,
    gallery: [],
    userId: 'seed-user-1',
  },
  {
    businessName: 'Prism Audio-Visual Mumbai',
    email: 'hello@prismaudio.in',
    category: ['Wedding', 'Birthday'],
    description: 'Tech entertainment specialists bringing futuristic audio-visual experiences to Indian celebrations.',
    location: 'Mumbai, Maharashtra',
    priceRange: '$$',
    rating: 4.8,
    reviewCount: 320,
    gallery: [],
    userId: 'seed-user-2',
  },
  {
    businessName: 'Nebula Gastronomy Bangalore',
    email: 'bookings@nebulagastro.in',
    category: ['Catering'],
    description: 'Molecular gastronomy and culinary excellence. Multi-cuisine catering for events of all scales.',
    location: 'Bangalore, Karnataka',
    priceRange: '$$',
    rating: 5.0,
    reviewCount: 580,
    gallery: [],
    userId: 'seed-user-3',
  },
  {
    businessName: 'Ethereal Spaces Bhopal',
    email: 'info@etherealspaces.in',
    category: ['Decoration'],
    description: 'Venue design and decoration specialists creating magical spaces for your special moments.',
    location: 'Bhopal, Madhya Pradesh',
    priceRange: '$$',
    rating: 4.7,
    reviewCount: 210,
    gallery: [],
    userId: 'seed-user-4',
  },
  {
    businessName: 'Nova Artistry Indore',
    email: 'contact@novaartistry.in',
    category: ['Decoration', 'Birthday'],
    description: 'Floral artistry and decor specialists bringing your vision to life with creative excellence.',
    location: 'Indore, Madhya Pradesh',
    priceRange: '$',
    rating: 4.8,
    reviewCount: 180,
    gallery: [],
    userId: 'seed-user-5',
  },
  {
    businessName: 'Royal Caterers Pune',
    email: 'bookings@royalcaterers.in',
    category: ['Catering'],
    description: 'Traditional and modern catering services for weddings and corporate events across Maharashtra.',
    location: 'Pune, Maharashtra',
    priceRange: '$',
    rating: 4.6,
    reviewCount: 420,
    gallery: [],
    userId: 'seed-user-6',
  },
  {
    businessName: 'Stellar Events Gurgaon',
    email: 'info@stellarevents.in',
    category: ['Wedding', 'Birthday'],
    description: 'Complete event management solutions for corporate and personal celebrations in NCR region.',
    location: 'Gurgaon, Haryana',
    priceRange: '$$$',
    rating: 4.9,
    reviewCount: 390,
    gallery: [],
    userId: 'seed-user-7',
  },
  {
    businessName: 'Fusion Flavors Delhi',
    email: 'bookings@fusionflavors.in',
    category: ['Catering'],
    description: 'Contemporary fusion cuisine blending traditional Indian flavors with international techniques.',
    location: 'Delhi, India',
    priceRange: '$$',
    rating: 4.7,
    reviewCount: 310,
    gallery: [],
    userId: 'seed-user-8',
  },
];

export default function SeedPage() {
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const [vendorCount, setVendorCount] = useState<number | null>(null);

  const checkVendors = async () => {
    try {
      const snapshot = await getDocs(collection(db, 'vendors'));
      setVendorCount(snapshot.size);
      setStatus(`Found ${snapshot.size} vendors in database`);
    } catch (error: any) {
      setStatus(`Error: ${error.message}`);
    }
  };

  const seedDatabase = async () => {
    setLoading(true);
    setStatus('Starting seed...');

    try {
      // Check existing vendors
      const snapshot = await getDocs(collection(db, 'vendors'));
      
      if (snapshot.size > 0) {
        setStatus(`Database already has ${snapshot.size} vendors. Skipping seed.`);
        setLoading(false);
        return;
      }

      // Add vendors
      let count = 0;
      for (const vendor of seedVendors) {
        await addDoc(collection(db, 'vendors'), {
          ...vendor,
          createdAt: Timestamp.now(),
        });
        count++;
        setStatus(`Added ${count}/${seedVendors.length} vendors...`);
      }

      setStatus(`✅ Successfully seeded ${count} vendors!`);
      setVendorCount(count);
    } catch (error: any) {
      setStatus(`❌ Error: ${error.message}`);
      console.error('Seed error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 max-w-4xl mx-auto">
      <div className="glass-card rounded-3xl p-12">
        <h1 className="text-4xl font-headline font-extrabold mb-4 text-on-surface">
          Database <span className="text-primary">Seeding</span>
        </h1>
        <p className="text-on-surface-variant mb-8">
          Populate the database with sample vendor data for testing.
        </p>

        <div className="space-y-6">
          <div className="flex gap-4">
            <button
              onClick={checkVendors}
              disabled={loading}
              className="px-8 py-4 rounded-xl bg-surface-container border border-outline-variant hover:bg-surface-bright transition-all text-on-surface font-bold disabled:opacity-50"
            >
              Check Database
            </button>

            <button
              onClick={seedDatabase}
              disabled={loading}
              className="px-8 py-4 rounded-xl mesh-gradient-btn text-on-primary-container font-bold disabled:opacity-50"
            >
              {loading ? 'Seeding...' : 'Seed Database'}
            </button>
          </div>

          {status && (
            <div className="bg-surface-container-high rounded-xl p-6 border border-outline-variant">
              <p className="text-on-surface font-mono text-sm">{status}</p>
            </div>
          )}

          {vendorCount !== null && (
            <div className="bg-primary/10 border border-primary/30 rounded-xl p-6">
              <p className="text-primary font-bold">
                Current vendor count: {vendorCount}
              </p>
            </div>
          )}

          <div className="bg-surface-container-low rounded-xl p-6 mt-8">
            <h3 className="font-bold text-on-surface mb-4">📋 Instructions:</h3>
            <ol className="list-decimal list-inside space-y-2 text-on-surface-variant text-sm">
              <li>Go to Firebase Console → Firestore Database → Rules</li>
              <li>Temporarily change vendor create rule to: <code className="bg-surface-container px-2 py-1 rounded">allow create: if true;</code></li>
              <li>Click "Publish" to deploy the rules</li>
              <li>Come back here and click "Seed Database"</li>
              <li>After seeding, revert the rule back to: <code className="bg-surface-container px-2 py-1 rounded">allow create: if request.auth != null;</code></li>
            </ol>
          </div>

          <div className="bg-secondary/10 border border-secondary/30 rounded-xl p-6">
            <h3 className="font-bold text-secondary mb-2">⚡ Quick Link:</h3>
            <a 
              href="https://console.firebase.google.com/project/eventra-5443d/firestore/rules"
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondary underline hover:text-primary transition-colors"
            >
              Open Firebase Console Rules →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
