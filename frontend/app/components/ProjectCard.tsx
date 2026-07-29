import Link from "next/link";
import { Project } from "@/lib/api";

import Link from "next/link";
import { Project } from "@/lib/api";

export default function ProjectCard({ project }: { project: Project }) {
    return (
        <Link
            href={`/projects/${project.slug}`}
            className="group block w-full min-w-0 max-w-full overflow-hidden rounded-lg border border-slate-200 bg-white p-4 transition-all hover:border-indigo-300 hover:shadow-sm sm:p-6 dark:border-slate-700 dark:bg-slate-800 dark:hover:border-indigo-500"
        >
            <div className="flex min-w-0 items-start justify-between gap-3">
                <h3 className="min-w-0 break-words font-semibold text-slate-900 transition-colors group-hover:text-indigo-600 dark:text-white dark:group-hover:text-indigo-400">
                    {project.title}
                </h3>

                {project.featured && (
                    <span className="shrink-0 rounded-full bg-indigo-50 px-2 py-0.5 text-xs font-medium text-indigo-600 dark:bg-slate-700 dark:text-indigo-400">
            Featured
          </span>
                )}
            </div>

            {project.description && (
                <p className="mt-2 line-clamp-2 break-words text-sm text-slate-500 dark:text-slate-400">
                    {project.description}
                </p>
            )}

            {project.techStack && (
                <p className="mt-3 max-w-full whitespace-normal [overflow-wrap:anywhere] text-xs font-mono text-slate-400 dark:text-slate-500">
                    {project.techStack}
                </p>
            )}
        </Link>
    );
}
