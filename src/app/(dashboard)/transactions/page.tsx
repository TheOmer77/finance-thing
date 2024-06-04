import { TransactionDrawer } from './_components/drawer';
import { TransactionsHeader } from './_components/header';
import { TransactionsTable } from './_components/table';

const TransactionsPage = () => (
  <>
    <TransactionsHeader />
    <TransactionsTable />
    <TransactionDrawer />
  </>
);

export default TransactionsPage;
