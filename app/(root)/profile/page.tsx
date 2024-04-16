import Collection from "@/components/shared/Collection";
import { Button } from "@/components/ui/button";
import { getEventsByUser } from "@/lib/actions/event.action";
import { getOrdersByUser } from "@/lib/actions/order.actions";
import { IOrder } from "@/lib/database/models/order.model";
import { SearchParamProps } from "@/types";
import { auth } from "@clerk/nextjs";
import Link from "next/link";


export default async function ProfilePage ({ searchParams } : SearchParamProps) {
    
    const sessionClaims = auth().sessionClaims;
    let userRole = sessionClaims?.userRole as string;
  
    if ( null != userRole  && userRole.toLowerCase().endsWith('admin')) {
        userRole = "admin";
    }else{
        userRole = "user";
    }
  
    const loggedInUserId = sessionClaims?.userId as string;


    const ordersPage = Number( searchParams?.ordersPage ) || 1;
    const eventsPage = Number( searchParams?.page ) || 1;

    const orders = await getOrdersByUser( { userId: loggedInUserId, page: ordersPage });

    const orderedEvents = orders?.data.map(( order: IOrder ) => order.event );

    const organizedEvents = await getEventsByUser({ userId: loggedInUserId, page: eventsPage })

    return (
        <>
        
        {/* My Tickets */}
        <section className="!pt-[130px] bg-primary-50 bg-cover bg-center py-5 md:py-10">
            <div className="wrapper flex items-center justify-center sm:justify-between">
                <h1 className="h3-bold text-center sm:text-left">My Tickets</h1>
                <Button asChild size="lg" className="button hidden sm:flex">
                    <Link href="/#events" >Explore More Events</Link>
                </Button>
            </div>
        </section>

        <section className="wrapper my-8">
            <Collection 
                data={ orderedEvents }
                emptyTitle="No Event tickets found"
                emptyStateSubtext="You can find any type of event at our website!"
                collectionType="My_Tickets"
                page={ ordersPage }
                totalPages={ orders?.totalPages }
                urlParamName="ordersPage"
                loggedInUserId={ loggedInUserId }
            />
        </section>

         {/* Events organized by me */}
         <section className="bg-primary-50 bg-cover bg-center py-5 md:py-10">
            <div className="wrapper flex items-center justify-center sm:justify-between">
                <h2 className="h3-bold text-center sm:text-left">Events Orginized</h2>
                <Button asChild size="lg" className="button hidden sm:flex">
                    <Link href="/events/create" >Create New Event</Link>
                </Button>
            </div>
        </section>

         <section className="wrapper my-8 flex flex-col gap-8 md:gap-12">
            <Collection 
                data={organizedEvents?.data}
                emptyTitle="No events created yet..."
                emptyStateSubtext="You can create new event easily!"
                collectionType="Events_Organized"
                page={ eventsPage }
                totalPages={ organizedEvents?.totalPages }
                loggedInUserId={ loggedInUserId }
            />
        </section>
        
        </>
    )
}