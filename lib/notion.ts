import { Client } from '@notionhq/client'
import type {
  BlockObjectResponse,
  PageObjectResponse,
  RichTextItemResponse,
} from '@notionhq/client/build/src/api-endpoints'

export interface Project {
  id: string
  name: string
  description: string
  tags: string[]
  url: string
  emoji: string
  status: string
  order: number
}

export interface BlogPost {
  id: string
  title: string
  summary: string
  date: string
  tags: string[]
  status: string
  readTime: number
  slug: string
}

export type NotionBlock = BlockObjectResponse

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
  fetch: globalThis.fetch,
})

function richTextToString(richText: RichTextItemResponse[]): string {
  return richText.map((t) => t.plain_text).join('')
}

function getProperty(page: PageObjectResponse, name: string) {
  return page.properties[name]
}

export async function getProjects(): Promise<Project[]> {
  const dbId = process.env.NOTION_PROJECTS_DB
  if (!dbId) return []

  try {
    const response = await notion.databases.query({
      database_id: dbId,
      filter: {
        property: 'Status',
        select: { equals: '已上线' },
      },
      sorts: [{ property: 'Order', direction: 'ascending' }],
    })

    return response.results
      .filter((p): p is PageObjectResponse => p.object === 'page' && 'properties' in p)
      .map((page) => {
        const nameProp = getProperty(page, 'Name')
        const descProp = getProperty(page, 'Description')
        const tagsProp = getProperty(page, 'Tags')
        const urlProp = getProperty(page, 'URL')
        const emojiProp = getProperty(page, 'Emoji')
        const statusProp = getProperty(page, 'Status')
        const orderProp = getProperty(page, 'Order')

        return {
          id: page.id,
          name: nameProp?.type === 'title' ? richTextToString(nameProp.title) : '',
          description: descProp?.type === 'rich_text' ? richTextToString(descProp.rich_text) : '',
          tags: tagsProp?.type === 'multi_select' ? tagsProp.multi_select.map((t) => t.name) : [],
          url: urlProp?.type === 'url' ? (urlProp.url ?? '') : '',
          emoji: emojiProp?.type === 'rich_text' ? richTextToString(emojiProp.rich_text) : '🚀',
          status: statusProp?.type === 'select' ? (statusProp.select?.name ?? '') : '',
          order: orderProp?.type === 'number' ? (orderProp.number ?? 999) : 999,
        }
      })
  } catch (error) {
    console.error('Failed to fetch projects:', error)
    return []
  }
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  const dbId = process.env.NOTION_BLOG_DB
  if (!dbId) return []

  try {
    const response = await notion.databases.query({
      database_id: dbId,
      filter: {
        property: 'Status',
        select: { equals: '已发布' },
      },
      sorts: [{ property: 'Date', direction: 'descending' }],
    })

    return response.results
      .filter((p): p is PageObjectResponse => p.object === 'page' && 'properties' in p)
      .map((page) => {
        const titleProp = getProperty(page, 'Title')
        const summaryProp = getProperty(page, 'Summary')
        const dateProp = getProperty(page, 'Date')
        const tagsProp = getProperty(page, 'Tags')
        const statusProp = getProperty(page, 'Status')
        const readTimeProp = getProperty(page, 'ReadTime')
        const slugProp = getProperty(page, 'Slug')

        return {
          id: page.id,
          title: titleProp?.type === 'title' ? richTextToString(titleProp.title) : '',
          summary: summaryProp?.type === 'rich_text' ? richTextToString(summaryProp.rich_text) : '',
          date: dateProp?.type === 'date' ? (dateProp.date?.start ?? '') : '',
          tags: tagsProp?.type === 'multi_select' ? tagsProp.multi_select.map((t) => t.name) : [],
          status: statusProp?.type === 'select' ? (statusProp.select?.name ?? '') : '',
          readTime: readTimeProp?.type === 'number' ? (readTimeProp.number ?? 5) : 5,
          slug: slugProp?.type === 'rich_text' ? richTextToString(slugProp.rich_text) : '',
        }
      })
  } catch (error) {
    console.error('Failed to fetch blog posts:', error)
    return []
  }
}

export async function getBlogPostBySlug(
  slug: string
): Promise<(BlogPost & { blocks: NotionBlock[] }) | null> {
  const dbId = process.env.NOTION_BLOG_DB
  if (!dbId) return null

  try {
    const response = await notion.databases.query({
      database_id: dbId,
      filter: {
        and: [
          { property: 'Slug', rich_text: { equals: slug } },
          { property: 'Status', select: { equals: '已发布' } },
        ],
      },
    })

    const page = response.results.find(
      (p): p is PageObjectResponse => p.object === 'page' && 'properties' in p
    )
    if (!page) return null

    const titleProp = getProperty(page, 'Title')
    const summaryProp = getProperty(page, 'Summary')
    const dateProp = getProperty(page, 'Date')
    const tagsProp = getProperty(page, 'Tags')
    const statusProp = getProperty(page, 'Status')
    const readTimeProp = getProperty(page, 'ReadTime')
    const slugProp = getProperty(page, 'Slug')

    const blocksResponse = await notion.blocks.children.list({ block_id: page.id })
    const blocks = blocksResponse.results.filter(
      (b): b is BlockObjectResponse => b.object === 'block'
    )

    return {
      id: page.id,
      title: titleProp?.type === 'title' ? richTextToString(titleProp.title) : '',
      summary: summaryProp?.type === 'rich_text' ? richTextToString(summaryProp.rich_text) : '',
      date: dateProp?.type === 'date' ? (dateProp.date?.start ?? '') : '',
      tags: tagsProp?.type === 'multi_select' ? tagsProp.multi_select.map((t) => t.name) : [],
      status: statusProp?.type === 'select' ? (statusProp.select?.name ?? '') : '',
      readTime: readTimeProp?.type === 'number' ? (readTimeProp.number ?? 5) : 5,
      slug: slugProp?.type === 'rich_text' ? richTextToString(slugProp.rich_text) : '',
      blocks,
    }
  } catch (error) {
    console.error('Failed to fetch blog post by slug:', error)
    return null
  }
}
