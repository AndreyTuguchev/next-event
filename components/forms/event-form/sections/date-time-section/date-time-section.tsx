import Image from 'next/image';

import DatePicker from 'react-datepicker';
import type { Control } from 'react-hook-form';
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';

import { EventFormValues } from '../../event-form.types';

import 'react-datepicker/dist/react-datepicker.css';

interface DateTimeSectionProps {
  control: Control<EventFormValues>;
}

const DateTimeSection = ({ control }: DateTimeSectionProps) => {
  return (
    <div className='flex flex-col gap-5 md:flex-row'>
      <FormField
        control={control}
        name='startDateTime'
        render={({ field }) => (
          <FormItem className='w-full'>
            <FormControl>
              <div className='flex h-[54px] w-full items-center overflow-hidden rounded-full bg-grey-50 px-4 py-2'>
                <Image
                  width={24}
                  height={24}
                  src='/assets/icons/calendar.svg'
                  alt=''
                  aria-hidden='true'
                  className='filter-grey'
                />
                <p className='ml-3 whitespace-nowrap text-grey-500'>
                  Start Date:
                </p>
                <DatePicker
                  selected={field.value}
                  onChange={(date: Date) => field.onChange(date)}
                  showTimeSelect
                  timeInputLabel='Time:'
                  dateFormat='MM/dd/yyyy h:mm aa'
                  wrapperClassName='datePicker'
                  aria-label='Event start date and time'
                />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name='endDateTime'
        render={({ field }) => (
          <FormItem className='w-full'>
            <FormControl>
              <div className='flex h-[54px] w-full items-center overflow-hidden rounded-full bg-grey-50 px-4 py-2'>
                <Image
                  width={24}
                  height={24}
                  src='/assets/icons/calendar.svg'
                  alt=''
                  aria-hidden='true'
                  className='filter-grey'
                />
                <p className='ml-3 whitespace-nowrap text-grey-500'>
                  End Date:
                </p>
                <DatePicker
                  selected={field.value}
                  onChange={(date: Date) => field.onChange(date)}
                  showTimeSelect
                  timeInputLabel='Time:'
                  dateFormat='MM/dd/yyyy h:mm aa'
                  wrapperClassName='datePicker'
                  aria-label='Event end date and time'
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

export default DateTimeSection;
