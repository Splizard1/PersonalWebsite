"use client";

import { useState } from "react";
import { postComment } from "@/lib/api";
import type { Comment } from "@/lib/api";

export default function CommentSection({ slug, initial }: { slug: string; initial: Comment[] }) {
  const [comments, setComments] = useState<Comment[]>(initial);
  const [name, setName] = useState("");
  const [body, setBody] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    setPending(true);
    try {
      const comment = await postComment(slug, name, body);
      setComments((prev) => [...prev, comment]);
      setName("");
      setBody("");
      setSuccess(true);
    } catch {
      setError("Failed to post comment. Please try again.");
    } finally {
      setPending(false);
    }
  }

  return (
    <section className="mt-16 border-t border-slate-200 dark:border-slate-700 pt-10">
      <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
        Comments {comments.length > 0 && <span className="text-slate-400 font-normal">({comments.length})</span>}
      </h2>

      {comments.length === 0 ? (
        <p className="mt-4 text-sm text-slate-400 dark:text-slate-500">No comments yet — be the first!</p>
      ) : (
        <div className="mt-6 space-y-3">
          {comments.map((c) => (
            <div key={c.id} className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-3">
              <div className="flex items-baseline gap-4">
                <span className="text-sm font-medium text-slate-900 dark:text-white">{c.name}</span>
                <span className="text-xs text-slate-400 dark:text-slate-500">
                  {new Date(c.createTime).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                </span>
              </div>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{c.body}</p>
            </div>
          ))}
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Leave a comment</h3>
        <div>
          <input
            type="text"
            placeholder="Name (optional)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={100}
            className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>
        <div>
          <textarea
            placeholder="Write a comment…"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
            maxLength={2000}
            rows={4}
            className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-y"
          />
        </div>
        {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}
        {success && <p className="text-sm text-green-600 dark:text-green-400">Comment posted!</p>}
        <button
          type="submit"
          disabled={pending}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-400 text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-50"
        >
          {pending ? "Posting…" : "Post comment"}
        </button>
      </form>
    </section>
  );
}
