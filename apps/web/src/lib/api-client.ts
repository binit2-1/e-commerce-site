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

async function request<T>(method: string, path: string, body?: unknown, signal?: AbortSignal): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    credentials: "include", // send the login cookie
    headers: body === undefined ? undefined : { "Content-Type": "application/json" },
    body: body === undefined ? undefined : JSON.stringify(body),
    signal,
  });

  if (!res.ok) {
    // The API answers { error, details? }; show the first validation detail without its "field: " prefix.
    let message = `Request to ${path} failed`;
    try {
      const data = (await res.json()) as { error?: string; details?: string[] };
      message = data.details?.[0]?.replace(/^[^:]+: /, "") ?? data.error ?? message;
    } catch {
      /* non-JSON error body */
    }
    throw new ApiRequestError(message, res.status);
  }
  return (await res.json()) as T;
}

export const apiGet = <T>(path: string, signal?: AbortSignal) => request<T>("GET", path, undefined, signal);
export const apiSend = <T>(method: "POST" | "PUT" | "DELETE", path: string, body?: unknown) =>
  request<T>(method, path, body ?? {});
