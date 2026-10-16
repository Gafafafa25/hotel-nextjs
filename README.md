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
- create tables: rooms(test), staff_users, staff_sessions

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

```sql
CREATE TABLE public.staff_users (
id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
login text NOT NULL,
password text NOT NULL,
role text NOT NULL 
    CHECK (role IN ('admin', 'manager', 'intern')),
is_active boolean NOT NULL DEFAULT true,
created_at timestamptz NOT NULL DEFAULT NOW()
)
```

```sql
CREATE TABLE public.staff_sessions (
token_hash text PRIMARY KEY,
user_id BIGINT NOT NULL REFERENCES staff_users ON DELETE CASCADE,
expires_at timestamptz NOT NULL,
created_at timestamptz NOT NULL DEFAULT NOW()
)
```

```sql
CREATE EXTENSION IF NOT EXISTS pgcrypto;
```

```sql
INSERT INTO staff_users (login, password, role)
VALUES (
    'admin',
     crypt('admin', gen_salt('bf')),
     'admin'
)
```
```sql
INSERT INTO staff_users (login, password, role)
VALUES (
    'manager',
     crypt('manager', gen_salt('bf')),
     'manager'
)
```

```sql
INSERT INTO staff_users (login, password, role)
VALUES (
    'intern',
     crypt('intern', gen_salt('bf')),
     'intern'
)
```

- create 3 tables: rooms, guests, reservations

```sql
CREATE TABLE public.rooms (
    id SERIAL,
    room_number VARCHAR(20) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL,                  
    description TEXT,                             
    price NUMERIC(10, 2) NOT NULL,    
    max_guests INT NOT NULL DEFAULT 1, 
    image VARCHAR(500),                                   
    amenities text[] NULL,
    is_available BOOLEAN NOT NULL DEFAULT TRUE,
    CONSTRAINT rooms_pkey PRIMARY KEY (id)                                
)
```

- quick search by index rooms_available
```sql
CREATE INDEX idx_rooms_available ON rooms(is_available)
```

```sql
CREATE TABLE guests (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,  
    email VARCHAR(255),
    country VARCHAR(100),
    passport VARCHAR(100) NOT NULL,   
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    CONSTRAINT unique_passport UNIQUE (passport)
)
```

```sql
CREATE TABLE reservations (
    id SERIAL PRIMARY KEY,
    guest_id INT NOT NULL REFERENCES guests(id) ON DELETE CASCADE,
    room_id INT NOT NULL REFERENCES rooms(id) ON DELETE RESTRICT,
    check_in DATE NOT NULL,
    check_out DATE NOT NULL,
    total_price NUMERIC(10, 2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    CONSTRAINT check_dates CHECK (check_out > check_in)
)
```

- quick search by index reservations
```sql
CREATE INDEX idx_reservations ON reservations(check_in, check_out)
```

- add status for reservations?

```sql
ALTER TABLE rooms DROP COLUMN is_available;
```

```sql
ALTER TABLE reservations DROP COLUMN total_price;
```

```sql
INSERT INTO rooms (room_number, name, description, price, max_guests, image, amenities)
VALUES (
'001',
'family', 
'Two rooms, perfect for a family.', 
9000, 
5, 
'/images/rooms/family.jpg',
ARRAY['Wi-Fi', 'TV', 'Kitchen', 'Washing machine']
)
```

```sql
INSERT INTO rooms (room_number, name, description, price, max_guests, image, amenities)
VALUES (
'002',
'deluxe', 
'A spacious room with a sea view.', 
6500, 
3, 
'/images/rooms/deluxe.jpg',
ARRAY['Wi-Fi', 'TV', 'Mini‑bar', 'Safe']
)
```

```sql
INSERT INTO rooms (room_number, name, description, price, max_guests, image, amenities)
VALUES (
'003',
'standard', 
'A cozy room with a double bed.', 
3500, 
2, 
'/images/rooms/standard.jpg',
ARRAY['Wi-Fi', 'TV', 'Conditioner']
)
```

```sql
INSERT INTO guests (name, email, country, passport)
VALUES (
'Ivan',
'ivan@mail.com',
'Russia',
'4500123456'
)
```

```sql
INSERT INTO guests (name, email, country, passport)
VALUES (
'Maria',
'maria@yandex.ru',
'Russia',
'4500234567'
)
```

```sql
INSERT INTO guests (name, email, country, passport)
VALUES (
'Aigul',
'aigul@mail.kz',
'Kazakhstan',
'0001556677'
)
```

```sql
INSERT INTO reservations (guest_id, room_id, check_in, check_out)
VALUES (
1,
1,
'2026-12-10',
'2026-12-12'
)
```

```sql
INSERT INTO reservations (guest_id, room_id, check_in, check_out)
VALUES (
2, 
2,
'2026-11-10',
'2026-11-20'
)
```

```sql
INSERT INTO reservations (guest_id, room_id, check_in, check_out)
VALUES (
3, 
3,
'2026-12-03',
'2026-12-05'
)
```



