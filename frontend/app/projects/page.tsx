import type { Metadata } from "next";
import { getProjects } from "@/lib/api";
import ProjectCard from "../components/ProjectCard";

export const metadata: Metadata = {
  title: "Projects",
  description: "Things I've built.",
  openGraph: {
    title: "Projects | Scott",
    description: "Things I've built.",
  },
};

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Projects</h1>
      <p className="mt-3 text-slate-500 dark:text-slate-400">Things I&apos;ve built.</p>

      {projects.length === 0 ? (
        <p className="mt-12 text-slate-400 dark:text-slate-500">No projects yet.</p>
      ) : (
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}
