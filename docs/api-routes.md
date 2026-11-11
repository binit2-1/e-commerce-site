# API routes

`[x]` = already wired, `[ ]` = yours to write. Pattern: add `src/routes/<name>.routes.ts` and
`src/controllers/<name>.controller.ts`, then mount the router in `src/index.ts`.

## Products (done)
- [x] `GET /api/products` (filters, sort, pagination)
- [x] `GET /api/products/new-arrivals`, `/best-sellers`
- [x] `GET /api/products/:id`, `/:id/related`, `/:id/reviews`

## Auth (`/api/auth`)
- [ ] `POST /register` — name, email, password -> create user, start session
- [ ] `POST /login` — email, password -> start session
- [ ] `POST /logout` — clear session
- [ ] `GET /me` — current user or 401 (the web app calls this on load)

## Reviews
- [ ] `POST /api/products/:id/reviews` — logged in; rating 1-5 + body (powers "Write a Review")

## Cart (logged-in users; the web cart is browser-only today)
- [ ] `GET /api/cart`
- [ ] `PUT /api/cart` — replace cart items (simplest sync)  *or* `POST/PATCH/DELETE /api/cart/items`
- [ ] `POST /api/cart/merge` — on login, merge the browser cart into the saved one (optional)

## Orders (no payment: checkout just places the order)
- [ ] `POST /api/orders` — create from the cart (copy price/name into order_items), clear cart
- [ ] `GET /api/orders` — my orders
- [ ] `GET /api/orders/:id` — one of my orders (404 if it isn't mine)

## Tables you will need (add to `apps/api/db/schema.sql`)
- `users(user_id, name, email unique, password_hash, created_at)`
- `carts / cart_items(user_id, product_id, size, color, quantity)` (or a single `cart_items` table)
- `orders(order_id, user_id, status, subtotal, discount, delivery, total, shipping_name, shipping_address, created_at)`
- `order_items(order_id, product_id, name, image_url, price, size, color, quantity)`
- `reviews.user_id` (nullable FK) once reviews can be posted
