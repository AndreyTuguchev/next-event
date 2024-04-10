import EventForm from "@/components/shared/EventForm";
import { auth } from "@clerk/nextjs";
import { redirect } from 'next/navigation'


export default function UpdateEvent (){

    const sessionClaims = auth().sessionClaims;

    let userRole = sessionClaims?.userRole as string;

    if ( null != userRole  && userRole.toLowerCase().endsWith('admin')) {
        userRole = "admin";
    }else{
        userRole = "user";
    }

    const userId = sessionClaims?.userId as string;
    
    // console.log(' userId =', userId)
    // console.log(' auth() =', auth())

    return (
        <>
            <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
                <h3 className="wrapper h3-bold text-center sm:text-left">Update Event</h3>
            </section>

            <div className="wrapper my-8">
                <EventForm userId={ sessionClaims?.userId as string } userRole={userRole} type="Update" />
            </div>
        </>
    )
}