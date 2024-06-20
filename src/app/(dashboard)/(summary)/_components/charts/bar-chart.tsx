import {
  Bar,
  BarChart as Chart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from 'recharts';
import { format } from 'date-fns';

import { ChartTooltip } from './chart-tooltip';
import type { ChartProps } from './types';

export const BarChart = ({ data }: ChartProps) => {
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

        <Bar
          dataKey='income'
          fill='hsl(var(--primary))'
          className='drop-shadow-sm'
        />
        <Bar
          dataKey='expenses'
          fill='hsl(var(--destructive))'
          className='drop-shadow-sm'
        />
      </Chart>
    </ResponsiveContainer>
  );
};
