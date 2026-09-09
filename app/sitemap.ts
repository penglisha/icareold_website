import type { MetadataRoute } from 'next'
import { getBlogPosts } from '@/lib/notion'
import { SITE_URL } from '@/lib/i18n'

export const runtime = 'edge'
// Sitemap freshness doesn't need to be real-time - the underlying Notion
// data (post list/dates) only needs to be re-fetched hourly.
export const revalidate = 3600

// Bilingual static pages - both locales are real, working pages.
const STATIC_PATHS = ['', '/about', '/blog']

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getBlogPosts()
  const entries: MetadataRoute.Sitemap = []

  for (const path of STATIC_PATHS) {
    entries.push({
      url: `${SITE_URL}/zh${path}`,
      lastModified: new Date(),
      alternates: {
        languages: {
          zh: `${SITE_URL}/zh${path}`,
          en: `${SITE_URL}/en${path}`,
        },
      },
    })
    entries.push({
      url: `${SITE_URL}/en${path}`,
      lastModified: new Date(),
    })
  }

  // Blog posts: zh only. None have an English version yet (see
  // hasEnglishVersion in lib/notion.ts) - listing an /en/blog/[slug] URL
  // here before that page actually exists would just hand search engines
  // a 404. TODO: once a specific post gets an English translation, add its
  // `${SITE_URL}/en/blog/${slug}` entry here *and* add
  // `alternates.languages.en` to that post's zh entry below.
  for (const post of posts) {
    entries.push({
      url: `${SITE_URL}/zh/blog/${post.slug}`,
      lastModified: post.date ? new Date(post.date) : new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    })
  }

  return entries
}
