import { NextRequest, NextResponse } from 'next/server'
import { locales, isValidLocale } from '@/lib/i18n'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  const hasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  if (hasLocale) return NextResponse.next()

  // Cookie de preferência (setado pelo seletor de idioma)
  const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value
  if (cookieLocale && isValidLocale(cookieLocale)) {
    return NextResponse.redirect(new URL(`/${cookieLocale}${pathname}`, request.url))
  }

  // Accept-Language header
  const acceptLang = request.headers.get('accept-language') ?? ''
  const locale = acceptLang.toLowerCase().startsWith('pt') ? 'pt' : 'en'

  return NextResponse.redirect(new URL(`/${locale}${pathname}`, request.url))
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\..*).*)',],
}
