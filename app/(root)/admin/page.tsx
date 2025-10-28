import { redirect } from 'next/navigation';

import { auth } from '@clerk/nextjs';
import CategoryFilter from '@/components/ui/category-filter';
import Collection from '@/components/ui/collection';
import Search from '@/components/ui/search';
import { getAllEvents } from '@/lib/actions/event.action';
import { SearchParamProps } from '@/types';

// disable page caching for all admin pages.
export const dynamic = 'force-dynamic';

export default async function AdminPage({ searchParams }: SearchParamProps) {
  const sessionClaims = auth().sessionClaims;
  let userRole = sessionClaims?.userRole as string;

  const isWebsiteAdmin = 'super_admin' === userRole;

  if (!isWebsiteAdmin) redirect('/');

  const userId = sessionClaims?.userId as string;

  const currentPage = Number(searchParams?.page) || 1;

  const searchQuery = (searchParams?.query as string) || '';
  const currentCategory = (searchParams?.category as string) || '';

  const events = await getAllEvents({
    query: searchQuery,
    page: currentPage,
    category: currentCategory,
    limit: 20,
    isWebsiteAdmin,
  });

  return (
    <section className='wrapper my-8 !pt-[115px]'>
      <div className='flex w-full flex-col gap-5 pb-10 md:flex-row'>
        <Search placeholder='Search title...' />
        <CategoryFilter />
      </div>

      <Collection
        data={events?.data}
        emptyTitle='No Event tickets found'
        emptyStateSubtext='You can find any type of event at our website!'
        collectionType='All_Events'
        page={currentPage}
        totalPages={events?.totalPages}
        urlParamName='ordersPage'
        loggedInUserId={userId}
        isWebsiteAdmin={isWebsiteAdmin}
      />
    </section>
  );
}
