import Link from "next/link";
import { Project } from "@/lib/api";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="block group bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-6 hover:border-indigo-300 dark:hover:border-indigo-500 hover:shadow-sm transition-all"
    >
      <div className="flex items-start justify-between gap-4">
        <h3 className="font-semibold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
          {project.title}
        </h3>
        {project.featured && (
          <span className="shrink-0 text-xs font-medium bg-indigo-50 dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 px-2 py-0.5 rounded-full">
            Featured
          </span>
        )}
      </div>
      {project.description && (
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 line-clamp-2">
          {project.description}
        </p>
      )}
      {project.techStack && (
        <p className="mt-3 text-xs text-slate-400 dark:text-slate-500 font-mono">{project.techStack}</p>
      )}
    </Link>
  );
}
