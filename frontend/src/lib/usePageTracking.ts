'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export function usePageTracking() {
  const pathname = usePathname();

  useEffect(() => {
    console.log(`[Analytics] Page view: ${pathname}`);
    try {
      const views = JSON.parse(localStorage.getItem('page_views') || '{}');
      views[pathname] = (views[pathname] || 0) + 1;
      localStorage.setItem('page_views', JSON.stringify(views));
    } catch {
      // localStorage not available
    }
  }, [pathname]);
}
