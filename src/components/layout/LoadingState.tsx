import { CardContent } from '@/components/ui/Card';
import { Spinner } from '@/components/ui/Spinner';

export type LoadingStateProps = { variant: 'drawer' | 'table' };

export const LoadingState = ({ variant }: LoadingStateProps) => {
  switch (variant) {
    case 'drawer':
      return (
        <div className='grid h-16 w-full place-items-center'>
          <Spinner />
        </div>
      );
    case 'table':
      return (
        <CardContent className='grid h-[32rem] w-full place-items-center'>
          <Spinner />
        </CardContent>
      );
  }
};
