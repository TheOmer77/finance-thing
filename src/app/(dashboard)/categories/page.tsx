import { Card } from '@/components/ui/Card';

import { CategoriesHeader } from './_components/header';
import { CategoriesTable } from './_components/table';
import { CategoryDrawer } from './_components/drawer';

const CategoriesPage = () => (
  <Card>
    <CategoriesHeader />
    <CategoriesTable />
    <CategoryDrawer />
  </Card>
);

export default CategoriesPage;
