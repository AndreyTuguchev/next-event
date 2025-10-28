import type { Control } from 'react-hook-form';
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Switch } from '@/components/ui/switch';

import { EventFormValues } from '../../event-form.types';

interface AdminSectionProps {
  control: Control<EventFormValues>;
}

const AdminSection = ({ control }: AdminSectionProps) => {
  return (
    <div className='flex flex-col gap-5 md:flex-row'>
      <FormField
        control={control}
        name='isApproved'
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <div className='flex items-center'>
                <Switch
                  id='isApproved'
                  onCheckedChange={field.onChange}
                  checked={field.value}
                  className='form-switch mr-2 h-7 border-2 border-primary-500'
                  aria-label='Event approval status'
                />
                <label
                  htmlFor='isApproved'
                  className='cursor-pointer whitespace-nowrap pr-3 leading-none'
                >
                  {field.value ? 'Event Approved' : 'Pending Approval'}
                </label>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default AdminSection;
