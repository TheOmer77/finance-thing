import { DataCard } from './data-card';

export const DataGrid = () => (
  <div className='mb-4 grid grid-cols-1 gap-4 pb-2 md:mb-8 md:gap-8 lg:grid-cols-3'>
    <DataCard title='Remaining' type='remaining' />
    <DataCard title='Income' type='income' />
    <DataCard title='Expenses' type='expenses' />
  </div>
);
