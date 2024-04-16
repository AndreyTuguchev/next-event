"use client"

import Image from "next/image";
import { startTransition, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { deleteEvent } from "@/lib/actions/event.action";
import { usePathname } from "next/navigation";

export default function DeleteConfirmation({ eventId } : { eventId : string }){

    const [ deleteEventState, setDeleteEventState ] = useState(false);
    const pathname = usePathname();

    useEffect( () => {

        if ( true === deleteEventState ){

        }

        // return ( () => {
        //     setDeleteEventState(false);
        // })

    }, [deleteEventState])

    return (
        <div className={`${ !deleteEventState && 'absolute top-14 bg-white'} cursor-pointer flex flex-col right-2 overflow-hidden rounded-xl  shaodw-sm gap-4 transition-all z-[5]`}>

        <span className={` ${ deleteEventState ? `!hidden` : ""} p-3`} onClick={()=> { setDeleteEventState(true); }}>
        <Image src={`${process.env.NEXT_PUBLIC_CDN_URL}/assets/icons/delete.svg`} alt="edit" width={20} height={20}  />
        </span>
        
        { deleteEventState && (
            <>
        <span className="absolute backdrop-blur w-[110%] h-[110%] left-0 top-0 bg-[#00000092] flex items-center p-10 text-center z-[7]">
        </span>
            <span className="text-white absolute w-full h-full left-0 top-0 flex flex-col items-center justify-center p-10 text-center z-[8]">
                <div className="w-full">Are You Sure You Want To Delete This Event?</div>
                <div className="w-full flex justify-evenly mt-[20px]">
                    <Button variant="destructive" onClick={ () =>
                         startTransition(async () => {
                            await deleteEvent({ eventId, path: pathname })
                          })}
                    >Yes</Button>
                    <Button className="bg-[#2aa523] hover:bg-[#3ea839b5]" onClick={()=> { setDeleteEventState(false) }}>No</Button>
                </div>
            </span>
        </>

        )}
        </div>
    )
}