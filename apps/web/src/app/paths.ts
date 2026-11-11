export const paths = {
  home: "/",
  shop: "/shop",
  product: (productId: number | string = ":productId") => `/products/${productId}`,
  cart: "/cart",
  checkout: "/checkout",
  login: "/login",
  register: "/register",
  orders: "/orders",
  order: (orderId: number | string = ":orderId") => `/orders/${orderId}`,
} as const;
