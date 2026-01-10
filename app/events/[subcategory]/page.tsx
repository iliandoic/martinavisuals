import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import CategoryGallery from '@/components/CategoryGallery'
import { Category } from '@/lib/images'

const eventSubcategories = [
  { slug: 'baptism', label: 'Baptism' },
  { slug: 'maternity', label: 'Maternity' },
  { slug: 'family', label: 'Family' },
]

interface PageProps {
  params: { subcategory: string }
}

// Generate static paths for all event subcategories
export function generateStaticParams() {
  return eventSubcategories.map((sub) => ({
    subcategory: sub.slug,
  }))
}

// Generate metadata for each subcategory
export function generateMetadata({ params }: PageProps): Metadata {
  const subcategory = eventSubcategories.find((s) => s.slug === params.subcategory)

  if (!subcategory) {
    return { title: 'Not Found' }
  }

  return {
    title: `${subcategory.label} | Events | Martina Visuals`,
    description: `${subcategory.label} photography by Martina Visuals`,
  }
}

export default function EventSubcategoryPage({ params }: PageProps) {
  const validSlugs = eventSubcategories.map((s) => s.slug)

  if (!validSlugs.includes(params.subcategory)) {
    notFound()
  }

  const category = `events/${params.subcategory}` as Category

  return <CategoryGallery category={category} />
}
