'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Command } from 'cmdk'
import { Search, FileText, Boxes } from 'lucide-react'
import { getDict } from '@/lib/i18n'
import type { Locale } from '@/lib/i18n'
import type { Post } from '@/lib/mdx'

interface CommandPaletteProps {
  posts: Post[]
  locale: Locale
}

export function CommandPalette({ posts, locale }: CommandPaletteProps) {
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const d = getDict(locale)

  const staticRoutes = [
    { href: `/${locale}/blog`, label: d.nav.blog, icon: FileText },
    { href: `/${locale}/projects`, label: d.nav.projects, icon: Boxes },
  ]

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((prev) => !prev)
      }
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  const navigate = (href: string) => {
    router.push(href)
    setOpen(false)
  }

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh]"
      onClick={() => setOpen(false)}
    >
      <div className="absolute inset-0 bg-zinc-950/70 backdrop-blur-sm" />

      <div
        className="relative w-full max-w-lg rounded-xl border border-zinc-700 bg-zinc-900 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <Command className="overflow-hidden rounded-xl">
          <div className="flex items-center gap-3 border-b border-zinc-800 px-4">
            <Search size={16} className="text-zinc-500" />
            <Command.Input
              autoFocus
              placeholder={d.cmd.placeholder}
              className="w-full bg-transparent py-4 text-sm text-zinc-100 placeholder:text-zinc-500 outline-none"
            />
          </div>

          <Command.List className="max-h-80 overflow-y-auto p-2">
            <Command.Empty className="py-8 text-center text-sm text-zinc-500">
              {d.cmd.noResults}
            </Command.Empty>

            <Command.Group
              heading={d.cmd.navigation}
              className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:text-zinc-600"
            >
              {staticRoutes.map(({ href, label, icon: Icon }) => (
                <Command.Item
                  key={href}
                  value={label}
                  onSelect={() => navigate(href)}
                  className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-zinc-300 transition-colors data-[selected=true]:bg-zinc-800 data-[selected=true]:text-zinc-100 outline-none"
                >
                  <Icon size={15} className="text-zinc-500" />
                  {label}
                </Command.Item>
              ))}
            </Command.Group>

            {posts.length > 0 && (
              <Command.Group
                heading="Blog"
                className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:text-zinc-600"
              >
                {posts.map((post) => (
                  <Command.Item
                    key={post.slug}
                    value={post.frontmatter.title}
                    onSelect={() => navigate(`/${locale}/blog/${post.slug}`)}
                    className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-zinc-300 transition-colors data-[selected=true]:bg-zinc-800 data-[selected=true]:text-zinc-100 outline-none"
                  >
                    <FileText size={14} className="text-zinc-600 shrink-0" />
                    <span className="truncate">{post.frontmatter.title}</span>
                  </Command.Item>
                ))}
              </Command.Group>
            )}

          </Command.List>

          <div className="border-t border-zinc-800 px-4 py-2.5 flex items-center gap-4">
            <span className="text-xs text-zinc-600">
              <kbd className="rounded bg-zinc-800 px-1.5 py-0.5 font-mono text-zinc-500">↑↓</kbd>
              {' '}{d.cmd.navigate}
            </span>
            <span className="text-xs text-zinc-600">
              <kbd className="rounded bg-zinc-800 px-1.5 py-0.5 font-mono text-zinc-500">↵</kbd>
              {' '}{d.cmd.select}
            </span>
            <span className="text-xs text-zinc-600">
              <kbd className="rounded bg-zinc-800 px-1.5 py-0.5 font-mono text-zinc-500">esc</kbd>
              {' '}{d.cmd.close}
            </span>
          </div>
        </Command>
      </div>
    </div>
  )
}
