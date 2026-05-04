import type { Metadata } from "next";
import { getProjects } from "@/lib/api";
import ProjectCard from "../components/ProjectCard";
import TagFilter from "../components/TagFilter";
import type { Tag } from "@/lib/api";

export const metadata: Metadata = {
  title: "Projects",
  description: "Things I've built.",
  openGraph: {
    title: "Projects | Scott",
    description: "Things I've built.",
  },
};

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{ tag?: string }>;
}) {
  const { tag: selectedTag } = await searchParams;
  const projects = await getProjects();

  const allTags = Array.from(
    new Map(projects.flatMap((p) => p.tags).map((t) => [t.slug, t])).values()
  ) as Tag[];

  const filtered = selectedTag
    ? projects.filter((p) => p.tags.some((t) => t.slug === selectedTag))
    : projects;

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Projects</h1>
      <p className="mt-3 text-slate-500 dark:text-slate-400">Things I&apos;ve built.</p>

      <TagFilter tags={allTags} selectedTag={selectedTag} basePath="/projects" />

      {filtered.length === 0 ? (
        <p className="mt-12 text-slate-400 dark:text-slate-500">No projects found.</p>
      ) : (
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {filtered.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}
