'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { headerLinks } from '@/constants';
import { cn } from '@/lib/utils';

const NavItems = ({ websiteAdmin }: { websiteAdmin: boolean }) => {
  const pathname = usePathname();

  return (
    <ul className='md:flex-between flex w-full flex-col items-start gap-5 md:flex-row'>
      {headerLinks.map(link => {
        return (
          <li
            key={`${link.route}-${link.label}`}
            className={cn(
              'flex-center p-medium-16 w-full whitespace-nowrap py-2.5',
              link.route === pathname ? 'text-primary-500' : 'text-neutral-600'
            )}
          >
            <Link href={link.route}>{link.label}</Link>
          </li>
        );
      })}
      {websiteAdmin && (
        <li
          className={cn(
            'flex-center p-medium-16 relative w-full whitespace-nowrap px-2 py-2 text-center md:w-auto md:text-left',
            '/admin' === pathname && 'text-primary-500'
          )}
        >
          <Link href='/admin'>Admin</Link>
        </li>
      )}
    </ul>
  );
};

export default NavItems;
