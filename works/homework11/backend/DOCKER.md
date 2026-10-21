# Homework 11 — Category and Product API

ASP.NET Core 10 backend following the Homework 9–10 architecture:
`Shop.Api → Shop.Application → Shop.Domain`, with persistence implemented in
`Shop.Infrastructure`. Controllers call services, services call repositories,
and Entity Framework Core stores records in SQL Server.
Authentication is retained from Homework 10.

## Run

Start Docker Desktop, then run from the repository root:

```sh
cd works/homework11/backend
docker compose up -d --build
```

Compose starts SQL Server, initializes the database and tables, and starts the API.
A local .NET SDK is not required.

- Base URL: `http://localhost:5101/api/v1`
- Health check: `GET /api/v1/health`
- SQL Server: `localhost,1441`
- Database: `homework11`; user: `sa`; local password: `Homework11_Local!2026`

Ports and Docker storage are separate from Homework 9–10.
Override `SQL_SERVER_PASSWORD` and `JWT_KEY` before the first run if needed.
Stop with `docker compose down`; records remain in the Docker volume.

Database initialization uses `EnsureCreated`, as in Homework 10.
Future schema changes require migrations or recreating the local database, which deletes its records.

## Authentication

`POST /api/v1/auth/register`:

```json
{
  "email": "student@example.com",
  "password": "Student123!",
  "repeat_password": "Student123!"
}
```

`POST /api/v1/auth/login` accepts `email` and `password`.
Both return an `accessToken`. Pass `Authorization: Bearer <accessToken>`
when creating categories or products. Reading records does not require authentication.
`GET /api/v1/auth/me` and `POST /api/v1/auth/logout` are also available.

## Categories

- `GET /api/v1/categories` — list categories for the product form.
- `GET /api/v1/categories/{id}` — get a category or return `404`.
- `POST /api/v1/categories` — create a category; authentication required.

```json
{ "name": "Laptops" }
```

The name is required and limited to 100 characters.
Returns `201 Created`, the category's `id` and `name`,
and a `Location` header pointing to the new record.

## Products

- `GET /api/v1/products` — list products.
- `GET /api/v1/products/{id}` — get a product or return `404`.
- `POST /api/v1/products` — create a product; authentication required.

```json
{
  "name": "Lenovo IdeaPad",
  "description": "A laptop for studying",
  "price": 24999.99,
  "categoryId": "replace-with-an-existing-category-guid"
}
```

The name is required and limited to 200 characters.
The description is optional and limited to 2000 characters.
The price must be a JSON number between `0.01` and `9999999999.99`;
it is rounded to two decimal places.
The category must exist; a database foreign key also enforces this relationship.

Returns `201 Created` with `id`, `name`, `description`, `price`,
`categoryId`, and a `Location` header.
Invalid fields or an unknown category return `400` with an `errors` object.
Creating records without a valid token returns `401`.

## Frontend

CORS allows `http://localhost:5175`. The frontend in `../frontend` proxies
`/api` to `http://localhost:5101` through Vite.
React Hook Form dialogs submit JSON with `Content-Type: application/json`
and the authentication token.

See [../README.md](../README.md) for instructions on running both applications.

Build locally with the .NET 10 SDK:

```sh
dotnet build ShopApi.slnx
```
