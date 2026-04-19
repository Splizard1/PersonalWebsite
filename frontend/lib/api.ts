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

export async function getRelatedPosts(slug: string): Promise<Post[]> {
  return get(`/api/posts/${slug}/related`);
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

// ---- Comments ----

export interface Comment {
  id: number;
  name: string;
  body: string;
  createTime: string;
}

export async function getComments(slug: string): Promise<Comment[]> {
  const res = await fetch(`${API_URL}/api/posts/${slug}/comments`, { cache: "no-store" });
  if (!res.ok) throw new Error(`API error ${res.status}`);
  return res.json();
}

export async function postComment(slug: string, name: string, body: string): Promise<Comment> {
  const res = await fetch(`${API_URL}/api/posts/${slug}/comments`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, body }),
    cache: "no-store",
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`API error ${res.status}: ${text}`);
  }
  return res.json();
}

// ---- Authenticated helpers (admin only) ----

async function authFetch(
  path: string,
  authHeader: string,
  options: RequestInit = {}
): Promise<Response> {
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: authHeader,
      ...(options.headers as Record<string, string>),
    },
    cache: "no-store",
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`API error ${res.status}: ${text}`);
  }
  return res;
}

// Posts (admin)
export async function getAllPostsAdmin(authHeader: string): Promise<Post[]> {
  const res = await authFetch("/api/posts/admin/all", authHeader);
  return res.json();
}

export async function getPostById(authHeader: string, id: number): Promise<Post> {
  const res = await authFetch(`/api/posts/id/${id}`, authHeader);
  return res.json();
}

export async function createPost(
  authHeader: string,
  data: { title: string; content: string; excerpt: string; tags: string[] }
): Promise<Post> {
  const res = await authFetch("/api/posts", authHeader, {
    method: "POST",
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function updatePost(
  authHeader: string,
  id: number,
  data: { title: string; content: string; excerpt: string; tags: string[] }
): Promise<Post> {
  const res = await authFetch(`/api/posts/${id}`, authHeader, {
    method: "PUT",
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function publishPost(authHeader: string, id: number): Promise<Post> {
  const res = await authFetch(`/api/posts/${id}/publish`, authHeader, { method: "PUT" });
  return res.json();
}

export async function deletePost(authHeader: string, id: number): Promise<void> {
  await authFetch(`/api/posts/${id}`, authHeader, { method: "DELETE" });
}

// Projects (admin)
export async function getAllProjectsAdmin(authHeader: string): Promise<Project[]> {
  const res = await authFetch("/api/projects", authHeader);
  return res.json();
}

export async function createProject(
  authHeader: string,
  data: {
    title: string;
    description: string;
    techStack?: string;
    repoUrl?: string;
    liveUrl?: string;
    tags: string[];
  }
): Promise<Project> {
  const res = await authFetch("/api/projects", authHeader, {
    method: "POST",
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function updateProject(
  authHeader: string,
  id: number,
  data: {
    title: string;
    description: string;
    techStack?: string;
    repoUrl?: string;
    liveUrl?: string;
    tags: string[];
  }
): Promise<Project> {
  const res = await authFetch(`/api/projects/${id}`, authHeader, {
    method: "PUT",
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function setFeatured(authHeader: string, id: number, featured: boolean): Promise<Project> {
  const res = await authFetch(`/api/projects/${id}/feature?featured=${featured}`, authHeader, { method: "PUT" });
  return res.json();
}

export async function deleteProject(authHeader: string, id: number): Promise<void> {
  await authFetch(`/api/projects/${id}`, authHeader, { method: "DELETE" });
}

export async function deleteComment(authHeader: string, id: number): Promise<void> {
  await authFetch(`/api/comments/${id}`, authHeader, { method: "DELETE" });
}
