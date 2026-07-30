import type { Metadata } from 'next'
import NavBar from '../NavBar'

export const runtime = 'edge'

export const metadata: Metadata = {
  title: '关于我 — iCareOld',
  description: '浙江大学农学硕士，十余年互联网产品经理经历，专注 AI 落地实践。',
}

export default function AboutPage() {
  return (
    <>
      <NavBar active="about" />

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
            AI 产品经理 · iCareOld 站长
          </p>
        </div>

        <hr style={{ border: 'none', borderTop: '1px solid var(--hairline)', marginBottom: '48px' }} />

        {/* Bio */}
        <section style={{ marginBottom: '64px' }}>
          <p className="eyebrow" style={{ marginBottom: '20px' }}>关于</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <p style={{ fontSize: '17px', lineHeight: 1.75, color: 'var(--ink-muted)', letterSpacing: '-0.005em' }}>
              浙江大学农学硕士，十余年互联网产品经理经历。
            </p>
            <p style={{ fontSize: '17px', lineHeight: 1.75, color: 'var(--ink-muted)', letterSpacing: '-0.005em' }}>
              深耕电商、金融、文娱、出行等多个行业，主导交付产品项目数百个。如今专注 AI 落地实践，探索 AI 工具开发与智能化产品设计的边界。
            </p>
            <p style={{ fontSize: '17px', lineHeight: 1.75, color: 'var(--ink-muted)', letterSpacing: '-0.005em' }}>
              可承接需求分析、企业 AI Agent 搭建等业务。
            </p>
          </div>
        </section>

        <hr style={{ border: 'none', borderTop: '1px solid var(--hairline)', marginBottom: '48px' }} />

        {/* Contact */}
        <section>
          <p className="eyebrow" style={{ marginBottom: '20px' }}>联系我</p>

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
                  微信 WeChat
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
                    邮件 Email
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
                alt="微信二维码"
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
                扫码添加微信
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* ── FOOTER ── */}
      <footer style={{
        borderTop: '1px solid var(--hairline)',
        padding: '40px 32px',
        background: 'var(--canvas)',
        textAlign: 'center',
      }}>
        <p style={{ fontSize: '12px', color: 'var(--ink-tertiary)' }}>
          © 2026–现在 [Lisa] · AI 产品经理个人站点 · 保留所有权利
        </p>
      </footer>
    </>
  )
}
