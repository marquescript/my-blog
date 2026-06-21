export const locales = ['pt', 'en'] as const
export type Locale = typeof locales[number]
export const defaultLocale: Locale = 'pt'

export function isValidLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value)
}

export const dict = {
  pt: {
    nav: {
      blog: 'blog',
      projects: 'projetos',
    },
    home: {
      role: 'Software Engineer',
      bio: [
        'Engenheiro de software apaixonado por arquitetura de backend, engenharia de inteligência artificial e me aventurando em machine learning.',
        'Aqui escrevo sobre o que estudo, experimento e aprendo no dia a dia — desde arquitetura até otimizações específicas que valem um artigo.',
        'Atualmente focado em engenharia de IA, sistemas escaláveis e infraestrutura cloud.',
      ],
      recentWriting: 'Escrita recente',
      viewAll: 'Ver tudo',
      cmdSearch: 'para buscar',
    },
    blog: {
      title: 'Blog',
      description: 'Sobre engenharia de software, engenharia de IA e machine learning.',
      empty: 'Nenhum artigo publicado ainda.',
      prev: 'Anterior',
      next: 'Próxima',
      page: 'Página',
      of: 'de',
    },
    projects: {
      title: 'Projetos',
      description: 'Coisas que construí, experimentos que viraram produto e projetos em andamento.',
    },
    post: {
      backBlog: 'Blog',
      prev: 'Anterior',
      next: 'Próxima',
      seriesParts: 'Partes desta série',
      series: 'Série',
      parts: 'partes',
    },
    cmd: {
      placeholder: 'Buscar páginas e artigos...',
      noResults: 'Nenhum resultado encontrado.',
      navigation: 'Navegação',
      navigate: 'navegar',
      select: 'selecionar',
      close: 'fechar',
    },
  },
  en: {
    nav: {
      blog: 'blog',
      projects: 'projects',
    },
    home: {
      role: 'Software Engineer',
      bio: [
        'Software engineer passionate about backend architecture, AI engineering and venturing into machine learning.',
        'Here I write about what I study, experiment with and learn day to day — from architecture to specific optimizations worth an article.',
        'Currently focused on AI engineering, systems scalability and cloud infrastructure.',
      ],
      recentWriting: 'Recent writing',
      viewAll: 'View all',
      cmdSearch: 'to search',
    },
    blog: {
      title: 'Blog',
      description: 'About software engineering, AI engineering and machine learning.',
      empty: 'No articles published yet.',
      prev: 'Previous',
      next: 'Next',
      page: 'Page',
      of: 'of',
    },
    projects: {
      title: 'Projects',
      description: 'Things I built, experiments that became products and ongoing projects.',
    },
    post: {
      backBlog: 'Blog',
      prev: 'Previous',
      next: 'Next',
      seriesParts: 'Parts of this series',
      series: 'Series',
      parts: 'parts',
    },
    cmd: {
      placeholder: 'Search pages and articles...',
      noResults: 'No results found.',
      navigation: 'Navigation',
      navigate: 'navigate',
      select: 'select',
      close: 'close',
    },
  },
}

export type Dict = typeof dict.pt

export function getDict(locale: Locale) {
  return dict[locale] as Dict
}
