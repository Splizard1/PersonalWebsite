const API_URL = process.env.NEXT_PUBLIC_API_URL;

// ---- Types ----

export type Role = "ROLE_ADMIN" | "ROLE_USER";

export interface UserSummary {
  id: number;
  username: string;
  role: Role;
}

export interface Tag {
  id: number;
  name: string;
  slug: string;
}

export interface Post {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  published: boolean;
  author: UserSummary;
  tags: Tag[];
  createTime: string;
  updateTime: string;
}

export interface Project {
  id: number;
  title: string;
  slug: string;
  description: string;
  techStack: string;
  repoUrl: string;
  liveUrl: string;
  featured: boolean;
  author: UserSummary;
  tags: Tag[];
  createTime: string;
  updateTime: string;
}

// ---- Fetch helpers ----

async function get<T>(path: string): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, { next: { revalidate: 60 } });
  if (!res.ok) throw new Error(`API error ${res.status} on GET ${path}`);
  return res.json();
}

// ---- Posts ----

export async function getPosts(): Promise<Post[]> {
  return get("/api/posts");
}

export async function getPostBySlug(slug: string): Promise<Post> {
  return get(`/api/posts/${slug}`);
}

// ---- Projects ----

export async function getProjects(): Promise<Project[]> {
  return get("/api/projects");
}

export async function getFeaturedProjects(): Promise<Project[]> {
  return get("/api/projects/featured");
}

export async function getProjectBySlug(slug: string): Promise<Project> {
  return get(`/api/projects/${slug}`);
}

// ---- Tags ----

export async function getTags(): Promise<Tag[]> {
  return get("/api/tags");
}
