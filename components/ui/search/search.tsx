'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';

import { Input } from '@/components/ui/input';
import { formUrlQuery, removeKeysFromQuery } from '@/lib/utils';

const Search = ({ placeholder }: { placeholder?: string }) => {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const searchParams = useSearchParams();

  useEffect(() => {
    const debounceSearch = setTimeout(() => {
      let newUrl = '';

      if (query) {
        newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: 'query',
          value: query,
        });
      } else {
        newUrl = removeKeysFromQuery({
          params: searchParams.toString(),
          keysToRemove: ['query'],
        });
      }

      router.push(newUrl, { scroll: false });
    }, 450);

    return () => {
      clearTimeout(debounceSearch);
    };
  }, [query, searchParams, router]);

  return (
    <div className='flex-center min-h-14 w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2'>
      <Image
        src='data:image/svg+xml,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20viewBox=%220%200%2026%2026%22%3E%3C/svg%3E'
        data-src={`/assets/icons/search.svg`}
        width={24}
        height={24}
        alt='seach icon'
      />
      <Input
        type='text'
        placeholder={placeholder}
        onChange={e => setQuery(e.target.value)}
        className='p-regular-16 border-0 bg-grey-50 outline-offset-0 placeholder:text-grey-500 focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0'
      />
    </div>
  );
};

export default Search;
