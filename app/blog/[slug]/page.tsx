import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getBlogPostBySlug } from '@/lib/notion'
import type { NotionBlock } from '@/lib/notion'

export const runtime = 'edge'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getBlogPostBySlug(slug)
  if (!post) return { title: '文章不存在' }
  return {
    title: `${post.title} — iCareOld`,
    description: post.summary,
  }
}

/* ── Rich text ──────────────────────────────────────────── */
interface RichTextItem {
  plain_text: string
  href?: string | null
  annotations?: {
    bold?: boolean
    italic?: boolean
    strikethrough?: boolean
    code?: boolean
  }
}

function richText(texts: RichTextItem[]) {
  if (!texts?.length) return null
  return texts.map((t, i) => {
    let content: React.ReactNode = t.plain_text
    if (t.annotations?.code)
      content = (
        <code key={i} style={{
          fontFamily: 'var(--font-mono)', fontSize: '13px',
          background: 'var(--surface-2)', border: '1px solid var(--hairline)',
          padding: '1px 5px', borderRadius: 'var(--r-xs)', color: 'var(--primary)',
        }}>
          {content}
        </code>
      )
    if (t.annotations?.bold)          content = <strong key={i} style={{ color: 'var(--ink)', fontWeight: 600 }}>{content}</strong>
    if (t.annotations?.italic)        content = <em key={i}>{content}</em>
    if (t.annotations?.strikethrough) content = <s key={i}>{content}</s>
    if (t.href)
      content = (
        <a key={i} href={t.href} target="_blank" rel="noopener noreferrer"
          style={{
            color: 'var(--primary)', textDecoration: 'none',
            borderBottom: '1px solid rgba(0,96,172,0.30)',
            transition: 'border-color 0.15s',
          }}
        >
          {content}
        </a>
      )
    return <span key={i}>{content}</span>
  })
}

/* ── Block renderer ──────────────────────────────────────── */
function renderBlock(block: NotionBlock) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const b = block as any
  switch (block.type) {
    case 'paragraph':
      return (
        <p style={{
          marginBottom: '22px', lineHeight: 1.75,
          color: 'var(--ink-muted)', fontSize: '16px', letterSpacing: '-0.003em',
        }}>
          {richText(b.paragraph?.rich_text)}
        </p>
      )
    case 'heading_1':
      return (
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: '26px', fontWeight: 600, letterSpacing: '-0.03em',
          margin: '48px 0 16px', color: 'var(--ink)',
        }}>
          {richText(b.heading_1?.rich_text)}
        </h1>
      )
    case 'heading_2':
      return (
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: '20px', fontWeight: 600, letterSpacing: '-0.02em',
          margin: '40px 0 12px', color: 'var(--ink)',
        }}>
          {richText(b.heading_2?.rich_text)}
        </h2>
      )
    case 'heading_3':
      return (
        <h3 style={{
          fontFamily: 'var(--font-display)',
          fontSize: '16px', fontWeight: 600,
          margin: '28px 0 10px', color: 'var(--ink)',
        }}>
          {richText(b.heading_3?.rich_text)}
        </h3>
      )
    case 'bulleted_list_item':
      return (
        <li style={{
          marginBottom: '6px', lineHeight: 1.75,
          color: 'var(--ink-muted)', listStyleType: 'disc', fontSize: '15px',
        }}>
          {richText(b.bulleted_list_item?.rich_text)}
        </li>
      )
    case 'numbered_list_item':
      return (
        <li style={{
          marginBottom: '6px', lineHeight: 1.75,
          color: 'var(--ink-muted)', fontSize: '15px',
        }}>
          {richText(b.numbered_list_item?.rich_text)}
        </li>
      )
    case 'code':
      return (
        <pre style={{
          background: 'var(--surface-1)', border: '1px solid var(--hairline)',
          borderRadius: 'var(--r-lg)', padding: '20px 24px', margin: '24px 0',
          overflowX: 'auto', fontFamily: 'var(--font-mono)',
          fontSize: '13px', lineHeight: 1.65, color: 'var(--ink-muted)',
        }}>
          <code>{richText(b.code?.rich_text)}</code>
        </pre>
      )
    case 'quote':
      return (
        <blockquote style={{
          borderLeft: '2px solid var(--primary)',
          paddingLeft: '20px', margin: '28px 0',
          color: 'var(--ink-muted)', fontStyle: 'italic', lineHeight: 1.75,
        }}>
          {richText(b.quote?.rich_text)}
        </blockquote>
      )
    case 'divider':
      return <hr style={{ border: 'none', borderTop: '1px solid var(--hairline)', margin: '40px 0' }} />
    case 'image': {
      const src = b.image?.type === 'external' ? b.image.external?.url : b.image?.file?.url
      if (!src) return null
      const captionTexts: RichTextItem[] = b.image?.caption ?? []
      const captionStr = captionTexts.map((t) => t.plain_text).join('')
      return (
        <figure style={{ margin: '32px 0' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src} alt={captionStr || 'image'}
            style={{
              borderRadius: 'var(--r-xl)', width: '100%', height: 'auto',
              display: 'block', border: '1px solid var(--hairline)',
            }}
          />
          {captionStr && (
            <figcaption style={{
              textAlign: 'center',
              fontFamily: 'var(--font-mono)', fontSize: '12px',
              color: 'var(--ink-tertiary)', marginTop: '10px', letterSpacing: '0.02em',
            }}>
              {captionStr}
            </figcaption>
          )}
        </figure>
      )
    }
    default:
      return null
  }
}

function groupListItems(blocks: NotionBlock[]) {
  const result: React.ReactNode[] = []
  let i = 0
  while (i < blocks.length) {
    const block = blocks[i]
    if (block.type === 'bulleted_list_item') {
      const items: React.ReactNode[] = []
      while (i < blocks.length && blocks[i].type === 'bulleted_list_item') {
        items.push(<React.Fragment key={blocks[i].id}>{renderBlock(blocks[i])}</React.Fragment>)
        i++
      }
      result.push(<ul key={`ul-${i}`} style={{ paddingLeft: '22px', marginBottom: '22px' }}>{items}</ul>)
    } else if (block.type === 'numbered_list_item') {
      const items: React.ReactNode[] = []
      while (i < blocks.length && blocks[i].type === 'numbered_list_item') {
        items.push(<React.Fragment key={blocks[i].id}>{renderBlock(blocks[i])}</React.Fragment>)
        i++
      }
      result.push(<ol key={`ol-${i}`} style={{ paddingLeft: '22px', marginBottom: '22px' }}>{items}</ol>)
    } else {
      result.push(<React.Fragment key={block.id}>{renderBlock(block)}</React.Fragment>)
      i++
    }
  }
  return result
}

/* ── Page ──────────────────────────────────────────────── */
export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = await getBlogPostBySlug(slug)
  if (!post) notFound()

  return (
    <>
      {/* ── NAV ── */}
      <nav style={{
        position: 'sticky', top: 0, zIndex: 100, height: '64px',
        background: 'rgba(255,255,255,0.70)',
        backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid var(--hairline)',
        display: 'flex', alignItems: 'center',
        padding: '0 32px', gap: '12px',
      }}>
        <Link href="/#blog" style={{
          fontSize: '14px', fontWeight: 500,
          color: 'var(--primary)', textDecoration: 'none',
          display: 'flex', alignItems: 'center', gap: '6px',
        }}>
          ← 博客
        </Link>
        <span style={{ color: 'var(--hairline-strong)', fontSize: '18px', lineHeight: 1 }}>|</span>
        <Link href="/" style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 700, fontSize: '15px',
          color: 'var(--primary)', textDecoration: 'none',
          letterSpacing: '-0.01em',
        }}>
          iCareOld
        </Link>
      </nav>

      {/* ── ARTICLE ── */}
      <article style={{ maxWidth: '720px', margin: '0 auto', padding: 'var(--sp-article-top) 32px var(--sp-article-bottom)' }}>

        {/* Header */}
        <header style={{ marginBottom: '48px' }}>
          {post.tags.length > 0 && (
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '20px' }}>
              {post.tags.map((tag) => (
                <span key={tag} className="tag-accent">{tag}</span>
              ))}
            </div>
          )}
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(28px, 5vw, 44px)',
            fontWeight: 600, letterSpacing: '-0.035em', lineHeight: 1.1,
            color: 'var(--ink)', marginBottom: '16px',
          }}>
            {post.title}
          </h1>
          {post.summary && (
            <p style={{
              fontSize: '18px', color: 'var(--ink-muted)',
              lineHeight: 1.55, letterSpacing: '-0.006em', marginBottom: '20px',
            }}>
              {post.summary}
            </p>
          )}
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '12px', color: 'var(--ink-tertiary)', letterSpacing: '0.02em',
          }}>
            {post.date}
          </span>
        </header>

        <hr style={{ border: 'none', borderTop: '1px solid var(--hairline)', marginBottom: '48px' }} />

        {/* Body */}
        <div style={{ fontSize: '16px', lineHeight: 1.75 }}>
          {groupListItems(post.blocks)}
        </div>
      </article>

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
