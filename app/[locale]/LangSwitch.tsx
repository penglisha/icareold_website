'use client'

import { useRouter, usePathname } from 'next/navigation'
import type { Locale } from '@/lib/i18n'

const OTHER_LOCALE: Record<Locale, Locale> = { zh: 'en', en: 'zh' }
// Shows the *other* language's own label - a zh page shows "EN", an en page
// shows "中文" - not the current language's name.
const SWITCH_LABEL: Record<Locale, string> = { zh: '中文', en: 'EN' }

const ONE_YEAR_SECONDS = 60 * 60 * 24 * 365

export default function LangSwitch({ locale }: { locale: Locale }) {
  const router = useRouter()
  const pathname = usePathname()
  const target = OTHER_LOCALE[locale]

  function switchLocale() {
    document.cookie = `NEXT_LOCALE=${target}; path=/; max-age=${ONE_YEAR_SECONDS}`
    const rest = pathname.replace(/^\/(zh|en)(?=\/|$)/, '')
    router.push(`/${target}${rest}`)
  }

  return (
    <button
      type="button"
      onClick={switchLocale}
      className="nav-link"
      style={{ background: 'none', border: 'none', font: 'inherit', cursor: 'pointer', padding: 0 }}
    >
      {SWITCH_LABEL[target]}
    </button>
  )
}
