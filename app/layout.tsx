import type { Metadata } from 'next'
import './globals.css'

export const runtime = 'edge'

export const metadata: Metadata = {
  title: 'iCareOld — AI 学习与工具',
  description: '用 AI 构建有意义的工具，记录真实的学习历程。',
  icons: { icon: '/favicon.ico' },
  openGraph: {
    title: 'iCareOld — AI 学习与工具',
    description: '用 AI 构建有意义的工具，记录真实的学习历程。',
    url: 'https://icareold.com',
    siteName: 'iCareOld',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  )
}
