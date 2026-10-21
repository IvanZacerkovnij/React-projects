# Homework 10 — Authentication with React Portals

Registration and login open in modal windows rendered with `createPortal`
into `#modal-root`, outside the main React root. The shared modal uses a native
dialog for keyboard focus trapping and background interaction blocking.
Close it with Escape, the close button, or a backdrop click. Closing is disabled
while a request is pending. Successful authentication opens the protected `/me` page.

The backend is copied from Homework 9 and retains its four-layer architecture.
The frontend keeps the feature-based structure: `app`, `features`, and `shared`.

## Backend

Start Docker Desktop, then run from `works/homework10`:

```sh
cd backend
docker compose up -d --build
```

Compose starts SQL Server, creates the database and tables, then starts the API.
A local .NET SDK is not required.

API health check: http://localhost:5100/api/v1/health.
Database: `localhost,1440`, name: `homework10`, user: `sa`, password: `Homework10_Local!2026`.
The default password and JWT key are for local development only.
Override them with `SQL_SERVER_PASSWORD` and `JWT_KEY` before the first run if needed.
Database records remain in a separate Docker volume after `docker compose down`.
Homework 9 containers and records are unaffected.

## Frontend

Requires Node.js 22.12+ and npm. In another terminal, from `works/homework10`:

```sh
cd frontend
npm ci
npm run dev
```

Open http://localhost:5174 and click Login or Register in the header.
No frontend `.env` is needed; Vite proxies `/api` to port 5100.
After registration or login, the header displays your email and Logout.
The access token is saved in `localStorage` and checked after a page reload.
Tokens expire after 15 minutes. Refresh tokens are not implemented.
Logout revokes the current token in API memory; restarting the API clears revocations.

Frontend checks: `npm run build` and `npm run lint`.

Assignment reference: https://github.com/ifelseiforelif/fragment_portals.
