'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/Button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/Form';
import { Input } from '@/components/ui/Input';
import { insertAccountSchema } from '@/db/schema';
import { DrawerFooter } from '@/components/ui/Drawer';

const accountFormSchema = insertAccountSchema.pick({ name: true });
type AccountFormValues = z.infer<typeof accountFormSchema>;

export type AccountFormProps = {
  id?: string;
  defaultValues?: AccountFormValues;
  onSubmit: (values: AccountFormValues) => void;
  onDelete?: () => void;
  disabled?: boolean;
};

export const AccountForm = ({
  id,
  defaultValues,
  onSubmit,
  onDelete,
  disabled,
}: AccountFormProps) => {
  const form = useForm<AccountFormValues>({
    resolver: zodResolver(accountFormSchema),
    defaultValues: defaultValues,
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className='space-y-4 px-4'>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} disabled={disabled} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <DrawerFooter>
          {onDelete && id && (
            <Button
              type='button'
              disabled={disabled}
              onClick={() => onDelete?.()}
              variant='secondary'
            >
              Delete
            </Button>
          )}
          <Button type='submit' disabled={disabled}>
            {id ? 'Save' : 'Create'}
          </Button>
        </DrawerFooter>
      </form>
    </Form>
  );
};
