## About
- This is a hotel app. Guests can search, filter by dates/prices/amenities, view the room card, and book rooms. For the administrator, there is a dashboard with bookings and their management, as well as the ability to add rooms and staff.

## You need:
- Node.js
- npm
- PostgreSQL
- docker

## Design
- Tailwind CSS

## How to create project:
- This is a [Next.js](https://nextjs.org) project bootstrapped with [
`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).


```bash
npx create-next-app@latest hotel-nextjs
```

## Project includes:
- Admin Panel
- Account
- Booking
- Search

## Steps:

### Run docker container and create db

```bash
docker run --name hotelnextjs-pg-container \
  -e POSTGRES_USER=hotelUser \
  -e POSTGRES_PASSWORD=hotelSecret \
  -e POSTGRES_DB=hotel-nextjs \
  -p 5433:5432 \
  -d postgres
```

### Create .env.local with DATABASE_URL
```
DATABASE_URL=postgresql://userName:userPassword@localhost:5433/hotel-nextjs
```

### Open DBeaver and create tables (SQL.md):
- guests
- guests_sessions
- reservations
- rooms
- staff_users
- staff_sessions

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically
optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions
are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use
the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme)
from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for
more details.






