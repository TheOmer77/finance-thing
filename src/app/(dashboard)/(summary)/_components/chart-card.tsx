import type { ComponentPropsWithoutRef } from 'react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { isErrorObj } from '@/lib/isErrorObj';
import type { MaybeError } from '@/constants/api';

import { AreaChart } from './charts/area-chart';
import type { ChartData } from './charts/types';

type ChartProps = ComponentPropsWithoutRef<'div'> & {
  data?: MaybeError<ChartData>;
};

const ChartCardContent = ({ data }: Pick<ChartProps, 'data'>) => {
  if (!data)
    return (
      <span className='text-sm text-muted-foreground'>Data is missing.</span>
    );
  if (isErrorObj(data))
    return (
      <span className='text-sm text-muted-foreground'>
        Something went wrong.
      </span>
    );
  if (data.length < 1)
    return (
      <span className='text-sm text-muted-foreground'>
        No data for this period.
      </span>
    );

  return <AreaChart data={data} />;
};

export const ChartCard = ({ data, ...props }: ChartProps) => {
  return (
    <Card {...props}>
      <CardHeader className='flex'>
        <CardTitle className='line-clamp-1'>Transactions</CardTitle>
        {/* TODO: Add select */}
      </CardHeader>
      <CardContent>
        <ChartCardContent data={data} />
      </CardContent>
    </Card>
  );
};
