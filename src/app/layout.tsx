import type { Metadata } from 'next';
import { Inter, Manrope } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/contexts/AuthContext';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial'],
  adjustFontFallback: true,
});

const manrope = Manrope({ 
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial'],
  adjustFontFallback: true,
});

export const metadata: Metadata = {
  title: 'Eventra | The Future of Event Curation',
  description: 'Plan Your Perfect Event — Without the Chaos. Connect with world-class planners, decorators, and caterers in India.',
  keywords: 'event planning, wedding planner, catering, decoration, India, event management',
  authors: [{ name: 'Eventra' }],
  viewport: 'width=device-width, initial-scale=1, maximum-scale=5',
  themeColor: '#dab9ff',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${manrope.variable} font-body`}>
        <div className="noise-texture"></div>
        <div className="holographic-bg"></div>
        <div className="grid-lines"></div>
        
        <AuthProvider>
          <Navbar />
          <main className="relative z-10">
            {children}
          </main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
