import Link from "next/link";
import { requireAuth } from "@/lib/auth";
import { getAllPostsAdmin, getAllProjectsAdmin } from "@/lib/api";

export default async function AdminDashboard() {
  const auth = await requireAuth();
  const [posts, projects] = await Promise.all([
    getAllPostsAdmin(auth),
    getAllProjectsAdmin(auth),
  ]);

  const publishedPosts = posts.filter((p) => p.published).length;
  const draftPosts = posts.length - publishedPosts;

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Dashboard</h1>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <StatCard label="Total posts" value={posts.length} />
        <StatCard label="Published" value={publishedPosts} />
        <StatCard label="Drafts" value={draftPosts} />
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        <QuickLink href="/admin/posts/new" label="New post" description="Write a new blog post" />
        <QuickLink href="/admin/projects/new" label="New project" description="Add a project to your portfolio" />
      </div>

      <div className="mt-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Recent posts</h2>
          <Link href="/admin/posts" className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline">View all</Link>
        </div>
        <div className="space-y-2">
          {posts.slice(0, 5).map((post) => (
            <div key={post.id} className="flex items-center justify-between bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-3">
              <div>
                <Link href={`/admin/posts/${post.id}`} className="text-sm font-medium text-slate-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  {post.title}
                </Link>
              </div>
              <span className={`text-xs px-2 py-0.5 rounded-full ${post.published ? "bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400" : "bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"}`}>
                {post.published ? "Published" : "Draft"}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-6 py-5">
      <p className="text-sm text-slate-500 dark:text-slate-400">{label}</p>
      <p className="mt-1 text-3xl font-bold text-slate-900 dark:text-white">{value}</p>
    </div>
  );
}

function QuickLink({ href, label, description }: { href: string; label: string; description: string }) {
  return (
    <Link href={href} className="block bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-6 py-5 hover:border-indigo-300 dark:hover:border-indigo-500 transition-colors">
      <p className="font-medium text-slate-900 dark:text-white">{label}</p>
      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{description}</p>
    </Link>
  );
}
