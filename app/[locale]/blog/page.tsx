import type { Metadata } from 'next'
import Link from 'next/link'
import { getBlogPosts, hasEnglishVersion } from '@/lib/notion'
import { getDictionary, isLocale, SITE_URL, type Locale } from '@/lib/i18n'
import NavBar from '../NavBar'
import Footer from '../Footer'

export const runtime = 'edge'

type Props = { params: Promise<{ locale: string }> }

// No hreflang alternates here (unlike home/about) - this list page renders
// fine in both languages, but its *content* isn't equivalent yet (en has
// no posts), so advertising it as a translated counterpart to search
// engines would be misleading until posts actually have English versions.
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: rawLocale } = await params
  const locale: Locale = isLocale(rawLocale) ? rawLocale : 'zh'
  const dict = await getDictionary(locale)
  return {
    title: `${dict.blogSection.title} — iCareOld`,
    description: dict.blogSection.subtitle,
    alternates: { canonical: `${SITE_URL}/${locale}/blog` },
  }
}

export default async function BlogListPage({ params }: Props) {
  const { locale: rawLocale } = await params
  const locale: Locale = isLocale(rawLocale) ? rawLocale : 'zh'
  const dict = await getDictionary(locale)
  const allPosts = await getBlogPosts()
  // zh sees everything; en only sees posts that actually have an English
  // version (none yet - see hasEnglishVersion in lib/notion.ts).
  const posts = locale === 'zh' ? allPosts : allPosts.filter(hasEnglishVersion)

  return (
    <>
      <NavBar locale={locale} dict={dict.nav} active="blog" />

      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: 'var(--sp-page-top) 32px var(--sp-page-bottom)' }}>
        <div style={{ marginBottom: '64px', textAlign: 'center' }}>
          <p className="eyebrow" style={{ marginBottom: '16px' }}>{dict.blogSection.eyebrow}</p>
          <h1 className="headline" style={{ marginBottom: '8px' }}>{dict.blogSection.title}</h1>
          <p style={{ fontSize: '16px', color: 'var(--ink-muted)' }}>{dict.blogSection.subtitle}</p>
        </div>

        {posts.length === 0 ? (
          <div style={{
            padding: '80px 32px', textAlign: 'center',
            border: '1px dashed var(--hairline-strong)', borderRadius: 'var(--r-lg)',
            color: 'var(--ink-tertiary)', fontSize: '14px',
          }}>
            {locale === 'en' ? dict.blogSection.enComingSoon : dict.blogSection.empty}
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {posts.map((post) => (
              <Link
                key={post.id}
                href={`/${locale}/blog/${post.slug}`}
                className="floating-card"
                style={{
                  display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between',
                  gap: '24px', padding: '32px',
                  textDecoration: 'none', color: 'inherit',
                }}
              >
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '32px' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', fontWeight: 700, color: 'var(--primary)', opacity: 0.6 }}>
                    {post.date}
                  </span>
                  <div>
                    <h4 style={{
                      fontSize: '18px', fontWeight: 700,
                      color: 'var(--ink)', letterSpacing: '-0.01em',
                      marginBottom: '12px', lineHeight: 1.4,
                    }}>
                      {post.title}
                    </h4>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                      {post.tags.map((t) => <span key={t} className="tag-accent" style={{ borderRadius: 'var(--r-pill)', fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', padding: '4px 12px' }}>{t}</span>)}
                      <span className={post.status === '已发布' ? 'badge-primary' : 'badge-muted'}>
                        {post.status}
                      </span>
                    </div>
                  </div>
                </div>
                <span className="material-symbols-outlined" style={{ color: 'var(--primary)', opacity: 0.5, fontSize: '28px' }}>
                  chevron_right
                </span>
              </Link>
            ))}
          </div>
        )}
      </main>

      <Footer locale={locale} dict={dict.footer} />
    </>
  )
}
