import type { Metadata } from 'next'
import Link from 'next/link'
import { getProjects, getBlogPosts } from '@/lib/notion'
import NavBar from './NavBar'
import CloudShader from './CloudShader'

export const runtime = 'edge'

export const metadata: Metadata = {
  title: 'iCareOld — AI 学习与工具',
  description: '用 AI 构建有意义的工具，记录真实的学习历程。',
}

export default async function HomePage() {
  const [projects, blogPosts] = await Promise.all([getProjects(), getBlogPosts()])

  return (
    <>
      <NavBar />

      {/* ── HERO ── */}
      <header style={{
        position: 'relative', overflow: 'hidden',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        padding: '160px 32px 96px', textAlign: 'center',
      }}>
        <CloudShader />

        <div style={{ position: 'relative', zIndex: 10, maxWidth: '820px', margin: '0 auto' }}>
          {/* Eyebrow */}
          <div className="hero-animate" style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            padding: '6px 16px', borderRadius: 'var(--r-pill)',
            background: 'rgba(255,255,255,0.6)', backdropFilter: 'blur(10px)',
            border: '1px solid var(--hairline-strong)',
            marginBottom: '32px', boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
          }}>
            <span className="status-pulse" style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--primary)' }} />
            <span className="eyebrow" style={{ marginBottom: 0 }}>Building in Public · 2026</span>
          </div>

          {/* Headline */}
          <h1 className="hero-animate-delay" style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(36px, 6vw, 64px)',
            fontWeight: 800,
            lineHeight: 1.15,
            letterSpacing: '-0.02em',
            color: 'var(--ink)',
            marginBottom: '24px',
          }}>
            做能用的 AI 工具，
            <br />
            <span style={{
              background: 'linear-gradient(90deg, var(--primary), var(--brand-secure))',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
            }}>
              把构建过程全部记录下来
            </span>
          </h1>

          {/* Subhead */}
          <p className="hero-animate-delay-2" style={{
            fontSize: '18px', fontWeight: 400,
            lineHeight: 1.6, letterSpacing: '0.01em',
            color: 'var(--ink-muted)',
            maxWidth: '640px', margin: '0 auto 48px',
          }}>
            浙大硕士 · 十年 product 经验 · 从零学 AI 开发
            <br />
            探索大模型与实用工具的深度融合，记录从 0 到 1 的每一个技术节点。
          </p>

          {/* CTAs */}
          <div className="hero-animate-delay-3" style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <a href="#projects" className="btn-primary">
              查看作品集
              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>arrow_forward</span>
            </a>
            <a href="#blog" className="btn-secondary">
              阅读博客
              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>description</span>
            </a>
          </div>
        </div>

        {/* Stats Grid */}
        <div style={{
          position: 'relative', zIndex: 10,
          width: '100%', maxWidth: '1200px', margin: '96px auto 0',
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px',
        }}>
          {[
            { value: String(projects.length), label: '已上线工具' },
            { value: String(blogPosts.length), label: '博客文章' },
            { value: '进行中', label: '学习阶段' },
          ].map((s, i) => (
            <div key={i} className="floating-card" style={{
              padding: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center',
            }}>
              <div style={{
                fontFamily: 'var(--font-display)',
                fontSize: '48px', fontWeight: 800,
                letterSpacing: '-0.02em',
                color: 'var(--primary)', marginBottom: '8px',
              }}>
                {s.value}
              </div>
              <div style={{
                fontSize: '13px', fontWeight: 600, letterSpacing: '0.1em',
                color: 'var(--ink-subtle)', textTransform: 'uppercase',
              }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </header>

      {/* ── PROJECTS ── */}
      <section id="projects" style={{ maxWidth: '1200px', margin: '0 auto', padding: 'var(--sp-section) 32px' }}>
        <div style={{
          display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between',
          gap: '16px', marginBottom: '64px',
          borderBottom: '1px solid var(--hairline)', paddingBottom: '32px',
        }}>
          <div>
            <p className="eyebrow" style={{ marginBottom: '16px' }}>Portfolio</p>
            <h2 className="headline" style={{ marginBottom: '8px' }}>已上线的 AI 工具</h2>
            <p style={{ fontSize: '16px', color: 'var(--ink-muted)' }}>从需求到部署，每个工具都有完整记录</p>
          </div>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', fontWeight: 700, color: 'var(--primary)', opacity: 0.6 }}>
            FILTER: ALL_SYSTEMS_ACTIVE
          </span>
        </div>

        {projects.length === 0 ? (
          <div style={{
            padding: '80px 32px', textAlign: 'center',
            border: '1px dashed var(--hairline-strong)', borderRadius: 'var(--r-lg)',
            color: 'var(--ink-tertiary)', fontSize: '14px',
          }}>
            项目即将上线，敬请期待
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
            gap: '24px',
          }}>
            {projects.map((p, i) => <ProjectCard key={p.id} project={p} index={i} />)}
          </div>
        )}
      </section>

      {/* ── BLOG ── */}
      <section id="blog" style={{
        borderTop: '1px solid var(--hairline)',
        borderBottom: '1px solid var(--hairline)',
        background: 'rgba(255,255,255,0.5)',
        backdropFilter: 'blur(10px)',
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: 'var(--sp-section) 32px' }}>
          <div style={{ marginBottom: '64px', textAlign: 'center' }}>
            <p className="eyebrow" style={{ marginBottom: '16px' }}>Engineer&apos;s Log</p>
            <h2 className="headline" style={{ marginBottom: '8px' }}>学习笔记与项目复盘</h2>
            <p style={{ fontSize: '16px', color: 'var(--ink-muted)' }}>记录每一个构建决策和踩坑经历</p>
          </div>

          {blogPosts.length === 0 ? (
            <div style={{
              padding: '80px 32px', textAlign: 'center',
              border: '1px dashed var(--hairline-strong)', borderRadius: 'var(--r-lg)',
              color: 'var(--ink-tertiary)', fontSize: '14px',
            }}>
              第一篇文章正在撰写中
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {blogPosts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
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
        </div>
      </section>

      {/* ── PERSONAL BIO (terminal card) ── */}
      <section style={{ maxWidth: '860px', margin: '0 auto', padding: 'var(--sp-section) 32px' }}>
        <div style={{
          background: '#ffffff', borderRadius: 'var(--r-xl)',
          border: '1px solid var(--hairline-strong)', overflow: 'hidden',
          boxShadow: '0 20px 50px rgba(0,96,172,0.08)',
        }}>
          <div style={{
            background: 'rgba(0,96,172,0.05)', padding: '12px 24px',
            display: 'flex', alignItems: 'center', gap: '8px',
            borderBottom: '1px solid var(--hairline)',
          }}>
            <div style={{ display: 'flex', gap: '6px' }}>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#FF5F56' }} />
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#FFBD2E' }} />
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#27C93F' }} />
            </div>
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--primary)',
              opacity: 0.6, marginLeft: '16px', textTransform: 'uppercase', letterSpacing: '0.2em', fontWeight: 700,
            }}>
              system_identity.exe
            </span>
          </div>
          <div style={{ padding: '40px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
              <span style={{ color: 'var(--primary)', fontWeight: 700 }}>#</span>
              <p style={{ lineHeight: 1.75, color: 'var(--ink-muted)', fontSize: '16px' }}>
                <strong style={{ color: 'var(--ink)' }}>Lisa, AI Product Manager.</strong> Focused on bridging the
                gap between cutting-edge LLM capabilities and practical human needs. Engineering a world where AI
                is not just a chatbot, but a functional extension of our creative and cognitive potential.
              </p>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
              <span style={{ color: 'var(--primary)', fontWeight: 700 }}>#</span>
              <p style={{ lineHeight: 1.75, color: 'var(--ink-muted)', fontSize: '16px' }}>
                <strong style={{ color: 'var(--ink)' }}>Experience:</strong> Zhejiang University Master&apos;s |
                10+ Years Product Strategy &amp; Development.
              </p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ color: 'var(--primary)', fontWeight: 700 }}>_</span>
              <span style={{
                display: 'inline-block', width: '10px', height: '22px',
                background: 'var(--primary)', borderRadius: '2px',
                animation: 'pulse-dot 1.4s ease-in-out infinite',
              }} />
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section style={{ padding: 'var(--sp-section) 32px', textAlign: 'center' }}>
        <div style={{ maxWidth: '640px', margin: '0 auto' }}>
          <h2 className="display-md" style={{ marginBottom: '16px' }}>有想法？聊聊合作</h2>
          <p style={{ fontSize: '17px', color: 'var(--ink-muted)', lineHeight: 1.6, marginBottom: '40px' }}>
            需求分析 · 企业 AI Agent 搭建 · 产品顾问
            <br />
            期待与您共同探索 AI 落地的新场景。
          </p>
          <a
            href="mailto:penglisha456@163.com"
            className="btn-primary"
            style={{ fontSize: '16px', padding: '18px 40px', borderRadius: 'var(--r-lg)' }}
          >
            Let&apos;s Talk
            <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>mail</span>
          </a>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{
        borderTop: '1px solid var(--hairline)',
        padding: '80px 32px',
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
              © 2026–现在 [Lisa] · AI 产品经理个人站点 · 保留所有权利
            </p>
          </div>
          <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap' }}>
            <Link href="/#projects" style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-subtle)', textDecoration: 'none' }}>Works</Link>
            <Link href="/#blog" style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-subtle)', textDecoration: 'none' }}>Blog</Link>
            <Link href="/about" style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-subtle)', textDecoration: 'none' }}>About</Link>
          </div>
        </div>
      </footer>
    </>
  )
}

/* ── PROJECT CARD ── */
function ProjectCard({ project, index }: {
  project: { id: string; emoji: string; image: string; name: string; description: string; tags: string[]; url: string }
  index: number
}) {
  return (
    <div className="floating-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{
        aspectRatio: '16 / 9', width: '100%', borderRadius: 'var(--r-lg)',
        marginBottom: '24px', position: 'relative', overflow: 'hidden',
        background: project.image ? undefined : 'linear-gradient(135deg, rgba(0,96,172,0.12), rgba(96,165,250,0.20))',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <span style={{
          position: 'absolute', top: '12px', left: '12px', zIndex: 1,
          padding: '4px 12px', background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(10px)',
          borderRadius: 'var(--r-sm)', border: '1px solid var(--hairline)',
          fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700, color: 'var(--primary)',
        }}>
          PROJECT_{String(index + 1).padStart(2, '0')}
        </span>
        {project.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={project.image}
            alt={project.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : (
          <span style={{ fontSize: '56px', lineHeight: 1 }}>{project.emoji || '🚀'}</span>
        )}
      </div>

      <h3 className="card-title" style={{ marginBottom: '12px' }}>
        {project.name}
      </h3>
      <p style={{
        fontSize: '14px', color: 'var(--ink-muted)',
        lineHeight: 1.6, marginBottom: '24px', flexGrow: 1,
      }}>
        {project.description}
      </p>
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        paddingTop: '20px', borderTop: '1px solid var(--hairline)',
      }}>
        {project.tags.length > 0 && (
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {project.tags.map((t) => <span key={t} className="tag">{t}</span>)}
          </div>
        )}
        {project.url && (
          <a href={project.url} target="_blank" rel="noopener noreferrer"
            style={{
              fontSize: '13px', fontWeight: 700,
              color: 'var(--primary)', textDecoration: 'none',
              display: 'inline-flex', alignItems: 'center', gap: '4px',
              whiteSpace: 'nowrap',
            }}
          >
            TRY <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>open_in_new</span>
          </a>
        )}
      </div>
    </div>
  )
}
