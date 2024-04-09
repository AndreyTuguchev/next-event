import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { ICategory } from "@/lib/database/models/category.model";
import { startTransition, useEffect, useState } from "react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import { Input } from "../ui/input";
import { createCategory, getAllCategories } from "@/lib/actions/category.action";
  


type DropdownProps ={
    value?: string;
    onChangeHandler?: () => void;
    userRole: string;
}

export default function Dropdown({ value, onChangeHandler, userRole }: DropdownProps ){

    const [ categories, setCategories ] = useState<ICategory[]>([]);
    const [ newCategory, setNewCategory ] = useState("");

    const handleCategory = () => {
        createCategory({
            categoryName: newCategory.trim()
        })
        .then(( category ) => {
            setCategories((prevState) => [...prevState, category]);
        })
    }

    useEffect(() => {
        const getCategories = async () => {
            const listOfCategories = await getAllCategories();
            
            listOfCategories && setCategories(listOfCategories as ICategory[] );
        }

        getCategories();
    }, [])

    return (
        <Select onValueChange={onChangeHandler} defaultValue={value}>
            <SelectTrigger className="select-field">
                <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
                {categories.length > 0 && categories.map((category) => (
                    <SelectItem key={crypto.randomUUID()} value={category._id} className="select-item p-regular-14">
                        {category.name}
                    </SelectItem>
                ))}

                <AlertDialog>
                    { "admin" == userRole && 
                        <AlertDialogTrigger className="p-medium-14 flex w-full rounded-sm py-3 pl-8 text-primary-500 hover:bg-primary-50 focus:text-primary-500">Add New Category</AlertDialogTrigger>
                    }
                <AlertDialogContent className="bg-white">
                    <AlertDialogHeader>
                    <AlertDialogTitle>New Category</AlertDialogTitle>
                    <AlertDialogDescription>
                        <Input type="text" placeholder="Category name" className="input-field mt-3" onChange={(e) => setNewCategory(e.target.value)} />
                    </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={ () => startTransition( handleCategory )}>Add</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
                </AlertDialog>

            </SelectContent>
        </Select>

    )
}