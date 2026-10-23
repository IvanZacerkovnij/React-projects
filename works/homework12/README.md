# Homework 12 — Shopping Cart

Based on Homework 11, with shopping cart state managed by Redux Toolkit.
Category and product creation uses React Hook Form, ASP.NET Core, and SQL Server.
Creation, login, and registration forms open in modal dialogs.

Requires Docker Desktop, Node.js 22.12+, and npm.
Run the commands below from the `homework12` directory.

## Backend

Start Docker Desktop, then run:

```sh
cd backend
docker compose up -d --build
```

API: `http://localhost:5102/api/v1`.
The database is created automatically; records persist after stopping Docker Compose.

## Frontend

In another terminal, also from `homework12`:

```sh
cd frontend
npm ci
npm run dev
```

Open `http://localhost:5176`.

## Usage

Register or log in, create a category, then add a product to it.
Select a category to filter the catalog. Reload the page to verify that records are saved.

Add products to the cart using the buttons on product cards. In the cart, change
quantities, remove individual products, or clear the entire cart. The total quantity
and price update automatically. Cart actions do not require login.

## Cart store

`frontend/src/app/store.ts` registers the cart reducer.
`frontend/src/features/cart/model/cartSlice.ts` exports these actions:

- `addToCart(product)` adds a product or increases its existing quantity.
- `removeFromCart(productId)` removes a product regardless of quantity.
- `increaseQuantity(productId)` increases quantity by one.
- `decreaseQuantity(productId)` decreases quantity by one, with a minimum of one.
- `clearCart()` removes all products.

Unknown product IDs do not change the cart. Cart state is held in memory and resets
on page reload. Backend records persist independently. Ports and Docker storage are
separate from Homework 11.
