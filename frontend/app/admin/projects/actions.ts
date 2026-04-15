"use server";

import { requireAuth } from "@/lib/auth";
import { createProject, updateProject, deleteProject, setFeatured } from "@/lib/api";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createProjectAction(formData: FormData) {
  const auth = await requireAuth();
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const techStack = (formData.get("techStack") as string) || undefined;
  const repoUrl = (formData.get("repoUrl") as string) || undefined;
  const liveUrl = (formData.get("liveUrl") as string) || undefined;
  const tagsRaw = formData.get("tags") as string;
  const tags = tagsRaw ? tagsRaw.split(",").map((t) => t.trim()).filter(Boolean) : [];

  await createProject(auth, { title, description, techStack, repoUrl, liveUrl, tags });
  revalidatePath("/admin/projects");
  revalidatePath("/projects");
  redirect("/admin/projects");
}

export async function updateProjectAction(id: number, formData: FormData) {
  const auth = await requireAuth();
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const techStack = (formData.get("techStack") as string) || undefined;
  const repoUrl = (formData.get("repoUrl") as string) || undefined;
  const liveUrl = (formData.get("liveUrl") as string) || undefined;
  const tagsRaw = formData.get("tags") as string;
  const tags = tagsRaw ? tagsRaw.split(",").map((t) => t.trim()).filter(Boolean) : [];

  await updateProject(auth, id, { title, description, techStack, repoUrl, liveUrl, tags });
  revalidatePath("/admin/projects");
  revalidatePath("/projects");
  redirect("/admin/projects");
}

export async function toggleFeaturedAction(id: number, featured: boolean) {
  const auth = await requireAuth();
  await setFeatured(auth, id, featured);
  revalidatePath("/admin/projects");
  revalidatePath("/projects");
}

export async function deleteProjectAction(id: number) {
  const auth = await requireAuth();
  await deleteProject(auth, id);
  revalidatePath("/admin/projects");
  revalidatePath("/projects");
}
