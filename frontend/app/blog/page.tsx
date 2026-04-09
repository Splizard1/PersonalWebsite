import { getPosts } from "@/lib/api";
import PostCard from "../components/PostCard";

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold tracking-tight text-zinc-900">Blog</h1>
      <p className="mt-3 text-zinc-500">Thoughts, write-ups, and other things.</p>

      {posts.length === 0 ? (
        <p className="mt-12 text-zinc-400">No posts yet.</p>
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
