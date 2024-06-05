import { Loader2Icon } from 'lucide-react';

import { CardContent } from '@/components/ui/Card';

export type LoadingStateProps = { variant: 'drawer' | 'table' };

export const LoadingState = ({ variant }: LoadingStateProps) => {
  const spinner = (
    <Loader2Icon className='size-6 animate-spin text-muted-foreground' />
  );

  switch (variant) {
    case 'drawer':
      return (
        <div className='grid h-16 w-full place-items-center'>{spinner}</div>
      );
    case 'table':
      return (
        <CardContent className='grid h-[32rem] w-full place-items-center'>
          {spinner}
        </CardContent>
      );
  }
};
