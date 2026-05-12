import { MetadataRoute } from 'next'
import { getAllStaticParams } from '@/lib/mdx'
import { locales } from '@/lib/i18n'

const baseUrl = 'https://carlosmarques.dev'

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = []

  for (const locale of locales) {
    // Rotas estáticas
    for (const route of ['', '/blog', '/projects']) {
      entries.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: route === '' ? 1 : 0.8,
      })
    }

    // Posts de blog
    for (const { slug } of getAllStaticParams('blog', locale)) {
      entries.push({
        url: `${baseUrl}/${locale}/blog/${slug.join('/')}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
      })
    }

  }

  return entries
}
