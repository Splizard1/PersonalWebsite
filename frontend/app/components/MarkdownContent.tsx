import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";

export default function MarkdownContent({ content }: { content: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeHighlight]}
      components={{
        img: ({ src, alt }) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={src} alt={alt ?? ""} referrerPolicy="no-referrer" className="max-w-full rounded" />
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
