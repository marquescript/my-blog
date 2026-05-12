import { Github, Circle, ExternalLink } from 'lucide-react'
import { isValidLocale, defaultLocale, getDict, locales } from '@/lib/i18n'
import type { Locale } from '@/lib/i18n'
import type { Metadata } from 'next'
import projects from '@/data/projects.json'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale: raw } = await params
  const locale: Locale = isValidLocale(raw) ? raw : defaultLocale
  const d = getDict(locale)
  return { title: d.projects.title, description: d.projects.description }
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

const statusColors: Record<string, string> = {
  ativo: 'text-emerald-400',
  active: 'text-emerald-400',
  pausado: 'text-yellow-400',
  paused: 'text-yellow-400',
  arquivado: 'text-zinc-600',
  archived: 'text-zinc-600',
  wip: 'text-blue-400',
}

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale: raw } = await params
  const locale: Locale = isValidLocale(raw) ? raw : defaultLocale
  const d = getDict(locale)

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <div className="mb-10">
        <h1 className="text-2xl font-bold tracking-tight text-zinc-100">{d.projects.title}</h1>
        <p className="mt-2 text-sm text-zinc-500">{d.projects.description}</p>
      </div>

      <div className="flex flex-col gap-4">
        {projects.map((project) => {
          const name = project.name[locale as Locale]
          const description = project.description[locale as Locale]
          const status = project.status[locale as Locale]

          return (
            <div
              key={name}
              className="group rounded-lg border border-zinc-800 bg-zinc-900/50 p-6 transition-colors hover:border-zinc-700"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-2">
                  <h2 className="text-base font-semibold text-zinc-100">{name}</h2>
                  <span
                    className={`flex items-center gap-1 text-xs ${statusColors[status] ?? 'text-zinc-500'}`}
                  >
                    <Circle size={6} fill="currentColor" />
                    {status}
                  </span>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {project.url && (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-7 w-7 items-center justify-center rounded text-zinc-500 hover:text-zinc-300 transition-colors"
                      aria-label="Site"
                    >
                      <ExternalLink size={14} />
                    </a>
                  )}
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-7 w-7 items-center justify-center rounded text-zinc-500 hover:text-zinc-300 transition-colors"
                      aria-label="GitHub"
                    >
                      <Github size={14} />
                    </a>
                  )}
                </div>
              </div>

              <p className="mt-3 text-sm text-zinc-500 leading-relaxed">{description}</p>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded bg-zinc-800 px-2 py-0.5 text-xs font-mono text-zinc-400"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
