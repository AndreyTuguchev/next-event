import Image from "next/image";
import Link from "next/link";

export default function Footer(){

    return (
        <footer className="border-t">
            <div className="flex-center wrapper flex-between flex flex-col gap-4 p-5 text-center sm:flex-row">
                <Link href="/">
                    <Image src="/assets/image/logo.svg" width={128} height={38} alt="Event App Logo" />
                </Link>

                <p>2024 Events App. All Rights Reserved.</p>
            </div>
        </footer>
    )
}