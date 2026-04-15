import ProjectForm from "../ProjectForm";

export default function NewProjectPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white mb-8">New project</h1>
      <ProjectForm />
    </div>
  );
}
