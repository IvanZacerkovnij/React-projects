# Homework 9 — JWT Authorization

Registration, login, a protected profile page, and logout.
Requires Docker Desktop and Node.js 22.12+ with npm.

## Backend

Start Docker Desktop, then run from `works/homework9`:

```sh
cd backend
docker compose up -d --build
```

Compose starts SQL Server, automatically creates the database and tables,
then starts the API. A local .NET SDK is not required.

API health check: http://localhost:5099/api/v1/health.
Database: `localhost,1439`, name: `homework9`, user: `sa`, password: `Homework9_Local!2026`.
The default password and JWT key are intended for local development.

Stop from the `backend` directory with `docker compose down`.
Database records remain in the Docker volume.
If a local `dotnet run` is using port 5099, stop it before starting the containers.

## Frontend

In another terminal, from `works/homework9`:

```sh
cd frontend
npm ci
npm run dev
```

Open http://localhost:5173/register and create an account.
Registration or login redirects you to `/me`, which displays your profile.
Click Logout in the header to sign out. Login page: http://localhost:5173/login.

No frontend `.env` file is needed: Vite proxies API requests to port 5099.
If port 5173 is already in use, stop the other Vite server with `Ctrl+C`.

Frontend checks: `npm run build` and `npm run lint`.
