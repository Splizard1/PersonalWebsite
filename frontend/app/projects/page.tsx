import { getProjects } from "@/lib/api";
import ProjectCard from "../components/ProjectCard";

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold tracking-tight text-zinc-900">Projects</h1>
      <p className="mt-3 text-zinc-500">Things I&apos;ve built.</p>

      {projects.length === 0 ? (
        <p className="mt-12 text-zinc-400">No projects yet.</p>
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
