"use client";

import Image from "next/image";
import Link from "next/link";

import { imageLazyLoadObserver } from "@/lib/footerScripts.js";
import { useEffect } from "react";
import { useParams } from "next/navigation";
import FooterAnalyticsScripts from "@/components/shared/FooterAnalyticsScripts";

const imageLazyLoadObserverFn = imageLazyLoadObserver();

const Footer = () => {
  const searchParams = useParams();

  useEffect(() => {
    if (typeof window !== "undefined" && typeof document !== "undefined") {
      imageLazyLoadObserverFn(true);
    }

    return () => {
      imageLazyLoadObserverFn(false);
    };
  }, [searchParams]);

  return (
    <>
      <footer className="border-t">
        <div className="flex-center wrapper flex-between flex flex-col gap-4 p-5 text-center sm:flex-row">
          <Link href="/">
            <Image
              src="data:image/svg+xml,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20viewBox=%220%200%2026%2026%22%3E%3C/svg%3E"
              data-src={`/assets/images/logo.png`}
              width={277}
              height={277}
              className="max-w-[75px] md:max-w-[55px] h-auto"
              alt="Event App Logo"
            />
          </Link>

          <p>2024 Events App. All Rights Reserved.</p>
        </div>
      </footer>
      <FooterAnalyticsScripts />
    </>
  );
};

export default Footer;
