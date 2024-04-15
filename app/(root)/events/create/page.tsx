import EventForm from "@/components/shared/EventForm";
import { isValidUserAction } from "@/lib/actions/user.actions";
import { auth } from "@clerk/nextjs";


export default async function CreateEvent (){

    const sessionClaims = auth().sessionClaims;

    let userRole = sessionClaims?.userRole as string;

    if ( null != userRole  && userRole.toLowerCase().endsWith('admin')) {
        userRole = "admin";
    }else{
        userRole = "user";
    }

    const userId = sessionClaims?.userId as string;

    // get all events created by this user and check amount of not approved events.

    const isValidUserActionResult = await isValidUserAction(userId);

    console.log(isValidUserActionResult)

    return (
        <>
            <section className="bg-primary-50 bg-cover bg-center py-5 md:py-10">
                <h3 className="wrapper h3-bold text-center sm:text-left">Create Event</h3>
            </section>

            <div className="wrapper my-8">
            { isValidUserActionResult?.startsWith("Error") 
            ? <div className={`pt-[50px] px-5 text-center text-lg text-[#f00] font-semibold`}>{isValidUserActionResult}</div> 
            : <EventForm userId={userId} userRole={userRole} type="Create" />
            }
                
            </div>
        </>
    )
}