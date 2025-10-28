import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import NavItems from "@/components/ui/nav-items";
import MobileNavToggle from "@/components/ui/mobile-nav-toggle";
import WebsiteLogo from "@/components/ui/website-logo";

const MobileNav = ({ websiteAdmin }: { websiteAdmin: boolean }) => {
  return (
    <nav className="md:hidden">
      <Sheet>
        <SheetTrigger className="align-middle">
          <MobileNavToggle />
        </SheetTrigger>
        <SheetContent className="bg-white flex flex-col gap-6 md:hidden items-center">
          <WebsiteLogo />
          <span className="border border-b-1 border-gray-50"></span>
          <NavItems websiteAdmin={websiteAdmin} />
        </SheetContent>
      </Sheet>
    </nav>
  );
};

export default MobileNav;
