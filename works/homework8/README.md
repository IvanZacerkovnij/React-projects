# Homework 8 — Category Pagination

Categories and subcategories with eight items per page and navigation to products.
The frontend uses a feature-based structure: `app`, `features`, and `shared`.

Requires Docker Desktop, Node.js 22.12+, and npm.
Run the commands below from the `homework8` directory.

## Backend

Start Docker Desktop, then run:

```sh
cd backend
docker compose up -d --build
```

Swagger: `http://localhost:5097/swagger`.
The database and demo data are created automatically; records persist after stopping Docker Compose.

## Frontend

In another terminal, also from `homework8`:

```sh
cd frontend
npm ci
cp .env-example .env
npm run dev
```

Copy the environment file only on first setup.
Open `http://localhost:5173/categories`, or use the port printed by Vite.

## Usage

Click a category to view its subcategories or products.
Use the page numbers or Previous/Next buttons to switch pages.
Opening another category resets pagination.
