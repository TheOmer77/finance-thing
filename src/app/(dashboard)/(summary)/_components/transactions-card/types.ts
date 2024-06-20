export type ChartData = { date: string; income: number; expenses: number }[];
export type ChartProps = { data: ChartData };

export type ChartType = 'area' | 'bar' | 'line';
