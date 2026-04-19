"use client";

import { useTransition } from "react";
import { deleteCommentAction } from "./actions";

export default function DeleteCommentButton({ id, postSlug }: { id: number; postSlug: string }) {
  const [pending, startTransition] = useTransition();

  function handleDelete() {
    if (!confirm("Delete this comment?")) return;
    startTransition(() => deleteCommentAction(id, postSlug));
  }

  return (
    <button
      onClick={handleDelete}
      disabled={pending}
      className="text-sm text-red-600 dark:text-red-400 hover:underline disabled:opacity-50 shrink-0"
    >
      Delete
    </button>
  );
}
