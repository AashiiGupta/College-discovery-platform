import type { Metadata } from 'next';
import '../styles/globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Providers from './providers';

export const metadata: Metadata = {
  title: {
    default: 'CollegeDiscover — Find Your Perfect College in India',
    template: '%s | CollegeDiscover',
  },
  description:
    'Discover, compare, and save top colleges in India. Search by location, fees, courses, and placements. Make the right decision for your future.',
  keywords: ['college search', 'india colleges', 'college comparison', 'IIT', 'NIT', 'BITS'],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // No default class — ThemeInitializer sets it from localStorage
    <html lang="en" suppressHydrationWarning>
      <body className="flex min-h-screen flex-col antialiased">
        <Providers>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
