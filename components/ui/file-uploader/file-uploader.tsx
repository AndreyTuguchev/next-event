import { useCallback } from 'react';
import Image from 'next/image';

import { useDropzone } from '@uploadthing/react';
import { generateClientDropzoneAccept } from 'uploadthing/client';
import { Button } from '@/components/ui/button';
import { cn, convertFileToUrl } from '@/lib/utils';

import { FileUploaderProps } from './file-uploader.types';

const FileUploader = ({
  onFieldChange,
  imageUrl,
  setFiles,
}: FileUploaderProps) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setFiles(acceptedFiles);
      onFieldChange(convertFileToUrl(acceptedFiles[0]));
    },
    [onFieldChange, setFiles]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: generateClientDropzoneAccept(['image/*']),
  });

  // TODO: add clear button to clear the selected image

  return (
    <div className='relative'>
      <div
        {...getRootProps()}
        className={cn(
          'h-full items-center overflow-hidden rounded-2xl',
          !imageUrl ? 'w-full' : 'w-auto'
        )}
      >
        <input {...getInputProps()} className='w-full' />

        {!imageUrl ? (
          <div className='flex-center flex-col py-5 text-grey-500'>
            <span className=''>Drag image file here</span>
            <p className='p-medium-12 mb-2'>SVG, PNG, JPG</p>
            <Button type='button' className='rounded-full'>
              Select from computer
            </Button>
          </div>
        ) : (
          <span className='flex h-full w-full flex-1 items-center justify-center'>
            <Image
              src={imageUrl}
              width={200}
              height={200}
              alt='event hero'
              className='h-full w-auto object-cover object-center'
            />
          </span>
        )}
      </div>
    </div>
  );
};

export default FileUploader;
