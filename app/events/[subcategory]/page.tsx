import { Metadata } from 'next'
import CategoryGallery from '@/components/CategoryGallery'
import { Category } from '@/lib/images'

// Make this page dynamic to handle any subcategory
export const dynamic = 'force-dynamic'

interface PageProps {
  params: { subcategory: string }
}

// Generate metadata for each subcategory
export function generateMetadata({ params }: PageProps): Metadata {
  const label = params.subcategory.charAt(0).toUpperCase() + params.subcategory.slice(1)

  return {
    title: `${label} | Events | Martina Visuals`,
    description: `${label} photography by Martina Visuals`,
  }
}

export default function EventSubcategoryPage({ params }: PageProps) {
  const category = `events/${params.subcategory}` as Category

  return <CategoryGallery category={category} />
}
