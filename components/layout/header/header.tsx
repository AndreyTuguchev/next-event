import Link from 'next/link';

import { auth, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import MobileNav from '@/components/ui/mobile-nav';
import NavItems from '@/components/ui/nav-items';
import WebsiteLogoWithLink from '@/components/ui/website-logo-with-link';

export default function Header() {
  const sessionClaims = auth().sessionClaims;
  let userRole = sessionClaims?.userRole as string;

  return (
    <header className='absolute top-0 z-10 w-full border-b bg-white'>
      <div className='wrapper relative flex items-center justify-between'>
        <WebsiteLogoWithLink />

        <nav className='md:flex-between hidden w-full max-w-xs'>
          <NavItems websiteAdmin={'super_admin' === userRole} />
        </nav>
        <SignedIn></SignedIn>

        <div className='flex w-32 justify-end gap-3'>
          <SignedIn>
            <UserButton afterSignOutUrl='/' />
          </SignedIn>
          <SignedOut>
            <Button asChild className='rounded-full' size='lg'>
              <Link href='/sign-in'>Login</Link>
            </Button>
          </SignedOut>

          <MobileNav websiteAdmin={'super_admin' === userRole} />
        </div>
      </div>
    </header>
  );
}
