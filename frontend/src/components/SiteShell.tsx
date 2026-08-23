'use client';

import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { usePageTracking } from '@/lib/usePageTracking';

export function SiteShell({ children }: { children: ReactNode }) {
  usePageTracking();
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
      <main>{children}</main>
      <div className="h-32 bg-gradient-to-b from-[#f5f4ef] via-[#1a1e4a] to-[#080f2e]" />
      <Footer />
    </>
  );
}
