import { MDXRemote } from 'next-mdx-remote/rsc'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import remarkGfm from 'remark-gfm'
const components = {
  // Custom components for MDX
  pre: (props: React.HTMLAttributes<HTMLPreElement>) => (
    <div className="relative group">
      <pre {...props} />
    </div>
  ),
}

interface MDXContentProps {
  source: string
}

export function MDXContent({ source }: MDXContentProps) {
  return (
    <div className="prose prose-invert prose-zinc max-w-none prose-headings:font-semibold prose-headings:tracking-tight prose-a:text-emerald-400 prose-a:no-underline hover:prose-a:underline prose-code:text-zinc-300 prose-code:before:content-none prose-code:after:content-none prose-code:bg-zinc-800 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-pre:p-0 prose-pre:bg-transparent prose-pre:border-0">
      <MDXRemote
        source={source}
        components={components}
        options={{
          mdxOptions: {
            remarkPlugins: [remarkGfm],
            rehypePlugins: [
              rehypeSlug,
              [rehypeAutolinkHeadings, { behavior: 'wrap' }],
              [
                rehypePrettyCode,
                {
                  theme: 'vesper',
                  keepBackground: false,
                },
              ],
            ] as never[],
          },
        }}
      />
    </div>
  )
}
