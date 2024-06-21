export type TransactionsDaysData = {
  date: string;
  income: number;
  expenses: number;
}[];
export type TransactionsChartProps = { data: TransactionsDaysData };

export type TransactionsChartType = 'area' | 'bar' | 'line';
