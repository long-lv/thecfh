'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useGlobalLoading } from '@/src/hooks/useGlobalLoading';

export function NavigationEvents() {
  const pathname = usePathname();
  const { hideLoading } = useGlobalLoading();

  useEffect(() => {
    const timer = setTimeout(() => {
      hideLoading();
    }, 50000);

    return () => clearTimeout(timer);
  }, [pathname, hideLoading]);

  return null;
}