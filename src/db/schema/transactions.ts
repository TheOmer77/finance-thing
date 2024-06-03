import { relations } from 'drizzle-orm';
import { integer, pgTable, text, timestamp } from 'drizzle-orm/pg-core';
import { createInsertSchema } from 'drizzle-zod';
import { z } from 'zod';
import { createId } from '@paralleldrive/cuid2';

import { accounts } from './accounts';
import { categories } from './categories';

export const transactions = pgTable('transactions', {
  id: text('id').primaryKey().$default(createId),
  amount: integer('amount').notNull(),
  payee: text('payee').notNull(),
  notes: text('notes'),
  date: timestamp('date', { mode: 'date' }).notNull(),

  accountId: text('account_id')
    .notNull()
    .references(() => accounts.id, { onDelete: 'cascade' }),
  categoryId: text('category_id').references(() => categories.id, {
    onDelete: 'set null',
  }),

  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const transactionsRelations = relations(transactions, ({ one }) => ({
  account: one(accounts, {
    fields: [transactions.accountId],
    references: [accounts.id],
  }),
  category: one(categories, {
    fields: [transactions.categoryId],
    references: [categories.id],
  }),
}));

export const transactionsAccountsRelation = relations(accounts, ({ many }) => ({
  transactions: many(transactions),
}));
export const transactionsCategoriesRelations = relations(
  categories,
  ({ many }) => ({
    transactions: many(transactions),
  })
);

const AMOUNT_REQUIRED_MSG = 'Amount is required, and cannot be zero.';
export const insertTransactionSchema = createInsertSchema(transactions, {
  accountId: ({ accountId }) =>
    accountId
      .min(1, { message: 'Account is required.' })
      .cuid2({ message: 'Invalid account.' }),
  categoryId: ({ categoryId }) =>
    categoryId.cuid2({ message: 'Invalid category.' }),
  amount: ({ amount }) =>
    amount
      .positive({ message: AMOUNT_REQUIRED_MSG })
      .or(amount.negative({ message: AMOUNT_REQUIRED_MSG })),
  payee: ({ payee }) => payee.min(1, { message: 'Payee is required.' }),
  date: z.coerce.date({ message: 'Date is required.' }),
}).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
