# Homework 8 — Category Pagination

Categories and subcategories display eight items per page with numbered pages
and Previous/Next buttons. Opening another category resets pagination.

## Backend

Start Docker Desktop, then run from `works/homework8`:

```sh
cd backend
docker compose up -d --build
```

Compose starts SQL Server 2022, applies migrations, loads 31 demo categories
and 84 products without duplicates, then starts the API.
A local .NET SDK is not required.

Swagger: http://localhost:5097/swagger.
Database: `localhost,1438`, name: `store`, user: `sa`, password: `Homework8_Local!2026`.

Stop with `docker compose down`. Database records and uploaded images remain
in Docker volumes.

## Frontend

In another terminal, from `works/homework8`:

```sh
cd frontend
npm ci
cp .env-example .env
npm run dev
```

Copy the environment file only on first setup. It points to the API at
`http://localhost:5097/api/v1/`.

Open http://localhost:5173/categories, or use the port printed by Vite.
Click a category to view its subcategories or products.

Frontend checks: `npm run build` and `npm run lint`.
