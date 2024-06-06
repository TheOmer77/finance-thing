import { useId, type ChangeEvent } from 'react';
import { parse, type ParseResult } from 'papaparse';
import { toast } from 'sonner';
import { UploadIcon } from 'lucide-react';

import { Button } from '@/components/ui/Button';

export type UploadButtonProps = {
  onUpload?: (result: ParseResult<string[]>) => void;
};

export const UploadButton = ({ onUpload }: UploadButtonProps) => {
  const id = useId();

  const handleUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !onUpload) return;
    if (file.type === 'text/csv') return parse(file, { complete: onUpload });

    toast.error('The file selected is not a CSV file.');
    event.target.value = '';
  };

  return (
    <>
      <input
        type='file'
        id={id}
        accept='text/csv'
        className='size-0 overflow-hidden [&+label]:focus-visible:outline-none
[&+label]:focus-visible:ring-2 [&+label]:focus-visible:ring-ring
[&+label]:focus-visible:ring-offset-2'
        onChange={handleUpload}
      />
      <Button className='w-10 cursor-pointer px-0 sm:w-auto sm:px-4' asChild>
        <label htmlFor={id}>
          <UploadIcon className='size-4 sm:me-2' />
          <span className='hidden sm:inline'>Import</span>
        </label>
      </Button>
    </>
  );
};
