# Homework 11 — Categories and Products

Category and product creation with React Hook Form, ASP.NET Core, and SQL Server.
Creation, login, and registration forms open in modal dialogs.

Requires Docker Desktop, Node.js 22.12+, and npm.
Run the commands below from the `homework11` directory.

## Backend

Start Docker Desktop, then run:

```sh
cd backend
docker compose up -d --build
```

API: `http://localhost:5101/api/v1`.
The database is created automatically; records persist after stopping Docker Compose.

## Frontend

In another terminal, also from `homework11`:

```sh
cd frontend
npm ci
npm run dev
```

Open `http://localhost:5175`.

## Usage

Register or log in, create a category, then add a product to it.
Select a category to filter the catalog. Reload the page to verify that records are saved.
