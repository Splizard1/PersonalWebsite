import Link from "next/link";
import { requireAuth } from "@/lib/auth";
import { getAllProjectsAdmin } from "@/lib/api";
import ProjectActions from "./ProjectActions";

export default async function AdminProjectsPage() {
  const auth = await requireAuth();
  const projects = await getAllProjectsAdmin(auth);

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Projects</h1>
        <Link
          href="/admin/projects/new"
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-400 text-white text-sm font-medium rounded-lg transition-colors"
        >
          New project
        </Link>
      </div>

      {projects.length === 0 ? (
        <p className="text-slate-400 dark:text-slate-500">No projects yet.</p>
      ) : (
        <div className="space-y-3">
          {projects.map((project) => (
            <div key={project.id} className="flex items-center justify-between bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-3 gap-4">
              <div className="min-w-0">
                <p className="font-medium text-slate-900 dark:text-white truncate">{project.title}</p>
                {project.techStack && (
                  <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5 font-mono truncate">{project.techStack}</p>
                )}
              </div>
              <div className="flex items-center gap-3 shrink-0">
                {project.featured && (
                  <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-600 dark:bg-slate-700 dark:text-indigo-400">
                    Featured
                  </span>
                )}
                <Link href={`/admin/projects/${project.id}`} className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline">
                  Edit
                </Link>
                <ProjectActions id={project.id} featured={project.featured} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
