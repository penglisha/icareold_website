import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { isLocale, locales, type Locale } from '@/lib/i18n'

const LOCALE_COOKIE = 'NEXT_LOCALE'

// Only Web-standard APIs and Next's edge-runtime `next/server` exports are
// used here (Request/cookies/headers, NextResponse.redirect) - no `fs`,
// `path`, or other Node-only APIs, since this runs on Cloudflare Pages via
// next-on-pages, same edge runtime every page in this app already opts
// into with `export const runtime = 'edge'`.
function detectLocale(request: NextRequest): Locale {
  const cookieLocale = request.cookies.get(LOCALE_COOKIE)?.value
  if (cookieLocale && isLocale(cookieLocale)) return cookieLocale

  const acceptLanguage = request.headers.get('accept-language') ?? ''
  return acceptLanguage.toLowerCase().includes('zh') ? 'zh' : 'en'
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  const pathnameHasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  )
  if (pathnameHasLocale) return NextResponse.next()

  const locale = detectLocale(request)
  const targetUrl = request.nextUrl.clone()
  targetUrl.pathname = `/${locale}${pathname === '/' ? '' : pathname}`
  return NextResponse.redirect(targetUrl)
}

export const config = {
  // Excludes _next internals, API routes, and anything that looks like a
  // static file (has a "." in the last path segment, e.g. favicon.ico,
  // wechat-qr.jpg, sitemap.xml) - default locale isn't relevant to those.
  matcher: ['/((?!_next|api|.*\\..*).*)'],
}
