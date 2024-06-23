import {
  RadarChart as Chart,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
} from 'recharts';

import type { SpendingChartProps } from './types';

export const RadarChart = ({ data }: SpendingChartProps) => (
  <ResponsiveContainer className='!h-[22rem]'>
    <Chart cx='50%' cy='50%' outerRadius='60%' data={data}>
      <PolarGrid />
      <PolarAngleAxis className='text-xs' dataKey='name' />
      <PolarRadiusAxis className='text-xs' />

      <Radar
        dataKey='value'
        stroke='hsl(var(--primary))'
        fill='hsl(var(--primary))'
        fillOpacity={0.6}
      />
    </Chart>
  </ResponsiveContainer>
);
