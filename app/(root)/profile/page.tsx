import Collection from "@/components/shared/Collection";
import { Button } from "@/components/ui/button";
import { getEventsByUser } from "@/lib/actions/event.action";
import { auth } from "@clerk/nextjs";
import Link from "next/link";


export default async function ProfilePage () {
    
    const sessionClaims = auth().sessionClaims;

    let userRole = sessionClaims?.userRole as string;
  
    if ( null != userRole  && userRole.toLowerCase().endsWith('admin')) {
        userRole = "admin";
    }else{
        userRole = "user";
    }
  
    const loggedInUserId = sessionClaims?.userId as string;

    const organizedEvents = await getEventsByUser({
        userId: loggedInUserId,
        page: 1,
    })



    return (
        <>
        
        {/* My Tickets */}
        <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
            <div className="wraper flex items-center justify-center sm:justify-between">
                <h3 className="h3-bold text-center sm:text-left">My Tickets</h3>
                <Button asChild size="lg" className="button hidden sm:flex">
                    <Link href="/#events" >Explore More Events</Link>
                </Button>
            </div>
        </section>

        <section className="wrapper my-8">
            {/* <Collection 
                data={relatedEvents?.data}
                emptyTitle="No Event tickets found"
                emptyStateSubtext="You can find any type of event at our website!"
                collectionType="My_Tickets"
                limit={3}
                page={1}
                totalPages={2}
                urlParamName="ordersPage"
                loggedInUserId={loggedInUserId}
            /> */}
        </section>

         {/* Events organized by me */}
         <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
            <div className="wraper flex items-center justify-center sm:justify-between">
                <h3 className="h3-bold text-center sm:text-left">Events Orginized</h3>
                <Button asChild size="lg" className="button hidden sm:flex">
                    <Link href="/events/create" >Create New Events</Link>
                </Button>
            </div>
        </section>

         <section className="wrapper my-8 flex flex-col gap-8 md:gap-12">
            <h2 className="h2-bold">Related Events</h2>
            <Collection 
                data={organizedEvents?.data}
                emptyTitle="No events created yet..."
                emptyStateSubtext="You can create new event easily!"
                collectionType="Events_Organized"
                limit={6}
                page={1}
                totalPages={2}
                loggedInUserId={loggedInUserId}
            />
        </section>
        
        </>
    )
}