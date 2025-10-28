'use client';

import { startTransition, useState } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { deleteEvent } from '@/lib/actions/event.action';
import { cn } from '@/lib/utils';

const DeleteConfirmation = ({ eventId }: { eventId: string }) => {
  const [deleteEventState, setDeleteEventState] = useState(false);
  const pathname = usePathname();

  return (
    <div
      className={cn(
        'shaodw-sm right-2 z-10 flex cursor-pointer flex-col gap-4 overflow-hidden rounded-xl transition-all',
        !deleteEventState && 'absolute top-14 bg-white'
      )}
    >
      <span
        className={cn('p-3', deleteEventState && `!hidden`)}
        onClick={() => {
          setDeleteEventState(true);
        }}
      >
        <Image
          src={`/assets/icons/delete.svg`}
          alt='edit'
          width={20}
          height={20}
        />
      </span>

      {deleteEventState && (
        <>
          <span className='absolute left-0 top-0 z-10 flex h-full w-full items-center bg-[#00000092] p-10 text-center backdrop-blur'></span>
          <span className='absolute left-0 top-0 z-20 flex h-full w-full flex-col items-center justify-center p-10 text-center text-white'>
            <div className='w-full'>
              Are You Sure You Want To Delete This Event?
            </div>
            <div className='mt-5 flex w-full justify-evenly'>
              <Button
                variant='destructive'
                onClick={() =>
                  startTransition(async () => {
                    await deleteEvent({ eventId, path: pathname });
                  })
                }
              >
                Yes
              </Button>
              <Button
                className='bg-[#2aa523] hover:bg-[#3ea839b5]'
                onClick={() => {
                  setDeleteEventState(false);
                }}
              >
                No
              </Button>
            </div>
          </span>
        </>
      )}
    </div>
  );
};

export default DeleteConfirmation;
