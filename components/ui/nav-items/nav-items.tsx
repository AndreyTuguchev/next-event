"use client";

import { headerLinks } from "@/constants";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavItems = ({ websiteAdmin }: { websiteAdmin: boolean }) => {
  const pathname = usePathname();

  return (
    <ul className="md:flex-between flex w-full flex-col items-start gap-5 md:flex-row ">
      {headerLinks.map((link) => {
        return (
          <li
            key={`${link.route}-${link.label}`}
            className={cn(
              "flex-center py-2.5 p-medium-16 whitespace-nowrap w-full",
              link.route === pathname ? "text-primary-500" : "text-neutral-600",
            )}
          >
            <Link href={link.route}>{link.label}</Link>
          </li>
        );
      })}
      {websiteAdmin && (
        <li
          className={cn(
            "flex-center p-medium-16 whitespace-nowrap px-2 py-2 relative md:text-left text-center w-full md:w-auto",
            "/admin" === pathname && "text-primary-500",
          )}
        >
          <Link href="/admin">Admin</Link>
        </li>
      )}
    </ul>
  );
};

export default NavItems;
