import Link from "next/link";
import { Post } from "@/lib/api";

export default function PostCard({ post }: { post: Post }) {
  const date = new Date(post.createTime).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="block group border-b border-zinc-200 dark:border-zinc-800 py-6 last:border-b-0 hover:bg-zinc-50 dark:hover:bg-zinc-900 -mx-4 px-4 transition-colors rounded-lg"
    >
      <p className="text-xs text-zinc-400 mb-1">{date}</p>
      <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-zinc-600 dark:group-hover:text-zinc-400 transition-colors">
        {post.title}
      </h3>
      <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400 line-clamp-2">{post.excerpt}</p>
      {post.tags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {post.tags.map((tag) => (
            <span
              key={tag.id}
              className="text-xs bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 px-2 py-0.5 rounded-full"
            >
              {tag.name}
            </span>
          ))}
        </div>
      )}
    </Link>
  );
}
