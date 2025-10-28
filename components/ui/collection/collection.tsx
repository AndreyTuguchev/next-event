import EventCard from '@/components/ui/event-card';
import Pagination from '@/components/ui/pagination';

import { CollectionProps } from './collection.types';

const Collection = ({
  data,
  emptyTitle,
  emptyStateSubtext,
  collectionType,
  page,
  totalPages,
  urlParamName,
  loggedInUserId,
  isWebsiteAdmin,
}: CollectionProps) => {
  return (
    <>
      {null != data[0] && data.length > 0 ? (
        <div className='flex flex-col items-center gap-10'>
          <ul className='grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:gap-10'>
            {data.map(event => {
              const hasOrderLink = 'Events_Organized' === collectionType;
              const hidePrice = 'My_Tickets' === collectionType;

              return (
                <li key={event?._id} className='flex justify-center'>
                  {null !== event && (
                    <EventCard
                      event={event}
                      hasOrderLink={hasOrderLink}
                      hidePrice={hidePrice}
                      loggedInUserId={loggedInUserId}
                      isWebsiteAdmin={isWebsiteAdmin}
                    />
                  )}
                </li>
              );
            })}
          </ul>

          {totalPages && totalPages > 1 && (
            <Pagination
              urlParamName={urlParamName}
              page={page}
              totalPages={totalPages}
            />
          )}
        </div>
      ) : (
        <div className='flex-center wrapper min-h-[200px] w-full flex-col gap-3 rounded-[14px] bg-grey-50 py-28 text-center'>
          <h3 className='p-bold-20 md:h5-bold'>{emptyTitle}</h3>
          <p className='p-regular-14'>{emptyStateSubtext}</p>
        </div>
      )}
    </>
  );
};

export default Collection;
