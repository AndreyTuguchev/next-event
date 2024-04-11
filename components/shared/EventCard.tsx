

import { IEvent } from "@/lib/database/models/event.model";
import { formatDateTime } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import DeleteConfirmation from "./DeleteConfirmation";


type EventCardProps = {
    event: IEvent;
    hasOrderLink?: boolean;
    hidePrice: boolean;
    loggedInUserId: string;
}

export default function EventCard({ event, hasOrderLink, hidePrice, loggedInUserId } : EventCardProps ){

    const eventStartData = formatDateTime(event.startDateTime);

    const isEventCreator = event.organizer._id.toString() === loggedInUserId;


    // const eventEndData = formatDateTime(event.endDateTime);

    // console.log('loggedInUserId', loggedInUserId)
    // console.log('event', event.organizer._id)


    return (
        <div className="group flex relative min-h-[380px] w-full max-w-[400px] flex-col overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-lg md:min-h-[438px]">
            <Link href={`/events/${event._id}`} className="w-full h-full">
                <span className="flex-center flex-grow bg-gray-50 bg-cover bg-center text-grey-500 w-full h-[40%]"
                      style={{ backgroundImage: `url(${event.imageUrl})` }}></span>
                
       
                <span className="flex min-h-[230px] flex-col gap-3 p-5 md:gap-4">
                    {!hidePrice && 
                    <span className="flex gap-2 items-center">
                        <span className="p-semibold-14 w-min rounded-full bg-green-100 px-4 text-green-60 py-1">
                            { event.isFree ? "Free" : `$${event.price}` }
                        </span>
                        <p className="p-semibold-14 w-min rounded-full bg-grey-500/10 px-4 py-1 text-grey-500 line-clamp-1">
                            {event.category.name}
                        </p>
                    </span>}

                    <p className="p-medium-16 p-medium-18 text-grey-500">
                        { eventStartData.dateTime }
                    </p>

                    <p className="p-medium-16 md:p-medium-20 line-clamp-2 flex-1 text-black">{event.title}</p>

                    <span className="flex-between w-full">
                        <p className="p-medium-14 md:p-medium-16 text-grey-600">{event.organizer.firstName} {event.organizer.lastName}</p>
                    
                    </span>
                </span>
            </Link>
            
            {hasOrderLink && (
                <Link href={`/orders?eventId=${event._id}`} className="flex gap-2 p-5">
                    <p className="text-primary-500">Order Details</p>
                    <Image src="/assets/icons/arrow.svg" alt='search' width={10} height={10} />
                </Link>
            )}
            
            { isEventCreator && !hidePrice && (
                <>
                <div className="absolute flex flex-col right-2 top-2 rounded-xl bg-white shaodw-sm gap-4 transition-all">
                    <Link className="p-3 " href={`/events/${event._id}/update`}>
                        <Image src="/assets/icons/edit.svg" width={20} height={20} alt="edit icon" />
                    </Link>
                </div>
                    <DeleteConfirmation eventId={event._id} />
                </>
            )}

        </div>
    )
}