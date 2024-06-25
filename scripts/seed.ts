import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import { eachDayOfInterval, subDays } from 'date-fns';
import { createId } from '@paralleldrive/cuid2';

import { accounts, categories, transactions } from '@/db/schema';
import { amountToMilliunits } from '@/lib/amount';

const sql = neon(process.env.DATABASE_URL!),
  db = drizzle(sql);

const SEED_USER_ID = 'user_2ggeoOtM5kWArUAmkzGQ6iC3iGT';
const SEED_CATEGORIES = [
  { id: createId(), name: 'Food', userId: SEED_USER_ID },
  { id: createId(), name: 'Rent', userId: SEED_USER_ID },
  { id: createId(), name: 'Utilities', userId: SEED_USER_ID },
  { id: createId(), name: 'Clothing', userId: SEED_USER_ID },
];
const SEED_ACCOUNTS = [
  { id: createId(), name: 'Checking', userId: SEED_USER_ID },
  { id: createId(), name: 'Savings', userId: SEED_USER_ID },
];

const defaultTo = new Date();
const defaultFrom = subDays(defaultTo, 90);
const SEED_TRANSACTIONS: (typeof transactions.$inferSelect)[] = [];

const generateRandomAmount = (category: typeof categories.$inferInsert) => {
  switch (category.name) {
    case 'Rent':
      return Math.random() * 400 + 90; // Rent will likely be a larger amount
    case 'Utilities':
      return Math.random() * 200 + 50;
    case 'Food':
      return Math.random() * 30 + 10;
    case 'Transportation':
    case 'Health':
      return Math.random() * 50 + 15;
    case 'Entertainment':
    case 'Clothing':
    case 'Miscellaneous':
      return Math.random() * 100 + 20;
    default:
      return Math.random() * 50 + 10;
  }
};

const generateTransactionsForDay = (date: Date) => {
  const numTransactions = Math.floor(Math.random() * 4) + 1; // 1-4 transactions per day
  for (let i = 0; i < numTransactions; i++) {
    const category =
      SEED_CATEGORIES[Math.floor(Math.random() * SEED_CATEGORIES.length)];
    const isExpense = Math.random() > 0.6; // 60% chance
    const amount = generateRandomAmount(category);
    const formattedAmount = amountToMilliunits(isExpense ? -amount : amount);
    const id = createId();

    SEED_TRANSACTIONS.push({
      id,
      accountId: SEED_ACCOUNTS[0].id,
      categoryId: category.id,
      date,
      amount: formattedAmount,
      payee: 'Merchant',
      notes: 'Random transaction',
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
};

const generateTransactions = () =>
  eachDayOfInterval({ start: defaultFrom, end: defaultTo }).forEach(day =>
    generateTransactionsForDay(day)
  );

generateTransactions();

const main = async () => {
  try {
    await db.delete(transactions).execute();
    await db.delete(accounts).execute();
    await db.delete(categories).execute();

    await db.insert(categories).values(SEED_CATEGORIES).execute();
    await db.insert(accounts).values(SEED_ACCOUNTS).execute();
    await db.insert(transactions).values(SEED_TRANSACTIONS).execute();
  } catch (error) {
    console.error('Error during seed:', error);
    process.exit(1);
  }
};

main();
