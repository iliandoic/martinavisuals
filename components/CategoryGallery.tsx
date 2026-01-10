'use client'

import { useState, useEffect } from 'react'
import HorizontalGallery from './HorizontalGallery'
import { Category, Photo, Manifest, R2_BASE_URL, manifestToPhotos } from '@/lib/images'

interface CategoryGalleryProps {
  category: Category
}

export default function CategoryGallery({ category }: CategoryGalleryProps) {
  const [photos, setPhotos] = useState<Photo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadPhotos() {
      try {
        const res = await fetch(`${R2_BASE_URL}/manifest.json`)
        if (!res.ok) {
          throw new Error('Failed to load manifest')
        }
        const manifest: Manifest = await res.json()
        const categoryPhotos = manifestToPhotos(manifest, category)
        setPhotos(categoryPhotos)
      } catch (err) {
        setError('Unable to load images. Please try again later.')
        console.error('Failed to fetch manifest:', err)
      } finally {
        setLoading(false)
      }
    }

    loadPhotos()
  }, [category])

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-neutral-500 text-sm">Loading...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-neutral-500 text-sm">{error}</div>
      </div>
    )
  }

  if (photos.length === 0) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-neutral-500 text-sm">No images in this category yet.</div>
      </div>
    )
  }

  return <HorizontalGallery photos={photos} />
}
