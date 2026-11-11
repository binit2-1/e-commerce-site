/** 1 2 3 … 8 9 10 style page list around the current page. */
export function pageItems(page: number, pageCount: number): (number | "gap")[] {
  const wanted = new Set<number>();
  for (const p of [1, 2, 3, page - 1, page, page + 1, pageCount - 2, pageCount - 1, pageCount]) {
    if (p >= 1 && p <= pageCount) wanted.add(p);
  }
  const sorted = [...wanted].sort((a, b) => a - b);
  const items: (number | "gap")[] = [];
  sorted.forEach((p, i) => {
    const prev = sorted[i - 1];
    if (prev !== undefined && p - prev > 1) items.push("gap");
    items.push(p);
  });
  return items;
}
