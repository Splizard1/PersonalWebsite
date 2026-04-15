import type { Metadata } from "next";
import Link from "next/link";
import { getFeaturedProjects, getPosts } from "@/lib/api";
import ProjectCard from "./components/ProjectCard";
import PostCard from "./components/PostCard";

export const metadata: Metadata = {
  title: "Scott",
  description: "Developer and builder. Personal site with projects and blog.",
  openGraph: {
    title: "Scott",
    description: "Developer and builder. Personal site with projects and blog.",
  },
};

export default async function Home() {
  const [projects, posts] = await Promise.all([
    getFeaturedProjects(),
    getPosts(),
  ]);

  const recentPosts = posts.slice(0, 3);

  return (
    <div className="max-w-4xl mx-auto px-6 py-20">

      {/* Hero */}
      <section>
        <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
          Hi, I&apos;m Scott.
        </h1>
        <p className="mt-4 text-lg text-slate-500 dark:text-slate-300 max-w-xl leading-relaxed">
          I&apos;m a developer interested in building things for the web. This is
          my personal site where I share my projects and write about things I
          find interesting.
        </p>
        <div className="mt-8 flex gap-4">
          <Link
            href="/projects"
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-400 text-white text-sm font-medium rounded-lg transition-colors"
          >
            View projects
          </Link>
          <Link
            href="/blog"
            className="px-4 py-2 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 text-sm font-medium rounded-lg hover:border-indigo-400 hover:text-indigo-600 dark:hover:border-indigo-500 dark:hover:text-indigo-400 transition-colors"
          >
            Read the blog
          </Link>
        </div>
      </section>

      {/* Featured projects */}
      {projects.length > 0 && (
        <section className="mt-20">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Featured projects</h2>
            <Link href="/projects" className="text-sm text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              All projects →
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </section>
      )}

      {/* Recent posts */}
      {recentPosts.length > 0 && (
        <section className="mt-20">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Recent posts</h2>
            <Link href="/blog" className="text-sm text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              All posts →
            </Link>
          </div>
          <div>
            {recentPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </section>
      )}

    </div>
  );
}
