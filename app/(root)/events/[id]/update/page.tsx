import EventForm from "@/components/shared/EventForm";
import { getEventById } from "@/lib/actions/event.action";
import {} from "@/types";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

type UpdateEventProps = {
  params: {
    id: string;
  };
};

export default async function UpdateEvent({
  params: { id },
}: UpdateEventProps) {
  const sessionClaims = auth().sessionClaims;

  let userRole = sessionClaims?.userRole as string;
  const isWebsiteAdmin = "super_admin" === userRole;

  if (null != userRole && userRole.toLowerCase().endsWith("admin")) {
    userRole = "admin";
  } else {
    userRole = "user";
  }

  const userId = sessionClaims?.userId as string;

  const event = await getEventById(id);

  return (
    <>
      <section className="!pt-[130px] bg-primary-50 bg-cover bg-center py-5 md:py-10">
        <h3 className="wrapper h3-bold text-center sm:text-left">
          Update Event
        </h3>
      </section>

      <div className="wrapper my-8">
        <EventForm
          userId={userId}
          event={event}
          eventId={event._id}
          userRole={userRole}
          type="Update"
          isWebsiteAdmin={isWebsiteAdmin}
        />
      </div>
    </>
  );
}
