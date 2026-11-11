CREATE TABLE products (
  product_id serial PRIMARY KEY,
  name text NOT NULL,
  price numeric(10, 2) NOT NULL CHECK (price >= 0),
  image_url text NOT NULL,
  rating numeric(2, 1) NOT NULL DEFAULT 0 CHECK (rating BETWEEN 0 AND 5),
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX products_created_at_idx ON products (created_at DESC);
CREATE INDEX products_rating_idx ON products (rating DESC);
