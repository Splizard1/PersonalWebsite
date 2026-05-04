"use client";

import { useRouter } from "next/navigation";
import type { Tag } from "@/lib/api";

export default function TagFilter({
  tags,
  selectedTag,
  basePath,
}: {
  tags: Tag[];
  selectedTag?: string;
  basePath: string;
}) {
  const router = useRouter();

  if (tags.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2 mt-6">
      <button
        onClick={() => router.push(basePath)}
        className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
          !selectedTag
            ? "bg-indigo-600 text-white dark:bg-indigo-500"
            : "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-indigo-300 dark:hover:border-indigo-500"
        }`}
      >
        All
      </button>
      {tags.map((tag) => (
        <button
          key={tag.slug}
          onClick={() => router.push(`${basePath}?tag=${tag.slug}`)}
          className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
            selectedTag === tag.slug
              ? "bg-indigo-600 text-white dark:bg-indigo-500"
              : "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-indigo-300 dark:hover:border-indigo-500"
          }`}
        >
          {tag.name}
        </button>
      ))}
    </div>
  );
}
