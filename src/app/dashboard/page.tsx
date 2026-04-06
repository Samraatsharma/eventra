'use client';

import React, { useEffect, useState, memo } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { getUserBookings } from '@/lib/firebase/firestore';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

// Memoized booking card
const BookingCard = memo(({ booking }: { booking: any }) => {
  const statusStyles = {
    confirmed: 'bg-secondary/10 border border-secondary/30 text-secondary',
    pending: 'bg-primary/10 border border-primary/30 text-primary',
    cancelled: 'bg-error/10 border border-error/30 text-error',
  };

  return (
    <div className="glass-card rounded-xl p-5 flex flex-col md:flex-row justify-between items-center gap-6 hover:bg-surface-bright/20 transition-all">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center border border-primary/20">
          <span className="text-primary">🎉</span>
        </div>
        <div>
          <h4 className="font-bold text-sm">{booking.eventType}</h4>
          <p className="text-xs text-on-surface-variant">
            Scheduled for {new Date(booking.eventDate).toLocaleDateString()}
          </p>
        </div>
      </div>
      <div className={`px-3 py-1 rounded-full text-[10px] font-label uppercase tracking-widest ${statusStyles[booking.status as keyof typeof statusStyles]}`}>
        {booking.status}
      </div>
    </div>
  );
});

BookingCard.displayName = 'BookingCard';

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }

    let mounted = true;

    const fetchBookings = async () => {
      try {
        const userBookings = await getUserBookings(user.id);
        if (mounted) {
          setBookings(userBookings);
        }
      } catch (error) {
        console.error('Error fetching bookings:', error);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchBookings();

    return () => {
      mounted = false;
    };
  }, [user, router]);

  if (!user) return <LoadingSpinner />;

  return (
    <div className="min-h-screen pt-28 pb-12 px-6 max-w-7xl mx-auto flex flex-col md:flex-row gap-8">
      {/* Sidebar */}
      <aside className="w-full md:w-64 flex flex-col gap-6">
        <div className="glass-card rounded-xl p-6 flex flex-col gap-8">
          <div className="space-y-4">
            <p className="text-[10px] font-label font-bold uppercase tracking-widest text-on-surface-variant">Management</p>
            <nav className="flex flex-col gap-2">
              <a className="flex items-center gap-3 p-3 rounded-lg bg-surface-container text-secondary" href="#">
                <span>📊</span>
                <span className="text-sm font-medium">Dashboard</span>
              </a>
              <a className="flex items-center gap-3 p-3 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors group" href="#">
                <span>📅</span>
                <span className="text-sm font-medium group-hover:text-on-surface">Bookings</span>
              </a>
              <a className="flex items-center gap-3 p-3 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors group" href="#">
                <span>💳</span>
                <span className="text-sm font-medium group-hover:text-on-surface">Finance</span>
              </a>
            </nav>
          </div>
          <div className="space-y-4 pt-4 border-t border-outline-variant/10">
            <p className="text-[10px] font-label font-bold uppercase tracking-widest text-on-surface-variant">System</p>
            <nav className="flex flex-col gap-2">
              <button onClick={logout} className="flex items-center gap-3 p-3 rounded-lg text-error hover:bg-error-container/20 transition-colors">
                <span>🚪</span>
                <span className="text-sm font-medium">Logout</span>
              </button>
            </nav>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <section className="flex-grow flex flex-col gap-8">
        <div className="flex flex-col md:flex-row justify-between items-end md:items-center gap-4">
          <div>
            <h1 className="text-4xl font-headline font-extrabold tracking-tighter text-on-surface">
              Vendor <span className="text-primary">Intelligence</span>
            </h1>
            <p className="text-on-surface-variant">Welcome back, {user.email}</p>
          </div>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-card rounded-xl p-8 relative overflow-hidden group">
            <div className="relative z-10">
              <p className="text-[10px] font-label font-bold uppercase tracking-widest text-on-surface-variant mb-2">Total Bookings</p>
              <h2 className="text-5xl font-headline font-black text-on-surface mb-4">{bookings.length}</h2>
              <div className="flex items-center gap-2 text-secondary text-sm">
                <span>📈</span>
                <span>Active requests</span>
              </div>
            </div>
          </div>

          <div className="glass-card rounded-xl p-8 relative overflow-hidden group">
            <div className="relative z-10">
              <p className="text-[10px] font-label font-bold uppercase tracking-widest text-on-surface-variant mb-2">Revenue</p>
              <h2 className="text-5xl font-headline font-black text-on-surface mb-4">₹0</h2>
              <div className="flex items-center gap-2 text-primary text-sm">
                <span>💰</span>
                <span>This month</span>
              </div>
            </div>
          </div>

          <div className="glass-card rounded-xl p-8 bg-surface-container-high border-secondary/20 border-2">
            <p className="text-[10px] font-label font-bold uppercase tracking-widest text-secondary mb-2">Status</p>
            <h2 className="text-5xl font-headline font-black text-on-surface mb-4">✓</h2>
            <p className="text-xs text-on-surface-variant">All systems operational</p>
          </div>
        </div>

        {/* Bookings List */}
        <div className="flex flex-col gap-4">
          <h3 className="font-headline text-lg font-bold px-2">Recent Activity</h3>
          {loading ? (
            <LoadingSpinner />
          ) : bookings.length > 0 ? (
            <div className="grid grid-cols-1 gap-3">
              {bookings.map((booking) => (
                <BookingCard key={booking.id} booking={booking} />
              ))}
            </div>
          ) : (
            <div className="glass-card rounded-xl p-12 text-center">
              <div className="text-6xl mb-4">📭</div>
              <p className="text-on-surface-variant">No bookings yet. Start exploring services!</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
