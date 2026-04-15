"use client";

import { toggleFeaturedAction, deleteProjectAction } from "./actions";
import { useTransition } from "react";

export default function ProjectActions({ id, featured }: { id: number; featured: boolean }) {
  const [pending, startTransition] = useTransition();

  function handleToggleFeatured() {
    startTransition(() => toggleFeaturedAction(id, !featured));
  }

  function handleDelete() {
    if (!confirm("Delete this project? This cannot be undone.")) return;
    startTransition(() => deleteProjectAction(id));
  }

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={handleToggleFeatured}
        disabled={pending}
        className="text-sm text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:underline disabled:opacity-50"
      >
        {featured ? "Unfeature" : "Feature"}
      </button>
      <button
        onClick={handleDelete}
        disabled={pending}
        className="text-sm text-red-600 dark:text-red-400 hover:underline disabled:opacity-50"
      >
        Delete
      </button>
    </div>
  );
}
