'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface Category {
  slug: string
  label: string
  subcategories?: { slug: string; label: string }[]
}

// Fallback categories in case API fails
const fallbackCategories = [
  { slug: 'editorial', label: 'Editorial' },
  { slug: 'portraits', label: 'Portraits' },
  {
    slug: 'events',
    label: 'Events',
    subcategories: [
      { slug: 'baptism', label: 'Baptism' },
      { slug: 'maternity', label: 'Maternity' },
      { slug: 'family', label: 'Family' },
    ]
  },
  { slug: 'graduation', label: 'Graduation' },
  { slug: 'bts', label: 'BTS' },
]

export default function Sidebar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [expandedMenus, setExpandedMenus] = useState<Set<string>>(new Set())
  const [categories, setCategories] = useState<Category[]>(fallbackCategories)

  const toggleMenu = (slug: string) => {
    setExpandedMenus(prev => {
      const newSet = new Set(prev)
      if (newSet.has(slug)) {
        newSet.delete(slug)
      } else {
        newSet.add(slug)
      }
      return newSet
    })
  }

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch('/api/categories')
        if (res.ok) {
          const data = await res.json()
          if (data.categories && data.categories.length > 0) {
            setCategories(data.categories)
          }
        }
      } catch (err) {
        console.error('Failed to fetch categories:', err)
      }
    }
    fetchCategories()
  }, [])

  const closeMenu = () => setIsOpen(false)

  return (
    <>
      {/* Mobile header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-black border-b border-white/5 px-4 py-3 flex items-center justify-between">
        <Link href="/" onClick={closeMenu} className="flex flex-col">
          <span className="text-lg font-script tracking-widest uppercase">Martina Visuals</span>
          <span className="text-[10px] font-display tracking-[0.3em] uppercase mt-1">Photography</span>
        </Link>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 text-white"
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/80 z-40"
          onClick={closeMenu}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed left-0 top-0 bottom-0 w-64 bg-black z-50 flex flex-col px-8 py-10 border-r border-white/5
        transition-transform duration-300 ease-in-out
        lg:translate-x-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Logo / Name */}
        <Link href="/" className="mb-12 flex flex-col" onClick={closeMenu}>
          <span className="text-lg font-script tracking-widest uppercase">Martina Visuals</span>
          <span className="text-[10px] font-display tracking-[0.3em] uppercase mt-1 text-neutral-400">Photography</span>
        </Link>

        {/* Navigation */}
        <nav className="flex-1">
          <ul className="space-y-3">
            {categories.map((cat) => {
              const href = `/${cat.slug}`
              const isOnThisCategory = pathname.startsWith(href)

              return (
                <li key={cat.slug}>
                  {cat.subcategories ? (
                    // Category with subcategories
                    (() => {
                      const isExpanded = expandedMenus.has(cat.slug) || isOnThisCategory
                      return (
                        <div>
                          <button
                            onClick={() => toggleMenu(cat.slug)}
                            className={`text-xs font-display font-bold tracking-wide transition-colors flex items-center gap-2 ${
                              isOnThisCategory ? 'text-white' : 'text-white hover:text-neutral-400'
                            }`}
                          >
                            {cat.label}
                            <svg
                              className={`w-3 h-3 transition-transform duration-500 ease-out ${isExpanded ? 'rotate-180' : ''}`}
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </button>
                          <div
                            className="overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
                            style={{
                              maxHeight: isExpanded ? `${cat.subcategories.length * 30 + 20}px` : '0px',
                              opacity: isExpanded ? 1 : 0,
                            }}
                          >
                            <ul className="mt-2 ml-3 space-y-2 pt-1">
                              {cat.subcategories.map((sub, index) => {
                                const subHref = `/${cat.slug}/${sub.slug}`
                                return (
                                  <li
                                    key={sub.slug}
                                    className="transition-all duration-500 ease-out"
                                    style={{
                                      transform: isExpanded ? 'translateY(0)' : 'translateY(-8px)',
                                      opacity: isExpanded ? 1 : 0,
                                      transitionDelay: isExpanded ? `${index * 75}ms` : '0ms',
                                    }}
                                  >
                                    <Link
                                      href={subHref}
                                      onClick={closeMenu}
                                      className={`text-xs font-display tracking-wide transition-colors duration-200 ${
                                        pathname === subHref || pathname === subHref + '/' ? 'text-white' : 'text-neutral-400 hover:text-white'
                                      }`}
                                    >
                                      {sub.label}
                                    </Link>
                                  </li>
                                )
                              })}
                            </ul>
                          </div>
                        </div>
                      )
                    })()
                  ) : (
                    // Regular category
                    <Link
                      href={href}
                      onClick={closeMenu}
                      className={`text-xs font-display font-bold tracking-wide transition-colors ${
                        pathname === href || pathname === href + '/' ? 'text-white' : 'text-white hover:text-neutral-400'
                      }`}
                    >
                      {cat.label}
                    </Link>
                  )}
                </li>
              )
            })}
          </ul>

          {/* About / Contact */}
          <div className="mt-8 pt-8 border-t border-white/10">
            <Link
              href="/about/"
              onClick={closeMenu}
              className={`text-xs font-display font-bold tracking-wide transition-colors ${
                pathname === '/about/' ? 'text-white' : 'text-white hover:text-neutral-400'
              }`}
            >
              About / Contact
            </Link>
          </div>
        </nav>

        {/* Footer */}
        <div className="mt-auto">
          {/* Social */}
          <a
            href="https://instagram.com/martinavisuals_"
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-500 hover:text-white transition-colors"
            aria-label="Instagram"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </a>

          {/* Copyright */}
          <p className="text-xs text-neutral-600 mt-6 uppercase tracking-wider">
            &copy; Copyright<br />
            All Rights Reserved
          </p>
        </div>
      </aside>
    </>
  )
}
