"use server";

import { requireAuth } from "@/lib/auth";
import { deleteComment } from "@/lib/api";
import { revalidatePath } from "next/cache";

export async function deleteCommentAction(id: number, postSlug: string) {
  const auth = await requireAuth();
  await deleteComment(auth, id);
  revalidatePath(`/blog/${postSlug}`);
  revalidatePath("/admin/comments");
}
