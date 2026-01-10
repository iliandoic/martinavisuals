import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import CategoryGallery from '@/components/CategoryGallery'
import { categories, Category } from '@/lib/images'

interface PageProps {
  params: { category: string }
}

// Generate static paths for all categories
export function generateStaticParams() {
  return categories.map((cat) => ({
    category: cat.slug,
  }))
}

// Generate metadata for each category
export function generateMetadata({ params }: PageProps): Metadata {
  const category = categories.find((c) => c.slug === params.category)

  if (!category) {
    return { title: 'Not Found' }
  }

  return {
    title: `${category.label} | Martina Visuals`,
    description: `${category.label} photography by Martina Visuals`,
  }
}

export default function CategoryPage({ params }: PageProps) {
  const validSlugs = categories.map((c) => c.slug)

  if (!validSlugs.includes(params.category as Category)) {
    notFound()
  }

  return <CategoryGallery category={params.category as Category} />
}
