import { TransactionDrawer } from '@/components/layout/modals/TransactionDrawer';

import { TransactionsTable } from './table';
import { TransactionsHeader } from './header';

const TransactionsPage = () => (
  <>
    <TransactionsHeader />
    <TransactionsTable />
    <TransactionDrawer />
  </>
);

export default TransactionsPage;
