-- Creates every table from scratch. DESTRUCTIVE: drops the tables first.
-- Run with: pnpm db:schema   (or pnpm db:reset to also load seed.sql)
--
-- Keep this file as the single source of truth for the database: when you add
-- a table or column, edit it here and re-run pnpm db:reset.

DROP TABLE IF EXISTS reviews, products, schema_migrations CASCADE;

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

-- Your turn: add users, orders, order_items, ... below (see the route list).
