'use client';

import { useEffect, useState } from 'react';

import GoogleAnalytics from '@/lib/analytics/google-analytics';

let googleAnalyticsIdOne = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID_1 || '';

const AllAnalyticsScripts = () => {
  const [loadGoogleScriptsState, setLoadGoogleScriptsState] = useState(false);

  useEffect(() => {
    if (window && document) {
      // load Google Scripts for tablet and desktop with small delay when no mouseMove or click events detected
      if (window.innerWidth > 780) {
        setTimeout(() => {
          !loadGoogleScriptsState && setLoadGoogleScriptsState(true);
        }, 3000);
      } else {
        setTimeout(() => {
          !loadGoogleScriptsState && setLoadGoogleScriptsState(true);
        }, 7000);
      }

      window.addEventListener(
        'scroll',
        () => {
          !loadGoogleScriptsState && setLoadGoogleScriptsState(true);
        },
        { once: true }
      );

      window.addEventListener(
        'click',
        () => {
          !loadGoogleScriptsState && setLoadGoogleScriptsState(true);
        },
        { once: true }
      );

      window.addEventListener(
        'touchstart',
        () => {
          !loadGoogleScriptsState && setLoadGoogleScriptsState(true);
        },
        { once: true }
      );
    }

    return () => {};
  }, [loadGoogleScriptsState]);

  return (
    loadGoogleScriptsState && (
      <>
        {googleAnalyticsIdOne && googleAnalyticsIdOne != '' && (
          <GoogleAnalytics googleTrackingCode={googleAnalyticsIdOne} />
        )}
      </>
    )
  );
};

export default AllAnalyticsScripts;
