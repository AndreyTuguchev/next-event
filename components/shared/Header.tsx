import { SignedIn, SignedOut, UserButton, auth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import NavItems from "./NavItems";
import MobileNav from "./MobileNav";

export default function Header(){

    const sessionClaims = auth().sessionClaims;
    let userRole = sessionClaims?.userRole as string;
  
    return (
        <header className="w-full border-b">
            <div className="wrapper flex items-center justify-between relative" >
                <Link href="/" className="w-36">
                    <Image priority src={`${process.env.NEXT_PUBLIC_CDN_URL}/assets/images/logo.png`} width={277} height={277} className="max-w-[55px] h-auto" alt="Event App Logo" />
                </Link>

                <SignedIn>
                    <nav className="md:flex-between hidden w-full max-w-xs">
                        <NavItems websiteAdmin={"super_admin" === userRole} />
                    </nav>
                </SignedIn>

                <div className="flex w-32 justify-end gap-3">
                    <SignedIn>
                        <UserButton afterSignOutUrl="/" />
                        <MobileNav websiteAdmin={"super_admin" === userRole} />
                    </SignedIn>
                    <SignedOut>
                        <Button asChild className="rounded-full" size="lg">
                            <Link href="/sign-in">Login</Link>
                        </Button>
                    </SignedOut>
                </div>
            </div>
        </header>
    )
}