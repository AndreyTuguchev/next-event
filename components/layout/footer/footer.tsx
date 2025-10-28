'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';

import WebsiteLogoWithLink from '@/components/ui/website-logo-with-link';
import AllAnalyticsScripts from '@/lib/analytics/all-analytics-scripts';
import { imageLazyLoadObserver } from '@/lib/footerScripts.js';

const imageLazyLoadObserverFn = imageLazyLoadObserver();

const Footer = () => {
  const searchParams = useParams();

  useEffect(() => {
    if (typeof window !== 'undefined' && typeof document !== 'undefined') {
      imageLazyLoadObserverFn(true);
    }

    return () => {
      imageLazyLoadObserverFn(false);
    };
  }, [searchParams]);

  return (
    <>
      <footer className='border-t'>
        <div className='flex-center wrapper flex-between flex flex-col gap-4 p-5 text-center sm:flex-row'>
          <WebsiteLogoWithLink lazyload={true} />

          <p>2024 Events App. All Rights Reserved.</p>
        </div>
      </footer>

      <AllAnalyticsScripts />
    </>
  );
};

export default Footer;
