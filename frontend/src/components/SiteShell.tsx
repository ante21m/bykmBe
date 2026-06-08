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
      <Footer />
    </>
  );
}
