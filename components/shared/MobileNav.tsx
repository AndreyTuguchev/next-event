import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import MobileNavToggle from "./MobileNavToggle"
import Image from "next/image";
import NavItems from "./NavItems";

export default function MobileNav(){

    return (
        <nav className="md:hidden">
            <Sheet>
                <SheetTrigger className="align-middle">
                    <MobileNavToggle />
                </SheetTrigger>
                <SheetContent className="bg-white flex flex-col gap-6 md:hidden">
                    <Image src="/assets/images/logo.svg" width={128} height={38} alt="Event App Logo" className="mb-2"  />
                    <span className="border border-b-1 border-gray-50" ></span>
                    <NavItems />
                </SheetContent>
            </Sheet>
        </nav>
    )
}