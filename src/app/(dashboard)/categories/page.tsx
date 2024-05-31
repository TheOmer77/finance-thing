import { CategoryDrawer } from '@/components/layout/modals/CategoryDrawer';

import { CategoriesTable } from './table';
import { CategoriesHeader } from './header';

const CategoriesPage = () => (
  <>
    <CategoriesHeader />
    <CategoriesTable />
    <CategoryDrawer />
  </>
);

export default CategoriesPage;
