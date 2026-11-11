-- Creates every table from scratch. DESTRUCTIVE: drops the tables first.
-- Run with: pnpm db:schema   (or pnpm db:reset to also load seed.sql)
--
-- Keep this file as the single source of truth for the database: when you add
-- a table or column, edit it here and re-run pnpm db:reset.

DROP TABLE IF EXISTS order_items, orders, cart_items, reviews, products, users, schema_migrations CASCADE;

CREATE TABLE users (
  user_id       serial PRIMARY KEY,
  name          text NOT NULL,
  email         text NOT NULL UNIQUE,               -- stored lowercase
  password_hash text NOT NULL,
  created_at    timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE products (
  product_id  serial PRIMARY KEY,
  name        text NOT NULL,
  price       numeric(10, 2) NOT NULL CHECK (price >= 0),
  old_price   numeric(10, 2),                       -- set when the item is on sale
  image_url   text NOT NULL,
  images      text[] NOT NULL DEFAULT '{}',
  rating      numeric(2, 1) NOT NULL DEFAULT 0 CHECK (rating BETWEEN 0 AND 5),
  type        text NOT NULL DEFAULT 'shirts',        -- t-shirts | shirts | dresses
  style       text NOT NULL DEFAULT 'casual',        -- casual | formal | party | gym
  description text NOT NULL DEFAULT '',
  colors      jsonb NOT NULL DEFAULT '[]',           -- [{"name":"Red","hex":"#F50606"}]
  sizes       text[] NOT NULL DEFAULT '{}',
  created_at  timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE reviews (
  review_id  serial PRIMARY KEY,
  product_id integer NOT NULL REFERENCES products (product_id) ON DELETE CASCADE,
  user_id    integer REFERENCES users (user_id) ON DELETE SET NULL,   -- null for seeded reviews
  author     text NOT NULL,
  rating     smallint NOT NULL CHECK (rating BETWEEN 1 AND 5),
  body       text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX products_created_at_idx ON products (created_at DESC);
CREATE INDEX products_price_idx ON products (price);
CREATE INDEX products_type_idx ON products (type);
CREATE INDEX products_style_idx ON products (style);
CREATE INDEX reviews_product_idx ON reviews (product_id, created_at DESC);

-- one review per user per product (seeded reviews have no user)
CREATE UNIQUE INDEX reviews_one_per_user_idx ON reviews (product_id, user_id) WHERE user_id IS NOT NULL;

CREATE TABLE cart_items (
  user_id    integer NOT NULL REFERENCES users (user_id) ON DELETE CASCADE,
  product_id integer NOT NULL REFERENCES products (product_id) ON DELETE CASCADE,
  size       text NOT NULL,
  color      text NOT NULL,
  quantity   integer NOT NULL CHECK (quantity BETWEEN 1 AND 10),
  added_at   timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, product_id, size, color)
);

CREATE TABLE orders (
  order_id         serial PRIMARY KEY,
  user_id          integer NOT NULL REFERENCES users (user_id),
  status           text NOT NULL DEFAULT 'placed',
  subtotal         numeric(10, 2) NOT NULL,
  discount         numeric(10, 2) NOT NULL DEFAULT 0,
  delivery         numeric(10, 2) NOT NULL DEFAULT 0,
  total            numeric(10, 2) NOT NULL,
  promo_code       text,
  shipping_name    text NOT NULL,
  shipping_address text NOT NULL,
  created_at       timestamptz NOT NULL DEFAULT now()
);

-- name/price/image are copied from the product at purchase time so old orders never change
CREATE TABLE order_items (
  item_id    serial PRIMARY KEY,
  order_id   integer NOT NULL REFERENCES orders (order_id) ON DELETE CASCADE,
  product_id integer REFERENCES products (product_id) ON DELETE SET NULL,
  name       text NOT NULL,
  image_url  text NOT NULL,
  price      numeric(10, 2) NOT NULL,
  size       text NOT NULL,
  color      text NOT NULL,
  quantity   integer NOT NULL CHECK (quantity > 0)
);

CREATE INDEX orders_user_idx ON orders (user_id, created_at DESC);
