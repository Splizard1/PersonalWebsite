import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "highlight.js/styles/github.css";
import Nav from "./components/Nav";
import ThemeProvider from "./components/ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: {
    default: "Scott",
    template: "%s | Scott",
  },
  description: "Personal site — projects, blog, and more.",
  openGraph: {
    siteName: "Scott",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} min-h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-screen flex flex-col bg-gradient-to-br from-slate-100 to-indigo-300 dark:from-slate-900 dark:to-indigo-950 text-slate-800 dark:text-slate-100 transition-colors">
        <ThemeProvider>
          <Nav />
          <main className="flex-1">{children}</main>
          <footer className="border-t border-slate-200 dark:border-slate-700 py-8 text-center text-sm text-slate-500 dark:text-slate-400">
            © {new Date().getFullYear()} Scott. All rights reserved.
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
