import Image from "next/image";
import Link from "next/link";
import Head from "next/head";

<Head>
  <link
    rel="preload"
    href={`"${process.env.NEXT_PUBLIC_CDN_URL}/assets/images/about/about-page-hero.jpg"`}
    as="image"
  />
</Head>

export default function AboutPage(){

    return (
        <>
        <section className="h-[35vh] md:h-[50vh] relative bg-cover bg-center flex items-center " >
            <div className="absolute w-full h-full blur-[1px] md:blur-[3px] bg-no-repeat bg-center bg-cover lazyloaded" style={{ backgroundImage: `url(${process.env.NEXT_PUBLIC_CDN_URL}/assets/images/about/about-page-hero.jpg)` }} ></div>
            <div className="absolute w-full h-full bg-[#000]  opacity-[0.8]"  ></div>
            <div className="wrapper flex items-center justify-center z-[2] mt-[70px] md:mt-[70px]" >
                <h1 className="h1-bold text-center sm:text-left text-white">About Us</h1>
            </div>
        </section>

        <section className="flex bg-cover md:h-[50vh] bg-center py-5 md:py-10">
            <div className="wrapper flex flex-col md:flex-row items-center justify-center ">
                <div className="about-section-item md:h-full w-full flex flex-col items-center justify-center">
                    <Image priority src={`${process.env.NEXT_PUBLIC_CDN_URL}/assets/images/about/homepage-hero.jpg`} width={1038} height={661} alt='about section image'  className="h-auto w-auto max-h-full" unoptimized />
                </div>
                <div className="about-section-item md:h-full w-full md:p-10 flex flex-col items-center md:items-start justify-center text-center md:text-left">
                    <h2 className="text-2xl font-bold md:h2-bold pt-[20px] pb-[15px]">Homepage Hero Section</h2>
                    <p className="text-justify md:text-left text-[15px] md:text-lg mb-[40px] md:mb-0">Once you navigate to the <Link className="text-[#313fbc]" href="/">homepage</Link> you can press <Link className="text-[#313fbc]" href="/sign-in">Login</Link> button which will open Clerk authentication form or you can simply {`'Explore now'`} button which will scroll the page to the events section where you can find all types of events according to you interests</p>
                </div>
            </div>
        </section>


        <section className="flex bg-cover md:h-[50vh] bg-center py-5 md:py-10">
            <div className="wrapper flex flex-col md:flex-row items-center justify-center">
                <div className="about-section-item md:h-full w-full flex flex-col items-center justify-center md:order-2">
                    <Image src="data:image/svg+xml,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20viewBox=%220%200%2026%2026%22%3E%3C/svg%3E" data-src={`${process.env.NEXT_PUBLIC_CDN_URL}/assets/images/about/homepage-events-section-v2.jpg`} width={793} height={562} alt='about section image'  className="h-auto w-auto max-h-full" />
                </div>
                <div className="about-section-item md:h-full w-full md:p-10 flex flex-col items-center md:items-end justify-center text-center md:text-left">
                    <h2 className="text-2xl md:text-right font-bold md:h2-bold pt-[20px] pb-[15px]">Homepage Events Section</h2>
                    <p className="text-justify md:text-right text-[15px] md:text-lg mb-[40px] md:mb-0">You can easily <Link className="text-[#313fbc]" href="/#events">search by title or by category</Link> and find the event that will start soon. Pagination appears only if we have more than 9 events to display according to your current search queries.</p>
                </div>
            </div>
        </section>


        <section className="flex bg-cover md:h-[50vh] bg-center py-5 md:py-10">
            <div className="wrapper flex flex-col md:flex-row items-center justify-center ">
                <div className="about-section-item md:h-full w-full flex flex-col items-center justify-center">
                    <Image src="data:image/svg+xml,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20viewBox=%220%200%2026%2026%22%3E%3C/svg%3E" data-src={`${process.env.NEXT_PUBLIC_CDN_URL}/assets/images/about/homepage-searching.jpg`} width={950} height={950} alt='about section image' className="h-auto w-auto max-h-full"  />
                </div>
                <div className="about-section-item md:h-full w-full md:p-10 flex flex-col items-center md:items-start justify-center text-center md:text-left">
                    <h2 className="text-2xl font-bold md:h2-bold pt-[20px] pb-[15px]">Homepage Search</h2>
                    <p className="text-justify md:text-left text-[15px] md:text-lg mb-[40px] md:mb-0">You can easily search for any text in the event&#39;s title or search by category</p>
                </div>
            </div>
        </section>



        <section className="flex bg-cover md:h-[50vh] bg-center py-5 md:py-10">
            <div className="wrapper flex flex-col md:flex-row items-center justify-center">
                <div className="about-section-item md:h-full w-full flex flex-col items-center justify-center md:order-2">
                    <Image src="data:image/svg+xml,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20viewBox=%220%200%2026%2026%22%3E%3C/svg%3E" data-src={`${process.env.NEXT_PUBLIC_CDN_URL}/assets/images/about/homepage-pagination-v2.jpg`} width={650} height={650} alt='about section image'  className="h-auto w-auto max-h-full"  />
                </div>
                <div className="about-section-item md:h-full w-full md:p-10 flex flex-col items-center md:items-end justify-center text-center md:text-left ">
                    <h2 className="text-2xl md:text-right font-bold md:h2-bold pt-[20px] pb-[15px]">Pagination</h2>
                    <p className="text-justify md:text-right text-[15px] md:text-lg mb-[40px] md:mb-0 pb-[30px]">Pagination will be rendered if we have more than 9 events to display according to your current search request.</p>
                </div>
            </div>
        </section>







        <section className="flex bg-cover md:h-[50vh] bg-center py-5 md:py-10">
            <div className="wrapper flex flex-col md:flex-row items-center justify-center ">
                <div className="about-section-item md:h-full w-full flex flex-col items-center justify-center">
                    <Image src="data:image/svg+xml,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20viewBox=%220%200%2026%2026%22%3E%3C/svg%3E" data-src={`${process.env.NEXT_PUBLIC_CDN_URL}/assets/images/about/event-page-hero.jpg`} width={950} height={950} alt='about section image' className="h-auto w-auto max-h-full"  />
                </div>
                <div className="about-section-item md:h-full w-full md:p-10 flex flex-col items-center md:items-start justify-center text-center md:text-left">
                    <h2 className="text-2xl font-bold md:h2-bold pt-[20px] pb-[15px]">Event Page Hero Section</h2>
                    <p className="text-justify md:text-left text-[15px] md:text-lg mb-[40px] md:mb-0">Once you navigate to an existing event you can see all the information about this event in it&#39;s Hero section. By pressing the &#39;Get Tickets&#39; button you will be redirected to the Stripe payment form where you can use the test credit card number <br/>4242 4242 4242 4242 and any expiration date and CVV in order to finalize your purchase.</p>
                </div>
            </div>
        </section>



        <section className="flex bg-cover md:h-[50vh] bg-center py-5 md:py-10">
            <div className="wrapper flex flex-col md:flex-row items-center justify-center">
                <div className="about-section-item md:h-full w-full flex flex-col items-center justify-center md:order-2">
                    <Image src="data:image/svg+xml,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20viewBox=%220%200%2026%2026%22%3E%3C/svg%3E" data-src={`${process.env.NEXT_PUBLIC_CDN_URL}/assets/images/about/event-page-related-events.jpg`} width={650} height={650} alt='about section image'  className="h-auto w-auto max-h-full"  />
                </div>
                <div className="about-section-item md:h-full w-full md:p-10 flex flex-col items-center md:items-end justify-center text-center md:text-left ">
                    <h2 className="text-2xl md:text-right font-bold md:h2-bold pt-[20px] pb-[15px]">Related Events</h2>
                    <p className="text-justify md:text-right text-[15px] md:text-lg mb-[40px] md:mb-0 ">If we have any other events from the same category they will be listed below the related events section for currently opened event.</p>
                </div>
            </div>
        </section>






        <section className="flex bg-cover md:h-[50vh] bg-center py-5 md:py-10">
            <div className="wrapper flex flex-col md:flex-row items-center justify-center ">
                <div className="about-section-item md:h-full w-full flex flex-col items-center justify-center">
                    <Image src="data:image/svg+xml,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20viewBox=%220%200%2026%2026%22%3E%3C/svg%3E" data-src={`${process.env.NEXT_PUBLIC_CDN_URL}/assets/images/about/sign-in-form.jpg`} width={950} height={950} alt='about section image'  className="h-auto w-auto max-h-full" />
                </div>
                <div className="about-section-item md:h-full w-full md:p-10 flex flex-col items-center md:items-start justify-center text-center md:text-left">
                    <h2 className="text-2xl font-bold md:h2-bold pt-[20px] pb-[15px]">Sign-In Form</h2>
                    <p className="text-justify md:text-left text-[15px] md:text-lg mb-[40px] md:mb-0">Once you click &#39;Login&#39; or &#39;Get Tickets&#39; button you&#39;ll be redirected to the sign-in page where you can find Clerk based authentication. You can use Google, Facebook, LinkedIn or even GitHub accounts to sign-in or sign-up via Clerk.</p>
                </div>
            </div>
        </section>



        <section className="flex bg-cover md:h-[50vh] bg-center py-5 md:py-10">
            <div className="wrapper flex flex-col md:flex-row items-center justify-center">
                <div className="about-section-item md:h-full w-full flex flex-col items-center justify-center md:order-2">
                    <Image src="data:image/svg+xml,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20viewBox=%220%200%2026%2026%22%3E%3C/svg%3E" data-src={`${process.env.NEXT_PUBLIC_CDN_URL}/assets/images/about/stripe-payment-form--v2.jpg`} width={650} height={650} alt='about section image' className="h-auto w-auto max-h-full" />
                </div>
                <div className="about-section-item md:h-full w-full md:p-10 flex flex-col items-center md:items-end justify-center text-center md:text-left ">
                    <h2 className="text-2xl md:text-right font-bold md:h2-bold pt-[20px] pb-[15px]">Stripe Payment Form</h2>
                    <p className="text-justify md:text-right text-[15px] md:text-lg mb-[40px] md:mb-0 ">Once you&#39;ve pressed &#39;Get Tickets&#39; button you&#39;ll be redirected to the Stripe payment form where you can enter test credit card details to complete this purchase.</p>
                </div>
            </div>
        </section>


        <section className="flex bg-cover md:h-[50vh] bg-center py-5 md:py-10">
            <div className="wrapper flex flex-col md:flex-row items-center justify-center ">
                <div className="about-section-item md:h-full w-full flex flex-col items-center justify-center">
                    <Image src="data:image/svg+xml,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20viewBox=%220%200%2026%2026%22%3E%3C/svg%3E" data-src={`${process.env.NEXT_PUBLIC_CDN_URL}/assets/images/about/profile-my-tickets.jpg`} width={950} height={950} alt='about section image' className="h-auto w-auto max-h-full"  />
                </div>
                <div className="about-section-item md:h-full w-full md:p-10 flex flex-col items-center md:items-start justify-center text-center md:text-left">
                    <h2 className="text-2xl font-bold md:h2-bold pt-[20px] pb-[15px]">Profile My Tickets</h2>
                    <p className="text-justify md:text-left text-[15px] md:text-lg mb-[40px] md:mb-0">If you&#39;ve purchased any ticket in the past those tickets will be listed at your profile&#39;s page.</p>
                </div>
            </div>
        </section>

        <section className="flex bg-cover md:h-[50vh] bg-center py-5 md:py-10">
            <div className="wrapper flex flex-col md:flex-row items-center justify-center">
                <div className="about-section-item md:h-full w-full flex flex-col items-center justify-center md:order-2">
                    <Image src="data:image/svg+xml,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20viewBox=%220%200%2026%2026%22%3E%3C/svg%3E" data-src={`${process.env.NEXT_PUBLIC_CDN_URL}/assets/images/about/profile-orginized-events.jpg`} width={650} height={650} alt='about section image'  className="h-auto w-auto max-h-full"  />
                </div>
                <div className="about-section-item md:h-full w-full md:p-10 flex flex-col items-center md:items-end justify-center text-center md:text-left ">
                    <h2 className="text-2xl md:text-right font-bold md:h2-bold pt-[20px] pb-[15px]">Profile Organized Events</h2>
                    <p className="text-justify md:text-right text-[15px] md:text-lg mb-[40px] md:mb-0 ">If you&#39;ve organized any event in the past those events will be listed at your profile&#39;s page.</p>
                </div>
            </div>
        </section>





        <section className="flex bg-cover md:h-[50vh] bg-center py-5 md:py-10">
            <div className="wrapper flex flex-col md:flex-row items-center justify-center ">
                <div className="about-section-item md:h-full w-full flex flex-col items-center justify-center">
                    <Image src="data:image/svg+xml,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20viewBox=%220%200%2026%2026%22%3E%3C/svg%3E" data-src={`${process.env.NEXT_PUBLIC_CDN_URL}/assets/images/about/new-event-pending-status.jpg`} width={950} height={950} alt='about section image' className="h-auto w-auto max-h-full"  />
                </div>
                <div className="about-section-item md:h-full w-full md:p-10 flex flex-col items-center md:items-start justify-center text-center md:text-left">
                    <h2 className="text-2xl font-bold md:h2-bold pt-[20px] pb-[15px]">New Event Status</h2>
                    <p className="text-justify md:text-left text-[15px] md:text-lg mb-[40px] md:mb-0">Every new event has &#39;Pending Approval&#39; status by default and only the website&#39;s admin can approve the event. Each user can only have 2 pending events at any point in time and the user can create up to 25 events. Create form will not be rendered if the user already has 2 pending events or reached 25 events created in total. This can help us to reduce the amount of spam.</p>
                </div>
            </div>
        </section>
        <section className="flex bg-cover md:h-[50vh] bg-center py-5 md:py-10">
            <div className="wrapper flex flex-col md:flex-row items-center justify-center">
                <div className="about-section-item md:h-full w-full flex flex-col items-center justify-center md:order-2">
                    <Image src="data:image/svg+xml,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20viewBox=%220%200%2026%2026%22%3E%3C/svg%3E" data-src={`${process.env.NEXT_PUBLIC_CDN_URL}/assets/images/about/event-deletion-example.jpg`} width={650} height={650} alt='about section image'  className="h-auto w-auto max-h-full"  />
                </div>
                <div className="about-section-item md:h-full w-full md:p-10 flex flex-col items-center md:items-end justify-center text-center md:text-left ">
                    <h2 className="text-2xl md:text-right font-bold md:h2-bold pt-[20px] pb-[15px]">Event Delete Action</h2>
                    <p className="text-justify md:text-right text-[15px] md:text-lg mb-[40px] md:mb-0 ">Once you navigate to your profile page you can edit or delete your events by pressing specified buttons. Edit button will navigate you to the event edit form but the delete button will render the confirmation where you can make a final decision about this event.</p>
                </div>
            </div>
        </section>

        </>
    )
}