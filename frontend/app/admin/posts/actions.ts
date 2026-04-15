"use server";

import { requireAuth } from "@/lib/auth";
import { createPost, updatePost, deletePost, publishPost } from "@/lib/api";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createPostAction(formData: FormData) {
  const auth = await requireAuth();
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const excerpt = formData.get("excerpt") as string;
  const tagsRaw = formData.get("tags") as string;
  const tags = tagsRaw ? tagsRaw.split(",").map((t) => t.trim()).filter(Boolean) : [];

  await createPost(auth, { title, content, excerpt, tags });
  revalidatePath("/admin/posts");
  revalidatePath("/blog");
  redirect("/admin/posts");
}

export async function updatePostAction(id: number, formData: FormData) {
  const auth = await requireAuth();
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const excerpt = formData.get("excerpt") as string;
  const tagsRaw = formData.get("tags") as string;
  const tags = tagsRaw ? tagsRaw.split(",").map((t) => t.trim()).filter(Boolean) : [];

  await updatePost(auth, id, { title, content, excerpt, tags });
  revalidatePath("/admin/posts");
  revalidatePath("/blog");
  redirect("/admin/posts");
}

export async function publishPostAction(id: number) {
  const auth = await requireAuth();
  await publishPost(auth, id);
  revalidatePath("/admin/posts");
  revalidatePath("/blog");
}

export async function deletePostAction(id: number) {
  const auth = await requireAuth();
  await deletePost(auth, id);
  revalidatePath("/admin/posts");
  revalidatePath("/blog");
}
