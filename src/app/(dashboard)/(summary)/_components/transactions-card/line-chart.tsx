import {
  Line,
  LineChart as Chart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from 'recharts';
import { format } from 'date-fns';

import { ChartTooltip } from './chart-tooltip';
import type { ChartProps } from './types';

export const LineChart = ({ data }: ChartProps) => {
  const absData = data.map(item => ({
    ...item,
    income: Math.abs(item.income),
    expenses: Math.abs(item.expenses),
  }));

  return (
    <ResponsiveContainer className='!h-[22rem]'>
      <Chart data={absData}>
        <CartesianGrid
          strokeDasharray='3 3'
          className='stroke-muted-foreground'
        />
        <XAxis
          axisLine={false}
          tickLine={false}
          dataKey='date'
          tickFormatter={value => format(value, 'MMM dd')}
          tickMargin={16}
          className='text-xs'
        />
        <Tooltip content={<ChartTooltip />} />

        <Line
          dot={false}
          dataKey='income'
          stroke='hsl(var(--primary))'
          strokeWidth={2}
          className='drop-shadow-sm'
        />
        <Line
          dot={false}
          dataKey='expenses'
          stroke='hsl(var(--destructive))'
          strokeWidth={2}
          className='drop-shadow-sm'
        />
      </Chart>
    </ResponsiveContainer>
  );
};
