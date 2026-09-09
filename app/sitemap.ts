import type { MetadataRoute } from 'next'
import { getBlogPosts } from '@/lib/notion'
import { locales } from '@/lib/i18n'

export const runtime = 'edge'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getBlogPosts()

  const homeUrls = locales.map((locale) => ({
    url: `https://icareold.com/${locale}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 1,
  }))

  const blogUrls = locales.flatMap((locale) =>
    posts.map((post) => ({
      url: `https://icareold.com/${locale}/blog/${post.slug}`,
      lastModified: post.date ? new Date(post.date) : new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))
  )

  return [...homeUrls, ...blogUrls]
}
