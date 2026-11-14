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

```sql
ALTER TABLE guests
ALTER COLUMN id TYPE BIGINT
```

```sql
ALTER TABLE guests
ADD COLUMN password text NOT NULL
```

```sql
INSERT INTO guests (name, email, country, passport, password)
VALUES (
'Ivan',
'ivan@mail.com',
'Russia',
'4500123456',
crypt('ivan', gen_salt('bf'))
)
```

```sql
INSERT INTO guests (name, email, country, passport, password)
VALUES (
'Maria',
'maria@yandex.ru',
'Russia',
'4500234567',
crypt('maria', gen_salt('bf'))
)
```

```sql
INSERT INTO guests (name, email, country, passport, password)
VALUES (
'Aigul',
'aigul@mail.kz',
'Kazakhstan',
'0001556677',
crypt('aigul', gen_salt('bf'))
)
```

```sql
INSERT INTO reservations (guest_id, room_id, check_in, check_out)
VALUES (
34,
1,
'2026-12-10',
'2026-12-12'
)
```

```sql
INSERT INTO reservations (guest_id, room_id, check_in, check_out)
VALUES (
35, 
2,
'2026-11-10',
'2026-11-20'
)
```

```sql
INSERT INTO reservations (guest_id, room_id, check_in, check_out)
VALUES (
36, 
3,
'2026-12-03',
'2026-12-05'
)
```

```sql
CREATE TABLE public.guests_sessions (
token_hash text PRIMARY KEY,
user_id BIGINT NOT NULL REFERENCES guests ON DELETE CASCADE,
expires_at timestamptz NOT NULL,
created_at timestamptz NOT NULL DEFAULT NOW()
)
```

```sql
ALTER TABLE rooms
ALTER COLUMN image
TYPE text[]
USING ARRAY[image::text]
```