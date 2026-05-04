import type { Metadata } from "next";
import Link from "next/link";
import { getFeaturedProjects, getPosts } from "@/lib/api";
import ProjectCard from "./components/ProjectCard";
import PostCard from "./components/PostCard";
import Terminal from "./components/Terminal";

export const metadata: Metadata = {
  title: "Scott",
  description: "Developer and builder. Personal site with projects and blog.",
  openGraph: {
    title: "Scott",
    description: "Developer and builder. Personal site with projects and blog.",
  },
};

const stack = ["Java", "Spring Boot", "TypeScript","Kotlin", "Next.js", "React", "Tailwind CSS", "PostgreSQL", "Docker", "Python", "CSS3", "HTML5", "Haskell"];

export default async function Home() {
  const [projects, posts] = await Promise.all([
    getFeaturedProjects(),
    getPosts(),
  ]);

  const recentPosts = posts.slice(0, 3);

  return (
    <div className="max-w-5xl mx-auto px-6">

      {/* Hero */}
      <section className="relative py-24 flex flex-col lg:flex-row items-start lg:items-center gap-12">

        {/* Left — text */}
        <div className="flex-1">
          <h1 className="text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
            Hi, I'm Scott.
          </h1>
          <p className="mt-5 text-lg text-slate-500 dark:text-slate-400 leading-relaxed max-w-lg">
            I build full-stack web apps and write about things I find interesting.
            This is my corner of the internet.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/projects"
              className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-400 text-white text-sm font-medium rounded-lg transition-colors"
            >
              View projects
            </Link>
            <Link
              href="/blog"
              className="px-5 py-2.5 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 text-sm font-medium rounded-lg hover:border-indigo-400 hover:text-indigo-600 dark:hover:border-indigo-500 dark:hover:text-indigo-400 transition-colors"
            >
              Read the blog
            </Link>
          </div>

          {/* Tech stack */}
          <div className="mt-10 flex flex-wrap gap-2">
            {stack.map((tech) => (
              <span
                key={tech}
                className="text-xs font-mono px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Right — terminal */}
        <div className="w-full lg:w-96 shrink-0">
          <Terminal />
        </div>
      </section>

      <div className="max-w-4xl mx-auto">
        {/* Featured projects */}
        {projects.length > 0 && (
          <section className="mt-4">
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
          <section className="mt-20 pb-20">
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
    </div>
  );
}
