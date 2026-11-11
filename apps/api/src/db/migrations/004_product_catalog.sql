ALTER TABLE products
  ADD COLUMN old_price numeric(10, 2),
  ADD COLUMN type text NOT NULL DEFAULT 'shirts',
  ADD COLUMN style text NOT NULL DEFAULT 'casual',
  ADD COLUMN description text NOT NULL DEFAULT '',
  ADD COLUMN colors jsonb NOT NULL DEFAULT '[]',
  ADD COLUMN sizes text[] NOT NULL DEFAULT '{}',
  ADD COLUMN images text[] NOT NULL DEFAULT '{}';

CREATE INDEX products_type_idx ON products (type);
CREATE INDEX products_style_idx ON products (style);
CREATE INDEX products_price_idx ON products (price);

CREATE TABLE reviews (
  review_id serial PRIMARY KEY,
  product_id integer NOT NULL REFERENCES products (product_id) ON DELETE CASCADE,
  author text NOT NULL,
  rating smallint NOT NULL CHECK (rating BETWEEN 1 AND 5),
  body text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX reviews_product_idx ON reviews (product_id, created_at DESC);
