'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import LangSwitch from './LangSwitch'
import type { Dictionary, Locale } from '@/lib/i18n'

type Tab = 'works' | 'blog' | 'about'

// `active="about"`/`active="blog"` are fixed routes, so they're passed in
// directly. On the homepage no `active` prop is given at all - "works" and
// "blog" are just scroll positions on the same page there, so which one
// (if either) is highlighted is derived from which section is currently
// centered in the viewport, the same way a route change would highlight
// "about"/"blog" elsewhere.
//
// Note: `active="blog"` only affects which tab is visually highlighted -
// the "Blog" link itself still points at `/${locale}#blog` (the homepage
// section) everywhere, including on the /blog list page itself. Pointing
// it at the list page instead would be a navigation/IA change, out of
// scope for the SEO work this was added for.
export default function NavBar({
  locale,
  dict,
  active: fixedActive,
}: {
  locale: Locale
  dict: Dictionary['nav']
  active?: 'about' | 'blog'
}) {
  const [scrolled, setScrolled] = useState(false)
  const [scrollActive, setScrollActive] = useState<Tab | null>(null)
  const [menuOpen, setMenuOpen] = useState(false)

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

  const closeMenu = () => setMenuOpen(false)

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
        <Link href={`/${locale}`} className="nav-logo" style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 600,
          color: 'var(--primary)', textDecoration: 'none',
          letterSpacing: '-0.01em',
        }}>
          iCareOld
        </Link>

        <div className="nav-links-desktop">
          <Link href={`/${locale}#projects`} className="nav-link" style={tabStyle('works')}>
            {dict.works}
          </Link>
          <Link href={`/${locale}#blog`} className="nav-link" style={tabStyle('blog')}>
            {dict.blog}
          </Link>
          <Link href={`/${locale}/about`} className="nav-link" style={tabStyle('about')}>
            {dict.about}
          </Link>
          <Link
            href={`/${locale}/about#contact`}
            className="btn-primary"
            style={{ fontSize: '16px', fontWeight: 400, padding: '8px 24px' }}
          >
            {dict.contact}
          </Link>
          <LangSwitch locale={locale} />
        </div>

        <button
          type="button"
          className="nav-mobile-toggle"
          aria-label={menuOpen ? dict.closeMenu : dict.openMenu}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span className="material-symbols-outlined">{menuOpen ? 'close' : 'menu'}</span>
        </button>
      </div>

      <div className={`nav-mobile-menu${menuOpen ? ' open' : ''}`}>
        <Link href={`/${locale}#projects`} className="nav-link" style={tabStyle('works')} onClick={closeMenu}>
          {dict.works}
        </Link>
        <Link href={`/${locale}#blog`} className="nav-link" style={tabStyle('blog')} onClick={closeMenu}>
          {dict.blog}
        </Link>
        <Link href={`/${locale}/about`} className="nav-link" style={tabStyle('about')} onClick={closeMenu}>
          {dict.about}
        </Link>
        <Link href={`/${locale}/about#contact`} className="btn-primary" onClick={closeMenu}>
          {dict.contact}
        </Link>
        <LangSwitch locale={locale} />
      </div>
    </nav>
  )
}
