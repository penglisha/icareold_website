import Link from 'next/link'
import type { Dictionary, Locale } from '@/lib/i18n'

// The homepage footer additionally shows the logo + Works/Blog/About links;
// about/blog-post pages use the plain centered-copyright variant. Both were
// previously three copies of near-identical inline JSX (page.tsx,
// about/page.tsx, blog/[slug]/page.tsx) - unified here now that the text
// needs to come from the dictionary instead of being hardcoded three times.
export default function Footer({
  locale,
  dict,
  variant = 'minimal',
}: {
  locale: Locale
  dict: Dictionary['footer']
  variant?: 'full' | 'minimal'
}) {
  if (variant === 'minimal') {
    return (
      <footer style={{
        borderTop: '1px solid var(--hairline)',
        padding: '40px 32px',
        background: 'var(--canvas)',
        textAlign: 'center',
      }}>
        <p style={{ fontSize: '12px', color: 'var(--ink-tertiary)' }}>{dict.copyright}</p>
      </footer>
    )
  }

  return (
    <footer style={{
      borderTop: '1px solid var(--hairline)',
      padding: 'var(--sp-footer) 32px',
    }}>
      <div style={{
        maxWidth: '1200px', margin: '0 auto',
        display: 'flex', alignItems: 'center',
        justifyContent: 'space-between', flexWrap: 'wrap', gap: '24px',
      }}>
        <div>
          <div style={{
            fontFamily: 'var(--font-display)',
            fontSize: '20px', fontWeight: 700,
            letterSpacing: '-0.01em', color: 'var(--primary)',
          }}>
            iCareOld
          </div>
          <p style={{ fontSize: '12px', color: 'var(--ink-tertiary)', opacity: 0.8, marginTop: '4px' }}>
            {dict.copyright}
          </p>
        </div>
        <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap' }}>
          <Link href={`/${locale}#projects`} style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-subtle)', textDecoration: 'none' }}>{dict.works}</Link>
          <Link href={`/${locale}#blog`} style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-subtle)', textDecoration: 'none' }}>{dict.blog}</Link>
          <Link href={`/${locale}/about`} style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-subtle)', textDecoration: 'none' }}>{dict.about}</Link>
        </div>
      </div>
    </footer>
  )
}
