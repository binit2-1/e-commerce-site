export const paths = {
  home: "/",
  shop: "/shop",
  product: (productId: number | string = ":productId") => `/products/${productId}`,
  cart: "/cart",
} as const;
