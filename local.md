## run docker container and create db

```bash
docker run --name hotelnextjs-pg-container \
  -e POSTGRES_USER=hotelUser \
  -e POSTGRES_PASSWORD=hotelSecret \
  -e POSTGRES_DB=hotel-nextjs \
  -p 5433:5432 \
  -d postgres
```

