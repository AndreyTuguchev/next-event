import { formatDateTime } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import DeleteConfirmation from "@/components/ui/delete-confirmation";
import { EventCardProps } from "./event-card.types";

const EventCard = ({
  event,
  hasOrderLink,
  hidePrice,
  loggedInUserId,
  isWebsiteAdmin,
}: EventCardProps) => {
  const eventStartData = formatDateTime(event.startDateTime);

  const isEventCreator =
    isWebsiteAdmin || event.organizer?._id.toString() === loggedInUserId;

  return (
    <div className="group flex relative w-full flex-col overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-lg ">
      <Link href={`/events/${event._id}`} className="w-full h-full">
        <span className="!h-[40%] overflow-hidden relative inline-block w-full aspect-video ">
          <Image
            src="data:image/svg+xml,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20viewBox=%220%200%2026%2026%22%3E%3C/svg%3E"
            data-src={event.imageUrl}
            fill
            alt="about section image"
            className="w-auto !h-auto !top-[-40%] "
            unoptimized
          />
        </span>

        <span className="flex min-h-58 flex-col gap-3 p-5 md:gap-4">
          {!hidePrice && (
            <span className="flex gap-2 items-center">
              <span className="p-semibold-14 w-min rounded-full bg-green-100 px-4 text-green-60 py-1">
                {event.isFree ? "Free" : `$${event.price}`}
              </span>
              <p className="p-semibold-14 w-min rounded-full bg-grey-500/10 px-4 py-1 text-grey-500 line-clamp-1">
                {event.category.name}
              </p>
            </span>
          )}

          <p className="p-medium-16 p-medium-18 text-grey-500">
            {eventStartData.dateTime}
          </p>

          <p className="p-medium-16 md:p-medium-20 line-clamp-2 flex-1 text-black">
            {event.title}
          </p>

          <span className="flex-between w-full">
            <p className="p-medium-14 md:p-medium-16 text-grey-600">
              {event.organizer?.firstName} {event?.organizer.lastName}
            </p>
          </span>
        </span>
      </Link>

      {hasOrderLink && (
        <Link href={`/orders?eventId=${event._id}`} className="flex gap-2 p-5">
          <p className="text-primary-500">Order Details</p>
          <Image
            loading="lazy"
            src={`/assets/icons/arrow.svg`}
            alt="search"
            width={10}
            height={10}
          />
        </Link>
      )}

      {!event.isApproved && (
        <>
          <div className="absolute w-full h-full bg-zinc-400 opacity-70"></div>
          <div className="absolute flex flex-col left-2 top-2 rounded-xl bg-white shaodw-sm gap-4 transition-all">
            <span className="p-3">Pending Approval</span>
          </div>
        </>
      )}

      {isEventCreator && !hidePrice && (
        <>
          <div className="absolute flex flex-col right-2 top-2 rounded-xl bg-white shaodw-sm gap-4 transition-all">
            <Link className="p-3 " href={`/events/${event._id}/update`}>
              <Image
                loading="lazy"
                src={`/assets/icons/edit.svg`}
                width={20}
                height={20}
                alt="edit icon"
              />
            </Link>
          </div>
          <DeleteConfirmation eventId={event._id} />
        </>
      )}
    </div>
  );
};

export default EventCard;
