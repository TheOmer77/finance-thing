import {
  Legend,
  RadialBar,
  RadialBarChart as Chart,
  ResponsiveContainer,
  type DefaultLegendContentProps,
} from 'recharts';

import { LegendContent } from './legend-content';
import { COLORS } from './colors';
import type { SpendingChartProps } from './types';

const RadialLegendContent = (props: DefaultLegendContentProps) => (
  <LegendContent valueType='amount' {...props} />
);

export const RadialChart = ({ data }: SpendingChartProps) => (
  <ResponsiveContainer className='!h-[22rem]'>
    <Chart
      cx='50%'
      cy='30%'
      barSize={12}
      innerRadius='90%'
      outerRadius='40%'
      data={data.map((item, index) => ({
        ...item,
        fill: COLORS[index % COLORS.length],
      }))}
    >
      <Legend content={RadialLegendContent} />

      <RadialBar dataKey='value' background />
    </Chart>
  </ResponsiveContainer>
);
