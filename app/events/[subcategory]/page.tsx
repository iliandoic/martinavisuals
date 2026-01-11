import { Metadata } from 'next'
import CategoryGallery from '@/components/CategoryGallery'
import { Category } from '@/lib/images'

// Make this page dynamic to handle any subcategory
export const dynamic = 'force-dynamic'

interface PageProps {
  params: { subcategory: string }
}

// Strip prefix like "01-" or "1. " from folder name for display
function getDisplayName(folderName: string): string {
  return folderName.replace(/^\d+[-.\s]*/, '')
}

// Generate metadata for each subcategory
export function generateMetadata({ params }: PageProps): Metadata {
  const label = getDisplayName(params.subcategory)

  return {
    title: `${label} | Events | Martina Visuals`,
    description: `${label} photography by Martina Visuals`,
  }
}

export default function EventSubcategoryPage({ params }: PageProps) {
  const category = `events/${params.subcategory}` as Category

  return <CategoryGallery category={category} />
}
