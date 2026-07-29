'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

type Tab = 'works' | 'blog' | 'about'

// `active="about"` is a fixed route, so it's passed in directly. On the
// homepage no `active` prop is given at all - "works" and "blog" are just
// scroll positions on the same page, so which one (if either) is
// highlighted is derived from which section is currently centered in the
// viewport, the same way a route change would highlight "about".
export default function NavBar({ active: fixedActive }: { active?: 'about' }) {
  const [scrolled, setScrolled] = useState(false)
  const [scrollActive, setScrollActive] = useState<Tab | null>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (fixedActive) return

    const sections: [Tab, HTMLElement | null][] = [
      ['works', document.getElementById('projects')],
      ['blog', document.getElementById('blog')],
    ]
    const targets = sections.filter((s): s is [Tab, HTMLElement] => s[1] !== null)
    if (targets.length === 0) return

    const idToTab = new Map(targets.map(([tab, el]) => [el, tab]))
    const observer = new IntersectionObserver(
      (entries) => {
        const hit = entries.find((e) => e.isIntersecting)
        if (hit) setScrollActive(idToTab.get(hit.target as HTMLElement) ?? null)
      },
      { rootMargin: '-50% 0px -50% 0px', threshold: 0 }
    )
    targets.forEach(([, el]) => observer.observe(el))
    return () => observer.disconnect()
  }, [fixedActive])

  const active: Tab | null = fixedActive ?? scrollActive

  const tabStyle = (tab: Tab) =>
    active === tab
      ? { color: 'var(--primary)', borderBottom: '2px solid var(--primary)', paddingBottom: '4px' }
      : undefined

  return (
    <nav
      style={{
        position: 'sticky', top: 0, zIndex: 100,
        background: 'rgba(255,255,255,0.70)',
        backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid var(--hairline)',
        boxShadow: scrolled ? '0 20px 40px rgba(0,0,0,0.08)' : 'none',
        transition: 'box-shadow 0.25s ease',
      }}
    >
      <div style={{
        maxWidth: '1200px', margin: '0 auto',
        padding: scrolled ? '12px 40px' : '16px 40px',
        transition: 'padding 0.25s ease',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <Link href="/" style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 600, fontSize: '32px',
          color: 'var(--primary)', textDecoration: 'none',
          letterSpacing: '-0.01em',
        }}>
          iCareOld
        </Link>

        <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
          <Link href="/#projects" className="nav-link" style={tabStyle('works')}>
            Works
          </Link>
          <Link href="/#blog" className="nav-link" style={tabStyle('blog')}>
            Blog
          </Link>
          <Link href="/about" className="nav-link" style={tabStyle('about')}>
            About
          </Link>
          <Link
            href="/about"
            className="btn-primary"
            style={{ fontSize: '16px', fontWeight: 400, padding: '8px 24px' }}
          >
            Contact Me
          </Link>
        </div>
      </div>
    </nav>
  )
}
