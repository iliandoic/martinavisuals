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
