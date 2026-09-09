import type zhDictionary from '@/dictionaries/zh.json'

export type Locale = 'zh' | 'en'
export const locales: Locale[] = ['zh', 'en']
export const defaultLocale: Locale = 'zh'

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
