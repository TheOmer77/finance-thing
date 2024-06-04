import { Loader2Icon } from 'lucide-react';

export const DrawerLoadingState = () => (
  <div className='grid h-16 w-full place-items-center'>
    <Loader2Icon className='size-6 animate-spin text-muted-foreground' />
  </div>
);
