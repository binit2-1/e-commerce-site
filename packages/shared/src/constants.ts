export const PRODUCT_TYPES = ["t-shirts", "shirts", "dresses"] as const;
export const PRODUCT_STYLES = ["casual", "formal", "party", "gym"] as const;
export const PRODUCT_SIZES = [
  "XX-Small",
  "X-Small",
  "Small",
  "Medium",
  "Large",
  "X-Large",
  "XX-Large",
  "3X-Large",
  "4X-Large",
] as const;

export const PRODUCT_COLORS = [
  { name: "Green", hex: "#00C12B" },
  { name: "Red", hex: "#F50606" },
  { name: "Yellow", hex: "#F5DD06" },
  { name: "Orange", hex: "#F57906" },
  { name: "Cyan", hex: "#06CAF5" },
  { name: "Blue", hex: "#063AF5" },
  { name: "Purple", hex: "#7D06F5" },
  { name: "Pink", hex: "#F506A4" },
  { name: "White", hex: "#FFFFFF" },
  { name: "Black", hex: "#000000" },
] as const;

export const PRODUCT_SORTS = ["popular", "newest", "price_asc", "price_desc"] as const;
export const REVIEW_SORTS = ["latest", "oldest", "rating"] as const;

export const DEFAULT_PAGE_SIZE = 9;
