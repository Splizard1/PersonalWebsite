import type { Metadata } from "next";
import { getPostBySlug } from "@/lib/api";
import Link from "next/link";
import { notFound } from "next/navigation";
import MarkdownContent from "@/app/components/MarkdownContent";

export async function generateMetadata(props: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  try {
    const post = await getPostBySlug(slug);
    return {
      title: post.title,
      description: post.excerpt,
      openGraph: {
        title: `${post.title} | Scott`,
        description: post.excerpt,
        type: "article",
        publishedTime: post.createTime,
        modifiedTime: post.updateTime,
      },
    };
  } catch {
    return { title: "Post not found" };
  }
}

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
      <Link href="/blog" className="text-sm text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
        ← Back to blog
      </Link>

      <article className="mt-8">
        <header>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            {post.title}
          </h1>
          <p className="mt-2 text-sm text-slate-400 dark:text-slate-500">{date}</p>

          {post.tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-1.5">
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
        </header>

        <div className="mt-10 prose prose-slate dark:prose-invert max-w-none">
          <MarkdownContent content={post.content} />
        </div>
      </article>
    </div>
  );
}
