import { pgTable, text, timestamp } from 'drizzle-orm/pg-core';
import { createInsertSchema } from 'drizzle-zod';
import { createId } from '@paralleldrive/cuid2';

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

export const insertCategorySchema = createInsertSchema(categories, {
  name: ({ name }) => name.min(1, { message: 'Name is required.' }),
}).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
