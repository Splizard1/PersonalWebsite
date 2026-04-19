import Link from "next/link";
import { logout } from "@/lib/auth";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 px-6 py-4 flex items-center justify-between">
        <nav className="flex items-center gap-6">
          <Link href="/admin" className="font-semibold text-slate-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
            Admin
          </Link>
          <Link href="/admin/posts" className="text-sm text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
            Posts
          </Link>
          <Link href="/admin/projects" className="text-sm text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
            Projects
          </Link>
          <Link href="/admin/comments" className="text-sm text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
            Comments
          </Link>
        </nav>
        <form
          action={async () => {
            "use server";
            await logout();
          }}
        >
          <button type="submit" className="text-sm text-slate-500 hover:text-red-600 dark:hover:text-red-400 transition-colors">
            Sign out
          </button>
        </form>
      </header>
      <main className="flex-1 px-6 py-10 max-w-5xl mx-auto w-full">
        {children}
      </main>
    </div>
  );
}
