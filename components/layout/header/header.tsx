import { SignedIn, SignedOut, UserButton, auth } from "@clerk/nextjs";
import Link from "next/link";
import NavItems from "@/components/ui/nav-items";
import MobileNav from "@/components/ui/mobile-nav";
import { Button } from "@/components/ui/button";
import WebsiteLogoWithLink from "@/components/ui/website-logo-with-link";

export default function Header() {
  const sessionClaims = auth().sessionClaims;
  let userRole = sessionClaims?.userRole as string;

  return (
    <header className="w-full border-b absolute top-0 bg-white z-10">
      <div className="wrapper flex items-center justify-between relative">
        <WebsiteLogoWithLink />

        <nav className="md:flex-between hidden w-full max-w-xs">
          <NavItems websiteAdmin={"super_admin" === userRole} />
        </nav>
        <SignedIn></SignedIn>

        <div className="flex w-32 justify-end gap-3">
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
          <SignedOut>
            <Button asChild className="rounded-full" size="lg">
              <Link href="/sign-in">Login</Link>
            </Button>
          </SignedOut>

          <MobileNav websiteAdmin={"super_admin" === userRole} />
        </div>
      </div>
    </header>
  );
}
