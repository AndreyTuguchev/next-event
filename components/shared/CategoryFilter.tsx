"use client"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { getAllCategories } from "@/lib/actions/category.action";
import { ICategory } from "@/lib/database/models/category.model";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";



export default function CategoryFilter() {

    const router = useRouter();
    const [categories, setCategories ] = useState<ICategory[]>([]);
    const searchParams = useSearchParams();

    
    useEffect(() => {
        const getCategories = async () => {
            const listOfCategories = await getAllCategories();
            
            listOfCategories && setCategories(listOfCategories as ICategory[] );
        }
        getCategories();
    }, [])

    let debounceSearch : ReturnType<typeof setTimeout> = setTimeout(() => { });

    const onSelectCategory = ( category : string ) => {

        if(debounceSearch) clearTimeout(debounceSearch);

        debounceSearch = setTimeout(() => {
            let newUrl = '';
            if (category) {
                newUrl = formUrlQuery({
                    params: searchParams.toString(),
                    key: 'category',
                    value: category
                })
            }else{
                newUrl = removeKeysFromQuery({
                    params: searchParams.toString(),
                    keysToRemove: ['category'],
                })
            }

            router.push( newUrl, { scroll: false } );
        }, 550);
    }

    return (
        <Select onValueChange={(value: string) => onSelectCategory(value)}>
        <SelectTrigger className="select-field">
            <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent>
            <SelectItem className="select-item p-regular-14" value="All">All</SelectItem>
            {categories.map((category) => (
                <SelectItem value={category.name} key={category._id} className="select-item p-regular-14">
                    {category.name}
                </SelectItem>
            ))}
        </SelectContent>
        </Select>
    )
}