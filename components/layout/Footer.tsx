import { Github, Mail, Linkedin } from 'lucide-react'
import { getDict } from '@/lib/i18n'
import type { Locale } from '@/lib/i18n'

const socialLinks = [
  { href: 'https://github.com/marquescript', label: 'GitHub', icon: Github },
  { href: 'https://www.linkedin.com/in/carlos-marques0', label: 'LinkedIn', icon: Linkedin },
  { href: 'mailto:carrlosmr@gmail.com', label: 'Email', icon: Mail },
]

export function Footer({ locale }: { locale: Locale }) {

  return (
    <footer className="border-t border-zinc-800/60 mt-24">
      <div className="mx-auto max-w-3xl px-6 py-10">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <p className="font-mono text-sm text-zinc-500">
              © {new Date().getFullYear()} Carlos Marques
            </p>
          </div>

          <div className="flex items-center gap-3">
            {socialLinks.map(({ href, label, icon: Icon }) => (
              <a
                key={href}
                href={href}
                target={href.startsWith('mailto') ? undefined : '_blank'}
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-8 w-8 items-center justify-center rounded-md text-zinc-600 hover:bg-zinc-800 hover:text-zinc-300 transition-colors"
              >
                <Icon size={15} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
