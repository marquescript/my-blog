import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'
import type { Locale } from './i18n'

const contentDir = path.join(process.cwd(), 'content')

export type ContentType = 'blog'

export interface Frontmatter {
  title: string
  description: string
  date: string
  tags?: string[]
  coverImage?: string
  published?: boolean
  isSeries?: boolean
  part?: number
}

export interface Post {
  slug: string
  frontmatter: Frontmatter
  readingTime: string
  rawContent: string
}

export function getAllPosts(type: ContentType, locale: Locale): Post[] {
  const dir = path.join(contentDir, type, locale)
  if (!fs.existsSync(dir)) return []

  const posts: Post[] = []

  for (const entry of fs.readdirSync(dir)) {
    const fullPath = path.join(dir, entry)
    const stat = fs.statSync(fullPath)

    if (stat.isFile() && entry.endsWith('.mdx')) {
      const slug = entry.replace('.mdx', '')
      const source = fs.readFileSync(fullPath, 'utf-8')
      const { data, content } = matter(source)
      posts.push({
        slug,
        frontmatter: data as Frontmatter,
        readingTime: readingTime(content).text,
        rawContent: content,
      })
    } else if (stat.isDirectory()) {
      const indexPath = path.join(fullPath, 'index.mdx')
      if (fs.existsSync(indexPath)) {
        const source = fs.readFileSync(indexPath, 'utf-8')
        const { data, content } = matter(source)
        posts.push({
          slug: entry,
          frontmatter: { ...data, isSeries: true } as Frontmatter,
          readingTime: readingTime(content).text,
          rawContent: content,
        })
      }
    }
  }

  return posts
    .filter((p) => p.frontmatter.published !== false)
    .sort(
      (a, b) =>
        new Date(b.frontmatter.date).getTime() -
        new Date(a.frontmatter.date).getTime()
    )
}

export function getPost(
  type: ContentType,
  locale: Locale,
  slugParts: string[]
): Post | null {
  const dir = path.join(contentDir, type, locale)
  const [first, second] = slugParts

  if (slugParts.length === 1) {
    const filePath = path.join(dir, `${first}.mdx`)
    if (fs.existsSync(filePath)) return readPost(filePath, first)

    const indexPath = path.join(dir, first, 'index.mdx')
    if (fs.existsSync(indexPath)) {
      const post = readPost(indexPath, first)
      return { ...post, frontmatter: { ...post.frontmatter, isSeries: true } }
    }
    return null
  }

  const filePath = path.join(dir, first, `${second}.mdx`)
  if (!fs.existsSync(filePath)) return null
  return readPost(filePath, `${first}/${second}`)
}

function readPost(filePath: string, slug: string): Post {
  const source = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(source)
  return {
    slug,
    frontmatter: data as Frontmatter,
    readingTime: readingTime(content).text,
    rawContent: content,
  }
}

export function getSeriesParts(
  type: ContentType,
  locale: Locale,
  seriesSlug: string
): Post[] {
  const dir = path.join(contentDir, type, locale, seriesSlug)
  if (!fs.existsSync(dir)) return []

  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.mdx') && f !== 'index.mdx')
    .map((filename) => {
      const slug = filename.replace('.mdx', '')
      return readPost(path.join(dir, filename), `${seriesSlug}/${slug}`)
    })
    .filter((p) => p.frontmatter.published !== false)
    .sort((a, b) => (a.frontmatter.part ?? 0) - (b.frontmatter.part ?? 0))
}

export function isSeriesDir(
  type: ContentType,
  locale: Locale,
  slug: string
): boolean {
  return fs.existsSync(path.join(contentDir, type, locale, slug, 'index.mdx'))
}

export function getAllStaticParams(
  type: ContentType,
  locale: Locale
): { slug: string[] }[] {
  const dir = path.join(contentDir, type, locale)
  if (!fs.existsSync(dir)) return []

  const params: { slug: string[] }[] = []

  for (const entry of fs.readdirSync(dir)) {
    const fullPath = path.join(dir, entry)
    const stat = fs.statSync(fullPath)

    if (stat.isFile() && entry.endsWith('.mdx')) {
      params.push({ slug: [entry.replace('.mdx', '')] })
    } else if (stat.isDirectory()) {
      if (fs.existsSync(path.join(fullPath, 'index.mdx'))) {
        params.push({ slug: [entry] })
      }
      for (const part of fs.readdirSync(fullPath)) {
        if (part.endsWith('.mdx') && part !== 'index.mdx') {
          params.push({ slug: [entry, part.replace('.mdx', '')] })
        }
      }
    }
  }

  return params
}

export function getAllTags(type: ContentType, locale: Locale): string[] {
  return Array.from(
    new Set(getAllPosts(type, locale).flatMap((p) => p.frontmatter.tags ?? []))
  ).sort()
}
