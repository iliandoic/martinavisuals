import { Metadata } from 'next'
import MasonryGallery from '@/components/MasonryGallery'

export const metadata: Metadata = {
  title: 'Gallery | Martina Visuals',
  description: 'Browse the full collection of photography work including landscapes, portraits, and more.',
}

export default function GalleryPage() {
  return (
    <div className="page-transition min-h-screen bg-black">
      {/* Header */}
      <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Gallery</h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Click on any image to view it in full screen with slideshow and zoom capabilities
          </p>
        </div>
      </section>

      {/* Gallery */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <MasonryGallery />
        </div>
      </section>
    </div>
  )
}
