import { AccountDrawer } from './_components/drawer';
import { AccountsHeader } from './_components/header';
import { AccountsTable } from './_components/table';

const AccountsPage = () => (
  <>
    <AccountsHeader />
    <AccountsTable />
    <AccountDrawer />
  </>
);

export default AccountsPage;
