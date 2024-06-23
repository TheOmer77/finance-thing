import { TransactionsChartCard } from './transactions-card';
import { SpendingPieCard } from './spending-card';

export const DataCharts = () => (
  <div className='grid grid-cols-1 gap-4 md:gap-8 lg:grid-cols-6'>
    <TransactionsChartCard />
    <SpendingPieCard />
  </div>
);
