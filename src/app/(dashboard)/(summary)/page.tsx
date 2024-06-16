import { DataCard } from './_components/data-card';

const DashboardPage = () => {
  return (
    <div className='mb-8 grid grid-cols-1 gap-8 pb-2 lg:grid-cols-3'>
      <DataCard title='Remaining' type='remaining' />
      <DataCard title='Income' type='income' />
      <DataCard title='Expenses' type='expenses' />
    </div>
  );
};

export default DashboardPage;
