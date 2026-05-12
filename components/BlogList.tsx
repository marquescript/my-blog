'use client'

import { useState } from 'react'
import { PostCard } from '@/components/PostCard'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import type { Post } from '@/lib/mdx'
import type { Locale } from '@/lib/i18n'
import { getDict } from '@/lib/i18n'

const PER_PAGE = 5

interface BlogListProps {
  posts: Post[]
  locale: Locale
}

export function BlogList({ posts, locale }: BlogListProps) {
  const [page, setPage] = useState(1)
  const d = getDict(locale)

  const totalPages = Math.ceil(posts.length / PER_PAGE)
  const start = (page - 1) * PER_PAGE
  const visible = posts.slice(start, start + PER_PAGE)

  return (
    <div>
      <div className="flex flex-col gap-3">
        {visible.map((post) => (
          <PostCard key={post.slug} post={post} type="blog" locale={locale} />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="mt-10 flex items-center justify-between">
          <button
            onClick={() => setPage((p) => p - 1)}
            disabled={page === 1}
            className="flex items-center gap-1.5 rounded-md border border-zinc-800 px-3 py-1.5 text-sm text-zinc-500 transition-colors hover:border-zinc-700 hover:text-zinc-300 disabled:pointer-events-none disabled:opacity-30"
          >
            <ChevronLeft size={14} />
            {d.blog.prev}
          </button>

          <span className="text-xs text-zinc-600">
            {d.blog.page} {page} {d.blog.of} {totalPages}
          </span>

          <button
            onClick={() => setPage((p) => p + 1)}
            disabled={page === totalPages}
            className="flex items-center gap-1.5 rounded-md border border-zinc-800 px-3 py-1.5 text-sm text-zinc-500 transition-colors hover:border-zinc-700 hover:text-zinc-300 disabled:pointer-events-none disabled:opacity-30"
          >
            {d.blog.next}
            <ChevronRight size={14} />
          </button>
        </div>
      )}
    </div>
  )
}
