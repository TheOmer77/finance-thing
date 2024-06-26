# Finance thing

This is a finance platform that allows you to track your income and expenses, by adding transactions (manually or by importing them from a CSV file) and assign them to specific accounts and categories. It was created by following [this tutorial](https://youtu.be/N_uNKAus0II?si=DT2WyV3Ni6G1uE_R), though it probably has many changes in both its code and UI from that tutorial.

Technologies used in this project include:

- [React](https://react.dev/) and [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/) and [shadcn/ui](https://ui.shadcn.com/)
- [Clerk](https://clerk.com/) for auth
- [Hono](https://hono.dev/) for API routes
- [Tanstack Query](https://tanstack.com/query/latest) for data fetching and interacting with the API
- [Postgres](https://www.postgresql.org/) DB (in this case [Neon serverless](https://neon.tech/))
- [Drizzle ORM](https://orm.drizzle.team/)
- [Docker](https://www.docker.com/) compose in local development (run both the app itself and Drizzle studio)

**This project exists purely for educational purposes. I have no plans to develop it any further.**

## Getting Started

First, copy the contents of .env.example into a new .env file, and fill in any empty variables.

Once you've done that, run the development server and Drizzle studio with Docker Compose:

```bash
docker compose up -d
```

Initialize the database by running:

```bash
docker compose exec app pnpm db:migrate
```

Open [localhost:3000](http://localhost:3000) in your browser to see the app. \
You can also view the database in Drizzle Studio at [local.drizzle.studio](https://local.drizzle.studio/).

If you want to add some dummy data to the database, you can use the seed script:

```bash
docker compose exec app pnpm db:seed
```
