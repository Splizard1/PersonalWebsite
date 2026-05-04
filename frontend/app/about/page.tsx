import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description: "A bit about me.",
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <div className="flex items-start justify-between gap-4">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">About</h1>
        <a
          href="/cv.pdf"
          download
          className="shrink-0 inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-400 text-white text-sm font-medium rounded-lg transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
          </svg>
          Download CV
        </a>
      </div>

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
