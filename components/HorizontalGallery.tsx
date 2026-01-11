'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import Lightbox from 'yet-another-react-lightbox'
import Zoom from 'yet-another-react-lightbox/plugins/zoom'
import 'yet-another-react-lightbox/styles.css'

import { Photo } from '@/lib/images'

interface HorizontalGalleryProps {
  photos: Photo[]
}

function GalleryImage({
  photo,
  index,
  onClick,
  onLoad,
  isReady
}: {
  photo: Photo
  index: number
  onClick: () => void
  onLoad: () => void
  isReady: boolean
}) {
  const [error, setError] = useState(false)

  return (
    <div
      className={`flex-shrink-0 w-full lg:w-auto lg:h-[85vh] relative cursor-pointer group transition-all duration-700 ease-out ${
        isReady ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: isReady ? `${Math.min(index * 100, 500)}ms` : '0ms' }}
      onClick={onClick}
    >
      {error ? (
        <img
          src={photo.src}
          alt={photo.alt}
          className="w-full lg:w-auto lg:h-full object-contain lg:transition-all lg:duration-500 lg:ease-out lg:group-hover:opacity-60 lg:group-hover:brightness-75"
          onLoad={onLoad}
        />
      ) : (
        <Image
          src={photo.src}
          alt={photo.alt}
          width={photo.width}
          height={photo.height}
          priority={index < 6}
          className="w-full lg:w-auto lg:h-full object-contain lg:transition-all lg:duration-500 lg:ease-out lg:group-hover:opacity-60 lg:group-hover:brightness-75"
          sizes="(max-width: 1024px) 100vw, 85vh"
          onLoad={onLoad}
          onError={() => setError(true)}
        />
      )}
    </div>
  )
}

export default function HorizontalGallery({ photos }: HorizontalGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState(-1)
  const [loadedCount, setLoadedCount] = useState(0)
  const scrollRef = useRef<HTMLDivElement>(null)

  const isReady = loadedCount >= 1

  // Reset when photos change + timeout fallback
  useEffect(() => {
    setLoadedCount(0)

    // Fallback timeout to prevent infinite loading
    const timeout = setTimeout(() => {
      setLoadedCount((prev) => Math.max(prev, 1))
    }, 5000)

    // Handle tab visibility change
    const handleVisibility = () => {
      if (document.visibilityState === 'visible') {
        setLoadedCount((prev) => Math.max(prev, 1))
      }
    }
    document.addEventListener('visibilitychange', handleVisibility)

    return () => {
      clearTimeout(timeout)
      document.removeEventListener('visibilitychange', handleVisibility)
    }
  }, [photos])

  const handleImageLoad = () => {
    setLoadedCount((prev) => prev + 1)
  }

  // Horizontal scroll with mouse wheel and smooth momentum (desktop only)
  useEffect(() => {
    const el = scrollRef.current
    if (!el) return

    let targetScroll = el.scrollLeft
    let currentScroll = el.scrollLeft
    let rafId: number | null = null

    const smoothScroll = () => {
      const diff = targetScroll - currentScroll
      if (Math.abs(diff) > 0.1) {
        currentScroll += diff * 0.08
        el.scrollLeft = currentScroll
        rafId = requestAnimationFrame(smoothScroll)
      } else {
        currentScroll = targetScroll
        el.scrollLeft = targetScroll
        rafId = null
      }
    }

    const handleWheel = (e: WheelEvent) => {
      // Only apply horizontal scroll on desktop (lg breakpoint = 1024px)
      if (window.innerWidth < 1024) return

      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault()
        targetScroll += e.deltaY * 8
        // Clamp to scroll bounds
        targetScroll = Math.max(0, Math.min(targetScroll, el.scrollWidth - el.clientWidth))
        if (!rafId) {
          currentScroll = el.scrollLeft
          smoothScroll()
        }
      }
    }

    el.addEventListener('wheel', handleWheel, { passive: false })
    return () => {
      el.removeEventListener('wheel', handleWheel)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])

  // Keyboard navigation (left/right arrows)
  useEffect(() => {
    const el = scrollRef.current
    if (!el) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex >= 0) return // Don't scroll when lightbox is open
      if (e.key === 'ArrowRight') {
        el.scrollBy({ left: 400, behavior: 'smooth' })
      } else if (e.key === 'ArrowLeft') {
        el.scrollBy({ left: -400, behavior: 'smooth' })
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [lightboxIndex])

  const lightboxSlides = photos.map((photo) => ({
    src: photo.src,
    alt: photo.alt,
  }))

  return (
    <>
      {/* Loading spinner */}
      {!isReady && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black lg:ml-64">
          <div className="flex flex-col items-center gap-4">
            <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
            <p className="text-sm text-neutral-500 tracking-wider uppercase">Loading</p>
          </div>
        </div>
      )}

      <div
        ref={scrollRef}
        data-scroll-container
        className="min-h-[calc(100vh-56px)] lg:h-screen overflow-y-auto lg:overflow-y-hidden lg:overflow-x-auto flex flex-col lg:flex-row lg:items-center gap-4 p-4 lg:px-4 lg:py-0"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <style jsx>{`
          div::-webkit-scrollbar {
            display: none;
          }
        `}</style>

        {photos.map((photo, index) => (
          <GalleryImage
            key={index}
            photo={photo}
            index={index}
            onClick={() => setLightboxIndex(index)}
            onLoad={handleImageLoad}
            isReady={isReady}
          />
        ))}

        {/* End spacer */}
        <div className="flex-shrink-0 w-16" />
      </div>

      <Lightbox
        slides={lightboxSlides}
        open={lightboxIndex >= 0}
        index={lightboxIndex}
        close={() => setLightboxIndex(-1)}
        plugins={[Zoom]}
        zoom={{ maxZoomPixelRatio: 3 }}
        controller={{ closeOnBackdropClick: true }}
        animation={{ fade: 300, swipe: 500 }}
        styles={{
          container: { backgroundColor: 'rgba(0, 0, 0, 0.9)' },
          slide: {
            padding: '40px',
          },
        }}
        carousel={{
          finite: false,
          preload: 2,
        }}
      />
    </>
  )
}
