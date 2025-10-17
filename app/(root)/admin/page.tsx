import Collection from "@/components/ui/collection";
import CategoryFilter from "@/components/ui/category-filter";
import Search from "@/components/ui/search";
import { getAllEvents } from "@/lib/actions/event.action";
import { SearchParamProps } from "@/types";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

// disable page caching for all admin pages.
export const dynamic = "force-dynamic";

export default async function AdminPage({ searchParams }: SearchParamProps) {
  const sessionClaims = auth().sessionClaims;
  let userRole = sessionClaims?.userRole as string;

  const isWebsiteAdmin = "super_admin" === userRole;

  if (!isWebsiteAdmin) redirect("/");

  const userId = sessionClaims?.userId as string;

  const currentPage = Number(searchParams?.page) || 1;

  const searchQuery = (searchParams?.query as string) || "";
  const currentCategory = (searchParams?.category as string) || "";

  const events = await getAllEvents({
    query: searchQuery,
    page: currentPage,
    category: currentCategory,
    limit: 20,
    isWebsiteAdmin,
  });

  return (
    <section className="!pt-[115px] wrapper my-8">
      <div className="flex w-full flex-col gap-5 md:flex-row pb-10">
        <Search placeholder="Search title..." />
        <CategoryFilter />
      </div>

      <Collection
        data={events?.data}
        emptyTitle="No Event tickets found"
        emptyStateSubtext="You can find any type of event at our website!"
        collectionType="All_Events"
        page={currentPage}
        totalPages={events?.totalPages}
        urlParamName="ordersPage"
        loggedInUserId={userId}
        isWebsiteAdmin={isWebsiteAdmin}
      />
    </section>
  );
}
