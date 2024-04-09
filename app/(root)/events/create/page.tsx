import EventForm from "@/components/shared/EventForm";
import { auth } from "@clerk/nextjs";


export default function CreateEvent (){

    let userRole = (auth().sessionClaims?.metadata as any)?.userRole;

    if ( null != userRole  && userRole.toLowerCase().endsWith('admin')) {
        userRole = "admin";
    }else{
        userRole = "user";
    }

    return (
        <>
            <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
                <h3 className="wrapper h3-bold text-center sm:text-left">Create Event</h3>
            </section>

            <div className="wrapper my-8">
                <EventForm userRole={userRole} type="Create" />
            </div>
        </>
    )
}