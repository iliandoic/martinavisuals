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
  onClick
}: {
  photo: Photo
  index: number
  onClick: () => void
}) {
  return (
    <div
      className="flex-shrink-0 w-full lg:w-auto lg:h-[85vh] relative cursor-pointer group"
      onClick={onClick}
    >
      <Image
        src={photo.src}
        alt={photo.alt}
        width={photo.width}
        height={photo.height}
        priority={index < 2}
        placeholder="blur"
        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMCwsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAn/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBEQCEAwEPwAB/9k="
        className="w-full lg:w-auto lg:h-full object-contain transition-all duration-500 ease-out group-hover:opacity-60 group-hover:brightness-75"
        sizes="(max-width: 1024px) 100vw, 85vh"
      />
    </div>
  )
}

export default function HorizontalGallery({ photos }: HorizontalGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState(-1)
  const scrollRef = useRef<HTMLDivElement>(null)

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
      <div
        ref={scrollRef}
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
