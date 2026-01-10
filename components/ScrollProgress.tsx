'use client'

import { useState, useEffect, useCallback } from 'react'
import { usePathname } from 'next/navigation'

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0)
  const pathname = usePathname()

  const setupScrollListener = useCallback(() => {
    const gallery = document.querySelector('[data-scroll-container]')

    const handleScroll = () => {
      if (gallery) {
        // Horizontal scroll progress (desktop gallery)
        const scrollLeft = gallery.scrollLeft
        const scrollWidth = gallery.scrollWidth - gallery.clientWidth
        const scrollProgress = scrollWidth > 0 ? (scrollLeft / scrollWidth) * 100 : 0
        setProgress(scrollProgress)
      } else {
        // Vertical scroll progress (fallback)
        const scrollTop = window.scrollY
        const docHeight = document.documentElement.scrollHeight - window.innerHeight
        const scrollProgress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0
        setProgress(scrollProgress)
      }
    }

    // Listen to window scroll
    window.addEventListener('scroll', handleScroll, { passive: true })

    // Listen for horizontal scroll on gallery
    if (gallery) {
      gallery.addEventListener('scroll', handleScroll, { passive: true })
    }

    // Initial check
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (gallery) {
        gallery.removeEventListener('scroll', handleScroll)
      }
    }
  }, [])

  useEffect(() => {
    // Reset progress on page change
    setProgress(0)

    let cleanup: (() => void) | undefined

    // Small delay to let the page render
    const timeout = setTimeout(() => {
      cleanup = setupScrollListener()
    }, 100)

    return () => {
      clearTimeout(timeout)
      cleanup?.()
    }
  }, [pathname, setupScrollListener])

  return (
    <div className="hidden lg:block fixed top-0 left-64 right-0 h-[3px] z-[60] bg-neutral-800">
      <div
        className="h-full bg-neutral-400"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}
