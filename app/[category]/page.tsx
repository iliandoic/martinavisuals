import { Metadata } from 'next'
import CategoryGallery from '@/components/CategoryGallery'
import { Category } from '@/lib/images'

// Make this page dynamic to handle any category from R2
export const dynamic = 'force-dynamic'

interface PageProps {
  params: { category: string }
}

// Generate metadata for each category
export function generateMetadata({ params }: PageProps): Metadata {
  const label = params.category.charAt(0).toUpperCase() + params.category.slice(1)

  return {
    title: `${label} | Martina Visuals`,
    description: `${label} photography by Martina Visuals`,
  }
}

export default function CategoryPage({ params }: PageProps) {
  return <CategoryGallery category={params.category as Category} />
}
