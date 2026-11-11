-- Replace placeholder seed products with clothing products that have real images
-- (images hosted on cdn.dummyjson.com, demo catalogue).
DELETE FROM products WHERE image_url LIKE 'https://placehold.co/%';

INSERT INTO products (name, price, image_url, rating, created_at) VALUES
  ('blue & black check shirt', 29.99, 'https://cdn.dummyjson.com/product-images/mens-shirts/blue-%26-black-check-shirt/thumbnail.webp', 3.6, now() - interval '1 days'),
  ('gigabyte aorus men tshirt', 24.99, 'https://cdn.dummyjson.com/product-images/mens-shirts/gigabyte-aorus-men-tshirt/thumbnail.webp', 3.2, now() - interval '2 days'),
  ('man plaid shirt', 34.99, 'https://cdn.dummyjson.com/product-images/mens-shirts/man-plaid-shirt/thumbnail.webp', 3.5, now() - interval '3 days'),
  ('man short sleeve shirt', 19.99, 'https://cdn.dummyjson.com/product-images/mens-shirts/man-short-sleeve-shirt/thumbnail.webp', 2.9, now() - interval '4 days'),
  ('men check shirt', 27.99, 'https://cdn.dummyjson.com/product-images/mens-shirts/men-check-shirt/thumbnail.webp', 2.7, now() - interval '5 days'),
  ('corset with black skirt', 79.99, 'https://cdn.dummyjson.com/product-images/womens-dresses/corset-with-black-skirt/thumbnail.webp', 4.5, now() - interval '6 days'),
  ('dress pea', 49.99, 'https://cdn.dummyjson.com/product-images/womens-dresses/dress-pea/thumbnail.webp', 4.9, now() - interval '7 days'),
  ('marni red & black suit', 179.99, 'https://cdn.dummyjson.com/product-images/womens-dresses/marni-red-%26-black-suit/thumbnail.webp', 4.5, now() - interval '8 days');
