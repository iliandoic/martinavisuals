'use client'

import { useState } from 'react'
import { RowsPhotoAlbum } from 'react-photo-album'
import 'react-photo-album/rows.css'

import Lightbox from 'yet-another-react-lightbox'
import Zoom from 'yet-another-react-lightbox/plugins/zoom'
import Slideshow from 'yet-another-react-lightbox/plugins/slideshow'
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails'
import Fullscreen from 'yet-another-react-lightbox/plugins/fullscreen'
import 'yet-another-react-lightbox/styles.css'
import 'yet-another-react-lightbox/plugins/thumbnails.css'

import { photos, Photo } from '@/lib/images'

export default function MasonryGallery() {
  const [index, setIndex] = useState(-1)

  // Transform photos for react-photo-album
  const albumPhotos = photos.map((photo) => ({
    src: photo.src,
    width: photo.width,
    height: photo.height,
    alt: photo.alt,
  }))

  // Transform photos for lightbox
  const lightboxSlides = photos.map((photo) => ({
    src: photo.src,
    alt: photo.alt,
    title: photo.title,
  }))

  return (
    <>
      <RowsPhotoAlbum
        photos={albumPhotos}
        targetRowHeight={300}
        rowConstraints={{ maxPhotos: 4 }}
        onClick={({ index }) => setIndex(index)}
        componentsProps={{
          container: {
            style: { cursor: 'pointer' },
          },
          image: {
            loading: 'lazy',
            style: {
              transition: 'transform 0.3s ease, opacity 0.3s ease',
            },
          },
        }}
      />

      <Lightbox
        slides={lightboxSlides}
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        plugins={[Zoom, Slideshow, Thumbnails, Fullscreen]}
        slideshow={{ delay: 3000 }}
        zoom={{ maxZoomPixelRatio: 3 }}
        thumbnails={{ position: 'bottom', width: 100, height: 60 }}
        styles={{
          container: { backgroundColor: 'rgba(0, 0, 0, 0.95)' },
        }}
        carousel={{
          finite: false,
          preload: 2,
        }}
      />
    </>
  )
}
