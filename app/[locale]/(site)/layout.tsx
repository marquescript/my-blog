import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { CommandPalette } from '@/components/CommandPalette'
import { getAllPosts } from '@/lib/mdx'
import { isValidLocale, defaultLocale, locales } from '@/lib/i18n'
import type { Locale } from '@/lib/i18n'

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export default async function SiteLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale: rawLocale } = await params
  const locale: Locale = isValidLocale(rawLocale) ? rawLocale : defaultLocale

  const posts = getAllPosts('blog', locale)

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer locale={locale} />
      <CommandPalette posts={posts} locale={locale} />
    </div>
  )
}
