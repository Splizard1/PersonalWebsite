import { requireAuth } from "@/lib/auth";
import { getAllPostsAdmin, getComments } from "@/lib/api";
import DeleteCommentButton from "./DeleteCommentButton";

export default async function AdminCommentsPage() {
  const auth = await requireAuth();
  const posts = await getAllPostsAdmin(auth);

  const postsWithComments = await Promise.all(
    posts.map(async (post) => ({
      post,
      comments: await getComments(post.slug).catch(() => []),
    }))
  );

  const hasComments = postsWithComments.some((p) => p.comments.length > 0);

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white mb-8">Comments</h1>

      {!hasComments ? (
        <p className="text-slate-400 dark:text-slate-500">No comments yet.</p>
      ) : (
        <div className="space-y-8">
          {postsWithComments
            .filter((p) => p.comments.length > 0)
            .map(({ post, comments }) => (
              <div key={post.id}>
                <h2 className="text-sm font-semibold text-slate-900 dark:text-white mb-3">{post.title}</h2>
                <div className="space-y-2">
                  {comments.map((comment) => (
                    <div key={comment.id} className="flex items-start justify-between bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-3 gap-4">
                      <div className="min-w-0">
                        <div className="flex items-baseline gap-2">
                          <span className="text-sm font-medium text-slate-900 dark:text-white">{comment.name}</span>
                          <span className="text-xs text-slate-400 dark:text-slate-500">
                            {new Date(comment.createTime).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                          </span>
                        </div>
                        <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{comment.body}</p>
                      </div>
                      <DeleteCommentButton id={comment.id} postSlug={post.slug} />
                    </div>
                  ))}
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
