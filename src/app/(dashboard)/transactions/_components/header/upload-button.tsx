import { useId, type ChangeEvent } from 'react';
import { parse, type ParseResult } from 'papaparse';
import { UploadIcon } from 'lucide-react';

import { Button } from '@/components/ui/Button';

export type UploadButtonProps<T> = {
  onUpload?: (result: ParseResult<T>) => void;
};

export const UploadButton = <T,>({ onUpload }: UploadButtonProps<T>) => {
  const id = useId();

  const handleUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !onUpload) return;

    parse<T>(file, { complete: onUpload });
  };

  return (
    <>
      <Button className='w-10 cursor-pointer px-0 sm:w-auto sm:px-4' asChild>
        <label htmlFor={id}>
          <UploadIcon className='size-4 sm:me-2' />
          <span className='hidden sm:inline'>Import</span>
        </label>
      </Button>
      <input
        type='file'
        id={id}
        accept='text/csv'
        className='hidden'
        onChange={handleUpload}
      />
    </>
  );
};
