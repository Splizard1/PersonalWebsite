import Link from "next/link";
import { getFeaturedProjects, getPosts } from "@/lib/api";
import ProjectCard from "./components/ProjectCard";
import PostCard from "./components/PostCard";

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
        <h1 className="text-4xl font-bold tracking-tight text-zinc-900">
          Hi, I&apos;m Scott.
        </h1>
        <p className="mt-4 text-lg text-zinc-500 max-w-xl leading-relaxed">
          I&apos;m a developer interested in building things for the web. This is
          my personal site where I share my projects and write about things I
          find interesting.
        </p>
        <div className="mt-8 flex gap-4">
          <Link
            href="/projects"
            className="px-4 py-2 bg-zinc-900 text-white text-sm font-medium rounded-lg hover:bg-zinc-700 transition-colors"
          >
            View projects
          </Link>
          <Link
            href="/blog"
            className="px-4 py-2 border border-zinc-300 text-zinc-700 text-sm font-medium rounded-lg hover:border-zinc-500 transition-colors"
          >
            Read the blog
          </Link>
        </div>
      </section>

      {/* Featured projects */}
      {projects.length > 0 && (
        <section className="mt-20">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-zinc-900">Featured projects</h2>
            <Link href="/projects" className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors">
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
            <h2 className="text-xl font-semibold text-zinc-900">Recent posts</h2>
            <Link href="/blog" className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors">
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
