import Link from "next/link";
import { requireAuth } from "@/lib/auth";
import { getAllPostsAdmin } from "@/lib/api";
import PostActions from "./PostActions";

export default async function AdminPostsPage() {
  const auth = await requireAuth();
  const posts = await getAllPostsAdmin(auth);

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Posts</h1>
        <Link
          href="/admin/posts/new"
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-400 text-white text-sm font-medium rounded-lg transition-colors"
        >
          New post
        </Link>
      </div>

      {posts.length === 0 ? (
        <p className="text-slate-400 dark:text-slate-500">No posts yet.</p>
      ) : (
        <div className="space-y-3">
          {posts.map((post) => (
            <div key={post.id} className="flex items-center justify-between bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-3 gap-4">
              <div className="min-w-0">
                <p className="font-medium text-slate-900 dark:text-white truncate">{post.title}</p>
                <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
                  {new Date(post.createTime).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                </p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <span className={`text-xs px-2 py-0.5 rounded-full ${post.published ? "bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400" : "bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"}`}>
                  {post.published ? "Published" : "Draft"}
                </span>
                <Link href={`/admin/posts/${post.id}`} className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline">
                  Edit
                </Link>
                <PostActions id={post.id} published={post.published} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
