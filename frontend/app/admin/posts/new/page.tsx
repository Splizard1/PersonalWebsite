import PostForm from "../PostForm";

export default function NewPostPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white mb-8">New post</h1>
      <PostForm />
    </div>
  );
}
