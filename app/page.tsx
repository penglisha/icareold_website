import type { Metadata } from 'next'
import Link from 'next/link'
import { getProjects, getBlogPosts } from '@/lib/notion'

export const runtime = 'edge'

export const metadata: Metadata = {
  title: 'iCareOld — AI 学习与工具',
  description: '用 AI 构建有意义的工具，记录真实的学习历程。',
}

export default async function HomePage() {
  const [projects, blogPosts] = await Promise.all([getProjects(), getBlogPosts()])

  return (
    <>
      {/* ── NAV ─────────────────────────────────────────── */}
      <nav style={{
        position: 'sticky', top: 0, zIndex: 100,
        height: '56px',
        background: 'rgba(6,6,9,0.75)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        borderBottom: '1px solid var(--bd)',
        display: 'flex', alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 32px',
      }}>
        <Link href="/" style={{
          fontWeight: 700, fontSize: '15px',
          color: 'var(--t1)', textDecoration: 'none',
          letterSpacing: '-0.02em',
          display: 'flex', alignItems: 'center', gap: '8px',
        }}>
          iCareOld
        </Link>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <Link href="#projects" className="nav-link" style={{ padding: '6px 12px' }}>作品集</Link>
          <Link href="#blog"     className="nav-link" style={{ padding: '6px 12px' }}>博客</Link>
          <Link href="/about" style={{
            fontSize: '13px', color: 'var(--t1)', textDecoration: 'none',
            padding: '6px 14px',
            border: '1px solid var(--bd-2)',
            borderRadius: 'var(--r-sm)',
            background: 'rgba(255,255,255,0.04)',
            transition: 'background 0.15s, border-color 0.15s',
            marginLeft: '4px',
          }}>
            关于我
          </Link>
        </div>
      </nav>

      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="hero-scene dot-grid" style={{
        position: 'relative',
        padding: '120px 24px 100px',
        textAlign: 'center',
        overflow: 'hidden',
      }}>
        {/* Bottom fade */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: '120px',
          background: 'linear-gradient(to bottom, transparent, var(--bg))',
          pointerEvents: 'none',
        }} />

        <div style={{ maxWidth: '780px', margin: '0 auto', position: 'relative' }}>

          {/* Status pill */}
          <div className="hero-animate" style={{ marginBottom: '36px', display: 'flex', justifyContent: 'center' }}>
            <div className="status-pill">
              <span className="pulse-dot" />
              <span style={{
                fontFamily: 'var(--mono)', fontSize: '11px',
                color: 'var(--ac-2)', letterSpacing: '0.08em',
              }}>
                BUILDING IN PUBLIC · 2026
              </span>
            </div>
          </div>

          {/* Headline */}
          <h1 className="hero-animate-delay text-gradient" style={{
            fontSize: 'clamp(40px, 7vw, 72px)',
            fontWeight: 800,
            letterSpacing: '-0.05em',
            lineHeight: 1.05,
            marginBottom: '28px',
          }}>
            做能用的 AI 工具，
            <br />
            把构建过程全部记录下来
          </h1>

          {/* Tagline */}
          <div className="hero-animate-delay-2" style={{ marginBottom: '44px' }}>
            <p style={{
              fontFamily: 'var(--mono)',
              fontSize: '13px', color: 'var(--t2)',
              letterSpacing: '0.04em',
              lineHeight: 2,
            }}>
              浙大硕士&nbsp;&nbsp;·&nbsp;&nbsp;十年产品经验&nbsp;&nbsp;·&nbsp;&nbsp;从零学 AI 开发&nbsp;&nbsp;·&nbsp;&nbsp;Building in Public
            </p>
          </div>

          {/* CTAs */}
          <div className="hero-animate-delay-2" style={{
            display: 'flex', gap: '12px',
            justifyContent: 'center', flexWrap: 'wrap',
          }}>
            <a href="#projects" className="btn-glow">查看作品集</a>
            <a href="#blog"     className="btn-ghost">阅读博客 →</a>
          </div>
        </div>
      </section>

      {/* ── STATS ─────────────────────────────────────────── */}
      <div style={{
        borderTop: '1px solid var(--bd)',
        borderBottom: '1px solid var(--bd)',
        background: 'var(--bg-1)',
      }}>
        <div style={{
          maxWidth: '880px', margin: '0 auto',
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
        }}>
          {[
            { n: String(projects.length), label: '已上线工具' },
            { n: String(blogPosts.length), label: '博客文章' },
            { n: '进行中', label: '学习阶段' },
          ].map((s, i) => (
            <div key={i} style={{
              padding: '30px 24px',
              textAlign: 'center',
              borderRight: i < 2 ? '1px solid var(--bd)' : 'none',
            }}>
              <div style={{
                fontFamily: 'var(--mono)',
                fontSize: '30px', fontWeight: 700,
                color: 'var(--t1)', letterSpacing: '-0.04em',
                marginBottom: '6px',
              }}>{s.n}</div>
              <div style={{
                fontFamily: 'var(--mono)',
                fontSize: '10px', color: 'var(--t2)',
                letterSpacing: '0.08em', textTransform: 'uppercase',
              }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── PROJECTS ─────────────────────────────────────────── */}
      <section id="projects" style={{ maxWidth: '960px', margin: '0 auto', padding: '96px 24px' }}>
        <div className="section-label">
          <span className="section-label-text">01 — PROJECTS</span>
          <span className="section-label-line" />
        </div>

        <div style={{ marginBottom: '48px' }}>
          <h2 style={{
            fontSize: '36px', fontWeight: 800,
            letterSpacing: '-0.04em', color: 'var(--t1)',
            marginBottom: '10px', lineHeight: 1.1,
          }}>作品集</h2>
          <p style={{ fontSize: '14px', color: 'var(--t2)' }}>已上线的 AI 工具与项目</p>
        </div>

        {projects.length === 0 ? (
          <div style={{
            padding: '80px 32px', textAlign: 'center',
            border: '1px dashed rgba(124,106,255,0.15)',
            borderRadius: 'var(--r-xl)',
            color: 'var(--t3)',
          }}>
            <div style={{ fontSize: '32px', marginBottom: '12px' }}>🚀</div>
            <p style={{ fontFamily: 'var(--mono)', fontSize: '12px', letterSpacing: '0.06em' }}>
              PROJECTS COMING SOON
            </p>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))',
            gap: '16px',
          }}>
            {projects.map((p) => <ProjectCard key={p.id} project={p} />)}
          </div>
        )}
      </section>

      {/* ── BLOG ─────────────────────────────────────────── */}
      <section id="blog" style={{
        background: 'var(--bg-1)',
        borderTop: '1px solid var(--bd)',
      }}>
        <div style={{ maxWidth: '960px', margin: '0 auto', padding: '96px 24px' }}>
          <div className="section-label">
            <span className="section-label-text">02 — BLOG</span>
            <span className="section-label-line" />
          </div>

          <div style={{ marginBottom: '48px' }}>
            <h2 style={{
              fontSize: '36px', fontWeight: 800,
              letterSpacing: '-0.04em', color: 'var(--t1)',
              marginBottom: '10px', lineHeight: 1.1,
            }}>博客</h2>
            <p style={{ fontSize: '14px', color: 'var(--t2)' }}>学习笔记与项目复盘</p>
          </div>

          {blogPosts.length === 0 ? (
            <div style={{
              padding: '80px 32px', textAlign: 'center',
              border: '1px dashed rgba(124,106,255,0.15)',
              borderRadius: 'var(--r-xl)',
              color: 'var(--t3)',
            }}>
              <div style={{ fontSize: '32px', marginBottom: '12px' }}>✍️</div>
              <p style={{ fontFamily: 'var(--mono)', fontSize: '12px', letterSpacing: '0.06em' }}>
                FIRST POST COMING SOON
              </p>
            </div>
          ) : (
            <div>
              {blogPosts.map((post, i) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="row-hover"
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '40px 1fr 130px',
                    gap: '20px', alignItems: 'center',
                    padding: '22px 16px',
                    borderBottom: '1px solid var(--bd)',
                    textDecoration: 'none', color: 'inherit',
                    borderRadius: 'var(--r)',
                    margin: '0 -16px',
                  }}
                >
                  {/* Index */}
                  <span style={{
                    fontFamily: 'var(--mono)', fontSize: '12px',
                    color: 'var(--t3)', fontWeight: 600,
                    letterSpacing: '0.02em',
                  }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>

                  {/* Title + summary */}
                  <div>
                    <div style={{
                      fontSize: '15px', fontWeight: 600,
                      color: 'var(--t1)', marginBottom: '5px',
                      letterSpacing: '-0.02em',
                      lineHeight: 1.4,
                    }}>
                      {post.title}
                    </div>
                    {post.summary && (
                      <div style={{
                        fontSize: '13px', color: 'var(--t2)',
                        lineHeight: 1.55,
                      }}>
                        {post.summary}
                      </div>
                    )}
                  </div>

                  {/* Meta */}
                  <div style={{
                    display: 'flex', flexDirection: 'column',
                    alignItems: 'flex-end', gap: '8px',
                  }}>
                    <span style={{
                      fontFamily: 'var(--mono)', fontSize: '11px',
                      color: 'var(--t3)',
                    }}>{post.date}</span>
                    <span className={post.status === '已发布' ? 'badge-green' : 'badge-muted'}>
                      {post.status}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── FOOTER ─────────────────────────────────────────── */}
      <footer style={{
        padding: '40px 32px', textAlign: 'center',
        borderTop: '1px solid var(--bd)',
        background: 'var(--bg)',
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

/* ── PROJECT CARD ─────────────────────────────────────────── */
function ProjectCard({ project }: {
  project: { id: string; emoji: string; name: string; description: string; tags: string[]; url: string }
}) {
  return (
    <div className="card-premium" style={{ padding: '28px 28px 24px' }}>
      {/* Emoji */}
      <div style={{
        width: '44px', height: '44px',
        borderRadius: 'var(--r)',
        background: 'var(--ac-dim)',
        border: '1px solid var(--ac-border)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '22px',
        marginBottom: '18px',
      }}>
        {project.emoji || '🚀'}
      </div>

      <h3 style={{
        fontSize: '17px', fontWeight: 700,
        color: 'var(--t1)', marginBottom: '8px',
        letterSpacing: '-0.025em', lineHeight: 1.3,
      }}>
        {project.name}
      </h3>

      <p style={{
        fontSize: '13px', color: 'var(--t2)',
        lineHeight: 1.65, marginBottom: '20px',
      }}>
        {project.description}
      </p>

      {project.tags.length > 0 && (
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '20px' }}>
          {project.tags.map((tag) => (
            <span key={tag} className="tag">{tag}</span>
          ))}
        </div>
      )}

      {project.url && (
        <a
          href={project.url} target="_blank" rel="noopener noreferrer"
          style={{
            fontFamily: 'var(--mono)', fontSize: '12px',
            color: 'var(--ac)', textDecoration: 'none',
            letterSpacing: '0.02em', display: 'inline-flex', alignItems: 'center', gap: '4px',
          }}
        >
          立即体验 →
        </a>
      )}
    </div>
  )
}
