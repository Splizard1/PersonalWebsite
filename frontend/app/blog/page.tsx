import type { Metadata } from "next";
import { getPosts } from "@/lib/api";
import PostCard from "../components/PostCard";

export const metadata: Metadata = {
  title: "Blog",
  description: "Thoughts, write-ups, and other things.",
  openGraph: {
    title: "Blog | Scott",
    description: "Thoughts, write-ups, and other things.",
  },
};

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Blog</h1>
      <p className="mt-3 text-slate-500 dark:text-slate-400">Thoughts, write-ups, and other things.</p>

      {posts.length === 0 ? (
        <p className="mt-12 text-slate-400 dark:text-slate-500">No posts yet.</p>
      ) : (
        <div className="mt-10">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
