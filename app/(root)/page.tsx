import Collection from "@/components/shared/Collection";
import { Button } from "@/components/ui/button";
import { getAllEvents } from "@/lib/actions/event.action";
import Image from "next/image";
import Link from "next/link";
import { auth } from "@clerk/nextjs";
import { useContext } from 'react';


export default async function Home() {

  const sessionClaims = auth().sessionClaims;

  let userRole = sessionClaims?.userRole as string;

  if ( null != userRole  && userRole.toLowerCase().endsWith('admin')) {
      userRole = "admin";
  }else{
      userRole = "user";
  }

  const loggedInUserId = sessionClaims?.userId as string;


  
  const events = await getAllEvents({
    query: "",
    page: 1,
    category: "",
    limit: 8
  });

  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-contain py-5 md:py-10">
        <div className="wrapper grid grid-cols-1 gap-5 md:grid-cols-2 2xl:gap-0">
          <div className="flex flex-col justify-center gap-8">
            <h1 className="h1-bold">Introducing Cutting-Edge Events Hosting Platorm!</h1>
            <p className="p-regular-20 md:p-regular-24">Book your tickets for latest events in your local area or anywhere in the world!</p>
            <Button asChild className="button w-full sm:w-fit" size="lg">
              <Link href="#events">
                Explore Now
              </Link>
            </Button>
          </div>

          <Image src="/assets/images/hero.png" width={1000} height={1000} alt="Hero image" className="max-h-[70vh] object-contain object-center 2xl:max-h-[50vh]" />
        </div>
      </section>

      <section id="events" className="wrapper my-8 flex flex-col gap-8 md:gap-12">
        <h2 className="h2-bold">Trusted by <br/> Thousands of Events</h2>
        <div className="flex w-full flex-col gap-5 md:flex-row">
          TODO: Search component <br/>
          TODO: CategoryFilter component
        </div>

        <Collection 
          data={events?.data}
          emptyTitle="No Events Found"
          emptyStateSubtext="Come Back Later"
          collectionType="All_Events"
          limit={8}
          page={1}
          totalPages={2}
          loggedInUserId={loggedInUserId}
        />
      </section>
    </>
  );
}
