import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

export default function Nav() {
  return (
    <header className="border-b border-zinc-200 dark:border-zinc-800">
      <nav className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="font-semibold text-zinc-900 dark:text-zinc-100 hover:text-zinc-600 dark:hover:text-zinc-400 transition-colors">
          Scott
        </Link>
        <div className="flex items-center gap-6 text-sm text-zinc-600 dark:text-zinc-400">
          <Link href="/projects" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
            Projects
          </Link>
          <Link href="/blog" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
            Blog
          </Link>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
