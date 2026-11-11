const BASE_URL = import.meta.env.VITE_API_URL ?? "";

export class ApiRequestError extends Error {
  constructor(
    message: string,
    public readonly status: number,
  ) {
    super(message);
    this.name = "ApiRequestError";
  }
}

export async function apiGet<T>(path: string, signal?: AbortSignal): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, { signal });
  if (!res.ok) {
    throw new ApiRequestError(`Request to ${path} failed`, res.status);
  }
  return (await res.json()) as T;
}
