import { getAllPosts } from '@/lib/mdx'
import { BlogList } from '@/components/BlogList'
import { isValidLocale, defaultLocale, getDict, locales } from '@/lib/i18n'
import type { Locale } from '@/lib/i18n'
import type { Metadata } from 'next'


export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale: raw } = await params
  const locale: Locale = isValidLocale(raw) ? raw : defaultLocale
  const d = getDict(locale)
  return { title: d.blog.title, description: d.blog.description }
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale: raw } = await params
  const locale: Locale = isValidLocale(raw) ? raw : defaultLocale
  const d = getDict(locale)
  const posts = getAllPosts('blog', locale)
  const tags = Array.from(new Set(posts.flatMap((p) => p.frontmatter.tags ?? [])))

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <div className="mb-10">
        <h1 className="text-2xl font-bold tracking-tight text-zinc-100">{d.blog.title}</h1>
        <p className="mt-2 text-sm text-zinc-500">{d.blog.description}</p>
      </div>

      {tags.length > 0 && (
        <div className="mb-8 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-zinc-900 border border-zinc-800 px-3 py-1 text-xs text-zinc-500"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {posts.length === 0 ? (
        <p className="text-sm text-zinc-600">{d.blog.empty}</p>
      ) : (
        <BlogList posts={posts} locale={locale} />
      )}
    </div>
  )
}
