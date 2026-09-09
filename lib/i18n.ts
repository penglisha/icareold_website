import type zhDictionary from '@/dictionaries/zh.json'

export type Locale = 'zh' | 'en'
export const locales: Locale[] = ['zh', 'en']
export const defaultLocale: Locale = 'zh'

// Single source of truth for the canonical domain, used by every
// generateMetadata (canonical/hreflang/openGraph.url), sitemap.ts, and
// robots.ts. Confirmed live (2026-09-09): the apex domain icareold.com
// fails TLS handshake entirely, while www.icareold.com serves the site -
// www is the actual working production host, not just a style preference.
export const SITE_URL = 'https://www.icareold.com'

export function isLocale(value: string): value is Locale {
  return (locales as string[]).includes(value)
}

// Both dictionary files must share this exact shape - zh.json is the
// source of truth for the type since it's the default locale.
export type Dictionary = typeof zhDictionary

const loaders: Record<Locale, () => Promise<Dictionary>> = {
  zh: () => import('@/dictionaries/zh.json').then((m) => m.default),
  en: () => import('@/dictionaries/en.json').then((m) => m.default),
}

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  return (loaders[locale] ?? loaders[defaultLocale])()
}

// Shared by every bilingual page's generateMetadata (home, about) - `path`
// is the locale-less route suffix, e.g. '' for home or '/about'. Not used
// by blog post pages, which only ever have a zh version right now (see
// hasEnglishVersion in lib/notion.ts) and so intentionally have no
// hreflang alternates - see app/[locale]/blog/[slug]/page.tsx.
export function buildAlternates(locale: Locale, path: string) {
  return {
    canonical: `${SITE_URL}/${locale}${path}`,
    languages: {
      'zh-CN': `${SITE_URL}/zh${path}`,
      'en-US': `${SITE_URL}/en${path}`,
      'x-default': `${SITE_URL}/zh${path}`,
    },
  }
}

export function ogLocale(locale: Locale): { locale: string; alternateLocale: string } {
  return locale === 'zh' ? { locale: 'zh_CN', alternateLocale: 'en_US' } : { locale: 'en_US', alternateLocale: 'zh_CN' }
}
