"use client";

import { publishPostAction, deletePostAction } from "./actions";
import { useTransition } from "react";

export default function PostActions({ id, published }: { id: number; published: boolean }) {
  const [pending, startTransition] = useTransition();

  function handlePublish() {
    startTransition(() => publishPostAction(id));
  }

  function handleDelete() {
    if (!confirm("Delete this post? This cannot be undone.")) return;
    startTransition(() => deletePostAction(id));
  }

  return (
    <div className="flex items-center gap-3">
      {!published && (
        <button
          onClick={handlePublish}
          disabled={pending}
          className="text-sm text-green-600 dark:text-green-400 hover:underline disabled:opacity-50"
        >
          Publish
        </button>
      )}
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
