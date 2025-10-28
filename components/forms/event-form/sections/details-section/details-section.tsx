import FileUploader from '@/components/ui/file-uploader';
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';

import { DetailsSectionTypes } from './details-section.types';

const DetailsSection = ({ control, setFiles }: DetailsSectionTypes) => {
  return (
    <div className='flex flex-col gap-5 md:flex-row'>
      <FormField
        control={control}
        name='description'
        render={({ field }) => (
          <FormItem className='w-full'>
            <FormControl className='h-72'>
              <Textarea
                placeholder='Description'
                {...field}
                className='textarea rounded-2xl'
                aria-label='Event description'
                required
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name='imageUrl'
        render={({ field }) => (
          <FormItem className='w-full cursor-pointer'>
            <FormControl className='h-72'>
              <FileUploader
                onFieldChange={field.onChange}
                imageUrl={field.value}
                setFiles={setFiles}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default DetailsSection;
