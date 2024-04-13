import Collection from "@/components/shared/Collection";
import { getAllEvents } from "@/lib/actions/event.action";
import { SearchParamProps } from "@/types";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";


export default async function AdminPage({ searchParams } : SearchParamProps){
    const sessionClaims = auth().sessionClaims;
    let userRole = sessionClaims?.userRole as string;
  
    const isWebsiteAdmin = "super_admin" === userRole;

    if ( !isWebsiteAdmin ) redirect("/");
  
    const userId = sessionClaims?.userId as string;

    const events = await getAllEvents({
        query: "",
        page: 1,
        category: "",
        limit: 20,
        isWebsiteAdmin,
    });

    const currentPage = Number( searchParams?.page ) || 1;


    return (
        <section className="wrapper my-8">
            <Collection 
                data={events?.data}
                emptyTitle="No Event tickets found"
                emptyStateSubtext="You can find any type of event at our website!"
                collectionType="All_Events"
                page={currentPage}
                totalPages={events?.totalPages}
                urlParamName="ordersPage"
                loggedInUserId={userId}
            />
        </section>
    )
}