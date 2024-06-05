import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/Button';
import { DrawerFooter } from '@/components/ui/Drawer';
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

const accountFormSchema = insertAccountSchema.pick({ name: true });
export type AccountFormValues = z.infer<typeof accountFormSchema>;

export type AccountFormProps = {
  defaultValues?: AccountFormValues;
  onSubmit: (values: AccountFormValues) => void;
  onDelete?: () => void;
  disabled?: boolean;
  isEdit?: boolean;
};

export const AccountForm = ({
  defaultValues,
  onSubmit,
  onDelete,
  disabled = false,
  isEdit = false,
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
        <DrawerFooter className='md:absolute md:inset-x-0 md:bottom-0'>
          {isEdit && (
            <Button
              type='button'
              disabled={disabled}
              onClick={() => onDelete?.()}
              variant='outline'
            >
              Delete
            </Button>
          )}
          <Button variant='primary' type='submit' disabled={disabled}>
            {isEdit ? 'Save' : 'Create'}
          </Button>
        </DrawerFooter>
      </form>
    </Form>
  );
};
