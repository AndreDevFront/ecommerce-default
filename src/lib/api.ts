import { parseCookies } from "nookies";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3333";

export function api(path: string, init?: RequestInit) {
  const url = new URL(path, BASE_URL);

  const cookies = parseCookies();
  const token = cookies["velas-token"];

  const headers = new Headers(init?.headers);

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  return fetch(url, {
    ...init,
    headers,
  });
}
