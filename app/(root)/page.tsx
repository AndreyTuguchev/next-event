import Image from 'next/image';
import Link from 'next/link';

import { auth } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import CategoryFilter from '@/components/ui/category-filter';
import Collection from '@/components/ui/collection';
import Search from '@/components/ui/search';
import { getAllEvents } from '@/lib/actions/event.action';
import { SearchParamProps } from '@/types';

export default async function Home({ searchParams }: SearchParamProps) {
  const sessionClaims = auth().sessionClaims;

  let userRole = sessionClaims?.userRole as string;
  const isWebsiteAdmin = 'super_admin' === userRole;

  if (null != userRole && userRole.toLowerCase().endsWith('admin')) {
    userRole = 'admin';
  } else {
    userRole = 'user';
  }

  const loggedInUserId = sessionClaims?.userId as string;

  const currentPage = Number(searchParams?.page) || 1;
  const searchQuery = (searchParams?.query as string) || '';
  const currentCategory = (searchParams?.category as string) || '';

  const events = await getAllEvents({
    query: searchQuery,
    page: currentPage,
    category: currentCategory,
    limit: 9,
  });

  return (
    <>
      <section className='flex h-[100dvh] items-center bg-primary-50 bg-contain pt-[130px] md:py-10'>
        <div className='wrapper flex h-full flex-col items-center justify-center gap-5 md:h-auto md:flex-row'>
          <div className='flex h-[50%] flex-col justify-center gap-8'>
            <h1 className='h1-bold'>
              Introducing Cutting-Edge Events Hosting Platorm!
            </h1>
            <p className='p-regular-20 md:p-regular-24'>
              Book your tickets for latest events in your local area or anywhere
              in the world!
            </p>
            <Button asChild className='button w-full sm:w-fit' size='lg'>
              <Link href='#events'>Explore Now</Link>
            </Button>
          </div>

          <div className='flex h-[50%]'>
            <Image
              priority
              src={`/assets/images/hero.png`}
              width={1000}
              height={1000}
              alt='Hero image'
              className='max-h-[70vh] object-contain object-center 2xl:max-h-[50vh]'
            />
          </div>
        </div>
      </section>

      <section
        id='events'
        className='wrapper my-8 flex flex-col gap-8 md:gap-12'
      >
        <h2 className='h2-bold'>
          Trusted by <br /> Thousands of Events
        </h2>
        <div className='flex w-full flex-col gap-5 md:flex-row'>
          <Search placeholder='Search title...' />
          <CategoryFilter />
        </div>

        <Collection
          data={events?.data}
          emptyTitle='No Events Found'
          emptyStateSubtext='Come Back Later'
          collectionType='All_Events'
          page={currentPage}
          totalPages={events?.totalPages}
          loggedInUserId={loggedInUserId}
          isWebsiteAdmin={isWebsiteAdmin}
        />
      </section>
    </>
  );
}
