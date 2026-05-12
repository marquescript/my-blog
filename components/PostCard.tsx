import Link from 'next/link'
import { formatDate } from '@/lib/utils'
import { BookOpen } from 'lucide-react'
import type { Post, ContentType } from '@/lib/mdx'
import type { Locale } from '@/lib/i18n'

interface PostCardProps {
  post: Post
  type: ContentType
  locale: Locale
}

export function PostCard({ post, type, locale }: PostCardProps) {
  const { frontmatter, slug, readingTime } = post

  return (
    <Link
      href={`/${locale}/${type}/${slug}`}
      className="group block rounded-lg border border-zinc-800 bg-zinc-900/50 p-5 transition-all hover:border-zinc-700 hover:bg-zinc-900"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-2 min-w-0">
          <h3 className="text-base font-medium text-zinc-100 group-hover:text-emerald-400 transition-colors leading-snug truncate">
            {frontmatter.title}
          </h3>
          {frontmatter.isSeries && (
            <span className="shrink-0 flex items-center gap-1 rounded-full bg-emerald-400/10 border border-emerald-400/20 px-2 py-0.5 text-xs text-emerald-400">
              <BookOpen size={10} />
              série
            </span>
          )}
        </div>
        <span className="shrink-0 text-xs text-zinc-600 tabular-nums mt-0.5">
          {formatDate(frontmatter.date, 'MMM yyyy')}
        </span>
      </div>

      {frontmatter.description && (
        <p className="mt-2 text-sm text-zinc-500 leading-relaxed line-clamp-2">
          {frontmatter.description}
        </p>
      )}

      <div className="mt-3 flex flex-wrap items-center gap-3">
        {!frontmatter.isSeries && (
          <span className="text-xs text-zinc-600">{readingTime}</span>
        )}
        {frontmatter.tags && frontmatter.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {frontmatter.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-zinc-800 px-2 py-0.5 text-xs text-zinc-500"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  )
}
