import Image from 'next/image';

import type { Control } from 'react-hook-form';
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { EventFormValues } from '../../event-form.types';

interface LocationSectionProps {
  control: Control<EventFormValues>;
}

const LocationSection = ({ control }: LocationSectionProps) => {
  return (
    <div className='flex flex-col gap-5 md:flex-row'>
      <FormField
        control={control}
        name='location'
        render={({ field }) => (
          <FormItem className='w-full'>
            <FormControl>
              <div className='flex h-[54px] w-full items-center overflow-hidden rounded-full bg-grey-50 px-4 py-2'>
                <Image
                  width={24}
                  height={24}
                  src='/assets/icons/location-grey.svg'
                  alt=''
                  aria-hidden='true'
                />
                <Input
                  placeholder='Event Location or Online'
                  {...field}
                  className='input-field'
                  aria-label='Event location'
                />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default LocationSection;
