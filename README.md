This is a [Next.js](https://nextjs.org) project bootstrapped with [
`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

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

## How to create this project:

- npx create-next-app@latest hotel-nextjs
- create project structure in app directory(dir): components(dir): Footer.tsx, Header.tsx

### Steps:

- run docker container and create db
- create tables: rooms(test), 

```sql
CREATE TABLE public.rooms (
id SERIAL PRIMARY KEY,
name text NOT NULL,
description text NULL,
price numeric(10, 2) NOT NULL,
max_guests SMALLINT NOT NULL,
amenities text[] NULL,
image text NULL,
booked_dates JSONB DEFAULT '[]' 
)
```

```sql
INSERT INTO rooms (name, description, price, max_guests, amenities, image, booked_dates)
VALUES ('standard', 
'A cozy room with a double bed.', 
3500, 
2, 
ARRAY['Wi-Fi', 'TV', 'Conditioner'],  
'/images/rooms/standard.jpg',
$$[{ "checkIn": "2026-09-05", "checkOut": "2026-09-08" },
{ "checkIn": "2026-09-15", "checkOut": "2026-09-20" }]$$::jsonb)
```

```sql
INSERT INTO rooms (name, description, price, max_guests, amenities, image, booked_dates)
VALUES ('deluxe', 
'A spacious room with a sea view.', 
6500, 
3, 
ARRAY['Wi-Fi', 'TV', 'Mini‑bar', 'Safe'],  
'/images/rooms/deluxe.jpg',
$$[{ "checkIn": "2026-09-10", "checkOut": "2026-09-14" }]$$::jsonb)
```

```sql
INSERT INTO rooms (name, description, price, max_guests, amenities, image)
VALUES ('family', 
'Two rooms, perfect for a family.', 
9000, 
5, 
ARRAY['Wi-Fi', 'TV', 'Kitchen', 'Washing machine'],  
'/images/rooms/family.jpg')
```

