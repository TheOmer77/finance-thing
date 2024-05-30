import { relations } from 'drizzle-orm';
import { pgTable, text, timestamp } from 'drizzle-orm/pg-core';
import { createInsertSchema } from 'drizzle-zod';
import { createId } from '@paralleldrive/cuid2';

import { transactions } from './transactions';

export const categories = pgTable('categories', {
  id: text('id').primaryKey().$default(createId),
  userId: text('user_id').notNull(),
  name: text('name').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const categoriesRelations = relations(categories, ({ many }) => ({
  transactions: many(transactions),
}));

export const insertCategorySchema = createInsertSchema(categories, {
  name: ({ name }) => name.min(1, { message: 'Name is required.' }),
}).omit({
  createdAt: true,
  updatedAt: true,
});
