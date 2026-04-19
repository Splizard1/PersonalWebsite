"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createPostAction, updatePostAction } from "./actions";
import type { Post } from "@/lib/api";
import MarkdownContent from "@/app/components/MarkdownContent";
import { inputCls, textareaCls } from "@/lib/styles";

export default function PostForm({ post }: { post?: Post }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState(false);
  const [content, setContent] = useState(post?.content ?? "");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const formData = new FormData(e.currentTarget);
    startTransition(async () => {
      try {
        if (post) {
          await updatePostAction(post.id, formData);
        } else {
          await createPostAction(formData);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong.");
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
          Title
        </label>
        <input
          id="title"
          name="title"
          type="text"
          required
          defaultValue={post?.title}
          className={inputCls}
        />
      </div>

      <div>
        <label htmlFor="excerpt" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
          Excerpt
        </label>
        <textarea
          id="excerpt"
          name="excerpt"
          required
          rows={2}
          defaultValue={post?.excerpt}
          className={textareaCls}
        />
      </div>

      <div>
        <div className="flex items-center justify-between mb-1">
          <label htmlFor="content" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            Content (Markdown)
          </label>
          <button
            type="button"
            onClick={() => setPreview((p) => !p)}
            className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            {preview ? "Edit" : "Preview"}
          </button>
        </div>

        {preview ? (
          <div className="min-h-64 p-4 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 prose prose-slate dark:prose-invert max-w-none">
            <MarkdownContent content={content} />
          </div>
        ) : (
          <textarea
            id="content"
            name="content"
            required
            rows={20}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className={`${textareaCls} font-mono text-sm`}
          />
        )}
        {/* Hidden input to carry content value when preview mode is active */}
        {preview && <input type="hidden" name="content" value={content} />}
      </div>

      <div>
        <label htmlFor="tags" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
          Tags <span className="text-slate-400 font-normal">(comma-separated)</span>
        </label>
        <input
          id="tags"
          name="tags"
          type="text"
          defaultValue={post?.tags.map((t) => t.name).join(", ")}
          placeholder="e.g. React, TypeScript, Web"
          className={inputCls}
        />
      </div>

      {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={pending}
          className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-400 text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-50"
        >
          {pending ? "Saving…" : post ? "Save changes" : "Create post"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/posts")}
          className="px-5 py-2 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 text-sm font-medium rounded-lg hover:border-slate-400 transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
