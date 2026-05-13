import type { Metadata } from 'next'
import Link from 'next/link'

export const runtime = 'edge'

export const metadata: Metadata = {
  title: '关于我 — iCareOld',
  description: '浙江大学农学硕士，十余年互联网产品经理经历，专注 AI 落地实践。',
}

export default function AboutPage() {
  return (
    <>
      {/* Nav */}
      <nav
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          height: '52px',
          background: 'rgba(251,251,253,0.85)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: '1px solid var(--color-border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 24px',
        }}
      >
        <Link
          href="/"
          style={{
            fontWeight: 600,
            fontSize: '17px',
            color: 'var(--color-text-primary)',
            textDecoration: 'none',
          }}
        >
          iCareOld
        </Link>
        <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
          <Link
            href="/#projects"
            style={{ fontSize: '14px', color: 'var(--color-text-secondary)', textDecoration: 'none' }}
          >
            作品集
          </Link>
          <Link
            href="/#blog"
            style={{ fontSize: '14px', color: 'var(--color-text-secondary)', textDecoration: 'none' }}
          >
            博客
          </Link>
          <Link
            href="/about"
            style={{ fontSize: '14px', color: 'var(--color-blue)', textDecoration: 'none' }}
          >
            关于我
          </Link>
        </div>
      </nav>

      {/* Content */}
      <main style={{ maxWidth: '680px', margin: '0 auto', padding: '72px 24px 80px' }}>

        {/* Avatar placeholder + name */}
        <div style={{ marginBottom: '48px' }}>
          <div
            style={{
              width: '72px',
              height: '72px',
              borderRadius: '50%',
              background: 'var(--color-bg-dark)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '28px',
              marginBottom: '20px',
            }}
          >
            👩‍💻
          </div>
          <h1
            style={{
              fontSize: '32px',
              fontWeight: 700,
              letterSpacing: '-0.03em',
              color: 'var(--color-text-primary)',
              marginBottom: '6px',
            }}
          >
            Lisa
          </h1>
          <p style={{ fontSize: '15px', color: 'var(--color-text-secondary)' }}>
            AI 产品经理 · iCareOld 站长
          </p>
        </div>

        <hr style={{ border: 'none', borderTop: '1px solid var(--color-border)', marginBottom: '40px' }} />

        {/* Bio */}
        <section style={{ marginBottom: '48px' }}>
          <p
            style={{
              fontSize: '17px',
              lineHeight: 1.85,
              color: 'var(--color-text-primary)',
              marginBottom: '20px',
            }}
          >
            浙江大学农学硕士，十余年互联网产品经理经历。
          </p>
          <p
            style={{
              fontSize: '17px',
              lineHeight: 1.85,
              color: 'var(--color-text-primary)',
              marginBottom: '20px',
            }}
          >
            深耕电商、金融、文娱、出行等多个行业，主导交付产品项目数百个。如今专注 AI 落地实践，探索 AI 工具开发与智能化产品设计的边界。
          </p>
          <p
            style={{
              fontSize: '17px',
              lineHeight: 1.85,
              color: 'var(--color-text-primary)',
            }}
          >
            可承接需求分析、企业 AI Agent 搭建等业务。
          </p>
        </section>

        <hr style={{ border: 'none', borderTop: '1px solid var(--color-border)', marginBottom: '40px' }} />

        {/* Contact */}
        <section>
          <h2
            style={{
              fontSize: '18px',
              fontWeight: 600,
              color: 'var(--color-text-primary)',
              marginBottom: '24px',
              letterSpacing: '-0.01em',
            }}
          >
            联系我
          </h2>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              gap: '20px',
            }}
          >
            {/* WeChat ID */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '16px 20px',
                background: 'var(--color-bg-secondary)',
                borderRadius: '12px',
                border: '1px solid var(--color-border)',
                width: '100%',
                boxSizing: 'border-box',
              }}
            >
              <span style={{ fontSize: '22px' }}>💬</span>
              <div>
                <div style={{ fontSize: '13px', color: 'var(--color-text-tertiary)', marginBottom: '2px' }}>
                  微信
                </div>
                <div
                  style={{
                    fontSize: '16px',
                    fontWeight: 600,
                    color: 'var(--color-text-primary)',
                    letterSpacing: '0.02em',
                  }}
                >
                  aicodeu
                </div>
              </div>
            </div>

            {/* QR code — will be shown once image is added to public/ */}
            <div
              style={{
                padding: '24px',
                background: 'var(--color-bg-secondary)',
                borderRadius: '12px',
                border: '1px solid var(--color-border)',
                textAlign: 'center',
                width: '100%',
                boxSizing: 'border-box',
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/wechat-qr.jpg"
                alt="微信二维码"
                style={{
                  width: '180px',
                  height: '180px',
                  borderRadius: '8px',
                  display: 'block',
                  margin: '0 auto 12px',
                }}
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.display = 'none'
                }}
              />
              <p style={{ fontSize: '13px', color: 'var(--color-text-tertiary)', margin: 0 }}>
                扫码添加微信
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer
        style={{
          padding: '40px 24px',
          textAlign: 'center',
          borderTop: '1px solid var(--color-border)',
        }}
      >
        <p style={{ fontSize: '13px', color: 'var(--color-text-tertiary)' }}>
          © 2026–现在 [Lisa] · AI 产品经理个人站点 · 保留所有权利
        </p>
      </footer>
    </>
  )
}
