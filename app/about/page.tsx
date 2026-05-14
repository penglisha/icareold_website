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
      {/* NAV */}
      <nav style={{
        position: 'sticky', top: 0, zIndex: 100, height: '56px',
        background: 'rgba(6,6,9,0.75)',
        backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)',
        borderBottom: '1px solid var(--bd)',
        display: 'flex', alignItems: 'center',
        justifyContent: 'space-between', padding: '0 32px',
      }}>
        <Link href="/" style={{
          fontWeight: 700, fontSize: '15px',
          color: 'var(--t1)', textDecoration: 'none',
          letterSpacing: '-0.02em',
        }}>
          iCareOld
        </Link>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <Link href="/#projects" className="nav-link" style={{ padding: '6px 12px' }}>作品集</Link>
          <Link href="/#blog"     className="nav-link" style={{ padding: '6px 12px' }}>博客</Link>
          <Link href="/about" style={{
            fontSize: '13px', fontWeight: 500,
            color: 'var(--ac-2)', textDecoration: 'none',
            padding: '6px 14px',
            border: '1px solid var(--ac-border)',
            borderRadius: 'var(--r-sm)',
            background: 'var(--ac-dim)',
            marginLeft: '4px',
          }}>
            关于我
          </Link>
        </div>
      </nav>

      {/* MAIN */}
      <main style={{ maxWidth: '680px', margin: '0 auto', padding: '80px 24px 100px' }}>

        {/* ── Profile card ── */}
        <div className="card-premium" style={{ padding: '40px', marginBottom: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '28px' }}>
            {/* Avatar */}
            <div style={{
              width: '64px', height: '64px', borderRadius: '50%',
              background: 'var(--ac-dim)', border: '1px solid var(--ac-border)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '28px', flexShrink: 0,
              boxShadow: '0 0 24px rgba(124,106,255,0.15)',
            }}>
              👩‍💻
            </div>
            <div>
              <h1 style={{
                fontSize: '28px', fontWeight: 800,
                letterSpacing: '-0.04em', color: 'var(--t1)',
                marginBottom: '4px',
              }}>
                Lisa
              </h1>
              <p style={{
                fontFamily: 'var(--mono)', fontSize: '11px',
                color: 'var(--t2)', letterSpacing: '0.06em',
              }}>
                AI 产品经理 · iCareOld 站长
              </p>
            </div>
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid var(--bd)', marginBottom: '28px' }} />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <p style={{ fontSize: '15px', lineHeight: 1.85, color: 'var(--t2)' }}>
              浙江大学农学硕士，十余年互联网产品经理经历。
            </p>
            <p style={{ fontSize: '15px', lineHeight: 1.85, color: 'var(--t2)' }}>
              深耕电商、金融、文娱、出行等多个行业，主导交付产品项目数百个。如今专注 AI 落地实践，探索 AI 工具开发与智能化产品设计的边界。
            </p>
            <p style={{ fontSize: '15px', lineHeight: 1.85, color: 'var(--t2)' }}>
              可承接需求分析、企业 AI Agent 搭建等业务。
            </p>
          </div>
        </div>

        {/* ── Contact ── */}
        <div>
          <div className="section-label" style={{ marginBottom: '20px' }}>
            <span className="section-label-text">CONTACT</span>
            <span className="section-label-line" />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>

            {/* WeChat row */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: '16px',
              padding: '18px 24px',
              background: 'var(--bg-1)',
              border: '1px solid var(--bd)',
              borderRadius: 'var(--r-lg)',
            }}>
              <div style={{
                width: '36px', height: '36px',
                borderRadius: 'var(--r-sm)',
                background: 'rgba(7,193,96,0.12)',
                border: '1px solid rgba(7,193,96,0.22)',
                display: 'flex', alignItems: 'center',
                justifyContent: 'center', fontSize: '18px',
                flexShrink: 0,
              }}>
                💬
              </div>
              <div>
                <div style={{
                  fontFamily: 'var(--mono)', fontSize: '10px',
                  color: 'var(--t3)', letterSpacing: '0.08em',
                  textTransform: 'uppercase', marginBottom: '4px',
                }}>
                  微信 WeChat
                </div>
                <div style={{
                  fontFamily: 'var(--mono)', fontSize: '16px',
                  fontWeight: 700, color: 'var(--t1)',
                  letterSpacing: '0.04em',
                }}>
                  aicodeu
                </div>
              </div>
            </div>

            {/* QR code */}
            <div style={{
              padding: '32px 24px',
              background: 'var(--bg-1)',
              border: '1px solid var(--bd)',
              borderRadius: 'var(--r-lg)',
              textAlign: 'center',
            }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/wechat-qr.jpg"
                alt="微信二维码"
                style={{
                  width: '180px', height: '180px',
                  borderRadius: 'var(--r)',
                  display: 'block', margin: '0 auto 16px',
                  border: '1px solid var(--bd-2)',
                }}
              />
              <p style={{
                fontFamily: 'var(--mono)', fontSize: '11px',
                color: 'var(--t3)', letterSpacing: '0.08em',
              }}>
                扫码添加微信
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer style={{
        padding: '40px 32px', textAlign: 'center',
        borderTop: '1px solid var(--bd)', background: 'var(--bg)',
      }}>
        <p style={{
          fontFamily: 'var(--mono)', fontSize: '11px',
          color: 'var(--t3)', letterSpacing: '0.06em',
        }}>
          © 2026–现在 [Lisa] · AI 产品经理个人站点 · 保留所有权利
        </p>
      </footer>
    </>
  )
}
