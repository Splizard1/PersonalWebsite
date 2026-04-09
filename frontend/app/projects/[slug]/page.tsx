import { getProjectBySlug } from "@/lib/api";
import Link from "next/link";
import { notFound } from "next/navigation";

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
      <Link href="/projects" className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors">
        ← Back to projects
      </Link>

      <div className="mt-8">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900">
            {project.title}
          </h1>
          {project.featured && (
            <span className="text-xs font-medium bg-zinc-100 text-zinc-600 px-2 py-0.5 rounded-full">
              Featured
            </span>
          )}
        </div>

        {project.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <span
                key={tag.id}
                className="text-xs bg-zinc-100 text-zinc-500 px-2 py-0.5 rounded-full"
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
              className="px-4 py-2 border border-zinc-300 text-zinc-700 text-sm font-medium rounded-lg hover:border-zinc-500 transition-colors"
            >
              View source
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-zinc-900 text-white text-sm font-medium rounded-lg hover:bg-zinc-700 transition-colors"
            >
              Live site
            </a>
          )}
        </div>

        {project.techStack && (
          <div className="mt-8">
            <h2 className="text-sm font-semibold text-zinc-900 uppercase tracking-wide">
              Tech stack
            </h2>
            <p className="mt-2 text-sm text-zinc-500 font-mono">{project.techStack}</p>
          </div>
        )}

        {project.description && (
          <div className="mt-8">
            <h2 className="text-sm font-semibold text-zinc-900 uppercase tracking-wide">
              About
            </h2>
            <p className="mt-2 text-zinc-600 leading-relaxed">{project.description}</p>
          </div>
        )}
      </div>
    </div>
  );
}
