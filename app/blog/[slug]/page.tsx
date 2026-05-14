import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
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
          fontFamily: 'var(--mono)', fontSize: '13px',
          background: 'var(--bg-2)', border: '1px solid var(--bd)',
          padding: '1px 5px', borderRadius: 'var(--r-xs)', color: 'var(--ac-2)',
        }}>
          {content}
        </code>
      )
    if (t.annotations?.bold)          content = <strong key={i}>{content}</strong>
    if (t.annotations?.italic)        content = <em key={i}>{content}</em>
    if (t.annotations?.strikethrough) content = <s key={i}>{content}</s>
    if (t.href)
      content = (
        <a key={i} href={t.href} target="_blank" rel="noopener noreferrer"
          style={{
            color: 'var(--ac)', textDecoration: 'none',
            borderBottom: '1px solid var(--ac-border)', transition: 'border-color 0.15s',
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
        <p style={{ marginBottom: '22px', lineHeight: 1.85, color: 'var(--t2)', fontSize: '16px' }}>
          {richText(b.paragraph?.rich_text)}
        </p>
      )
    case 'heading_1':
      return (
        <h1 style={{
          fontSize: '26px', fontWeight: 700, letterSpacing: '-0.03em',
          margin: '48px 0 16px', color: 'var(--t1)',
        }}>
          {richText(b.heading_1?.rich_text)}
        </h1>
      )
    case 'heading_2':
      return (
        <h2 style={{
          fontSize: '20px', fontWeight: 600, letterSpacing: '-0.02em',
          margin: '40px 0 12px', color: 'var(--t1)',
        }}>
          {richText(b.heading_2?.rich_text)}
        </h2>
      )
    case 'heading_3':
      return (
        <h3 style={{
          fontSize: '16px', fontWeight: 600,
          margin: '28px 0 10px', color: 'var(--t1)',
        }}>
          {richText(b.heading_3?.rich_text)}
        </h3>
      )
    case 'bulleted_list_item':
      return (
        <li style={{ marginBottom: '6px', lineHeight: 1.78, color: 'var(--t2)', listStyleType: 'disc', fontSize: '15px' }}>
          {richText(b.bulleted_list_item?.rich_text)}
        </li>
      )
    case 'numbered_list_item':
      return (
        <li style={{ marginBottom: '6px', lineHeight: 1.78, color: 'var(--t2)', fontSize: '15px' }}>
          {richText(b.numbered_list_item?.rich_text)}
        </li>
      )
    case 'code':
      return (
        <pre style={{
          background: 'var(--bg-1)', border: '1px solid var(--bd)',
          borderRadius: 'var(--r)', padding: '20px 24px', margin: '24px 0',
          overflowX: 'auto', fontFamily: 'var(--mono)',
          fontSize: '13px', lineHeight: 1.65, color: 'var(--t2)',
        }}>
          <code>{richText(b.code?.rich_text)}</code>
        </pre>
      )
    case 'quote':
      return (
        <blockquote style={{
          borderLeft: '2px solid var(--ac)',
          paddingLeft: '20px', margin: '28px 0',
          color: 'var(--t2)', fontStyle: 'italic', lineHeight: 1.75,
        }}>
          {richText(b.quote?.rich_text)}
        </blockquote>
      )
    case 'divider':
      return <hr style={{ border: 'none', borderTop: '1px solid var(--bd)', margin: '40px 0' }} />
    case 'image': {
      const src = b.image?.type === 'external' ? b.image.external?.url : b.image?.file?.url
      if (!src) return null
      const captionTexts: RichTextItem[] = b.image?.caption ?? []
      const captionStr = captionTexts.map((t) => t.plain_text).join('')
      return (
        <figure style={{ margin: '32px 0' }}>
          <Image
            src={src} alt={captionStr || 'image'}
            width={680} height={400}
            style={{
              borderRadius: 'var(--r-lg)', width: '100%', height: 'auto',
              objectFit: 'cover', border: '1px solid var(--bd)',
            }}
          />
          {captionStr && (
            <figcaption style={{
              textAlign: 'center',
              fontFamily: 'var(--mono)', fontSize: '11px',
              color: 'var(--t3)', marginTop: '10px', letterSpacing: '0.04em',
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
      {/* NAV */}
      <nav style={{
        position: 'sticky', top: 0, zIndex: 100, height: '56px',
        background: 'rgba(6,6,9,0.75)',
        backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)',
        borderBottom: '1px solid var(--bd)',
        display: 'flex', alignItems: 'center',
        padding: '0 32px', gap: '16px',
      }}>
        <Link href="/#blog" style={{
          fontFamily: 'var(--mono)', fontSize: '12px',
          color: 'var(--ac)', textDecoration: 'none',
          letterSpacing: '0.04em', display: 'flex', alignItems: 'center', gap: '6px',
        }}>
          ← 博客
        </Link>
        <span style={{ color: 'var(--bd-2)' }}>|</span>
        <Link href="/" style={{
          fontWeight: 700, fontSize: '14px',
          color: 'var(--t1)', textDecoration: 'none',
          letterSpacing: '-0.02em',
        }}>
          iCareOld
        </Link>
      </nav>

      {/* ARTICLE */}
      <article style={{ maxWidth: '680px', margin: '0 auto', padding: '72px 24px 96px' }}>

        {/* Header */}
        <header style={{ marginBottom: '48px' }}>
          {post.tags.length > 0 && (
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '20px' }}>
              {post.tags.map((tag) => (
                <span key={tag} style={{
                  fontFamily: 'var(--mono)', fontSize: '10px',
                  color: 'var(--ac)', background: 'var(--ac-dim)',
                  border: '1px solid var(--ac-border)',
                  padding: '3px 9px', borderRadius: 'var(--r-xs)',
                  letterSpacing: '0.06em', textTransform: 'uppercase',
                }}>
                  {tag}
                </span>
              ))}
            </div>
          )}

          <h1 className="text-gradient" style={{
            fontSize: 'clamp(28px, 5vw, 44px)',
            fontWeight: 800, letterSpacing: '-0.04em',
            lineHeight: 1.12, marginBottom: '18px',
          }}>
            {post.title}
          </h1>

          {post.summary && (
            <p style={{
              fontSize: '17px', color: 'var(--t2)',
              lineHeight: 1.7, marginBottom: '24px',
            }}>
              {post.summary}
            </p>
          )}

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{
              fontFamily: 'var(--mono)', fontSize: '11px',
              color: 'var(--t3)', letterSpacing: '0.04em',
            }}>
              {post.date}
            </span>
          </div>
        </header>

        {/* Divider */}
        <hr style={{ border: 'none', borderTop: '1px solid var(--bd)', marginBottom: '48px' }} />

        {/* Body */}
        <div>{groupListItems(post.blocks)}</div>
      </article>

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
