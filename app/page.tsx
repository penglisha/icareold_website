import type { Metadata } from 'next'
import Link from 'next/link'
import { getProjects, getBlogPosts } from '@/lib/notion'

export const metadata: Metadata = {
  title: 'iCareOld — AI 学习与工具',
  description: '用 AI 构建有意义的工具，记录真实的学习历程。',
}

export default async function HomePage() {
  const [projects, blogPosts] = await Promise.all([getProjects(), getBlogPosts()])

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
            href="#projects"
            style={{ fontSize: '14px', color: 'var(--color-text-secondary)', textDecoration: 'none' }}
          >
            作品集
          </Link>
          <Link
            href="#blog"
            style={{ fontSize: '14px', color: 'var(--color-text-secondary)', textDecoration: 'none' }}
          >
            博客
          </Link>
          <a
            href="mailto:hamiltonhgz@gmail.com"
            style={{ fontSize: '14px', color: 'var(--color-blue)', textDecoration: 'none' }}
          >
            联系我
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section
        style={{
          background: 'var(--color-bg-primary)',
          padding: '80px 24px 60px',
          textAlign: 'center',
        }}
      >
        <div className="hero-animate" style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h1
            style={{
              fontSize: 'clamp(36px, 6vw, 56px)',
              fontWeight: 600,
              letterSpacing: '-0.03em',
              color: 'var(--color-text-primary)',
              lineHeight: 1.1,
              marginBottom: '20px',
            }}
          >
            用 AI，关爱每一个老人
          </h1>
          <p
            style={{
              fontSize: '19px',
              color: 'var(--color-text-secondary)',
              maxWidth: '560px',
              margin: '0 auto 32px',
              lineHeight: 1.6,
            }}
          >
            记录真实的 AI 学习历程，构建有意义的工具。
            <br />
            从零开始，一步一步。
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a
              href="#projects"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '12px 24px',
                background: 'var(--color-blue)',
                color: '#fff',
                borderRadius: 'var(--radius-pill)',
                fontSize: '15px',
                fontWeight: 500,
                textDecoration: 'none',
              }}
            >
              查看作品集
            </a>
            <a
              href="#blog"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '12px 24px',
                color: 'var(--color-blue)',
                fontSize: '15px',
                fontWeight: 500,
                textDecoration: 'none',
              }}
            >
              阅读博客 ›
            </a>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <div
        style={{
          background: 'var(--color-bg-secondary)',
          borderTop: '1px solid var(--color-border)',
          borderBottom: '1px solid var(--color-border)',
          padding: '32px 24px',
        }}
      >
        <div
          style={{
            maxWidth: '960px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '24px',
            textAlign: 'center',
          }}
        >
          <div>
            <div
              style={{
                fontSize: '36px',
                fontWeight: 600,
                color: 'var(--color-text-primary)',
                letterSpacing: '-0.02em',
              }}
            >
              {projects.length}
            </div>
            <div style={{ fontSize: '13px', color: 'var(--color-text-secondary)', marginTop: '4px' }}>
              已上线工具
            </div>
          </div>
          <div>
            <div
              style={{
                fontSize: '36px',
                fontWeight: 600,
                color: 'var(--color-text-primary)',
                letterSpacing: '-0.02em',
              }}
            >
              {blogPosts.length}
            </div>
            <div style={{ fontSize: '13px', color: 'var(--color-text-secondary)', marginTop: '4px' }}>
              博客文章
            </div>
          </div>
          <div>
            <div
              style={{
                fontSize: '36px',
                fontWeight: 600,
                color: 'var(--color-text-primary)',
                letterSpacing: '-0.02em',
              }}
            >
              进行中
            </div>
            <div style={{ fontSize: '13px', color: 'var(--color-text-secondary)', marginTop: '4px' }}>
              学习阶段
            </div>
          </div>
        </div>
      </div>

      {/* Projects */}
      <section id="projects" style={{ maxWidth: '960px', margin: '0 auto', padding: '80px 24px' }}>
        <h2
          style={{
            fontSize: '28px',
            fontWeight: 600,
            letterSpacing: '-0.02em',
            marginBottom: '8px',
          }}
        >
          作品集
        </h2>
        <p style={{ color: 'var(--color-text-secondary)', marginBottom: '40px', fontSize: '15px' }}>
          已上线的 AI 工具与项目
        </p>

        {projects.length === 0 ? (
          <p style={{ color: 'var(--color-text-tertiary)', textAlign: 'center', padding: '60px 0' }}>
            项目即将上线，敬请期待 ✨
          </p>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(420px, 1fr))',
              gap: '20px',
            }}
          >
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </section>

      {/* Blog */}
      <section
        id="blog"
        style={{
          background: 'var(--color-bg-secondary)',
          borderTop: '1px solid var(--color-border)',
        }}
      >
        <div style={{ maxWidth: '960px', margin: '0 auto', padding: '80px 24px' }}>
          <h2
            style={{
              fontSize: '28px',
              fontWeight: 600,
              letterSpacing: '-0.02em',
              marginBottom: '8px',
            }}
          >
            博客
          </h2>
          <p
            style={{ color: 'var(--color-text-secondary)', marginBottom: '40px', fontSize: '15px' }}
          >
            学习笔记与项目复盘
          </p>

          {blogPosts.length === 0 ? (
            <p
              style={{ color: 'var(--color-text-tertiary)', textAlign: 'center', padding: '60px 0' }}
            >
              第一篇文章正在撰写中 ✍️
            </p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {blogPosts.map((post, index) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '40px 1fr auto',
                    gap: '16px',
                    alignItems: 'center',
                    padding: '20px 0',
                    borderBottom: '1px solid var(--color-border)',
                    textDecoration: 'none',
                    color: 'inherit',
                  }}
                >
                  <span
                    style={{ fontSize: '13px', color: 'var(--color-text-tertiary)', fontWeight: 500 }}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <div style={{ fontSize: '16px', fontWeight: 500, marginBottom: '4px' }}>
                      {post.title}
                    </div>
                    {post.summary && (
                      <div
                        style={{
                          fontSize: '13px',
                          color: 'var(--color-text-secondary)',
                          lineHeight: 1.5,
                        }}
                      >
                        {post.summary}
                      </div>
                    )}
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'flex-end',
                      gap: '6px',
                      minWidth: '120px',
                    }}
                  >
                    <span style={{ fontSize: '12px', color: 'var(--color-text-tertiary)' }}>
                      {post.date}
                    </span>
                    <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                      <span style={{ fontSize: '12px', color: 'var(--color-text-tertiary)' }}>
                        {post.readTime} 分钟
                      </span>
                      <span
                        style={{
                          fontSize: '11px',
                          padding: '2px 8px',
                          borderRadius: '100px',
                          background:
                            post.status === '已发布'
                              ? 'rgba(52,199,89,0.12)'
                              : 'rgba(142,142,147,0.12)',
                          color: post.status === '已发布' ? '#34c759' : '#8e8e93',
                          fontWeight: 500,
                        }}
                      >
                        {post.status}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer
        style={{
          padding: '40px 24px',
          textAlign: 'center',
          borderTop: '1px solid var(--color-border)',
        }}
      >
        <p style={{ fontSize: '13px', color: 'var(--color-text-tertiary)' }}>
          © 2024 iCareOld · 用 AI 关爱每一个老人
        </p>
      </footer>
    </>
  )
}

function ProjectCard({ project }: { project: { id: string; emoji: string; name: string; description: string; tags: string[]; url: string } }) {
  return (
    <div
      style={{
        background: 'var(--color-bg-dark)',
        borderRadius: 'var(--radius-card)',
        padding: '32px',
      }}
    >
      <div style={{ fontSize: '36px', marginBottom: '16px' }}>{project.emoji || '🚀'}</div>
      <h3
        style={{
          fontSize: '20px',
          fontWeight: 600,
          color: '#f5f5f7',
          marginBottom: '10px',
          letterSpacing: '-0.01em',
        }}
      >
        {project.name}
      </h3>
      <p
        style={{ fontSize: '14px', color: '#86868b', lineHeight: 1.6, marginBottom: '20px' }}
      >
        {project.description}
      </p>
      {project.tags.length > 0 && (
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '20px' }}>
          {project.tags.map((tag) => (
            <span
              key={tag}
              style={{
                fontSize: '12px',
                color: '#86868b',
                background: 'rgba(255,255,255,0.08)',
                padding: '3px 10px',
                borderRadius: '100px',
                border: '1px solid rgba(255,255,255,0.1)',
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      )}
      {project.url && (
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontSize: '14px',
            color: 'var(--color-blue)',
            textDecoration: 'none',
            fontWeight: 500,
          }}
        >
          立即体验 ›
        </a>
      )}
    </div>
  )
}
