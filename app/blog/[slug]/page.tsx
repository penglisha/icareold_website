import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getBlogPostBySlug } from '@/lib/notion'
import type { NotionBlock } from '@/lib/notion'
import type { RichTextItemResponse } from '@notionhq/client/build/src/api-endpoints'

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

function richText(texts: RichTextItemResponse[]) {
  return texts.map((t, i) => {
    let content: React.ReactNode = t.plain_text
    if (t.annotations.code) content = <code key={i} style={{ background: '#f5f5f7', padding: '2px 6px', borderRadius: '4px', fontSize: '0.9em', fontFamily: 'monospace' }}>{content}</code>
    if (t.annotations.bold) content = <strong key={i}>{content}</strong>
    if (t.annotations.italic) content = <em key={i}>{content}</em>
    if (t.annotations.strikethrough) content = <s key={i}>{content}</s>
    if (t.href) content = <a key={i} href={t.href} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-blue)', textDecoration: 'none' }}>{content}</a>
    return <span key={i}>{content}</span>
  })
}

function renderBlock(block: NotionBlock) {
  switch (block.type) {
    case 'paragraph':
      return (
        <p style={{ marginBottom: '20px', lineHeight: 1.8, color: 'var(--color-text-primary)' }}>
          {richText(block.paragraph.rich_text)}
        </p>
      )
    case 'heading_1':
      return (
        <h1 style={{ fontSize: '28px', fontWeight: 600, letterSpacing: '-0.02em', margin: '40px 0 16px', color: 'var(--color-text-primary)' }}>
          {richText(block.heading_1.rich_text)}
        </h1>
      )
    case 'heading_2':
      return (
        <h2 style={{ fontSize: '22px', fontWeight: 600, letterSpacing: '-0.01em', margin: '36px 0 12px', color: 'var(--color-text-primary)' }}>
          {richText(block.heading_2.rich_text)}
        </h2>
      )
    case 'heading_3':
      return (
        <h3 style={{ fontSize: '18px', fontWeight: 600, margin: '28px 0 10px', color: 'var(--color-text-primary)' }}>
          {richText(block.heading_3.rich_text)}
        </h3>
      )
    case 'bulleted_list_item':
      return (
        <li style={{ marginBottom: '8px', lineHeight: 1.7, color: 'var(--color-text-primary)', listStyleType: 'disc' }}>
          {richText(block.bulleted_list_item.rich_text)}
        </li>
      )
    case 'numbered_list_item':
      return (
        <li style={{ marginBottom: '8px', lineHeight: 1.7, color: 'var(--color-text-primary)' }}>
          {richText(block.numbered_list_item.rich_text)}
        </li>
      )
    case 'code':
      return (
        <pre
          style={{
            background: 'var(--color-bg-dark)',
            borderRadius: '12px',
            padding: '20px 24px',
            margin: '24px 0',
            overflowX: 'auto',
            fontSize: '14px',
            lineHeight: 1.6,
            color: '#f5f5f7',
            fontFamily: 'monospace',
          }}
        >
          <code>{richText(block.code.rich_text)}</code>
        </pre>
      )
    case 'quote':
      return (
        <blockquote
          style={{
            borderLeft: '3px solid var(--color-blue)',
            paddingLeft: '20px',
            margin: '24px 0',
            color: 'var(--color-text-secondary)',
            fontStyle: 'italic',
            lineHeight: 1.7,
          }}
        >
          {richText(block.quote.rich_text)}
        </blockquote>
      )
    case 'divider':
      return (
        <hr
          style={{
            border: 'none',
            borderTop: '1px solid var(--color-border)',
            margin: '32px 0',
          }}
        />
      )
    case 'image': {
      const src =
        block.image.type === 'external'
          ? block.image.external.url
          : block.image.file.url
      const caption =
        block.image.caption?.length > 0 ? richText(block.image.caption) : null
      return (
        <figure style={{ margin: '28px 0' }}>
          <Image
            src={src}
            alt={caption ? String(block.image.caption[0]?.plain_text) : 'image'}
            width={680}
            height={400}
            style={{ borderRadius: '12px', width: '100%', height: 'auto', objectFit: 'cover' }}
          />
          {caption && (
            <figcaption
              style={{
                textAlign: 'center',
                fontSize: '13px',
                color: 'var(--color-text-tertiary)',
                marginTop: '8px',
              }}
            >
              {caption}
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
      result.push(<ul key={`ul-${i}`} style={{ paddingLeft: '24px', marginBottom: '20px' }}>{items}</ul>)
    } else if (block.type === 'numbered_list_item') {
      const items: React.ReactNode[] = []
      while (i < blocks.length && blocks[i].type === 'numbered_list_item') {
        items.push(<React.Fragment key={blocks[i].id}>{renderBlock(blocks[i])}</React.Fragment>)
        i++
      }
      result.push(<ol key={`ol-${i}`} style={{ paddingLeft: '24px', marginBottom: '20px' }}>{items}</ol>)
    } else {
      result.push(<React.Fragment key={block.id}>{renderBlock(block)}</React.Fragment>)
      i++
    }
  }
  return result
}

import React from 'react'

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = await getBlogPostBySlug(slug)
  if (!post) notFound()

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
          padding: '0 24px',
          gap: '16px',
        }}
      >
        <Link
          href="/#blog"
          style={{ fontSize: '14px', color: 'var(--color-blue)', textDecoration: 'none' }}
        >
          ← 博客
        </Link>
        <span style={{ color: 'var(--color-border)' }}>|</span>
        <Link
          href="/"
          style={{ fontWeight: 600, fontSize: '15px', color: 'var(--color-text-primary)', textDecoration: 'none' }}
        >
          iCareOld
        </Link>
      </nav>

      {/* Article */}
      <article style={{ maxWidth: '680px', margin: '0 auto', padding: '60px 24px 80px' }}>
        {/* Header */}
        <header style={{ marginBottom: '40px' }}>
          {post.tags.length > 0 && (
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontSize: '12px',
                    color: 'var(--color-blue)',
                    background: 'rgba(0,113,227,0.08)',
                    padding: '3px 10px',
                    borderRadius: '100px',
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          <h1
            style={{
              fontSize: 'clamp(28px, 5vw, 40px)',
              fontWeight: 700,
              letterSpacing: '-0.03em',
              lineHeight: 1.15,
              marginBottom: '16px',
              color: 'var(--color-text-primary)',
            }}
          >
            {post.title}
          </h1>
          {post.summary && (
            <p style={{ fontSize: '18px', color: 'var(--color-text-secondary)', lineHeight: 1.6, marginBottom: '20px' }}>
              {post.summary}
            </p>
          )}
          <div style={{ display: 'flex', gap: '16px', fontSize: '13px', color: 'var(--color-text-tertiary)' }}>
            <span>{post.date}</span>
            <span>·</span>
            <span>预计 {post.readTime} 分钟阅读</span>
          </div>
        </header>

        <hr style={{ border: 'none', borderTop: '1px solid var(--color-border)', marginBottom: '40px' }} />

        {/* Content */}
        <div style={{ fontSize: '17px', lineHeight: 1.8 }}>
          {groupListItems(post.blocks)}
        </div>
      </article>

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
