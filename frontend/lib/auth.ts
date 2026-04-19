import "server-only";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const COOKIE_NAME = "auth";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function login(username: string, password: string): Promise<{ error?: string }> {
  const encoded = Buffer.from(`${username}:${password}`).toString("base64");

  const res = await fetch(`${API_URL}/api/auth/me`, {
    headers: { Authorization: `Basic ${encoded}` },
    cache: "no-store",
  });

  if (!res.ok) {
    return { error: "Invalid username or password." };
  }

  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, encoded, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });

  return {};
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
  redirect("/admin/login");
}

export async function getAuthHeader(): Promise<string | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;
  return `Basic ${token}`;
}

export async function requireAuth(): Promise<string> {
  const header = await getAuthHeader();
  if (!header) redirect("/admin/login");
  return header;
}
