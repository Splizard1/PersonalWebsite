import { requireAuth } from "@/lib/auth";
import { getPostById } from "@/lib/api";
import { notFound } from "next/navigation";
import PostForm from "../PostForm";

export default async function EditPostPage(props: PageProps<"/admin/posts/[id]">) {
  const { id } = await props.params;
  const auth = await requireAuth();

  let post;
  try {
    post = await getPostById(auth, Number(id));
  } catch {
    notFound();
  }

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white mb-8">Edit post</h1>
      <PostForm post={post} />
    </div>
  );
}
