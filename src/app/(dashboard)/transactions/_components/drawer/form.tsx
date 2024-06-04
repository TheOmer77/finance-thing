import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { CommandGroup } from 'cmdk';
import { z } from 'zod';

import {
  Autocomplete,
  AutocompleteContent,
  AutocompleteCreatableItem,
  AutocompleteInput,
  AutocompleteItem,
} from '@/components/ui/Autocomplete';
import { AmountInput } from '@/components/ui/AmountInput';
import { Button } from '@/components/ui/Button';
import { DatePicker } from '@/components/ui/DatePicker';
import { DrawerFooter } from '@/components/ui/Drawer';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/Form';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { useAccounts, type AccountsArray } from '@/hooks/useAccounts';
import { useCategories, type CategoriesArray } from '@/hooks/useCategories';
import { insertTransactionSchema } from '@/db/schema';

export type TransactionFormValues = z.infer<typeof insertTransactionSchema>;

export type TransactionFormProps = {
  defaultValues?: TransactionFormValues;
  accounts?: AccountsArray;
  categories?: CategoriesArray;
  onSubmit: (values: TransactionFormValues) => void;
  onDelete?: () => void;
  disabled?: boolean;
  isEdit?: boolean;
};

export const TransactionForm = ({
  defaultValues,
  accounts = [],
  categories = [],
  onSubmit,
  onDelete,
  disabled = false,
  isEdit = false,
}: TransactionFormProps) => {
  const { createAccount, createAccountPending } = useAccounts(),
    { createCategory, createCategoryPending } = useCategories();

  const form = useForm<TransactionFormValues>({
    resolver: zodResolver(insertTransactionSchema),
    defaultValues: defaultValues,
    disabled: disabled || createAccountPending || createCategoryPending,
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className='space-y-4 px-4'>
          <FormField
            control={form.control}
            name='date'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date</FormLabel>
                <FormControl>
                  <DatePicker
                    value={field.value}
                    onValueChange={field.onChange}
                    disabled={field.disabled}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='accountId'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Account</FormLabel>
                <Autocomplete
                  value={field.value}
                  onValueChange={field.onChange}
                  onCreatableSelect={(name, setValue) => {
                    createAccount(
                      { name },
                      { onSuccess: ({ data }) => setValue(data.id) }
                    );
                  }}
                >
                  <FormControl>
                    <AutocompleteInput
                      {...field}
                      placeholder='Select an account'
                    />
                  </FormControl>
                  <AutocompleteContent>
                    <CommandGroup>
                      {accounts.map(({ id, name }) => (
                        <AutocompleteItem key={id} value={id}>
                          {name}
                        </AutocompleteItem>
                      ))}
                    </CommandGroup>
                    <AutocompleteCreatableItem />
                  </AutocompleteContent>
                </Autocomplete>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='categoryId'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Autocomplete
                  value={field.value || ''}
                  onValueChange={field.onChange}
                  onCreatableSelect={(name, setValue) => {
                    createCategory(
                      { name },
                      { onSuccess: ({ data }) => setValue(data.id) }
                    );
                  }}
                >
                  <FormControl>
                    <AutocompleteInput
                      {...field}
                      placeholder='Select a category'
                    />
                  </FormControl>
                  <AutocompleteContent>
                    {categories.map(({ id, name }) => (
                      <AutocompleteItem key={id} value={id}>
                        {name}
                      </AutocompleteItem>
                    ))}
                    <AutocompleteCreatableItem />
                  </AutocompleteContent>
                </Autocomplete>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='payee'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Payee</FormLabel>
                <FormControl>
                  <Input {...field} value={field.value || ''} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='amount'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Amount</FormLabel>
                <FormControl>
                  <AmountInput {...field} value={field.value || 0} />
                </FormControl>
                {field.value !== 0 && (
                  <FormDescription>
                    {field.value > 0
                      ? 'This will count as income.'
                      : 'This will count as an expense.'}
                  </FormDescription>
                )}
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='notes'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Notes</FormLabel>
                <FormControl>
                  <Textarea {...field} value={field.value || ''} />
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
