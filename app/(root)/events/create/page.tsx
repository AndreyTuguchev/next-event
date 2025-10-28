import { redirect } from 'next/navigation';

import { auth } from '@clerk/nextjs';
import EventForm from '@/components/forms/event-form';
import { isValidUserAction } from '@/lib/actions/user.actions';

export default async function CreateEvent() {
  const sessionClaims = auth().sessionClaims;

  let userRole = sessionClaims?.userRole as string;

  if (null != userRole && userRole.toLowerCase().endsWith('admin')) {
    userRole = 'admin';
  } else {
    userRole = 'user';
  }

  const userId = sessionClaims?.userId as string;

  if (null == userId) redirect('/sign-in');

  const isValidUserActionResult = await isValidUserAction(userId);

  return (
    <>
      <section className='bg-primary-50 bg-cover bg-center !pt-[130px] pb-5 md:py-10'>
        <h3 className='wrapper h3-bold text-center sm:text-left'>
          Create Event
        </h3>
      </section>

      <div className='wrapper my-8'>
        {isValidUserActionResult?.startsWith('Error') ? (
          <div
            className={`px-5 pt-[50px] text-center text-lg font-semibold text-[#f00]`}
          >
            {isValidUserActionResult}
          </div>
        ) : (
          <EventForm userId={userId} userRole={userRole} type='Create' />
        )}
      </div>
    </>
  );
}
