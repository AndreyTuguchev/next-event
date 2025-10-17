import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import Image from "next/image";
import NavItems from "@/components/ui/nav-items";
import MobileNavToggle from "@/components/ui/mobile-nav-toggle";

const MobileNav = ({ websiteAdmin }: { websiteAdmin: boolean }) => {
  return (
    <nav className="md:hidden">
      <Sheet>
        <SheetTrigger className="align-middle">
          <MobileNavToggle />
        </SheetTrigger>
        <SheetContent className="bg-white flex flex-col gap-6 md:hidden items-center">
          <Image
            src={`/assets/images/logo.png`}
            width={105}
            height={105}
            alt="Event App Logo"
            className="mb-2"
          />
          <span className="border border-b-1 border-gray-50"></span>
          <NavItems websiteAdmin={websiteAdmin} />
        </SheetContent>
      </Sheet>
    </nav>
  );
};

export default MobileNav;
