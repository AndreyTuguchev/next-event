"use client"

import { headerLinks } from "@/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavItems ({ websiteAdmin } : { websiteAdmin : boolean }){

    const pathname = usePathname();

    return (
        <ul className="md:flex-between flex w-full flex-col items-start gap-5 md:flex-row">
            {headerLinks.map((link)=>{
                const isActive = link.route === pathname;
                return (
                    <li key={crypto.randomUUID()} className={ ` ${ link.route === pathname && 'text-primary-500'} flex-center py-[10px] p-medium-16 whitespace-nowrap w-full`}>
                        <Link href={link.route} >{link.label}</Link> 
                    </li>
                )
            })}
            {websiteAdmin && (
                <li className={ ` ${ "/admin" === pathname && 'text-primary-500'} flex-center p-medium-16 whitespace-nowrap right-[150px] px-2 py-2 lg:absolute relative`}>
                    <Link href="/admin" >Admin</Link> 
                </li>
            )}
        </ul>
    )
}