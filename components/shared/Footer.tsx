import Image from "next/image";
import Link from "next/link";

export default function Footer(){

    return (
        <footer className="border-t">
            <div className="flex-center wrapper flex-between flex flex-col gap-4 p-5 text-center sm:flex-row">
                <Link href="/">
                    <Image src={`${process.env.NEXT_PUBLIC_CDN_URL}/assets/images/logo.png`} width={277} height={277} 
                        className="max-w-[75px] md:max-w-[55px] h-auto" alt="Event App Logo" />
                </Link>

                <p>2024 Events App. All Rights Reserved.</p>
            </div>
        </footer>
    )
}