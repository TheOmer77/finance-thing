'use client';

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
import { insertCategorySchema } from '@/db/schema';

const categoryFormSchema = insertCategorySchema.pick({ name: true });
export type CategoryFormValues = z.infer<typeof categoryFormSchema>;

export type CategoryFormProps = {
  defaultValues?: CategoryFormValues;
  onSubmit: (values: CategoryFormValues) => void;
  onDelete?: () => void;
  disabled?: boolean;
  isEdit?: boolean;
};

export const CategoryForm = ({
  defaultValues,
  onSubmit,
  onDelete,
  disabled,
  isEdit,
}: CategoryFormProps) => {
  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categoryFormSchema),
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
          <Button type='submit' disabled={disabled}>
            {isEdit ? 'Save' : 'Create'}
          </Button>
        </DrawerFooter>
      </form>
    </Form>
  );
};
