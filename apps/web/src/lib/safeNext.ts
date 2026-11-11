/** Only allow redirects to paths inside this app ("/orders", not "//evil.com" or "https://..."). */
export function safeNext(raw: string | null, fallback = "/"): string {
  return raw && raw.startsWith("/") && !raw.startsWith("//") ? raw : fallback;
}
