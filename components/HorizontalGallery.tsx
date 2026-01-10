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

export default function HorizontalGallery({ photos }: HorizontalGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState(-1)
  const scrollRef = useRef<HTMLDivElement>(null)

  // Horizontal scroll with mouse wheel
  useEffect(() => {
    const el = scrollRef.current
    if (!el) return

    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault()
        el.scrollLeft += e.deltaY
      }
    }

    el.addEventListener('wheel', handleWheel, { passive: false })
    return () => el.removeEventListener('wheel', handleWheel)
  }, [])

  const lightboxSlides = photos.map((photo) => ({
    src: photo.src,
    alt: photo.alt,
  }))

  return (
    <>
      <div
        ref={scrollRef}
        className="h-screen overflow-x-auto overflow-y-hidden flex items-center gap-4 px-4 scroll-smooth"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <style jsx>{`
          div::-webkit-scrollbar {
            display: none;
          }
        `}</style>

        {photos.map((photo, index) => (
          <div
            key={index}
            className="flex-shrink-0 h-[85vh] relative cursor-pointer group"
            onClick={() => setLightboxIndex(index)}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              width={photo.width}
              height={photo.height}
              className="h-full w-auto object-contain transition-all duration-500 ease-in-out group-hover:opacity-60 group-hover:brightness-75"
              priority={index < 3}
            />
          </div>
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
        render={{
          slide: ({ slide }) => (
            <div className="flex items-center justify-center h-full">
              <div className="relative bg-white" style={{ padding: '50px' }}>
                <img
                  src={slide.src}
                  alt={slide.alt || ''}
                  className="max-h-[80vh] max-w-[80vw] object-contain"
                />
              </div>
            </div>
          ),
        }}
        carousel={{
          finite: false,
          preload: 2,
        }}
      />
    </>
  )
}
