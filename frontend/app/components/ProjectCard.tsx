import Link from "next/link";
import { Project } from "@/lib/api";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="block group border border-zinc-200 dark:border-zinc-800 rounded-lg p-6 hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors"
    >
      <div className="flex items-start justify-between gap-4">
        <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-zinc-600 dark:group-hover:text-zinc-400 transition-colors">
          {project.title}
        </h3>
        {project.featured && (
          <span className="shrink-0 text-xs font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 px-2 py-0.5 rounded-full">
            Featured
          </span>
        )}
      </div>
      {project.description && (
        <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400 line-clamp-2">
          {project.description}
        </p>
      )}
      {project.techStack && (
        <p className="mt-3 text-xs text-zinc-400 dark:text-zinc-500 font-mono">{project.techStack}</p>
      )}
    </Link>
  );
}
