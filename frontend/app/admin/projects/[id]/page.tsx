import { requireAuth } from "@/lib/auth";
import { getProjectBySlug } from "@/lib/api";
import { notFound } from "next/navigation";
import ProjectForm from "../ProjectForm";

export default async function EditProjectPage(props: PageProps<"/admin/projects/[id]">) {
  const { id } = await props.params;
  const auth = await requireAuth();

  // Projects only have a slug-based GET — fetch all and find by id
  const { getAllProjectsAdmin } = await import("@/lib/api");
  const projects = await getAllProjectsAdmin(auth);
  const project = projects.find((p) => p.id === Number(id));

  if (!project) notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white mb-8">Edit project</h1>
      <ProjectForm project={project} />
    </div>
  );
}
