import Link from 'next/link'
import { getAllPosts } from '@/lib/mdx'
import { PostCard } from '@/components/PostCard'
import { ArrowRight, Github, Linkedin, Mail } from 'lucide-react'
import { isValidLocale, defaultLocale, getDict } from '@/lib/i18n'
import type { Locale } from '@/lib/i18n'

const socialLinks = [
  { href: 'https://github.com/marquescript', label: 'GitHub', icon: Github },
  { href: 'https://www.linkedin.com/in/carlos-marques0', label: 'LinkedIn', icon: Linkedin },
  { href: 'mailto:carrlosmr@gmail.com', label: 'Email', icon: Mail },
]

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale: rawLocale } = await params
  const locale: Locale = isValidLocale(rawLocale) ? rawLocale : defaultLocale
  const d = getDict(locale)

  const posts = getAllPosts('blog', locale)
  const recentPosts = posts.slice(0, 3)

  return (
    <div className="mx-auto max-w-3xl px-6">
      {/* Hero */}
      <section className="pt-20 pb-16">
        <div className="mb-2 font-mono text-xs text-emerald-400/70">~/carlos</div>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">
          Carlos Marques
        </h1>
        <p className="mt-1 text-lg text-zinc-500">{d.home.role}</p>

        <div className="mt-6 max-w-xl space-y-2 text-[15px] leading-relaxed text-zinc-400">
          {d.home.bio.map((line, i) => (
            <p key={i}>{line}</p>
          ))}
        </div>

        <div className="mt-8 flex items-center gap-2">
          {socialLinks.map(({ href, label, icon: Icon }) => (
            <a
              key={href}
              href={href}
              target={href.startsWith('mailto') ? undefined : '_blank'}
              rel="noopener noreferrer"
              aria-label={label}
              className="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm text-zinc-500 border border-zinc-800 hover:border-zinc-700 hover:text-zinc-300 hover:bg-zinc-800/50 transition-all"
            >
              <Icon size={14} />
              <span>{label}</span>
            </a>
          ))}
        </div>

        <div className="mt-6 text-xs text-zinc-700">
          <kbd className="rounded bg-zinc-900 border border-zinc-800 px-1.5 py-0.5 font-mono text-zinc-600">
            ⌘K
          </kbd>
          {' '}{d.home.cmdSearch}
        </div>
      </section>

      <div className="border-t border-zinc-800/60" />

      {/* Recent posts */}
      <section className="py-14">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-zinc-500">
            {d.home.recentWriting}
          </h2>
          <Link
            href={`/${locale}/blog`}
            className="flex items-center gap-1 text-xs text-zinc-600 hover:text-emerald-400 transition-colors"
          >
            {d.home.viewAll}
            <ArrowRight size={12} />
          </Link>
        </div>

        {recentPosts.length === 0 ? (
          <p className="text-sm text-zinc-600">{d.blog.empty}</p>
        ) : (
          <div className="flex flex-col gap-3">
            {recentPosts.map((post) => (
              <PostCard key={post.slug} post={post} type="blog" locale={locale} />
            ))}
          </div>
        )}
      </section>

    </div>
  )
}
