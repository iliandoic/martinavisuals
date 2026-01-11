import { Metadata } from 'next'
import CategoryGallery from '@/components/CategoryGallery'
import { Category } from '@/lib/images'

// Make this page dynamic to handle any category/subcategory from R2
export const dynamic = 'force-dynamic'

interface PageProps {
  params: { slug: string[] }
}

// Strip prefix like "01-" or "1. " from folder name for display
function getDisplayName(folderName: string): string {
  return folderName.replace(/^\d+[-.\s]*/, '')
}

// Generate metadata
export function generateMetadata({ params }: PageProps): Metadata {
  const parts = params.slug
  const label = getDisplayName(parts[parts.length - 1])

  if (parts.length === 1) {
    return {
      title: `${label} | Martina Visuals`,
      description: `${label} photography by Martina Visuals`,
    }
  } else {
    const parentLabel = getDisplayName(parts[0])
    return {
      title: `${label} | ${parentLabel} | Martina Visuals`,
      description: `${label} photography by Martina Visuals`,
    }
  }
}

export default function CategoryPage({ params }: PageProps) {
  // Join the slug parts to create the category path (e.g., "events/baptism" or just "portraits")
  const category = params.slug.join('/') as Category

  return <CategoryGallery category={category} />
}
