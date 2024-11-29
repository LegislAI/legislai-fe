import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

const MarkdownRenderer = ({
  content,
  className = '',
}: MarkdownRendererProps) => {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      className={`prose prose-sm sm:prose-sm ${className}`}
      components={{
        h1: ({ ...props }) => (
          <h1 className="mb-4 text-2xl font-bold" {...props} />
        ),
        h2: ({ ...props }) => (
          <h2 className="mb-3 text-xl font-semibold" {...props} />
        ),
        a: ({ ...props }) => (
          <a
            className="hover:underline"
            target="_blank"
            rel="noopener noreferrer"
            {...props}
          />
        ),
        strong: ({ ...props }) => (
          <strong className="font-bold text-gray-100" {...props} />
        ),
        code: ({ ...props }) => (
          <code
            className="rounded bg-gray-100 px-1 py-0.5 text-sm"
            {...props}
          />
        ),
        li: ({ ...props }) => (
          <li
            className="list-inside list-disc pl-2 marker:text-white"
            {...props}
          />
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
};

export default MarkdownRenderer;
