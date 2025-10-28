import { Dispatch, SetStateAction } from 'react';

export type FileUploaderProps = {
  onFieldChange: (value: string) => void;
  setFiles: Dispatch<SetStateAction<File[]>>;
  imageUrl: string;
};
