'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { locales, isValidLocale, getDict } from '@/lib/i18n'
import type { Locale } from '@/lib/i18n'

export function Header() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const segments = pathname.split('/')
  const locale = isValidLocale(segments[1]) ? (segments[1] as Locale) : 'pt'
  const pathWithoutLocale = '/' + segments.slice(2).join('/')
  const d = getDict(locale)

  const navLinks = [
    { href: `/${locale}/blog`, label: d.nav.blog },
    { href: `/${locale}/projects`, label: d.nav.projects },
  ]

  const switchLocale = (next: Locale) => {
    document.cookie = `NEXT_LOCALE=${next};path=/;max-age=31536000`
  }

  return (
    <header className="sticky top-0 z-40 border-b border-zinc-800/60 bg-zinc-950/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
        <Link
          href={`/${locale}`}
          className="font-mono text-sm text-zinc-400 hover:text-zinc-100 transition-colors"
        >
          ~/carlos
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'rounded-md px-3 py-1.5 text-sm transition-colors',
                pathname === link.href || pathname.startsWith(link.href + '/')
                  ? 'text-zinc-100 bg-zinc-800'
                  : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/50'
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {/* Locale switcher */}
          <div className="flex items-center gap-1 font-mono text-xs">
            {locales.map((l, i) => (
              <span key={l} className="flex items-center gap-1">
                {i > 0 && <span className="text-zinc-700">|</span>}
                <Link
                  href={`/${l}${pathWithoutLocale}`}
                  onClick={() => switchLocale(l)}
                  className={cn(
                    'transition-colors',
                    l === locale ? 'text-zinc-100' : 'text-zinc-600 hover:text-zinc-400'
                  )}
                >
                  {l.toUpperCase()}
                </Link>
              </span>
            ))}
          </div>

          <button
            className="flex h-8 w-8 items-center justify-center rounded-md text-zinc-500 hover:bg-zinc-800 hover:text-zinc-300 transition-colors md:hidden"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            {open ? <X size={15} /> : <Menu size={15} />}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {open && (
        <div className="border-t border-zinc-800 px-6 py-4 md:hidden">
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={cn(
                  'rounded-md px-3 py-2 text-sm transition-colors',
                  pathname === link.href || pathname.startsWith(link.href + '/')
                    ? 'text-zinc-100 bg-zinc-800'
                    : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/50'
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}
