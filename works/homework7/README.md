# Homework 7 — Categories and Products

Start PostgreSQL and the API from `works/homework7`:

```sh
cd backend
docker compose up -d --wait
dotnet restore
dotnet run --launch-profile http
```

API: `http://localhost:5100`, PostgreSQL: `localhost:5437`.
Compose project: `homework7`, volume: `homework7_categories_data`.
The homework6 database remains separate on port 5436.

During homework7 setup, existing homework6 data was copied using
`pg_dump` / `psql` into a separate, empty homework7 database. Do not repeat
the import into an already initialized database.

On startup, the API runs `backend/Database/Initialize.sql` to add `parent_id`,
the products table, and indexes without deleting existing data. Demo data
is inserted only once; restarting does not create duplicates.
Do not use `docker compose down -v` if you want to keep your data.

## API Requests

- `GET /api/categories` — root categories (`parentId: null`).
- `GET /api/categories?parentId=ID` — immediate subcategories.
- `GET /api/categories/ID` — a category with its `parentId` for navigating to its parent.
- `GET /api/categories/ID/products` — products in this category only, excluding descendants.
- `POST /api/categories` — JSON `{"name":"Name","parentId":ID}`;
  omitting `parentId` or setting it to `null` creates a root category.

A missing category returns 404, invalid input returns 400, and empty lists return `[]`.
For navigation, load subcategories first. If the list is empty, load products.
Use IDs from API responses, as they may vary.

Demo hierarchy (category names are stored in Ukrainian): Electronics → Audio →
Headphones / Speakers; Home → Kitchen.
Product fields match homework5, with `categoryId` added.
`media` is currently empty because images have not been copied to the backend.

## Frontend

In another terminal, from `works/homework7`:

```sh
cd frontend
npm ci
npm run dev
```

Open `http://localhost:5177`. Vite proxies `/api` to port 5100.
Port 5177 is fixed: Vite reports an error if it is already in use.
The production build requires an equivalent reverse proxy configuration for `/api`.

Click a category to open its subcategories. If there are none, products
from the selected category are displayed. The Back button returns to the previous
level, and the root categories button returns to the start. The current path
appears above the list. The interface labels are in Ukrainian.
The form adds a category at the current level. Loading indicators, retries
after errors, and empty list messages are included.

Search requirements need clarification before implementation.

Backend checks: `cd backend && dotnet build`.
Frontend checks: `cd frontend && npm run build && npm run lint`.
