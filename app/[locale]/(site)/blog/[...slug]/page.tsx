import { notFound } from 'next/navigation'
import { getAllStaticParams, getPost, getSeriesParts, isSeriesDir } from '@/lib/mdx'
import { MDXContent } from '@/components/mdx/MDXContent'
import { formatDate } from '@/lib/utils'
import Link from 'next/link'
import { ArrowLeft, Clock, Calendar, BookOpen, ChevronRight } from 'lucide-react'
import { isValidLocale, defaultLocale, getDict, locales } from '@/lib/i18n'
import type { Locale } from '@/lib/i18n'
import type { Metadata } from 'next'

interface Params {
  params: Promise<{ locale: string; slug: string[] }>
}

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    getAllStaticParams('blog', locale).map(({ slug }) => ({ locale, slug }))
  )
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale: raw, slug } = await params
  const locale: Locale = isValidLocale(raw) ? raw : defaultLocale
  const post = getPost('blog', locale, slug)
  if (!post) return {}
  return {
    title: post.frontmatter.title,
    description: post.frontmatter.description,
    openGraph: {
      title: post.frontmatter.title,
      description: post.frontmatter.description,
      type: 'article',
      publishedTime: post.frontmatter.date,
    },
  }
}

export default async function BlogPostPage({ params }: Params) {
  const { locale: raw, slug } = await params
  const locale: Locale = isValidLocale(raw) ? raw : defaultLocale
  const d = getDict(locale)

  const post = getPost('blog', locale, slug)
  if (!post) notFound()

  const isSeries = slug.length === 1 && isSeriesDir('blog', locale, slug[0])
  const isSeriesPart = slug.length === 2
  const seriesParts = isSeries || isSeriesPart ? getSeriesParts('blog', locale, slug[0]) : []
  const currentPartIndex = isSeriesPart
    ? seriesParts.findIndex((p) => p.slug === `${slug[0]}/${slug[1]}`)
    : -1
  const prevPart = currentPartIndex > 0 ? seriesParts[currentPartIndex - 1] : null
  const nextPart = currentPartIndex < seriesParts.length - 1 ? seriesParts[currentPartIndex + 1] : null

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <Link
        href={`/${locale}/blog`}
        className="mb-10 flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-300 transition-colors w-fit"
      >
        <ArrowLeft size={14} />
        {d.post.backBlog}
      </Link>

      {isSeriesPart && (
        <div className="mb-6 flex items-center gap-2 text-xs text-zinc-600">
          <Link href={`/${locale}/blog/${slug[0]}`} className="hover:text-zinc-400 transition-colors">
            {getPost('blog', locale, [slug[0]])?.frontmatter.title}
          </Link>
          <ChevronRight size={12} />
          <span className="text-zinc-500">{post.frontmatter.title}</span>
        </div>
      )}

      <article>
        <header className="mb-10">
          {isSeries && (
            <div className="mb-3">
              <span className="flex w-fit items-center gap-1.5 rounded-full bg-emerald-400/10 border border-emerald-400/20 px-3 py-1 text-xs text-emerald-400">
                <BookOpen size={11} />
                {d.post.series} · {seriesParts.length} {d.post.parts}
              </span>
            </div>
          )}

          {post.frontmatter.tags && post.frontmatter.tags.length > 0 && (
            <div className="mb-4 flex flex-wrap gap-2">
              {post.frontmatter.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-zinc-900 border border-zinc-800 px-2.5 py-0.5 text-xs text-zinc-500"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <h1 className="text-2xl font-bold tracking-tight text-zinc-100 sm:text-3xl leading-snug">
            {post.frontmatter.title}
          </h1>

          {post.frontmatter.description && (
            <p className="mt-3 text-base text-zinc-500 leading-relaxed">
              {post.frontmatter.description}
            </p>
          )}

          <div className="mt-6 flex items-center gap-4 text-sm text-zinc-600">
            <span className="flex items-center gap-1.5">
              <Calendar size={13} />
              {formatDate(post.frontmatter.date)}
            </span>
            {!isSeries && (
              <span className="flex items-center gap-1.5">
                <Clock size={13} />
                {post.readingTime}
              </span>
            )}
          </div>
        </header>

        <div className="mb-10 border-t border-zinc-800" />

        {isSeries && seriesParts.length > 0 && (
          <div className="mb-10">
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-zinc-500">
              {d.post.seriesParts}
            </p>
            <div className="flex flex-col gap-2">
              {seriesParts.map((part, i) => (
                <Link
                  key={part.slug}
                  href={`/${locale}/blog/${part.slug}`}
                  className="group flex items-center gap-4 rounded-lg border border-zinc-800 bg-zinc-900/50 px-4 py-3 transition-all hover:border-zinc-700 hover:bg-zinc-900"
                >
                  <span className="shrink-0 font-mono text-xs text-zinc-600">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-zinc-200 group-hover:text-emerald-400 transition-colors truncate">
                      {part.frontmatter.title}
                    </p>
                    {part.frontmatter.description && (
                      <p className="mt-0.5 text-xs text-zinc-600 truncate">
                        {part.frontmatter.description}
                      </p>
                    )}
                  </div>
                  <span className="shrink-0 text-xs text-zinc-700">{part.readingTime}</span>
                </Link>
              ))}
            </div>
            <div className="mt-8 border-t border-zinc-800" />
          </div>
        )}

        <MDXContent source={post.rawContent} />
      </article>

      {isSeriesPart && (
        <div className="mt-16 border-t border-zinc-800 pt-8 grid grid-cols-2 gap-4">
          <div>
            {prevPart && (
              <Link
                href={`/${locale}/blog/${prevPart.slug}`}
                className="group flex flex-col gap-1 rounded-lg border border-zinc-800 p-4 transition-colors hover:border-zinc-700"
              >
                <span className="text-xs text-zinc-600">← {d.post.prev}</span>
                <span className="text-sm text-zinc-400 group-hover:text-zinc-200 transition-colors">
                  {prevPart.frontmatter.title}
                </span>
              </Link>
            )}
          </div>
          <div>
            {nextPart && (
              <Link
                href={`/${locale}/blog/${nextPart.slug}`}
                className="group flex flex-col gap-1 rounded-lg border border-zinc-800 p-4 transition-colors hover:border-zinc-700 text-right"
              >
                <span className="text-xs text-zinc-600">{d.post.next} →</span>
                <span className="text-sm text-zinc-400 group-hover:text-zinc-200 transition-colors">
                  {nextPart.frontmatter.title}
                </span>
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
