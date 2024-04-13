"use client"

import { headerLinks } from "@/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavItems ({ websiteAdmin } : { websiteAdmin : boolean }){

    const pathname = usePathname();

    return (
        <ul className="md:flex-between flex w-full flex-col items-start gap-5 md:flex-row ">
            {headerLinks.map((link)=>{
                const isActive = link.route === pathname;
                return (
                    <li key={crypto.randomUUID()} className={ ` ${ link.route === pathname ? 'text-primary-500' : 'text-[#545454]'} flex-center py-[10px] p-medium-16 whitespace-nowrap w-full`}>
                        <Link href={link.route} >{link.label}</Link> 
                    </li>
                )
            })}
            {websiteAdmin && (
                <li className={ ` ${ "/admin" === pathname ? 'text-primary-500' : ""} flex-center p-medium-16 whitespace-nowrap px-2 py-2 relative lg:absolute lg:right-[150px] max-[600px]:w-full`}>
                    <Link href="/admin" >Admin</Link> 
                </li>
            )}
        </ul>
    )
}