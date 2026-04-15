"use server";

import { login } from "@/lib/auth";
import { redirect } from "next/navigation";

export async function loginAction(_prev: string | null, formData: FormData): Promise<string | null> {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  const result = await login(username, password);
  if (result.error) return result.error;

  redirect("/admin");
}
