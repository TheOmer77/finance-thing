'use client';

import { useUser } from '@clerk/nextjs';
import { Loader2Icon } from 'lucide-react';

import { Button } from '@/components/ui/Button';
import { DropdownMenuTrigger } from '@/components/ui/DropdownMenu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar';

export const UserMenuTrigger = () => {
  const { isLoaded, user } = useUser();

  return (
    <DropdownMenuTrigger asChild>
      <Button
        variant='flat-nav'
        size='icon'
        className='ms-auto rounded-full p-2'
        disabled={!isLoaded}
      >
        {!isLoaded || !user?.id ? (
          <Loader2Icon className='size-7 animate-spin' />
        ) : (
          <Avatar className='size-9'>
            <AvatarImage
              alt={user?.primaryEmailAddress?.emailAddress || 'User'}
              src={user?.imageUrl}
            />
            <AvatarFallback>
              {user?.primaryEmailAddress?.emailAddress?.[0]}
            </AvatarFallback>
          </Avatar>
        )}
      </Button>
    </DropdownMenuTrigger>
  );
};
