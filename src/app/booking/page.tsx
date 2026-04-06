'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { createBooking } from '@/lib/firebase/firestore';

const eventTypes = [
  { value: 'wedding', label: 'Celestial Wedding' },
  { value: 'birthday', label: 'Birthday Celebration' },
  { value: 'corporate', label: 'Corporate Event' },
  { value: 'private', label: 'Private Party' },
];

export default function BookingPage() {
  const [eventDate, setEventDate] = useState('');
  const [eventType, setEventType] = useState('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { user } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      router.push('/login');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await createBooking({
        userId: user.id,
        vendorId: 'general', // This would come from vendor selection
        eventDate,
        eventType,
        notes,
        status: 'pending',
        amount: 0,
      });

      alert('Booking request submitted successfully!');
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Failed to create booking');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background 3D Sphere Elements */}
      <div className="sphere w-96 h-96 bg-primary/10 top-1/4 -left-20 animate-pulse"></div>
      <div className="sphere w-72 h-72 bg-secondary/10 bottom-1/4 -right-10"></div>
      <div className="sphere w-48 h-48 bg-tertiary-container/5 top-1/2 left-1/2"></div>

      <div className="relative z-10 w-full max-w-2xl px-6">
        <div className="glass-panel rounded-3xl p-10 md:p-16 border border-outline-variant/15 shadow-2xl">
          {/* Header */}
          <div className="mb-12 text-center md:text-left">
            <span className="font-label uppercase tracking-widest text-secondary text-[10px] mb-2 block">
              Celestial Reservation
            </span>
            <h1 className="text-4xl md:text-5xl font-headline font-extrabold text-on-surface tracking-tighter leading-none mb-4">
              Book Your Event
            </h1>
            <p className="text-on-surface-variant font-body font-light text-lg">
              Secure your coordinate in the Eventra galaxy.
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 rounded-xl bg-error-container/20 border border-error/30 text-error text-sm">
              {error}
            </div>
          )}

          {/* Booking Form */}
          <form onSubmit={handleSubmit} className="space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {/* Date Input */}
              <div className="relative group">
                <label className="block font-label uppercase tracking-widest text-primary text-[10px] mb-2">
                  Event Date
                </label>
                <div className="flex items-center border-b border-outline/30 group-focus-within:border-secondary transition-colors pb-2">
                  <span className="text-on-surface-variant mr-3">📅</span>
                  <input
                    className="bg-transparent border-none p-0 w-full text-on-surface focus:ring-0 font-body placeholder:text-outline-variant/50"
                    type="date"
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Event Type Input */}
              <div className="relative group">
                <label className="block font-label uppercase tracking-widest text-primary text-[10px] mb-2">
                  Event Type
                </label>
                <div className="flex items-center border-b border-outline/30 group-focus-within:border-secondary transition-colors pb-2">
                  <span className="text-on-surface-variant mr-3">🎉</span>
                  <select
                    className="bg-transparent border-none p-0 w-full text-on-surface focus:ring-0 font-body appearance-none"
                    value={eventType}
                    onChange={(e) => setEventType(e.target.value)}
                    required
                  >
                    <option className="bg-surface-container-highest" value="" disabled>
                      Select Event Type
                    </option>
                    {eventTypes.map((type) => (
                      <option key={type.value} className="bg-surface-container-highest" value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Notes Input */}
            <div className="relative group">
              <label className="block font-label uppercase tracking-widest text-primary text-[10px] mb-2">
                Technical Specifications & Notes
              </label>
              <div className="flex items-start border-b border-outline/30 group-focus-within:border-secondary transition-colors pb-2">
                <span className="text-on-surface-variant mr-3 mt-1">📝</span>
                <textarea
                  className="bg-transparent border-none p-0 w-full text-on-surface focus:ring-0 font-body placeholder:text-outline-variant/50 resize-none"
                  placeholder="Define your vision..."
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                ></textarea>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <button
                type="submit"
                disabled={loading}
                className="glowing-btn w-full py-5 rounded-xl bg-gradient-to-r from-primary to-secondary text-on-primary font-headline font-extrabold uppercase tracking-widest text-sm flex items-center justify-center gap-3 disabled:opacity-50"
              >
                {loading ? 'Processing...' : 'Submit Request'}
                <span>→</span>
              </button>
            </div>
          </form>

          {/* Cinematic Texture Overlay */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.02] bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')]"></div>
        </div>
      </div>
    </main>
  );
}
