import type { PropsWithChildren } from 'react';
import { MenuIcon } from 'lucide-react';

import { Button } from '@/components/ui/Button';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/Drawer';

export const NavDrawer = ({ children }: PropsWithChildren) => (
  <Drawer direction='left'>
    <DrawerTrigger asChild>
      <Button variant='flat-nav' size='icon' className='-order-1 lg:hidden'>
        <MenuIcon className='size-4' />
      </Button>
    </DrawerTrigger>
    <DrawerContent className='p-2'>
      <div className='flex flex-col gap-px'>{children}</div>
    </DrawerContent>
  </Drawer>
);
