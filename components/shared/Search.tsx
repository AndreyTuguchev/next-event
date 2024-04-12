"use client"

import Image from "next/image";
import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";

export default function Search( { placeholder } : { placeholder?: string }) {

    const router = useRouter();
    const [query, setQuery ] = useState("");
    const searchParams = useSearchParams();

    useEffect(() => {

        const debounceSearch = setTimeout(() => {
            let newUrl = '';

            console.log("searchParams = ", searchParams);

            if (query) {
                newUrl = formUrlQuery({
                    params: searchParams.toString(),
                    key: 'query',
                    value: query
                })
            }else{
                newUrl = removeKeysFromQuery({
                    params: searchParams.toString(),
                    keysToRemove: ['query'],
                })
            }

            router.push( newUrl , { scroll: false });

        }, 450);

        return (()=>{
            clearTimeout(debounceSearch)
        });

    }, [query, searchParams, router])

    return (
        <div className="flex-center min-h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
            <Image src="/assets/icons/search.svg" width={24} height={24} alt='seach icon' />
            <Input type="text" placeholder={placeholder} onChange={(e) => setQuery(e.target.value)}
            className="p-regular-16 border-0 bg-grey-50 outline-offset-0 placeholder:text-grey-500 focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0"  />
        </div>
    )
}