export const R2_BASE_URL = 'https://pub-1600d09c709b4e389d3bb0a876a3906d.r2.dev'

export type Category = 'portraits' | 'editorial' | 'events' | 'graduation' | 'bts' | 'events/baptism' | 'events/maternity' | 'events/family'

export interface Photo {
  src: string
  width: number
  height: number
  alt: string
  title?: string
  category: Category
}

export interface Manifest {
  updated: string
  images: {
    [key in Category]?: {
      filename: string
      width: number
      height: number
    }[]
  }
}

export const categories: { slug: Category; label: string }[] = [
  { slug: 'portraits', label: 'Portraits' },
  { slug: 'editorial', label: 'Editorial' },
  { slug: 'events', label: 'Events' },
  { slug: 'events/baptism', label: 'Baptism' },
  { slug: 'events/maternity', label: 'Maternity' },
  { slug: 'events/family', label: 'Family' },
  { slug: 'graduation', label: 'Graduation' },
  { slug: 'bts', label: 'BTS' },
]

export function manifestToPhotos(manifest: Manifest, category: Category): Photo[] {
  const images = manifest.images[category] || []
  return images.map((img) => ({
    src: `${R2_BASE_URL}/${category}/${img.filename}`,
    width: img.width,
    height: img.height,
    alt: img.filename.replace(/\.[^.]+$/, '').replace(/[-_]/g, ' '),
    category,
  }))
}

export async function fetchManifest(): Promise<Manifest | null> {
  try {
    const res = await fetch(`${R2_BASE_URL}/manifest.json`, {
      next: { revalidate: 60 }, // Revalidate every 60 seconds
    })
    if (!res.ok) return null
    return res.json()
  } catch {
    return null
  }
}
