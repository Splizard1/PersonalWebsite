import type { Metadata } from "next";
import { getPosts } from "@/lib/api";
import PostCard from "../components/PostCard";
import TagFilter from "../components/TagFilter";
import type { Tag } from "@/lib/api";

export const metadata: Metadata = {
  title: "Blog",
  description: "Thoughts, write-ups, and other things.",
  openGraph: {
    title: "Blog | Scott",
    description: "Thoughts, write-ups, and other things.",
  },
};

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ tag?: string }>;
}) {
  const { tag: selectedTag } = await searchParams;
  const posts = await getPosts();

  const allTags = Array.from(
    new Map(posts.flatMap((p) => p.tags).map((t) => [t.slug, t])).values()
  ) as Tag[];

  const filtered = selectedTag
    ? posts.filter((p) => p.tags.some((t) => t.slug === selectedTag))
    : posts;

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Blog</h1>
      <p className="mt-3 text-slate-500 dark:text-slate-400">Thoughts, write-ups, and other things.</p>

      <TagFilter tags={allTags} selectedTag={selectedTag} basePath="/blog" />

      {filtered.length === 0 ? (
        <p className="mt-12 text-slate-400 dark:text-slate-500">No posts found.</p>
      ) : (
        <div className="mt-6">
          {filtered.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
