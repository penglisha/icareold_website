import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import '../globals.css'
import { getDictionary, isLocale, type Locale } from '@/lib/i18n'

export const runtime = 'edge'

// This is the app's actual root layout, not a nested one - everything now
// lives under app/[locale]/, so there is no separate app/layout.tsx above
// it. Keeping a second outer layout with its own <html> would render two
// <html> tags (invalid, and not something any Next.js version "allows");
// since [locale] is the only thing directly under app/, this layout alone
// satisfies App Router's "must have exactly one root layout" requirement.
//
// No generateStaticParams here (deliberately) - next-on-pages rejects
// combining it with `export const runtime = 'edge'`, and every route in
// this app already was, and still is, a fully dynamic edge function (not
// statically prerendered) before this change, so nothing regresses by
// leaving it out.

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
})

type Props = { children: React.ReactNode; params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: rawLocale } = await params
  const locale: Locale = isLocale(rawLocale) ? rawLocale : 'zh'
  const dict = await getDictionary(locale)
  return {
    title: dict.meta.home.title,
    description: dict.meta.home.description,
    icons: { icon: '/favicon.ico' },
    openGraph: {
      title: dict.meta.home.title,
      description: dict.meta.home.description,
      url: 'https://icareold.com',
      siteName: 'iCareOld',
      type: 'website',
    },
  }
}

export default async function RootLayout({ children, params }: Props) {
  const { locale: rawLocale } = await params
  const locale: Locale = isLocale(rawLocale) ? rawLocale : 'zh'

  return (
    <html lang={locale === 'zh' ? 'zh-CN' : 'en'} className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  )
}
