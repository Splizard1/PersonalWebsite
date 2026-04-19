import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description: "A bit about me.",
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">About</h1>

      <div className="mt-6 text-slate-600 dark:text-slate-300 leading-relaxed space-y-4">
          <p>Hey! I am Scott, a Software Engineering student with an interest in all things tech. My focus right now is
          creating secure full stack apps. I also like to post about things I am doing in my life - this website is a way to save and reference
          what i do. </p>
        <p>Email me: <a href="mailto:Scottrenney@hotmail.com" className="text-indigo-600 dark:text-indigo-400 hover:underline">Scottrenney@hotmail.com</a></p>
        <p>Check out my GitHub: <Link href="https://github.com/Splizard1" target="_blank" rel="noopener noreferrer" className="text-indigo-600 dark:text-indigo-400 hover:underline">github.com/Splizard1</Link></p>
      </div>
    </div>
  );
}
