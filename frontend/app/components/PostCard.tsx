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
      className="block group border-b border-slate-200 dark:border-slate-700 py-6 last:border-b-0 hover:bg-slate-100 dark:hover:bg-slate-800 -mx-4 px-4 transition-colors rounded-lg"
    >
      <p className="text-xs text-slate-400 dark:text-slate-500 mb-1">{date}</p>
      <h3 className="font-semibold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
        {post.title}
      </h3>
      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400 line-clamp-2">{post.excerpt}</p>
      {post.tags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {post.tags.map((tag) => (
            <span
              key={tag.id}
              className="text-xs bg-indigo-50 dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 px-2 py-0.5 rounded-full"
            >
              {tag.name}
            </span>
          ))}
        </div>
      )}
    </Link>
  );
}
