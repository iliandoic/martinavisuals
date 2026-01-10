'use client'

import { useState, useRef, useEffect } from 'react'
import Lightbox from 'yet-another-react-lightbox'
import Zoom from 'yet-another-react-lightbox/plugins/zoom'
import 'yet-another-react-lightbox/styles.css'

import { Photo } from '@/lib/images'

interface HorizontalGalleryProps {
  photos: Photo[]
}

function GalleryImage({ photo, index, onClick }: { photo: Photo; index: number; onClick: () => void }) {
  const [loaded, setLoaded] = useState(false)

  return (
    <div
      className="flex-shrink-0 h-[85vh] relative cursor-pointer group"
      onClick={onClick}
    >
      {/* Skeleton placeholder */}
      <div
        className={`absolute inset-0 bg-neutral-900 transition-opacity duration-500 ${loaded ? 'opacity-0' : 'opacity-100 animate-pulse'}`}
        style={{
          width: `${(photo.width / photo.height) * 85}vh`,
          height: '85vh'
        }}
      />

      <img
        src={photo.src}
        alt={photo.alt}
        loading={index < 2 ? 'eager' : 'lazy'}
        onLoad={() => setLoaded(true)}
        className={`h-full w-auto object-contain transition-all duration-700 ease-out group-hover:opacity-60 group-hover:brightness-75 ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  )
}

export default function HorizontalGallery({ photos }: HorizontalGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState(-1)
  const scrollRef = useRef<HTMLDivElement>(null)

  // Horizontal scroll with mouse wheel and smooth momentum
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
      <div
        ref={scrollRef}
        className="h-screen overflow-x-auto overflow-y-hidden flex items-center gap-4 px-4"
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
        styles={{
          container: { backgroundColor: 'rgba(0, 0, 0, 0.5)' },
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
