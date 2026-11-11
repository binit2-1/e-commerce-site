# API routes

All routes below are implemented. To add one: write `src/routes/<name>.routes.ts` and `src/controllers/<name>.controller.ts`, then mount the router in `src/index.ts`.

## Products (done)
- [x] `GET /api/products` (filters, sort, pagination)
- [x] `GET /api/products/new-arrivals`, `/best-sellers`
- [x] `GET /api/products/:id`, `/:id/related`, `/:id/reviews`

## Auth (`/api/auth`)
- [x] `POST /register` — name, email, password -> create user, start session
- [x] `POST /login` — email, password -> start session
- [x] `POST /logout` — clear session
- [x] `GET /me` — current user or 401 (the web app calls this on load)

## Reviews
- [x] `POST /api/products/:id/reviews` — logged in; rating 1-5 + body (powers "Write a Review")

## Cart (logged-in users; the web cart is browser-only today)
- [x] `GET /api/cart`
- [x] `PUT /api/cart` — replace cart items (simplest sync)  *or* `POST/PATCH/DELETE /api/cart/items`
- [x] `POST /api/cart/merge` — on login, merge the browser cart into the saved one (optional)

## Orders (no payment: checkout just places the order)
- [x] `POST /api/orders` — create from the cart (copy price/name into order_items), clear cart
- [x] `GET /api/orders` — my orders
- [x] `GET /api/orders/:id` — one of my orders (404 if it isn't mine)

## Tables
`users`, `products`, `reviews`, `cart_items`, `orders`, `order_items` (see `apps/api/db/schema.sql`).
