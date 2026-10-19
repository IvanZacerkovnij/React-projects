# Homework 6 — Categories

Start PostgreSQL and the ASP.NET API in one terminal:

```sh
cd backend
docker compose up -d --wait
dotnet run --launch-profile http
```

Start React in a second terminal from `homework6`:

```sh
cd frontend
npm install
npm run dev
```

Open the URL printed by Vite. Its development proxy forwards `/api` requests to
`http://localhost:5099`. The production build needs an equivalent reverse proxy.

The page loads categories from the API. Submit a name to create a category;
the list updates after the server confirms creation. Refresh the page to verify
that the category is loaded from PostgreSQL. Empty names are rejected, and names
are limited to 100 characters. Errors are displayed next to the form or list.

Checks: run `npm run build` and `npm run lint` in `frontend`.
