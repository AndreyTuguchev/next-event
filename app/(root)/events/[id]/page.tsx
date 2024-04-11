import { getEventById } from "@/lib/actions/event.action";
import { formatDateTime } from "@/lib/utils";
import { SearchParamProps } from "@/types";
import Image from "next/image";


export default async function EventPage({ params: { id }} : SearchParamProps){

    const event = await getEventById(id);

    const eventStartData = formatDateTime(event.startDateTime);
    const eventEndData = formatDateTime(event.endDateTime);

    return (
        <section className="flex justify-center bg-primary-50 bg-dotted-pattern bg-contain">
            <div className="grid grid-cols-1 md:grid-cols-2 2xl:max-w-7xl">
                <Image src={event.imageUrl} width={1000} height={1000}  alt="event hero image" className=" min-h-[300px] h-full object-cover object-center" />

                <div className="flex w-full flex-col gap-8 p-5 md:p-10">
                    <div className="flex flex-col gap-6" >
                        <h2 className="h2-bold">{event.title}</h2>
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                            <div className="flex gap-3">
                                <p className="p-bold-20 rounded-full bg-green-500/10 px-5 py-2 text-green-700">{event.isFree ? "Free" : `$${event.price}`}</p>
                                <p className="p-medium-16 rounded-full bg-grey-500/10 px-4 py-2.5 text-gray-500">{event.category.name}</p>
                            </div>

                            <p className="p-medium-18 ml-2 mt-2 sm:mt-0">
                                by{" "} <span className="text-primary-500">{event.orginizer.firstName} {event.orginizer.lastName}</span>
                            </p>
                        </div>
                    </div>

                    {/* TODO: Buy Ticket Button */}

                    <div className="flex flex-col gap-5">
                        <div className="flex gap-2 md:gap-3 items-center">
                            <Image src="/assets/icons/calendar.svg" width={32} height={32} alt="calendar" className="filter-grey"  />
                            <p>{eventStartData.dateOnly} - {eventStartData.timeOnly} / {eventEndData.dateOnly} - {eventEndData.timeOnly} </p>
                        </div>
                    </div>

                    <div className="p-regular-20 flex items-center gap-3">
                        <Image width={32} height={32} src="/assets/icons/location.svg" alt="location" />
                        <p className="p-medium-16 lg:p-regular-20">{event.location}</p>
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <p className="p-bold-20 text-gray-600">What You will learn:</p>
                    <p className="p-medium-16 lg:p-regular-18">{event.description}</p>
                    {event.url && <a href={event.url} target="_blank" rel="nofollow" className="p-medium-16 lg:p-regular-18 truncate text-primary-500 underline">{event.url}</a>}
                </div>
            </div>
        </section>
    )
}