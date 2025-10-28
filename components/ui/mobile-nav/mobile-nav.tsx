import MobileNavToggle from '@/components/ui/mobile-nav-toggle';
import NavItems from '@/components/ui/nav-items';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import WebsiteLogo from '@/components/ui/website-logo';

const MobileNav = ({ websiteAdmin }: { websiteAdmin: boolean }) => {
  return (
    <nav className='md:hidden'>
      <Sheet>
        <SheetTrigger className='align-middle'>
          <MobileNavToggle />
        </SheetTrigger>
        <SheetContent className='flex flex-col items-center gap-6 bg-white md:hidden'>
          <WebsiteLogo />
          <span className='border-b-1 border border-gray-50'></span>
          <NavItems websiteAdmin={websiteAdmin} />
        </SheetContent>
      </Sheet>
    </nav>
  );
};

export default MobileNav;
