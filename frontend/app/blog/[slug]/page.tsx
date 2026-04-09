import { getPostBySlug } from "@/lib/api";
import Link from "next/link";
import { notFound } from "next/navigation";
import MarkdownContent from "@/app/components/MarkdownContent";

export default async function BlogPostPage(props: PageProps<"/blog/[slug]">) {
  const { slug } = await props.params;

  let post;
  try {
    post = await getPostBySlug(slug);
  } catch {
    notFound();
  }

  const date = new Date(post.createTime).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <Link href="/blog" className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors">
        ← Back to blog
      </Link>

      <article className="mt-8">
        <header>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900">
            {post.title}
          </h1>
          <p className="mt-2 text-sm text-zinc-400">{date}</p>

          {post.tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-1.5">
              {post.tags.map((tag) => (
                <span
                  key={tag.id}
                  className="text-xs bg-zinc-100 text-zinc-500 px-2 py-0.5 rounded-full"
                >
                  {tag.name}
                </span>
              ))}
            </div>
          )}
        </header>

        <div className="mt-10 prose prose-zinc dark:prose-invert max-w-none">
          <MarkdownContent content={post.content} />
        </div>
      </article>
    </div>
  );
}
