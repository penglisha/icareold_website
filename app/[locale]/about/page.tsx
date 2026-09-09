import type { Metadata } from 'next'
import { buildAlternates, getDictionary, isLocale, ogLocale, SITE_URL, type Locale } from '@/lib/i18n'
import NavBar from '../NavBar'
import Footer from '../Footer'

export const runtime = 'edge'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: rawLocale } = await params
  const locale: Locale = isLocale(rawLocale) ? rawLocale : 'zh'
  const dict = await getDictionary(locale)
  return {
    title: dict.seo.about.title,
    description: dict.seo.about.description,
    alternates: buildAlternates(locale, '/about'),
    openGraph: {
      title: dict.seo.about.title,
      description: dict.seo.about.description,
      url: `${SITE_URL}/${locale}/about`,
      siteName: 'iCareOld',
      type: 'website',
      ...ogLocale(locale),
    },
  }
}

export default async function AboutPage({ params }: Props) {
  const { locale: rawLocale } = await params
  const locale: Locale = isLocale(rawLocale) ? rawLocale : 'zh'
  const dict = await getDictionary(locale)

  return (
    <>
      <NavBar locale={locale} dict={dict.nav} active="about" />

      {/* ── MAIN ── */}
      <main style={{ maxWidth: '720px', margin: '0 auto', padding: 'var(--sp-page-top) 32px var(--sp-page-bottom)' }}>

        {/* Profile */}
        <div style={{ marginBottom: '64px' }}>
          <div style={{
            width: '64px', height: '64px', borderRadius: '9999px',
            background: 'rgba(0,96,172,0.10)',
            border: '1px solid rgba(0,96,172,0.28)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '26px', marginBottom: '24px',
          }}>
            👩‍💻
          </div>

          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '40px', fontWeight: 600,
            letterSpacing: '-0.035em', lineHeight: 1.1,
            color: 'var(--ink)', marginBottom: '8px',
          }}>
            Lisa
          </h1>
          <p style={{ fontSize: '16px', color: 'var(--ink-subtle)', letterSpacing: '-0.003em' }}>
            {dict.about.role}
          </p>
        </div>

        <hr style={{ border: 'none', borderTop: '1px solid var(--hairline)', marginBottom: '48px' }} />

        {/* Bio */}
        <section style={{ marginBottom: '64px' }}>
          <p className="eyebrow" style={{ marginBottom: '20px' }}>{dict.about.eyebrowAbout}</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <p style={{ fontSize: '17px', lineHeight: 1.75, color: 'var(--ink-muted)', letterSpacing: '-0.005em' }}>
              {dict.about.bioParagraph1}
            </p>
            <p style={{ fontSize: '17px', lineHeight: 1.75, color: 'var(--ink-muted)', letterSpacing: '-0.005em' }}>
              {dict.about.bioParagraph2}
            </p>
            <p style={{ fontSize: '17px', lineHeight: 1.75, color: 'var(--ink-muted)', letterSpacing: '-0.005em' }}>
              {dict.about.bioParagraph3}
            </p>
          </div>
        </section>

        <hr style={{ border: 'none', borderTop: '1px solid var(--hairline)', marginBottom: '48px' }} />

        {/* Contact */}
        <section id="contact">
          <p className="eyebrow" style={{ marginBottom: '20px' }}>{dict.about.eyebrowContact}</p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {/* WeChat ID row */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: '16px',
              padding: '20px 24px',
              background: 'var(--surface-1)',
              border: '1px solid var(--hairline)',
              borderRadius: 'var(--r-lg)',
            }}>
              <div style={{
                width: '40px', height: '40px', borderRadius: 'var(--r-md)',
                background: 'rgba(7,193,96,0.10)',
                border: '1px solid rgba(7,193,96,0.22)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '18px', flexShrink: 0,
              }}>
                💬
              </div>
              <div>
                <div style={{
                  fontSize: '11px', fontWeight: 500, letterSpacing: '0.06em',
                  color: 'var(--ink-tertiary)', textTransform: 'uppercase',
                  marginBottom: '4px',
                }}>
                  {dict.about.wechatLabel}
                </div>
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '17px', fontWeight: 600,
                  color: 'var(--ink)', letterSpacing: '0.04em',
                }}>
                  aicodeu
                </div>
              </div>
            </div>

            {/* Email row */}
            <a href="mailto:penglisha456@163.com" style={{ textDecoration: 'none' }}>
              <div style={{
                display: 'flex', alignItems: 'center', gap: '16px',
                padding: '20px 24px',
                background: 'var(--surface-1)',
                border: '1px solid var(--hairline)',
                borderRadius: 'var(--r-lg)',
                cursor: 'pointer',
              }}>
                <div style={{
                  width: '40px', height: '40px', borderRadius: 'var(--r-md)',
                  background: 'rgba(0,96,172,0.10)',
                  border: '1px solid rgba(0,96,172,0.22)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '18px', flexShrink: 0,
                }}>
                  ✉️
                </div>
                <div>
                  <div style={{
                    fontSize: '11px', fontWeight: 500, letterSpacing: '0.06em',
                    color: 'var(--ink-tertiary)', textTransform: 'uppercase',
                    marginBottom: '4px',
                  }}>
                    {dict.about.emailLabel}
                  </div>
                  <div style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '15px', fontWeight: 600,
                    color: 'var(--ink)', letterSpacing: '0.02em',
                  }}>
                    penglisha456@163.com
                  </div>
                </div>
              </div>
            </a>

            {/* QR code */}
            <div style={{
              padding: '32px',
              background: 'var(--surface-1)',
              border: '1px solid var(--hairline)',
              borderRadius: 'var(--r-lg)',
              textAlign: 'center',
            }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/wechat-qr.jpg"
                alt={dict.about.qrAlt}
                style={{
                  width: '180px', height: '180px',
                  borderRadius: 'var(--r-md)',
                  display: 'block', margin: '0 auto 14px',
                  border: '1px solid var(--hairline-strong)',
                }}
              />
              <p style={{
                fontSize: '12px', color: 'var(--ink-tertiary)',
                letterSpacing: '0.04em',
              }}>
                {dict.about.qrCaption}
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer locale={locale} dict={dict.footer} />
    </>
  )
}
