import { Card } from '@/components/ui/Card';

import { TransactionDrawer } from './_components/drawer';
import { TransactionsHeader } from './_components/header';
import { TransactionsTable } from './_components/table';

const TransactionsPage = () => (
  <Card>
    <TransactionsHeader />
    <TransactionsTable />
    <TransactionDrawer />
  </Card>
);

export default TransactionsPage;
