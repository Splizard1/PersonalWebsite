import type { Metadata } from "next";
import { getProjectBySlug } from "@/lib/api";
import Link from "next/link";
import { notFound } from "next/navigation";
import MarkdownContent from "@/app/components/MarkdownContent";

export async function generateMetadata(props: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  try {
    const project = await getProjectBySlug(slug);
    return {
      title: project.title,
      description: project.description,
      openGraph: {
        title: `${project.title} | Scott`,
        description: project.description,
        type: "website",
      },
    };
  } catch {
    return { title: "Project not found" };
  }
}

export default async function ProjectPage(props: PageProps<"/projects/[slug]">) {
  const { slug } = await props.params;

  let project;
  try {
    project = await getProjectBySlug(slug);
  } catch {
    notFound();
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <Link href="/projects" className="text-sm text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
        ← Back to projects
      </Link>

      <div className="mt-8">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            {project.title}
          </h1>
          {project.featured && (
            <span className="text-xs font-medium bg-indigo-50 dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 px-2 py-0.5 rounded-full">
              Featured
            </span>
          )}
        </div>

        {project.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <span
                key={tag.id}
                className="text-xs bg-indigo-50 dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 px-2 py-0.5 rounded-full"
              >
                {tag.name}
              </span>
            ))}
          </div>
        )}

        <div className="mt-6 flex gap-4">
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 text-sm font-medium rounded-lg hover:border-indigo-400 hover:text-indigo-600 dark:hover:border-indigo-500 dark:hover:text-indigo-400 transition-colors"
            >
              View on GitHub
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-400 text-white text-sm font-medium rounded-lg transition-colors"
            >
              Live site
            </a>
          )}
        </div>

        {project.techStack && (
          <div className="mt-8">
            <h2 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wide">
              Tech stack
            </h2>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 font-mono">{project.techStack}</p>
          </div>
        )}

        {project.description && (
          <div className="mt-8">
            <h2 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wide">
              About
            </h2>
            <div className="mt-2 prose prose-slate dark:prose-invert max-w-none">
              <MarkdownContent content={project.description} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
