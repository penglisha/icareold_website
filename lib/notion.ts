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

export interface NotionBlock {
  id: string
  type: string
  [key: string]: unknown
}

// ─── helpers ────────────────────────────────────────────────────────────────

function richTextToString(arr: Array<{ plain_text: string }>): string {
  return arr?.map((t) => t.plain_text).join('') ?? ''
}

function notionFetch(path: string, body: unknown): Promise<Response> {
  const token = process.env.NOTION_TOKEN
  return fetch(`https://api.notion.com/v1${path}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Notion-Version': '2022-06-28',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
    next: { revalidate: 3600 },
  } as RequestInit)
}

function notionFetchGet(path: string): Promise<Response> {
  const token = process.env.NOTION_TOKEN
  return fetch(`https://api.notion.com/v1${path}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Notion-Version': '2022-06-28',
    },
    next: { revalidate: 3600 },
  } as RequestInit)
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function prop(page: any, name: string) {
  return page?.properties?.[name]
}

// ─── exports ─────────────────────────────────────────────────────────────────

export async function getProjects(): Promise<Project[]> {
  const dbId = process.env.NOTION_PROJECTS_DB
  if (!dbId) return []

  try {
    const res = await notionFetch(`/databases/${dbId}/query`, {
      filter: { property: 'Status', select: { equals: '已上线' } },
      sorts: [{ property: 'Order', direction: 'ascending' }],
    })

    if (!res.ok) {
      console.error('Notion projects error:', await res.text())
      return []
    }

    const data = await res.json()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return data.results.map((page: any) => ({
      id: page.id,
      name: richTextToString(prop(page, 'Name')?.title ?? []),
      description: richTextToString(prop(page, 'Description')?.rich_text ?? []),
      tags: (prop(page, 'Tags')?.multi_select ?? []).map((t: { name: string }) => t.name),
      url: prop(page, 'URL')?.url ?? '',
      emoji: richTextToString(prop(page, 'Emoji')?.rich_text ?? []) || '🚀',
      status: prop(page, 'Status')?.select?.name ?? '',
      order: prop(page, 'Order')?.number ?? 999,
    }))
  } catch (err) {
    console.error('Failed to fetch projects:', err)
    return []
  }
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  const dbId = process.env.NOTION_BLOG_DB
  if (!dbId) return []

  try {
    const res = await notionFetch(`/databases/${dbId}/query`, {
      filter: { property: 'Status', select: { equals: '已发布' } },
      sorts: [{ property: 'Date', direction: 'descending' }],
    })

    if (!res.ok) {
      console.error('Notion blog error:', await res.text())
      return []
    }

    const data = await res.json()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return data.results.map((page: any) => ({
      id: page.id,
      title: richTextToString(prop(page, 'Title')?.title ?? []),
      summary: richTextToString(prop(page, 'Summary')?.rich_text ?? []),
      date: prop(page, 'Date')?.date?.start ?? '',
      tags: (prop(page, 'Tags')?.multi_select ?? []).map((t: { name: string }) => t.name),
      status: prop(page, 'Status')?.select?.name ?? '',
      readTime: prop(page, 'ReadTime')?.number ?? 5,
      slug: richTextToString(prop(page, 'Slug')?.rich_text ?? []),
    }))
  } catch (err) {
    console.error('Failed to fetch blog posts:', err)
    return []
  }
}

export async function getBlogPostBySlug(
  slug: string
): Promise<(BlogPost & { blocks: NotionBlock[] }) | null> {
  const dbId = process.env.NOTION_BLOG_DB
  if (!dbId) return null

  try {
    const res = await notionFetch(`/databases/${dbId}/query`, {
      filter: {
        and: [
          { property: 'Slug', rich_text: { equals: slug } },
          { property: 'Status', select: { equals: '已发布' } },
        ],
      },
    })

    if (!res.ok) return null
    const data = await res.json()
    const page = data.results[0]
    if (!page) return null

    const blocksRes = await notionFetchGet(`/blocks/${page.id}/children`)
    if (!blocksRes.ok) return null
    const blocksData = await blocksRes.json()

    return {
      id: page.id,
      title: richTextToString(prop(page, 'Title')?.title ?? []),
      summary: richTextToString(prop(page, 'Summary')?.rich_text ?? []),
      date: prop(page, 'Date')?.date?.start ?? '',
      tags: (prop(page, 'Tags')?.multi_select ?? []).map((t: { name: string }) => t.name),
      status: prop(page, 'Status')?.select?.name ?? '',
      readTime: prop(page, 'ReadTime')?.number ?? 5,
      slug: richTextToString(prop(page, 'Slug')?.rich_text ?? []),
      blocks: blocksData.results ?? [],
    }
  } catch (err) {
    console.error('Failed to fetch blog post by slug:', err)
    return null
  }
}
